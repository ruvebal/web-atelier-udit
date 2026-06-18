# Reglas para exportar bancos de preguntas a Blackboard Ultra (QTI 2.1)

Documento de referencia construido a partir de la ingeniería inversa de un paquete QTI
que Blackboard Ultra ya aceptaba (`examen-portafolio-auto-evaluacion-qti.zip`) y de la
resolución iterativa de errores de importación reales. Cada regla lleva el error
concreto que viola si se incumple.

---

## REGLA 1 — Namespace y schema de items: usar `imsqti_v2p1`, NO `imsqtiasi_v2p1`

Cada fichero `items/*.xml` debe declarar el namespace QTI puro, no el perfil
Common Cartridge (`ccv1p3`).

**Correcto:**
```xml
<assessmentItem
  xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1
                      http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd"
  ...>
```

**Incorrecto (Blackboard rechaza):**
```xml
<assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v2p1" ...>
```

---

## REGLA 2 — `itemBody`: embeber HTML directamente como XML, nunca con `<div>` + CDATA

El texto de la pregunta debe colocarse como XML/XHTML inline dentro de `<itemBody>`,
**usando etiquetas estándar** (`<p>`, `<strong>`, `<em>`, `<code>`, etc.) directamente.

**Correcto:**
```xml
<itemBody>
  <p>¿Qué es el Virtual DOM en React?</p>
  <choiceInteraction ...>
    ...
  </choiceInteraction>
</itemBody>
```

**Incorrecto (causa "Unable to convert the given package"):**
```xml
<itemBody>
  <div class="prompt"><![CDATA[<p>¿Qué es el Virtual DOM en React?</p>]]></div>
  ...
</itemBody>
```

> **Nota:** CDATA sí es válido dentro de `<simpleChoice>` y
> `<simpleAssociableChoice>` para el texto de las opciones. Solo está prohibido
> en el cuerpo principal de la pregunta dentro de `itemBody`.

---

## REGLA 3 — `imsmanifest.xml` debe incluir un bloque `<metadata>`

El manifest necesita el bloque `<metadata>` con schema y versión para que
Blackboard identifique correctamente el paquete como IMS Content Package.

**Correcto:**
```xml
<manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  identifier="manifest-XXXXXXX"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1
                      http://www.imsglobal.org/xsd/imscp_v1p1.xsd">
  <metadata>
    <schema>IMS Content</schema>
    <schemaversion>1.1.3</schemaversion>
  </metadata>
  <organizations/>
  <resources>
    ...
  </resources>
</manifest>
```

---

## REGLA 4 — `assessment.xml` es obligatorio como wrapper del test

El manifest debe declarar un recurso de tipo `imsqti_test_xmlv2p1` apuntando a
un fichero `assessment.xml`. Sin él, Blackboard no sabe que el paquete contiene
un test y puede rechazarlo o no encontrar preguntas.

**Estructura mínima de `assessment.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<assessmentTest
  xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1
                      http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd"
  identifier="mi-examen" title="Título del examen">
  <outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float"/>
  <testPart identifier="testPart-1" navigationMode="linear" submissionMode="individual">
    <assessmentSection identifier="section-1" title="Título" visible="true">
      <assessmentItemRef identifier="q001" href="items/q001.xml"/>
      <!-- ... resto de items ... -->
    </assessmentSection>
  </testPart>
</assessmentTest>
```

**Entrada correspondiente en `imsmanifest.xml`** (debe ir antes de los items):
```xml
<resource identifier="res-assessment" type="imsqti_test_xmlv2p1" href="assessment.xml">
  <file href="assessment.xml"/>
</resource>
```

---

## REGLA 5 — Tipos de recurso en el manifest: `imsqti_test_xmlv2p1` e `imsqti_item_xmlv2p1`

- `assessment.xml` → `type="imsqti_test_xmlv2p1"`
- cada `items/*.xml` → `type="imsqti_item_xmlv2p1"`

No usar `imsqtiasi_item_xmlv2p1` ni variantes con `asi`.

---

## REGLA 6 — Estructura del ZIP: `imsmanifest.xml` debe estar en la RAÍZ

Blackboard examina el ZIP buscando `imsmanifest.xml` en el nivel raíz. Si está
dentro de un subdirectorio (por ejemplo `examen-qti/imsmanifest.xml`), el error
es fatal:

```
Unable to convert the given package
```

**Forma CORRECTA de comprimir** (desde dentro del directorio de salida):
```bash
cd examen-react-uno-qti
zip -r ../examen-react-uno-qti.zip .
```

**Forma INCORRECTA** (los ficheros quedan anidados bajo `examen-react-uno-qti/`):
```bash
# NO hacer esto:
zip -r examen-react-uno-qti.zip examen-react-uno-qti/
```

Verificar la estructura antes de subir:
```bash
unzip -l examen-react-uno-qti.zip | head -8
# La primera entrada debe ser  ./  o directamente  imsmanifest.xml
# NUNCA  examen-react-uno-qti/imsmanifest.xml
```

---

## REGLA 7 — Tipos de pregunta soportados por Blackboard Ultra (QTI 2.1)

| Tipo QTI                 | Blackboard Ultra | Notas                                              |
|--------------------------|------------------|----------------------------------------------------|
| `multichoice` (single)   | ✅ Sí            | `cardinality="single"` + `maxChoices="1"`          |
| `multichoice` (multiple) | ✅ Sí            | `cardinality="multiple"` + `maxChoices="N"`        |
| `truefalse`              | ✅ Sí            | Se implementa como `choiceInteraction` de 2 opciones |
| `essay`                  | ✅ Sí            | `extendedTextInteraction` + template `null`        |
| `matching`               | ✅ Sí            | `matchInteraction` con `directedPair`              |
| `gapselect`              | ⚠️ Parcial       | No hay equivalente QTI directo; exportar como ensayo |
| `ordering`               | ❌ No            | No soportado; convertir a multichoice              |
| `calculated`             | ❌ No            | Fuera del alcance de este script                   |

---

## REGLA 8 — Validar los XML antes de comprimir

Usar `xmllint` para detectar errores de formación antes de subir a Blackboard:

```bash
for f in mi-examen-qti/items/*.xml mi-examen-qti/assessment.xml mi-examen-qti/imsmanifest.xml; do
  xmllint --noout "$f" && echo "OK: $f" || echo "ERROR: $f"
done
```

Un XML mal formado (CDATA no cerrado, entidad sin escapar, etc.) provoca que
Blackboard rechace el paquete completo aunque el resto de ficheros sean válidos.

---

## REGLA 9 — Contenido del `question:` en el YAML fuente

Los campos `question:` deben contener HTML válido y bien formado (XHTML), ya que
se embeben directamente en el XML del item sin ninguna capa de escaping adicional.

- Usar `<p>`, `<strong>`, `<em>`, `<code>`, `<ul>/<li>` según corresponda.
- Escapar `&` como `&amp;`, `<` como `&lt;` si aparecen como texto literal.
- **No** usar Markdown; el script no convierte Markdown a HTML.

**Ejemplo correcto en YAML:**
```yaml
question: |
  <p>¿Cuál es la forma correcta de añadir un elemento con <code>useState</code>?</p>
```

---

## Flujo completo de exportación

```bash
# 1. Generar el paquete QTI desde el YAML
node yaml-to-qti.js --input=mi-examen.yml --outdir=mi-examen-qti

# 2. Validar todos los XML
for f in mi-examen-qti/**/*.xml mi-examen-qti/*.xml; do
  xmllint --noout "$f" && echo "OK: $f" || echo "ERROR: $f"
done

# 3. Comprimir con imsmanifest.xml en la raíz
cd mi-examen-qti && zip -r ../mi-examen-qti.zip . && cd ..

# 4. Verificar estructura del ZIP
unzip -l mi-examen-qti.zip | head -8

# 5. Subir mi-examen-qti.zip a Blackboard Ultra:
#    Course Content > Reuse Questions > Import QTI
```
