#!/usr/bin/env python3
"""Capture a deterministic SVG path inventory for the X0 baseline."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[3]
SVG_NS = "http://www.w3.org/2000/svg"
COMMAND = re.compile(r"[A-Za-z]")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--source", default="web-foundations/docs/assets/icons/fava-mark-static.svg"
    )
    parser.add_argument(
        "--output",
        default="frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X0/source-inventory.json",
    )
    args = parser.parse_args()
    source = (ROOT / args.source).resolve()
    output = (ROOT / args.output).resolve()
    root = ET.parse(source).getroot()
    paths = root.findall(f"{{{SVG_NS}}}path")
    facets = []
    supported = set("MLCZ")
    for index, element in enumerate(paths, start=1):
        data = element.get("d", "")
        counts = Counter(COMMAND.findall(data))
        facets.append(
            {
                "id": f"facet-{index:02d}",
                "sourceOrdinal": index,
                "svgId": element.get("id"),
                "fill": element.get("fill"),
                "transform": element.get("transform"),
                "pathCommands": dict(sorted(counts.items())),
                "commandSequence": COMMAND.findall(data),
                "commandCount": sum(counts.values()),
                "numberTokenCount": len(
                    re.findall(r"[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?", data)
                ),
                "closed": bool(counts.get("Z")),
                "unsupportedCommands": sorted(set(counts) - supported),
            }
        )
    document = {
        "schema": "canonical-svg-path-inventory/v1",
        "capturedAtUtc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": str(source.relative_to(ROOT)),
        "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "viewBox": root.get("viewBox"),
        "width": root.get("width"),
        "height": root.get("height"),
        "observedFacetCount": len(paths),
        "expectedCanonicalFixtureFacetCount": 13,
        "fixtureCountMatchesExpectation": len(paths) == 13,
        "architectureFacetCount": "N (runtime/compiler capacity is data-driven)",
        "pathCommandKinds": sorted(
            {command for facet in facets for command in facet["pathCommands"]}
        ),
        "facets": facets,
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(document, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps({"source": document["source"], "sha256": document["sourceSha256"], "facets": len(paths), "output": str(output.relative_to(ROOT))}, indent=2))
    return 0 if paths and not any(f["unsupportedCommands"] for f in facets) else 1


if __name__ == "__main__":
    raise SystemExit(main())
