# Ejemplo: Metodología Archivos de Contexto

## 🔴 Método ANTIGUO (No usar)

### Prompt sin Archivos de Contexto

```markdown
# Prompt para Sistema de Diseño

Personaliza el sistema de diseño del portfolio con mi identidad visual.

## Mi Identidad Visual

**Tipografías:**
- Heading: Montserrat (Bold 700)
- Body: Open Sans (Regular 400, Semibold 600)
- URLs Google Fonts:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  ```

**Paleta de Colores:**
- Primario: #FF6B6B (para CTAs, enlaces)
- Secundario: #4ECDC4 (para acentos)
- Acento 1: #95E1D3 (chapter-1, stats)
- Acento 2: #FFE66D (chapter-2, timeline)
- Acento 3: #6C5CE7 (chapter-3, cards)
- Fondo: #F8F9FA
- Texto: #2D3436

**Verificación de Contraste:**
- Texto primario/fondo: 11.3:1 ✓ WCAG AAA
- CTAs: 4.8:1 ✓ WCAG AA
- Acentos: todos >3:1 ✓

## Tareas

1. Actualiza `assets/css/_variables.css` con:
   - Fuentes heading y body
   - Colores principales y acentos
   - Gradientes coherentes con la paleta

2. Genera código <link> para Google Fonts

3. Verifica contraste WCAG AA

[... resto del prompt ...]
```

### ❌ Problemas

1. **Duplicación:** La misma información está en:
   - `project-brief.md`
   - Este prompt
   - Posiblemente otros prompts (Hero, About, etc.)

2. **Mantenimiento:** Si cambias el color primario de #FF6B6B a #E74C3C:
   - Debes actualizar `project-brief.md`
   - Debes actualizar este prompt
   - Debes actualizar cualquier otro prompt que use colores
   - Fácil olvidar uno → inconsistencias

3. **Verbosidad:** Prompt largo y denso

4. **No escalable:** Imagina 10+ prompts con esta información duplicada

---

## 🟢 Método NUEVO (Usar siempre)

### 1. Completa `project-brief.md`

```markdown
# Portfolio Brief - Ilustración Aplicada

## 🎨 Identidad Visual

### Paleta de Colores

**Color Primario:** `#FF6B6B` - CTAs, enlaces, elementos interactivos  
**Color Secundario:** `#4ECDC4` - Acentos secundarios, hover states  
**Acento 1:** `#95E1D3` - Chapter-1, statistics display  
**Acento 2:** `#FFE66D` - Chapter-2, timeline  
**Acento 3:** `#6C5CE7` - Chapter-3, cards interactivas

**Verificación de contraste:**
- [x] Texto sobre fondo cumple WCAG AA (11.3:1)
- [x] UI elements cumplen 3:1
- [x] Probado con WebAIM Contrast Checker

### Tipografías

**Para Títulos/Headings:**
- Fuente: Montserrat
- Peso: 700 Bold
- Uso: h1, h2, h3, hero title

**Para Texto/Body:**
- Fuente: Open Sans
- Peso: 400 Regular, 600 Semibold
- Uso: párrafos, descripciones, labels

**URLs de Google Fonts:**
```
https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap
```
```

### 2. Prompt con Archivo de Contexto

```markdown
# Prompt para Sistema de Diseño

Personaliza el sistema de diseño del portfolio scrollytelling.

## 📎 ARCHIVOS DE CONTEXTO

**Adjunta estos archivos al prompt:**
1. `project-brief.md`
2. `assets/css/_variables.css`

## INSTRUCCIÓN PARA LA IA

1. Lee `project-brief.md` sección "Identidad Visual"
2. Extrae:
   - Paleta de colores completa
   - Tipografías heading y body
   - URLs de Google Fonts
3. Lee `assets/css/_variables.css` para ver variables actuales

**IMPORTANTE:** NO me pidas que duplique información del brief.

## TAREAS

Usando la información de `project-brief.md`:

1. **Actualizar _variables.css:**
   - Fuentes: Aplicar del brief
   - Colores: Aplicar hex codes del brief
   - Gradientes: Crear 4 gradientes coherentes con la paleta

2. **Generar código Google Fonts:**
   - Usar URLs del brief
   - Incluir preconnect para performance

3. **Verificar contraste:**
   - Testear combinaciones principales
   - Documentar ratios WCAG

## REPORT DE IMPLEMENTACIÓN

Documenta:

1. **Archivos leídos:** 
   - project-brief.md ✓ → [Qué extrajiste]
   - _variables.css ✓ → [Qué variables actualizaste]

2. **Cambios realizados:**
   - Fuentes aplicadas: [...]
   - Colores actualizados: [...]
   - Gradientes generados: [...]

3. **Contraste verificado:**
   - [Lista ratios principales]

4. **Código Google Fonts:**
   ```html
   [Código generado]
   ```

5. **Próximos pasos:**
   - [...]

[La IA completará después de leer los archivos]
```

### ✅ Ventajas

1. **Fuente única de verdad:** Toda la información vive en `project-brief.md`

2. **Fácil mantenimiento:** Cambias el color una vez en el brief, no en 10 prompts

3. **Prompts más cortos:** Solo instrucciones y referencias

4. **Escalable:** Puedes tener 50 prompts referenciando el mismo brief

5. **Profesional:** Así funcionan los sistemas reales (design tokens, design systems)

6. **DRY principle:** Don't Repeat Yourself

---

## 📊 Comparación Visual

### Antiguo (Duplicación)

```
┌─────────────────────────┐
│   project-brief.md      │
│   - Colores: #FF6B6B... │
│   - Fuentes: Montserrat  │
└─────────────────────────┘
           │
           ↓ (duplicado)
┌─────────────────────────┐
│  prompt-sistema.md      │
│  - Colores: #FF6B6B...  │
│  - Fuentes: Montserrat  │
└─────────────────────────┘
           │
           ↓ (duplicado)
┌─────────────────────────┐
│  prompt-hero.md         │
│  - Colores: #FF6B6B...  │
│  - Fuentes: Montserrat  │
└─────────────────────────┘
           │
           ↓ (duplicado)
┌─────────────────────────┐
│  prompt-about.md        │
│  - Colores: #FF6B6B...  │
│  - Fuentes: Montserrat  │
└─────────────────────────┘

❌ Si cambias #FF6B6B, debes actualizar 4 archivos
❌ Fácil olvidar uno = inconsistencias
```

### Nuevo (Referencia)

```
┌─────────────────────────┐
│   project-brief.md      │
│   - Colores: #FF6B6B... │ ← FUENTE ÚNICA
│   - Fuentes: Montserrat  │   DE VERDAD
└─────────────────────────┘
           ↑
           │ (referencia)
┌──────────┴──────────────┐
│  prompt-sistema.md      │
│  📎 Lee: project-brief   │
└─────────────────────────┘
           ↑
           │ (referencia)
┌──────────┴──────────────┐
│  prompt-hero.md         │
│  📎 Lee: project-brief   │
└─────────────────────────┘
           ↑
           │ (referencia)
┌──────────┴──────────────┐
│  prompt-about.md        │
│  📎 Lee: project-brief   │
└─────────────────────────┘

✅ Cambias #FF6B6B una vez en el brief
✅ Todos los prompts usan la versión actualizada
✅ Cero duplicación
```

---

## 🎓 Ejemplo Completo: Hero Section

### Antiguo (Duplicación)

```markdown
# Prompt Hero

Personaliza la Hero Section.

## Contenidos

**Nombre:** Juan Pérez Ilustrador  
**Tagline:** Creando narrativas visuales que conectan emociones  
**Especialización:** Ilustración editorial y branding

## Colores
- Primario: #FF6B6B
- Gradiente: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)

## Tipografía
- Heading: Montserrat Bold 700
- Body: Open Sans Regular 400

[... más contenido duplicado ...]
```

**Líneas de prompt:** ~30+  
**Información duplicada:** 100%

---

### Nuevo (Contexto)

```markdown
# Prompt Hero

Personaliza la Hero Section del portfolio.

## 📎 CONTEXTO
Adjunta: `project-brief.md`

Lee secciones:
- "Contenidos Preparados" → "Lema/Tagline para Hero"
- "Identidad Visual" → Colores y tipografías (si necesario)

## TAREA

Actualiza en `index.html` (líneas 18-20):
- Nombre del brief
- Tagline del brief
- Emoji apropiado

NO dupliques información - la IA debe LEER el archivo.

## REPORT
1. Nombre extraído: [...]
2. Tagline: [...]
3. Emoji: [...]
4. Responsive: ✓

[La IA completará]
```

**Líneas de prompt:** ~15  
**Información duplicada:** 0%  
**Reducción:** 50% de longitud

---

## 💡 Tips

### Cuándo Adjuntar Archivos

**Siempre adjunta:**
- `project-brief.md` → Para contenidos, colores, tipografías
- `project-inspiration.md` → Para referencias visuales
- Archivos a modificar → Para que la IA vea el código actual

**Ejemplo de archivos adjuntos:**
```markdown
## 📎 ARCHIVOS ADJUNTOS

1. project-brief.md (contexto general)
2. assets/css/_variables.css (código a modificar)
3. project-inspiration.md (referencias, si aplica)
```

### Instrucciones a la IA

**Buenas:**
```markdown
Lee `project-brief.md` sección "Identidad Visual" para obtener la paleta completa.
```

**Malas:**
```markdown
Usa estos colores: #FF6B6B, #4ECDC4, #95E1D3...
(Estás duplicando el brief)
```

### Actualizar Contenidos

**Workflow:**
1. Cambias el brief una vez
2. Los prompts referencian el brief
3. La IA siempre lee la versión actualizada

**No necesitas:**
- ❌ Actualizar múltiples prompts
- ❌ Buscar dónde duplicaste información
- ❌ Mantener sincronizados 10 archivos

---

## ✅ Checklist

**Antes de escribir un prompt:**
- [ ] ¿La información ya está en `project-brief.md`?
- [ ] Si sí → Referenciar el brief, NO duplicar
- [ ] Si no → Añadir al brief primero, luego referenciar

**En cada prompt:**
- [ ] Sección `📎 CONTEXTO` con archivos a adjuntar
- [ ] Instrucción clara: "Lee project-brief.md sección X"
- [ ] Explícito: "NO dupliques información del brief"
- [ ] Sección `REPORT` para documentar lo hecho

---

**Adopta esta metodología desde S3 y úsala en todos tus proyectos futuros! 🚀**
