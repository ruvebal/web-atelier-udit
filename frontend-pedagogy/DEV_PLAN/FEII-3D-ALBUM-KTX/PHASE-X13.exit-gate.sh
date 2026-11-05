#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

PAGE="$FEII/3d-terminology/index.md"
test -f "$PAGE"
# the professor-approved oral paragraph, verbatim (spine §9)
for frag in "The sleeve is a picture on the GPU, not an" "is a screen dot;" "is a colour in that GPU picture;" "is how the shader asks for a texel." "is only the box." "and I wrote file bytes and GPU bytes from this machine."; do
  rg -qF "$frag" "$PAGE" || { echo "REFUSED: oral paragraph fragment missing: $frag" >&2; exit 1; }
done
rg -q "^slug: feii-3d-terminology$|slug: feii-3d-terminology$" "$WF/docs/_data/lessons.yml"
for f in index.md unit-8-r3f-fundamentals/index.md unit-9-shader-literacy/index.md cover-shaders/index.md ktx2-basis/index.md units-8-9-assignment/index.md; do
  rg -q "3d-terminology" "$FEII/$f" || { echo "REFUSED: $f does not link the terminology lesson" >&2; exit 1; }
done
if rg -n "tao-development-quote|\`(arch|qa|dop)-[0-9]" "$PAGE"; then echo "REFUSED: quote-database IDs on the terminology lesson (D22)" >&2; exit 1; fi
rg -qi "count" "$PAGE" && rg -q "memory.textures" "$PAGE" || { echo "REFUSED: memory.textures not glossed as a count (F16)" >&2; exit 1; }
if rg -n -- "--convert_oetf srgb" "$PAGE" | rg -vi "never|not|don't|do not|rewrites"; then echo "REFUSED: page recommends --convert_oetf (X8 S1)" >&2; exit 1; fi
python3 - "$PAGE" <<'PY'
import re, sys
body = open(sys.argv[1]).read().split("---", 2)[-1]
body = "\n".join(l for l in body.splitlines() if not l.lstrip().startswith(("#", "{%", "{{", ">", "|")))
t = re.search(r"texel", body, re.I)
b = min((m.start() for m in [re.search(w, body) for w in ("KTX2", "ETC1S", "UASTC", "Basis")] if m), default=None)
assert t, "texel never appears in prose"
assert b is None or t.start() < b, "a format name appears in prose before texel (D22)"
print("D22 order ok")
PY
wf_build x13
HTML="$SITE/lessons/en/feii/3d-terminology/index.html"
test -f "$HTML"
if rg -i "ahmes|deviac|evaluator_safe|BIBLIO-GAP|tuning_record|thessia" "$HTML"; then echo "REFUSED: internal metadata in built page" >&2; exit 1; fi
# every internal glossary link resolves (path and #anchor) in the built site
python3 - "$HTML" "$SITE" <<'PY'
import re, sys, os, html
page, site = sys.argv[1], sys.argv[2]
src = open(page).read()
main = src[src.find("<main"):src.rfind("</main>")] if "<main" in src else src
bad = []; n = 0
for href in set(re.findall(r'href="(/web-atelier-udit/lessons/[^"]+)"', main)):
    n += 1
    path, _, anchor = html.unescape(href).partition("#")
    rel = path[len("/web-atelier-udit/"):]
    f = os.path.join(site, rel, "index.html") if rel.endswith("/") or "." not in os.path.basename(rel) else os.path.join(site, rel)
    if not os.path.exists(f): bad.append(href + " (no page)"); continue
    if anchor and not re.search(r'id="%s"' % re.escape(anchor), open(f).read()): bad.append(href + " (no anchor)")
assert n >= 10, f"only {n} internal lesson links; glossary rows must link their defining sections"
assert not bad, "unresolved links: " + "; ".join(sorted(bad))
print(f"{n} internal links resolve")
PY
# closing checks still hold with the new page
bash "$CASCADE/PHASE-X11.exit-gate.sh"
bash "$CASCADE/PHASE-X12.exit-gate.sh"

echo "OK PHASE-X13.exit-gate.sh"
