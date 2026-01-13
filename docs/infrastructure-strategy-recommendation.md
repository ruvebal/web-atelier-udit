---
layout: methodology
title: 'Infrastructure Strategy: Studio First, Projects Second'
title_alt: 'Estrategia de Infraestructura: Estudio Primero, Proyectos Segundo'
slug: infrastructure-strategy-recommendation
date: 2026-01-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /methodology/en/infrastructure-strategy-recommendation/
description: 'Strategic analysis reconciling semantic-knowledge-hub, learning-path-extension, and craftsperson-path recommendations for studio infrastructure setup.'
tags: [infrastructure, strategy, studio, mcp, databases]
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no-toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> _"The master builds the foundation before the house. The apprentice builds the house and discovers the foundation was needed."_
> — The Tao of Infrastructure

---

## Executive Summary

After analyzing three strategic documents (`semantic-knowledge-hub.md`, `learning-path-extension.md`, and `craftsperson-path.md`), this document provides clear recommendations on:

1. **Infrastructure Setup Order**: Studio infrastructure FIRST, then projects
2. **Project Benefits**: Multi-tenant services, AI memory, rapid prototyping
3. **Database Strategy**: Dev/Stg/Prod cloud solution is not only possible but recommended

**Key Insight**: The `craftsperson-path.md` represents a more mature, infrastructure-first approach that should inform updates to the other two documents.

---

## 1. Document Alignment Analysis

### 1.1 Current State Comparison

| Aspect             | semantic-knowledge-hub.md | learning-path-extension.md | craftsperson-path.md        |
| ------------------ | ------------------------- | -------------------------- | --------------------------- |
| **MCP Timing**     | Phase 5 (Future)          | "Not yet, 3-6 months"      | Phase 1 (Immediate)         |
| **Infrastructure** | Static JSON first         | Scripts first, then MCP    | Studio infrastructure first |
| **Database**       | Not addressed             | Shared layer mentioned     | Dev/Stg/Prod detailed       |
| **Multi-tenant**   | Implicit                  | "When 5+ projects"         | Core architecture           |
| **Philosophy**     | Progressive enhancement   | Incremental learning       | Foundation-first            |

### 1.2 The Contradiction

**The Conflict:**

- `learning-path-extension.md` (Section 2.3): _"Not yet. Focus on immediate refactor, then revisit MCP in 3-6 months."_
- `craftsperson-path.md` (Phase 1): _"Local MCP Infrastructure (Python) - Set up FIRST"_

**The Resolution:**
The `craftsperson-path.md` represents the **Level 3: Craftsperson** perspective—you've already identified the pattern (Level 2), now you build the infrastructure to serve all projects. The other documents were written from a **Level 2: Practitioner** perspective.

---

## 2. Recommendation: Infrastructure First

### 2.1 Why Studio Infrastructure Should Come First

```
┌─────────────────────────────────────────────────────────────┐
│              THE INFRASTRUCTURE-FIRST BENEFIT                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  WITHOUT STUDIO INFRASTRUCTURE (Current State)              │
│  ────────────────────────────────────────────                │
│  • Each project is an island                                │
│  • No shared AI memory                                       │
│  • Manual setup for each new project                         │
│  • No cross-project knowledge sharing                        │
│  • Semantic Knowledge Hub is just static files               │
│                                                              │
│  WITH STUDIO INFRASTRUCTURE (Target State)                  │
│  ────────────────────────────────────────────                │
│  • Projects are "satellites" connecting to studio core       │
│  • Shared ChromaDB for vector memory                         │
│  • New project = add labels to Traefik                      │
│  • Semantic Knowledge Hub becomes MCP-accessible              │
│  • AI-assisted development with persistent context           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 The "Thousand Arms" Philosophy

From `craftsperson-path.md`:

> _"The Tao has a thousand arms. Infrastructure must serve them all."_

**Applied:**

- Your studio infrastructure (lilith + beelzebub) serves ALL projects
- Each project (`udit`, `proto1`, `proto2`, future courses) connects to the same core
- The Semantic Knowledge Hub becomes a **shared resource** accessible via MCP
- Projects benefit immediately from infrastructure you build once

### 2.3 Concrete Benefits for Projects

#### Benefit 1: Rapid Project Creation

**Before:** New project = set up database, configure routing, deploy separately
**After:** New project = add Traefik labels, connect to existing services

```yaml
# New project docker-compose.yml (minimal)
services:
 app:
  image: my-app:latest
  labels:
   - 'traefik.http.routers.newproject.rule=Host(`newproject.crea-comm.loc`)'
  environment:
   - DATABASE_URL=postgres://pg.crea-comm.loc:5432/newproject
   - CHROMA_HOST=chroma.crea-comm.loc
   - OLLAMA_HOST=http://ollama.crea-comm.loc:11434
```

#### Benefit 2: AI Memory Per Project

**Before:** Each project has no memory of previous interactions
**After:** Each project has its own ChromaDB collection with persistent context

```python
# In your project code
from shared.config import config

collection_name = f"{config.project_name}_knowledge"  # udit_knowledge
# AI can remember previous conversations, lessons learned, etc.
```

#### Benefit 3: Semantic Knowledge Hub Integration

**Before:** Static JSON files, manual updates
**After:** MCP-accessible knowledge base, AI can query and update

```python
# AI can now:
# - Search your knowledge base semantically
# - Suggest related concepts when creating lessons
# - Validate lesson content against your ontology
# - Cross-reference wisdom (TTOD) with lessons
```

#### Benefit 4: Multi-Environment Consistency

**Before:** Different setup for dev/stg/prod
**After:** Same code, different backends via environment variables

---

## 3. Dev/Stg/Prod Cloud Database Solution

### 3.1 The Answer: Yes, Absolutely

The `craftsperson-path.md` (Phase 4) provides a complete solution:

```
┌─────────────────────────────────────────────────────────────┐
│              ENVIRONMENT MATRIX                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DEV (crea-comm.loc)                                        │
│  • Domain: *.crea-comm.loc                                  │
│  • Database: PostgreSQL on beelzebub (10.0.0.2)             │
│  • Vectors: ChromaDB on lilith (10.0.0.40)                  │
│  • LLM: Ollama local (lilith)                               │
│  • Cost: $0 (your hardware)                                 │
│                                                              │
│  STAGING (stg.crea-comm.net)                                │
│  • Domain: *.stg.crea-comm.net                              │
│  • Database: Managed PostgreSQL (DigitalOcean, $15/mo)     │
│  • Vectors: ChromaDB Cloud or hosted                        │
│  • LLM: OpenAI API (gpt-4o-mini)                           │
│  • Cost: ~$25-30/mo                                         │
│                                                              │
│  PRODUCTION (crea-comm.net)                                 │
│  • Domain: *.crea-comm.net                                  │
│  • Database: Managed PostgreSQL (scaled, $30-50/mo)        │
│  • Vectors: Pinecone or managed ChromaDB                    │
│  • LLM: Claude API (anthropic)                              │
│  • Cost: ~$50-100/mo                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Implementation Strategy

#### Step 1: Local Dev Setup (Week 1)

```bash
# On beelzebub (10.0.0.2)
docker-compose up -d postgres redis

# Multi-tenant database structure
CREATE DATABASE udit;
CREATE DATABASE proto1;
CREATE SCHEMA udit;
CREATE SCHEMA proto1;
```

#### Step 2: Staging Setup (Week 2-3)

```bash
# .env.stg
PG_HOST=your-staging-db.supabase.co
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=${STAGING_PASSWORD}

# Same code, different connection string
```

#### Step 3: Production Setup (When Ready)

```bash
# .env.prod
PG_HOST=your-prod-db.supabase.co
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=${PROD_PASSWORD}

# Managed, scaled, backed up
```

### 3.3 Database Abstraction Layer

```python
# shared/db.py
from shared.config import config
import psycopg2

def get_db_connection():
    """Get database connection based on environment."""
    return psycopg2.connect(
        host=config.pg_host,
        port=config.pg_port,
        user=config.pg_user,
        password=config.pg_password,
        database=config.project_name  # udit, proto1, etc.
    )

# Works in dev (beelzebub), stg (cloud), prod (cloud)
# Same code, different hosts
```

---

## 4. Updated Recommendations

### 4.1 Revised Timeline

**Original (learning-path-extension.md):**

- Q1: Foundation solidification
- Q2: Node.js tooling
- Q3: MCP exploration
- Q4: Integration & scaling

**Revised (Infrastructure-First):**

- **Week 1-2**: Studio infrastructure setup (lilith + beelzebub)
  - Traefik, ChromaDB, Ollama, PostgreSQL
  - MCP servers (knowledge, vectors)
- **Week 3-4**: Semantic Knowledge Hub as MCP resource
  - Export TTOD to ChromaDB
  - MCP tools for knowledge queries
- **Q2**: Projects connect to studio infrastructure
  - Update existing projects to use shared services
  - New projects start as "satellites"
- **Q3**: Staging environment setup
  - Cloud database for staging
  - CI/CD pipeline
- **Q4**: Production deployment
  - Managed databases
  - Monitoring and scaling

### 4.2 Updated Document Priorities

| Document                     | Current Status       | Recommended Update                       |
| ---------------------------- | -------------------- | ---------------------------------------- |
| `semantic-knowledge-hub.md`  | Phase 1: Static JSON | Add Phase 0: Studio Infrastructure Setup |
| `learning-path-extension.md` | "MCP in 3-6 months"  | Update to "MCP in Week 1-2"              |
| `craftsperson-path.md`       | ✅ Correct           | Use as primary reference                 |

---

## 5. Action Plan

### 5.1 Immediate Actions (This Week)

1. **Set up Studio Infrastructure** (lilith + beelzebub)

   - Follow `craftsperson-path.md` Phase 1
   - Deploy Traefik, ChromaDB, Ollama, PostgreSQL
   - Configure dnsmasq for `.crea-comm.loc`

2. **Create MCP Servers** (Python)

   - Knowledge server (expose markdown files)
   - Vector server (ChromaDB + Ollama)
   - Filesystem server (project access)

3. **Configure Claude Desktop**
   - Connect to MCP servers on lilith
   - Test knowledge queries

### 5.2 Short-Term (This Month)

1. **Ingest Knowledge Base**

   - Export TTOD to ChromaDB
   - Ingest lesson markdown files
   - Create project-specific collections

2. **Update Existing Projects**

   - Connect `web-foundations` to studio infrastructure
   - Add vector memory for AI-assisted development

3. **Document the Setup**
   - Update `semantic-knowledge-hub.md` with infrastructure-first approach
   - Update `learning-path-extension.md` with revised timeline

### 5.3 Medium-Term (This Quarter)

1. **Staging Environment**

   - Set up cloud database (DigitalOcean/Supabase)
   - Configure `.env.stg` with cloud backends
   - Test deployment pipeline

2. **Multi-Tenant Isolation**
   - Verify project isolation in databases
   - Test ChromaDB collection prefixes
   - Document naming conventions

---

## 6. Benefits Summary

### 6.1 For Your Projects

✅ **Rapid Prototyping**: New project in minutes, not hours
✅ **AI Memory**: Each project remembers context
✅ **Knowledge Sharing**: Semantic Knowledge Hub accessible to all
✅ **Consistent Environments**: Dev/Stg/Prod with same code
✅ **Cost Efficiency**: Shared infrastructure, pay once

### 6.2 For Your Teaching

✅ **Infrastructure as Teaching Material**: Show students real-world setup
✅ **Reproducible Patterns**: Students can replicate your studio
✅ **Open Source Potential**: MCP servers can be shared

### 6.3 For Your Research

✅ **Persistent Knowledge Base**: Research insights stored and queryable
✅ **Cross-Project Analysis**: Semantic search across all projects
✅ **AI-Assisted Writing**: Context-aware assistance for papers

---

## 7. Conclusion

**The Answer to Your Questions:**

1. **Should I set up studio infrastructure first?**
   **YES.** The infrastructure serves all projects. Build once, benefit many times.

2. **What benefit would projects take?**

   - Rapid creation (minutes vs hours)
   - AI memory per project
   - Shared knowledge base
   - Consistent dev/stg/prod environments

3. **Can I have dev/stg/prod cloud db solution?**
   **YES.** Use managed databases for staging/production, local for dev. Same code, different connection strings.

**The Path Forward:**

1. Follow `craftsperson-path.md` Phase 1 (Week 1-2)
2. Integrate Semantic Knowledge Hub as MCP resource (Week 3-4)
3. Update existing documents to reflect infrastructure-first approach
4. Connect projects to studio infrastructure (Q2)

---

## 8. Related Resources

| Resource                                                       | Description                                               |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| [Craftsperson's Path](../../../fullstack/craftsperson-path.md) | Primary reference for infrastructure setup                |
| [Semantic Knowledge Hub](./semantic-knowledge-hub.md)          | Knowledge base architecture (needs infrastructure update) |
| [Learning Path Extension](./learning-path-extension.md)        | Roadmap (needs timeline update)                           |

---

> _"The foundation is not built after the house—it is the house's first act of existence."_
> — The Tao of Infrastructure

---

**Authorship:** Rubén Vega Balbás, PhD (UDIT) · ORCID: [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**License:** Content CC BY-NC-SA 4.0

_Critical Coding for a Better Living._
