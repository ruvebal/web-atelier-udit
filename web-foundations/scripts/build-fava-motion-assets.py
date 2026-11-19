#!/usr/bin/env python3
"""Build ruvebal favicon SVG, Lottie, dotLottie, Rive, and AnimaScript assets."""

from __future__ import annotations

import copy
import json
import math
import re
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/assets/icons/fava-mark-static.svg"
OUT = ROOT / "docs/assets/animations/fava"
RIVE_DIR = OUT / "rive"
SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
TOKEN = re.compile(r"[A-Za-z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?")
NIGHT_PALETTE = {
    "1D4ED8": "93C5FD",
    "9373DD": "C4B5FD",
    "00295E": "C9C932",
    "93C5FD": "FFFFFF",
    "C9C932": "FDE68A",
}

ET.register_namespace("", SVG_NS)
ET.register_namespace("xlink", XLINK_NS)


def parse_path(d: str) -> tuple[list[dict], bool]:
    tokens = TOKEN.findall(d)
    vertices: list[dict] = []
    current = (0.0, 0.0)
    start = current
    closed = False
    command = ""
    i = 0

    def pair() -> tuple[float, float]:
        nonlocal i
        value = (float(tokens[i]), float(tokens[i + 1]))
        i += 2
        return value

    while i < len(tokens):
        if tokens[i].isalpha():
            command = tokens[i]
            i += 1
        if command == "M":
            current = pair()
            start = current
            vertices.append({"p": current, "in": (0.0, 0.0), "out": (0.0, 0.0)})
            command = "L"  # SVG treats later coordinate pairs after M as L.
        elif command == "L":
            while i < len(tokens) and not tokens[i].isalpha():
                current = pair()
                vertices.append({"p": current, "in": (0.0, 0.0), "out": (0.0, 0.0)})
        elif command == "C":
            while i < len(tokens) and not tokens[i].isalpha():
                c1 = pair()
                c2 = pair()
                end = pair()
                vertices[-1]["out"] = (c1[0] - current[0], c1[1] - current[1])
                vertices.append({
                    "p": end,
                    "in": (c2[0] - end[0], c2[1] - end[1]),
                    "out": (0.0, 0.0),
                })
                current = end
        elif command == "Z":
            closed = True
            current = start
            command = ""
        else:
            raise ValueError(f"Unsupported SVG path command: {command!r}")
    if not vertices:
        raise ValueError("SVG path has no vertices")
    return vertices, closed


def mapped_point(point: tuple[float, float], scale_x: float, scale_y: float, centered: bool) -> tuple[float, float]:
    x, y = point[0] * scale_x, point[1] * scale_y
    if centered:
        x -= 512
        y -= 460
    return x, y


def lottie_keyframes(start: int, duration: int, start_value: list[float], peak_value: list[float] | None = None, settle_value: list[float] | None = None) -> list[dict]:
    peak = peak_value or start_value
    settle = settle_value or peak
    up = 7
    settle_frame = start + 16
    keyframes: list[dict] = []
    if start > 0:
        keyframes.append({"t": 0, "s": start_value, "h": 1})
        keyframes.append({"t": start, "s": start_value, "e": peak, "i": {"x": [0.72], "y": [1]}, "o": {"x": [0.22], "y": [0]}})
    else:
        keyframes.append({"t": 0, "s": start_value, "e": peak, "i": {"x": [0.72], "y": [1]}, "o": {"x": [0.22], "y": [0]}})
    if settle_value is not None:
        keyframes.append({"t": start + up, "s": peak, "e": settle, "i": {"x": [0.67], "y": [1]}, "o": {"x": [0.25], "y": [0]}})
        keyframes.append({"t": settle_frame, "s": settle, "h": 1})
        keyframes.append({"t": duration, "s": settle})
    else:
        keyframes.append({"t": start + up, "s": peak, "h": 1})
        keyframes.append({"t": duration, "s": peak})
    return keyframes


def lottie_path(path: dict, scale_x: float, scale_y: float) -> dict:
    vertices = path["vertices"]
    return {
        "i": [[v["in"][0] * scale_x, v["in"][1] * scale_y] for v in vertices],
        "o": [[v["out"][0] * scale_x, v["out"][1] * scale_y] for v in vertices],
        "v": [list(mapped_point(v["p"], scale_x, scale_y, True)) for v in vertices],
        "c": path["closed"],
    }


def rgb_floats(hex_color: str) -> list[float]:
    return [int(hex_color[i:i + 2], 16) / 255 for i in (0, 2, 4)] + [1]


def make_palette_svg(root: ET.Element) -> str:
    """Create the looping favicon/hero SVG from the canonical static paths."""
    animated = ET.Element(f"{{{SVG_NS}}}svg", root.attrib)
    style = ET.SubElement(animated, f"{{{SVG_NS}}}style")
    style.text = (
        "@keyframes fava-palette-cycle{0%,100%{fill:#1D4ED8}25%{fill:#9373DD}"
        "50%{fill:#C9C932}75%{fill:#00295E}}"
        "#fava-palette-loop path{animation:fava-palette-cycle 8s linear infinite}"
        "@media(prefers-reduced-motion:reduce){#fava-palette-loop path{animation:none}}"
    )
    group = ET.SubElement(animated, f"{{{SVG_NS}}}g", {"id": "fava-palette-loop"})
    source_paths = root.findall(f"{{{SVG_NS}}}path")
    delay_step = 8 / len(source_paths)
    for index, source_path in enumerate(source_paths):
        path = copy.deepcopy(source_path)
        path.set("style", f"animation-delay:-{index * delay_step:.3f}s")
        group.append(path)
    return '<?xml version="1.0" encoding="utf-8" ?>' + ET.tostring(animated, encoding="unicode") + "\n"


def make_lottie(paths: list[dict], scale_x: float, scale_y: float, night: bool = False) -> dict:
    duration = 84
    groups = []
    for source_index in reversed(range(len(paths))):
        path = paths[source_index]
        delay = source_index * 2
        color = path["color"]
        if night:
            color = NIGHT_PALETTE.get(color, color)
        shape = {
            "ty": "sh", "d": 1, "ks": {"a": 0, "k": lottie_path(path, scale_x, scale_y)},
            "nm": f"Facet {source_index + 1:02d} path", "mn": "ADBE Vector Shape - Group",
            "hd": False, "ix": 1,
        }
        fill = {
            "ty": "fl", "c": {"a": 0, "k": rgb_floats(color)}, "o": {"a": 0, "k": 100},
            "r": 1, "bm": 0, "nm": f"ruvebal {color}", "mn": "ADBE Vector Graphic - Fill",
            "hd": False, "ix": 2,
        }
        transform = {
            "ty": "tr", "a": {"a": 0, "k": [0, 0]}, "p": {"a": 0, "k": [0, 0]},
            "s": {"a": 1, "k": lottie_keyframes(delay, duration, [82, 82], [110, 110], [100, 100])},
            "r": {"a": 0, "k": 0},
            "o": {"a": 1, "k": lottie_keyframes(delay, duration, [0], [100])},
            "sk": {"a": 0, "k": 0}, "sa": {"a": 0, "k": 0},
            "nm": "Center pop and settle", "mn": "ADBE Vector Transform Group", "hd": False, "ix": 3,
        }
        groups.append({
            "ty": "gr", "it": [shape, fill, transform], "nm": f"Facet {source_index + 1:02d}",
            "np": 3, "cix": 2, "bm": 0, "ix": source_index + 1, "mn": "ADBE Vector Group", "hd": False,
        })
    return {
        "v": "5.12.2", "fr": 60, "ip": 0, "op": duration, "w": 1024, "h": 920,
        "nm": "ruvebal favicon · Facet bloom" if not night else "ruvebal favicon · Night palette",
        "ddd": 0, "assets": [],
        "layers": [{
            "ddd": 0, "ind": 1, "ty": 4, "nm": "ruvebal favicon colour facets", "sr": 1,
            "ks": {
                "o": {"a": 0, "k": 100}, "r": {"a": 0, "k": 0}, "p": {"a": 0, "k": [512, 460, 0]},
                "a": {"a": 0, "k": [0, 0, 0]}, "s": {"a": 0, "k": [100, 100, 100]},
            },
            "ao": 0, "shapes": groups, "ip": 0, "op": duration, "st": 0, "bm": 0,
        }],
        "markers": [], "fonts": {"list": []}, "chars": [],
    }


def fmt(value: float) -> str:
    return f"{value:.5f}".rstrip("0").rstrip(".") or "0"


def rive_vertex(vertex: dict, scale_x: float, scale_y: float) -> str:
    x, y = mapped_point(vertex["p"], scale_x, scale_y, False)
    incoming = (vertex["in"][0] * scale_x, vertex["in"][1] * scale_y)
    outgoing = (vertex["out"][0] * scale_x, vertex["out"][1] * scale_y)
    if math.hypot(*incoming) < 1e-5 and math.hypot(*outgoing) < 1e-5:
        return f'<StraightVertex x="{fmt(x)}" y="{fmt(y)}"/>'
    in_rotation = math.atan2(incoming[1], incoming[0]) if math.hypot(*incoming) else 0
    out_rotation = math.atan2(outgoing[1], outgoing[0]) if math.hypot(*outgoing) else 0
    return (
        f'<CubicDetachedVertex x="{fmt(x)}" y="{fmt(y)}" '
        f'inRotation="{fmt(in_rotation)}" inDistance="{fmt(math.hypot(*incoming))}" '
        f'outRotation="{fmt(out_rotation)}" outDistance="{fmt(math.hypot(*outgoing))}"/>'
    )


def animation_property(object_id: int, property_key: int, values: list[tuple[int, float]], final: float) -> str:
    frames = []
    for frame, value in values:
        mode = ' interpolationType="hold"' if frame == 0 else ' interpolationType="linear"'
        frames.append(f'<KeyFrameDouble value="{fmt(value)}" frame="{frame}"{mode}/>')
    frames.append(f'<KeyFrameDouble value="{fmt(final)}" frame="79" interpolationType="hold"/>')
    return f'<KeyedObject objectId="0:{object_id}"><KeyedProperty propertyKey="{property_key}">{"".join(frames)}</KeyedProperty></KeyedObject>'


def make_rive(paths: list[dict], scale_x: float, scale_y: float) -> str:
    shape_entries = []
    keyed_entries = []
    for source_index in reversed(range(len(paths))):
        path = paths[source_index]
        delay = source_index * 3
        shape_id = 100 + source_index
        rgb = path["color"]
        area = sum(
            path["vertices"][i]["p"][0] * path["vertices"][(i + 1) % len(path["vertices"])]["p"][1]
            - path["vertices"][(i + 1) % len(path["vertices"])]["p"][0] * path["vertices"][i]["p"][1]
            for i in range(len(path["vertices"]))
        )
        vertices = "".join(rive_vertex(vertex, scale_x, scale_y) for vertex in path["vertices"])
        shape_entries.append(
            f'<Shape x="0" y="0" opacity="0" name="Facet {source_index + 1:02d}" id="0:{shape_id}">'
            f'<PointsPath isClosed="{str(path["closed"]).lower()}" isClockwise="{str(area >= 0).lower()}" name="Contour">{vertices}</PointsPath>'
            f'<Fill name="ruvebal fill"><SolidColor colorValue="FF{rgb}" name="{rgb}"/></Fill></Shape>'
        )
        opacity_keys = [(0, 0.0)]
        if delay > 0:
            opacity_keys.append((delay, 0.0))
        opacity_keys.append((delay + 7, 1.0))
        keyed_entries.append(animation_property(shape_id, 18, opacity_keys, 1.0))

        scale_keys = [(0, 0.82)]
        if delay > 0:
            scale_keys.append((delay, 0.82))
        scale_keys.extend([(delay + 7, 1.1), (delay + 16, 1.0)])
        keyed_entries.append(animation_property(shape_id, 16, scale_keys, 1.0))
        keyed_entries.append(animation_property(shape_id, 17, scale_keys, 1.0))

    return (
        '<Rive version="1" kind="fragment">'
        '<Artboard defaultStateMachineId="0:7" width="1024" height="920" name="ruvebalFavicon" id="0:2">'
        '<StateMachine name="ruvebal favicon reveal machine" id="0:7"><StateMachineLayer name="Reveal" id="0:8">'
        '<EntryState><StateTransition stateToId="0:12"/></EntryState>'
        '<AnimationState x="180" y="0" animationId="0:6" id="0:12"/>'
        '</StateMachineLayer></StateMachine>'
        + "".join(shape_entries)
        + '<LinearAnimation fps="60" duration="80" loopValue="oneShot" name="ruvebal Favicon Reveal" id="0:6">'
        + "".join(keyed_entries)
        + '</LinearAnimation></Artboard></Rive>'
    )


def animascript_vector(point: tuple[float, float], scale_x: float, scale_y: float) -> str:
    x, y = mapped_point(point, scale_x, scale_y, False)
    return f"Vector.xy({fmt(x)}, {fmt(y)})"


def animascript_path(path: dict, index: int, scale_x: float, scale_y: float) -> str:
    vertices = path["vertices"]
    commands = [
        "  const path = new Path();",
        "  path.fillRule = FillRule.nonZero;",
        f"  path.moveTo({animascript_vector(vertices[0]['p'], scale_x, scale_y)});",
    ]
    for vertex_index in range(1, len(vertices)):
        previous = vertices[vertex_index - 1]
        current = vertices[vertex_index]
        if math.hypot(*previous["out"]) < 1e-5 and math.hypot(*current["in"]) < 1e-5:
            commands.append(f"  path.lineTo({animascript_vector(current['p'], scale_x, scale_y)});")
            continue
        control_out = (
            previous["p"][0] + previous["out"][0],
            previous["p"][1] + previous["out"][1],
        )
        control_in = (
            current["p"][0] + current["in"][0],
            current["p"][1] + current["in"][1],
        )
        commands.extend([
            "  path.cubicTo(",
            f"    {animascript_vector(control_out, scale_x, scale_y)},",
            f"    {animascript_vector(control_in, scale_x, scale_y)},",
            f"    {animascript_vector(current['p'], scale_x, scale_y)}",
            "  );",
        ])
    if path["closed"]:
        commands.append("  path.close();")
    commands.append("  return path;")
    return f"function facet{index + 1:02d}(): Path {{\n" + "\n".join(commands) + "\n}"


def make_animascript(paths: list[dict], scale_x: float, scale_y: float) -> str:
    path_functions = "\n\n".join(
        animascript_path(path, index, scale_x, scale_y)
        for index, path in enumerate(paths)
    )
    path_pushes = "\n".join(
        f"    this.paths.push(facet{index + 1:02d}());"
        for index in range(len(paths))
    )
    paint_pushes = "\n".join(
        f"    this.paints.push(makePaint(Color.rgb({int(path['color'][0:2], 16)}, "
        f"{int(path['color'][2:4], 16)}, {int(path['color'][4:6], 16)})));"
        for path in paths
    )
    interaction_palette = ["1D4ED8", "9373DD", "C9C932", "00295E", "93C5FD"]
    palette_pushes = "\n".join(
        f"    this.palette.push(Color.rgb({int(color[0:2], 16)}, "
        f"{int(color[2:4], 16)}, {int(color[4:6], 16)}));"
        for color in interaction_palette
    )
    palette_index = {color: index for index, color in enumerate(interaction_palette)}
    facet_palette_pushes = "\n".join(
        f"    this.facetPalette.push({palette_index[path['color']]});"
        for path in paths
    )
    return f'''// Generated from fava-mark-static.svg. Edit the SVG, then rebuild assets.
import {{ Layout, Context }} from "rive/host";
import {{ Renderer }} from "rive/renderer";
import {{ Paint }} from "rive/paint";
import {{ Path, FillRule }} from "rive/path";
import {{ Vector }} from "rive/vector";
import {{ Color }} from "rive/color";
import {{ Mat2D }} from "rive/mat2d";
import {{ PointerEvent }} from "rive/events";

function makePaint(color: Color): Paint {{
  const paint = new Paint();
  paint.color = color;
  return paint;
}}

{path_functions}

// A procedural Rive treatment: the canonical paths remain exact, while the
// script owns responsive fitting, time, per-facet scale, and opacity.
export class RuvebalFaviconPulse extends Layout {{
  paths: Array<Path> = new Array<Path>();
  paints: Array<Paint> = new Array<Paint>();
  palette: Array<Color> = new Array<Color>();
  facetPalette: Array<i32> = new Array<i32>();
  width: f64 = 1024;
  height: f64 = 920;
  elapsed: f64 = 0;
  swapElapsed: f64 = 2;
  pressElapsed: f64 = 2;
  fromShift: i32 = 0;
  toShift: i32 = 0;

  override init(context: Context): bool {{
{path_pushes}
{paint_pushes}
{palette_pushes}
{facet_palette_pushes}
    context.log("ruvebal favicon AnimaScript: {len(paths)} interactive facets ready");
    return true;
  }}

  override resize(width: f64, height: f64, scale: f64): void {{
    this.width = width;
    this.height = height;
  }}

  override advance(seconds: f64): bool {{
    this.elapsed = (this.elapsed + seconds) % 8.0;
    this.swapElapsed = Math.min(this.swapElapsed + seconds, 2.0);
    this.pressElapsed = Math.min(this.pressElapsed + seconds, 2.0);
    return true;
  }}

  // Press anywhere on the mark to rotate the palette. Facets cross-fade in
  // source order, so the interaction reads as a colour wave rather than a cut.
  override pointerDown(event: PointerEvent): void {{
    this.fromShift = this.toShift;
    this.toShift = (this.toShift + 1) % this.palette.length;
    this.swapElapsed = 0;
    this.pressElapsed = 0;
    event.hit();
  }}

  override pointerUp(event: PointerEvent): void {{
    event.hit();
  }}

  override draw(renderer: Renderer): void {{
    const fit: f64 = Math.min(this.width / 1024.0, this.height / 920.0);
    const offsetX: f64 = (this.width - 1024.0 * fit) / 2.0;
    const offsetY: f64 = (this.height - 920.0 * fit) / 2.0;

    for (let i = 0; i < this.paths.length; i++) {{
      const phase: f64 = this.elapsed * 1.65 - <f64>i * 0.34;
      const wave: f64 = 0.5 + 0.5 * Math.sin(phase);
      const colourDelay: f64 = <f64>i * 0.045;
      let colourMix: f64 = Math.min(Math.max((this.swapElapsed - colourDelay) / 0.34, 0), 1);
      colourMix = colourMix * colourMix * (3.0 - 2.0 * colourMix);
      const paletteBase: i32 = this.facetPalette[i];
      const fromColour = this.palette[(paletteBase + this.fromShift) % this.palette.length];
      const toColour = this.palette[(paletteBase + this.toShift) % this.palette.length];
      this.paints[i].color = Color.lerp(fromColour, toColour, <f32>colourMix);

      const burstAge: f64 = this.pressElapsed - <f64>i * 0.028;
      const burst: f64 = burstAge > 0 && burstAge < 0.58
        ? Math.sin((burstAge / 0.58) * 3.14159265) * 0.085
        : 0;
      const pulse: f64 = 0.965 + wave * 0.055 + burst;
      const matrix = Mat2D.values(
        <f32>(fit * pulse), 0, 0, <f32>(fit * pulse),
        <f32>(offsetX + 512.0 * fit * (1.0 - pulse)),
        <f32>(offsetY + 460.0 * fit * (1.0 - pulse))
      );

      renderer.save();
      renderer.transform(matrix);
      renderer.modulateOpacity(0.78 + wave * 0.22);
      renderer.drawPath(this.paths[i], this.paints[i]);
      renderer.restore();
    }}
  }}
}}
'''


def main() -> None:
    root = ET.parse(SOURCE).getroot()
    paths = []
    scale_x = scale_y = None
    for element in root.findall(f"{{{SVG_NS}}}path"):
        transform = element.get("transform", "")
        match = re.search(r"scale\(\s*([\d.]+)[,\s]+([\d.]+)\s*\)", transform)
        if not match:
            raise ValueError(f"Expected an explicit scale transform, got {transform!r}")
        sx, sy = map(float, match.groups())
        if scale_x is None:
            scale_x, scale_y = sx, sy
        elif (sx, sy) != (scale_x, scale_y):
            raise ValueError("ruvebal favicon facets use mismatched transforms")
        paths_raw, closed = parse_path(element.attrib["d"])
        color = element.attrib["fill"].lstrip("#").upper()
        paths.append({"vertices": paths_raw, "closed": closed, "color": color})

    OUT.mkdir(parents=True, exist_ok=True)
    RIVE_DIR.mkdir(parents=True, exist_ok=True)
    brand = make_lottie(paths, scale_x, scale_y)
    night = make_lottie(paths, scale_x, scale_y, night=True)
    (OUT / "fava-brand.json").write_text(json.dumps(brand, separators=(",", ":")) + "\n")
    (OUT / "fava-night.json").write_text(json.dumps(night, separators=(",", ":")) + "\n")

    palette_svg = make_palette_svg(root)
    for filename in ("fava-mark.svg", "favicon.svg"):
        (ROOT / "docs/assets/icons" / filename).write_text(palette_svg)

    manifest = {
        "version": "2",
        "generator": "ruvebal favicon lesson asset builder 1.1",
        "initial": {"animation": "fava-brand"},
        "animations": [{"id": "fava-brand"}, {"id": "fava-night"}],
    }
    with zipfile.ZipFile(OUT / "fava-showcase.lottie", "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        archive.writestr("manifest.json", json.dumps(manifest, separators=(",", ":")))
        archive.write(OUT / "fava-brand.json", "a/fava-brand.json")
        archive.write(OUT / "fava-night.json", "a/fava-night.json")

    (RIVE_DIR / "rive.yaml").write_text(
        "name: fava-motion\nmain: ruvebalFavicon\nlogs:\n  file: build/rive.log\n  problems: build/problems.log\n"
    )
    (RIVE_DIR / "scene.rml").write_text(make_rive(paths, scale_x, scale_y) + "\n")
    animascript_dir = RIVE_DIR / "animascript"
    animascript_dir.mkdir(parents=True, exist_ok=True)
    (animascript_dir / "rive.yaml").write_text(
        "name: ruvebal-favicon-animascript\n"
        "scripting: wasm\n"
        "artboard:\n  width: 1024\n  height: 920\n  background: \"#090B12\"\n"
        "logs:\n  file: build/rive.log\n  problems: build/problems.log\n"
    )
    (animascript_dir / "favicon-pulse.as").write_text(make_animascript(paths, scale_x, scale_y))
    print(
        f"Built {len(paths)} ruvebal favicon source paths: animated SVG x2, "
        "Lottie JSON x2, dotLottie v2 package, Rive RML + AnimaScript sources"
    )


if __name__ == "__main__":
    main()
