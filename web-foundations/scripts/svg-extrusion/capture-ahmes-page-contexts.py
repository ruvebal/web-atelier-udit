#!/usr/bin/env python3
"""Attach complete extracted page context and document identity to X0 anchors."""

import argparse
import hashlib
import json
import re
import sqlite3
from pathlib import Path


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--library-root", type=Path, required=True)
    parser.add_argument(
        "--anchors",
        type=Path,
        default=Path("frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X0/research-anchor-verification.json"),
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X0/research-anchor-page-contexts.json"),
    )
    parser.add_argument(
        "--membership-output",
        type=Path,
        default=Path("frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X0/research-authoritative-page-membership.json"),
    )
    args = parser.parse_args()

    anchors = json.loads(args.anchors.read_text())
    contexts = []
    authorities = []
    for source in anchors["sources"]:
        database = args.library_root / "scholar/documents" / source["databaseName"] / "extract/extraction.db"
        if not database.is_file():
            raise SystemExit(f"Missing extraction database for {source['key']}")
        connection = sqlite3.connect(f"file:{database}?mode=ro", uri=True)
        connection.row_factory = sqlite3.Row
        metadata = dict(connection.execute("SELECT key, value FROM metadata"))
        source_row = connection.execute(
            "SELECT file_name, file_hash, page_count, format FROM source LIMIT 1"
        ).fetchone()
        if source_row is None:
            raise SystemExit(f"No source identity in {source['key']} extraction database")
        all_nodes = connection.execute(
            "SELECT node_id FROM fission_node WHERE document_id=(SELECT document_id FROM source LIMIT 1) ORDER BY rowid"
        ).fetchall()
        spatial_rows = connection.execute(
            "SELECT n.node_id, s.page_index FROM fission_node n LEFT JOIN anchor_spatial s ON s.node_id=n.node_id WHERE n.document_id=(SELECT document_id FROM source LIMIT 1) ORDER BY n.rowid"
        ).fetchall()
        unassigned = [row["node_id"] for row in spatial_rows if row["page_index"] is None]
        if unassigned:
            raise SystemExit(f"{source['key']} has {len(unassigned)} page-unassigned fission nodes")
        pages = {}
        for row in spatial_rows:
            pages.setdefault(str(row["page_index"]), []).append(row["node_id"])
        authorities.append({
            "sourceKey": source["key"],
            "databaseName": source["databaseName"],
            "totalFissionNodeCount": len(all_nodes),
            "assignedNodeCount": len(spatial_rows),
            "unassignedNodeIds": unassigned,
            "pages": [{"pageIndexZeroBased": int(page), "nodeCount": len(ids), "nodeIds": ids} for page, ids in sorted(pages.items(), key=lambda item: int(item[0]))],
        })

        for anchor in source["nodes"]:
            page_match = re.search(r"page_index=(\d+)", anchor["citationResolution"])
            if not page_match:
                raise SystemExit(f"Missing page identity for {anchor['nodeId']}")
            page_index = int(page_match.group(1))
            page_nodes = connection.execute(
                """SELECT n.node_id, n.markdown_content, n.block_type, n.block_subtype,
                          s.page_index, s.x0, s.y0, s.x1, s.y1
                   FROM fission_node n JOIN anchor_spatial s ON s.node_id=n.node_id
                   WHERE n.document_id=(SELECT document_id FROM source LIMIT 1)
                     AND s.page_index=? ORDER BY n.rowid""",
                (page_index,),
            ).fetchall()
            member_ids = [row["node_id"] for row in page_nodes]
            if anchor["nodeId"] not in member_ids:
                raise SystemExit(f"Anchor {anchor['nodeId']} is absent from page {page_index}")
            page = {
                "pageIndexZeroBased": page_index,
                "printedPage": page_index + 1,
                "nodeCount": len(page_nodes),
                "nodes": [
                    {
                        "nodeId": row["node_id"],
                        "blockType": row["block_type"],
                        "blockSubtype": row["block_subtype"],
                        "bbox": [row["x0"], row["y0"], row["x1"], row["y1"]],
                        "text": row["markdown_content"],
                    }
                    for row in page_nodes
                ],
            }
            page_text = "\n".join(
                f"{row['node_id']}\n{row['markdown_content']}" for row in page_nodes
            ).encode("utf-8")
            contexts.append(
                {
                    "sourceKey": source["key"],
                    "databaseName": source["databaseName"],
                    "documentIdentity": {
                        "title": metadata.get("title"),
                        "authors": json.loads(metadata.get("authors", "[]")),
                        "year": metadata.get("year"),
                        "format": source_row["format"],
                        "pageCount": source_row["page_count"],
                        "originalFilename": source_row["file_name"],
                        "originalFileSha256": source_row["file_hash"],
                    },
                    "anchorNodeId": anchor["nodeId"],
                    "pageIdentity": {
                        "pageIndexZeroBased": page_index,
                        "citationResolution": anchor["citationResolution"],
                    },
                    "anchorIsPageMember": True,
                    "pageContext": page,
                    "pageContextTextSha256": sha256(page_text),
                    "evaluatorSafe": source["evaluatorSafe"],
                    "sourceOnlyGap": source["sourceOnlyGap"],
                }
            )
        connection.close()

    output = {
        "schema": "x0-ahmes-page-contexts/v1",
        "anchorCount": sum(len(source["nodes"]) for source in anchors["sources"]),
        "contextCount": len(contexts),
        "contexts": contexts,
        "validation": {
            "allAnchorsFoundOnRecordedPage": all(item["anchorIsPageMember"] for item in contexts),
            "allContextsHavePageIdentityAndHash": all(
                item["pageIdentity"]["pageIndexZeroBased"] == item["pageContext"]["pageIndexZeroBased"]
                and len(item["pageContextTextSha256"]) == 64
                for item in contexts
            ),
            "unsafeAcMSourceRemainsSourceOnly": all(
                item["sourceOnlyGap"] and not item["evaluatorSafe"]
                for item in contexts
                if item["sourceKey"] == "acm_cs2023"
            ),
        },
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n")
    membership = {"schema": "x0-authoritative-page-membership/v1", "sources": authorities}
    args.membership_output.write_text(json.dumps(membership, indent=2, ensure_ascii=False) + "\n")
    print(f"Captured complete page context for {len(contexts)} anchors across {len(anchors['sources'])} sources.")


if __name__ == "__main__":
    main()
