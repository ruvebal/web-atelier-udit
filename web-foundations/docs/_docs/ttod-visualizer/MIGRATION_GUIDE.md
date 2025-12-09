# 道 TTOD Migration Guide: From Nested to Independent

> *"The seed that stays in the garden grows tall. The seed that travels plants forests."*
> — The Tao of Development, Modularization Chapter

---

## Overview

This guide documents the path from TTOD as a nested component within `web-atelier-udit` to independent, publishable packages. The goal is **zero-breakage extraction**—the parent repository continues to work during and after migration.

---

## Current State (Pre-Migration)

```
web-atelier-udit/
├── web-foundations/
│   ├── docs/
│   │   ├── _data/
│   │   │   └── ttod.yml                 # Wisdom database
│   │   ├── _docs/
│   │   │   └── ttod-visualizer/         # This documentation
│   │   │       ├── IMPLEMENTATION_PLAN.md
│   │   │       └── MIGRATION_GUIDE.md
│   │   └── lessons/
│   │       └── en/media/images/
│   │           └── the-tao-of-web-images/
│   │               └── index.md         # Lesson referencing TTOD
│   └── ...
└── ...
```

**Dependencies:**
- Jekyll templates read `site.data.ttod`
- Lessons reference quotes by ID
- No external consumers yet

---

## Target State (Post-Migration)

### Repository Structure

```
# Independent repositories

@ruvebal/ttod (npm package)
├── data/
│   └── ttod.yml
├── schema/
│   └── ttod.schema.json
├── dist/
│   ├── ttod.json                # Compiled JSON
│   └── ttod.d.ts                # TypeScript types
├── src/
│   └── index.ts                 # Type exports
├── package.json
└── README.md

@ruvebal/ttodv (monorepo)
├── packages/
│   ├── gpu-primitives/          # @ttodv/gpu-primitives
│   ├── graph-engine/            # @ttodv/graph-engine
│   ├── renderer/                # @ttodv/renderer
│   ├── core/                    # @ttodv/core
│   └── app/                     # Deployed application
├── package.json (workspace root)
└── README.md
```

### Dependency Graph

```
web-atelier-udit
       │
       │ (git submodule or npm)
       ▼
    @ruvebal/ttod ◄────────────────┐
       │                           │
       │ (npm dependency)          │
       ▼                           │
  @ttodv/core ─────────────────────┘
       │
       │ (internal)
       ▼
  @ttodv/graph-engine
       │
       ▼
  @ttodv/renderer
       │
       ▼
  @ttodv/gpu-primitives
```

---

## Migration Phases

### Phase M0: Preparation (No Changes Yet)

**Objective:** Document current usage, create compatibility layer.

#### Step M0.1: Audit Current Usage

```bash
# Find all TTOD references in web-atelier-udit
grep -r "ttod" web-foundations/docs/ --include="*.md" --include="*.html" --include="*.yml"
grep -r "site.data.ttod" web-foundations/docs/
```

Expected findings:
- Jekyll templates using `site.data.ttod.quotes`
- Lessons referencing quote IDs
- Possibly includes or layouts

#### Step M0.2: Create Compatibility Types

Create `web-foundations/docs/_data/ttod.d.ts`:

```typescript
// TypeScript declaration for TTOD schema
// This will become the source of truth for @ruvebal/ttod

export interface TTODQuote {
  id: string;
  text: string;
  section: string;
  subsection: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'master';
  tags: string[];
  teaches: string;
  related?: string[];
  lesson?: string;
  source?: string;
  chapter?: string;
  show_when?: string;
}

export interface TTODSection {
  id: string;
  prefix: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  subsections: string[];
}

export interface TTODLevel {
  label: string;
  weight: number;
  color: string;
}

export interface TTODMeta {
  title: string;
  subtitle: string;
  version: string;
  language: string;
  total_quotes: number;
  last_id_by_section: Record<string, number>;
  audience: string[];
  levels: Record<string, TTODLevel>;
  sections: TTODSection[];
  tag_taxonomy: Record<string, string[]>;
}

export interface TTODData {
  meta: TTODMeta;
  visualization: Record<string, unknown>;
  statistics: Record<string, unknown>;
  quotes: TTODQuote[];
  collections: Record<string, unknown>;
  lessons: unknown[];
  templates: Record<string, string>;
}
```

#### Step M0.3: Create JSON Export Script

Create `web-foundations/scripts/ttod-export.js`:

```javascript
#!/usr/bin/env node
/**
 * Exports ttod.yml to ttod.json for non-Ruby consumers
 * Run: node scripts/ttod-export.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const inputPath = path.join(__dirname, '../docs/_data/ttod.yml');
const outputPath = path.join(__dirname, '../docs/_data/ttod.json');

try {
  const yamlContent = fs.readFileSync(inputPath, 'utf8');
  const data = yaml.load(yamlContent);

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`✓ Exported ${data.quotes.length} quotes to ttod.json`);
} catch (e) {
  console.error('Export failed:', e.message);
  process.exit(1);
}
```

---

### Phase M1: Create Independent TTOD Package

**Objective:** `@ruvebal/ttod` exists on npm, web-atelier-udit consumes it.

#### Step M1.1: Create New Repository

```bash
# Create new repo
mkdir ttod && cd ttod
git init

# Initialize package
npm init -y
npm install --save-dev typescript js-yaml @types/node

# Create structure
mkdir -p data schema src dist
```

#### Step M1.2: Move Core Data

```bash
# Copy from web-atelier-udit
cp ../web-atelier-udit/web-foundations/docs/_data/ttod.yml data/
cp ../web-atelier-udit/web-foundations/docs/_data/ttod.d.ts src/types.ts
```

#### Step M1.3: Create Package Entry

`src/index.ts`:

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import type { TTODData } from './types';

export * from './types';

/**
 * Load TTOD data from bundled YAML
 */
export function loadTTOD(): TTODData {
  const yamlPath = join(__dirname, '../data/ttod.yml');
  const content = readFileSync(yamlPath, 'utf8');
  return load(content) as TTODData;
}

/**
 * Get pre-compiled JSON (for browsers)
 */
export function getTTODUrl(): string {
  return 'https://unpkg.com/@ruvebal/ttod/dist/ttod.json';
}
```

#### Step M1.4: Configure Build

`package.json`:

```json
{
  "name": "@ruvebal/ttod",
  "version": "2.0.0",
  "description": "The Tao of Development - Wisdom database for developers",
  "main": "dist/index.js",
  "types": "dist/types.d.ts",
  "files": [
    "dist",
    "data"
  ],
  "scripts": {
    "build": "tsc && npm run export",
    "export": "node scripts/export-json.js",
    "prepublishOnly": "npm run build"
  },
  "keywords": ["tao", "development", "wisdom", "quotes", "pedagogy"],
  "author": "Rubén Vega Balbás",
  "license": "CC-BY-SA-4.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/ruvebal/ttod.git"
  }
}
```

#### Step M1.5: Publish

```bash
npm login
npm publish --access public
```

---

### Phase M2: Update Parent Repository

**Objective:** `web-atelier-udit` consumes `@ruvebal/ttod`.

#### Step M2.1: Install Package

```bash
cd web-atelier-udit/web-foundations
npm install @ruvebal/ttod
```

#### Step M2.2: Create Sync Script

`scripts/sync-ttod.js`:

```javascript
#!/usr/bin/env node
/**
 * Syncs @ruvebal/ttod to Jekyll _data directory
 * Run: npm run sync:ttod
 */

const fs = require('fs');
const path = require('path');

const sourcePath = require.resolve('@ruvebal/ttod/data/ttod.yml');
const destPath = path.join(__dirname, '../docs/_data/ttod.yml');

fs.copyFileSync(sourcePath, destPath);
console.log('✓ Synced ttod.yml from @ruvebal/ttod');
```

#### Step M2.3: Add npm Script

In `package.json`:

```json
{
  "scripts": {
    "sync:ttod": "node scripts/sync-ttod.js",
    "prebuild": "npm run sync:ttod"
  }
}
```

#### Step M2.4: Update .gitignore

```gitignore
# Synced from npm package
docs/_data/ttod.yml
```

---

### Phase M3: Create Independent TTODV

**Objective:** Visualizer lives in its own monorepo.

#### Step M3.1: Create Monorepo

```bash
mkdir ttodv && cd ttodv
git init

# Initialize workspace
npm init -y
npm install --save-dev turbo typescript

# Create workspace config
cat > package.json << 'EOF'
{
  "name": "ttodv",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test"
  }
}
EOF

# Create packages
mkdir -p packages/{gpu-primitives,graph-engine,renderer,core,app}
```

#### Step M3.2: Package Dependencies

```
packages/
├── gpu-primitives/
│   └── package.json     # No dependencies
├── graph-engine/
│   └── package.json     # Depends on gpu-primitives
├── renderer/
│   └── package.json     # Depends on gpu-primitives
├── core/
│   └── package.json     # Depends on @ruvebal/ttod
└── app/
    └── package.json     # Depends on all above
```

#### Step M3.3: Core Package Setup

`packages/core/package.json`:

```json
{
  "name": "@ttodv/core",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "dependencies": {
    "@ruvebal/ttod": "^2.0.0"
  },
  "peerDependencies": {
    "@ttodv/graph-engine": "workspace:*"
  }
}
```

---

### Phase M4: Deprecate Nested Structure

**Objective:** Remove duplicated code from parent.

#### Step M4.1: Update Documentation

Add deprecation notice to `web-foundations/docs/_docs/ttod-visualizer/`:

```markdown
> ⚠️ **DEPRECATED**: This documentation has moved to
> [github.com/ruvebal/ttodv](https://github.com/ruvebal/ttodv)
```

#### Step M4.2: Remove Migrated Files

```bash
# After confirming npm package works
rm -rf web-foundations/docs/_docs/ttod-visualizer/
git add -A
git commit -m "chore: migrated ttod-visualizer to @ruvebal/ttodv"
```

#### Step M4.3: Update README

Document new architecture in main README.

---

## Rollback Procedures

### If npm Publish Fails

1. Keep local `ttod.yml` in repository
2. Revert `.gitignore` changes
3. Remove sync script from `prebuild`

### If Consumers Break

1. Publish patch to npm with fix
2. Run `npm update @ruvebal/ttod` in consumers
3. If urgent: temporarily commit `ttod.yml` back

### If Visualizer Breaks

1. Keep standalone HTML fallback
2. Visualizer is optional, core quotes unaffected
3. Pin to last working version

---

## Version Strategy

### TTOD Data (`@ruvebal/ttod`)

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Add quotes | MINOR | 2.0.0 → 2.1.0 |
| Fix typo | PATCH | 2.0.0 → 2.0.1 |
| Schema change | MAJOR | 2.0.0 → 3.0.0 |
| New section | MINOR | 2.0.0 → 2.1.0 |

### TTODV Visualizer

| Change Type | Version Bump |
|-------------|--------------|
| New feature | MINOR |
| Bug fix | PATCH |
| Breaking API | MAJOR |
| Dependency update | PATCH |

---

## Checklist

### Pre-Migration

- [ ] All current usages documented
- [ ] TypeScript types created
- [ ] JSON export working
- [ ] No hardcoded paths

### During Migration

- [ ] npm package published
- [ ] Sync script working
- [ ] Jekyll still builds
- [ ] All tests pass

### Post-Migration

- [ ] Old files removed
- [ ] Documentation updated
- [ ] CI/CD updated
- [ ] Consumers notified

---

## Timeline

| Week | Activity |
|------|----------|
| 1 | Phase M0: Preparation |
| 2 | Phase M1: Create @ruvebal/ttod |
| 3 | Phase M2: Update parent |
| 4-10 | Build visualizer (parallel) |
| 11 | Phase M3: Create ttodv monorepo |
| 12 | Phase M4: Deprecate nested |

---

*"The greatest migration is the one nobody notices happened."*

道

