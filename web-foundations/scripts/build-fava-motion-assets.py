#!/usr/bin/env python3
"""Build ruvebal favicon Lottie, dotLottie, and Rive assets from the canonical SVG."""

from __future__ import annotations

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
TOKEN = re.compile(r"[A-Za-z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?")
NIGHT_PALETTE = {
    "1D4ED8": "93C5FD",
    "9373DD": "C4B5FD",
    "00295E": "C9C932",
    "93C5FD": "FFFFFF",
    "C9C932": "FDE68A",
}


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
    print(f"Built {len(paths)} ruvebal favicon facets: Lottie JSON x2, dotLottie v2 package, Rive RML source")


if __name__ == "__main__":
    main()
