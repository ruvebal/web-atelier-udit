#!/usr/bin/env python3
"""Verify X0 page contexts against the live read-only Ahmes extraction stores."""

import argparse
import json
import sqlite3
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--library-root", type=Path, required=True)
    parser.add_argument("--anchors", type=Path, required=True)
    parser.add_argument("--contexts", type=Path, required=True)
    parser.add_argument("--membership", type=Path, required=True)
    args = parser.parse_args()

    anchors = json.loads(args.anchors.read_text())
    contexts = json.loads(args.contexts.read_text())
    membership = json.loads(args.membership.read_text())
    context_by_anchor = {item["anchorNodeId"]: item for item in contexts["contexts"]}
    authority_by_source = {item["sourceKey"]: item for item in membership["sources"]}

    for source in anchors["sources"]:
        database = args.library_root / "scholar/documents" / source["databaseName"] / "extract/extraction.db"
        if not database.is_file():
            raise SystemExit(f"missing live extraction database: {database}")
        connection = sqlite3.connect(f"file:{database}?mode=ro", uri=True)
        connection.row_factory = sqlite3.Row
        rows = connection.execute(
            """SELECT n.node_id, s.page_index
               FROM fission_node n LEFT JOIN anchor_spatial s ON s.node_id=n.node_id
               WHERE n.document_id=(SELECT document_id FROM source LIMIT 1)
               ORDER BY n.rowid"""
        ).fetchall()
        if any(row["page_index"] is None for row in rows):
            raise SystemExit(f"{source['key']}: live store contains page-unassigned nodes")
        live_pages: dict[int, list[str]] = {}
        for row in rows:
            live_pages.setdefault(int(row["page_index"]), []).append(row["node_id"])

        authority = authority_by_source.get(source["key"])
        if authority is None:
            raise SystemExit(f"{source['key']}: authority manifest entry absent")
        manifest_pages = {
            int(page["pageIndexZeroBased"]): page["nodeIds"] for page in authority["pages"]
        }
        if authority["totalFissionNodeCount"] != len(rows) or authority["assignedNodeCount"] != len(rows):
            raise SystemExit(f"{source['key']}: authority totals differ from live store")
        if authority["unassignedNodeIds"] or manifest_pages != live_pages:
            raise SystemExit(f"{source['key']}: authority membership differs from live store")

        for anchor in source["nodes"]:
            context = context_by_anchor.get(anchor["nodeId"])
            if context is None:
                raise SystemExit(f"{anchor['nodeId']}: context absent")
            page = int(context["pageContext"]["pageIndexZeroBased"])
            context_ids = [node["nodeId"] for node in context["pageContext"]["nodes"]]
            if context_ids != live_pages.get(page):
                raise SystemExit(f"{anchor['nodeId']}: context membership differs from live store")

        connection.close()

    print("PASS A7: contexts and authority match live Ahmes page membership")


if __name__ == "__main__":
    main()
