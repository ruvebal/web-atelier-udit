import fs from "node:fs";
import yaml from "yaml";
import fetch from "node-fetch";

const file = "2025-fall/students.yaml";
const text = fs.readFileSync(file, "utf-8");
const students = yaml.parse(text);
let failures = 0;

async function head(u) {
  try {
    const r = await fetch(u, { method: "HEAD", redirect: "follow" });
    return r.ok;
  } catch {
    return false;
  }
}

for (const s of students) {
  if (!s.url) continue;
  const ok = await head(s.url);
  console.log(`${ok ? "✔" : "✖"} ${s.handle || s.title} → ${s.url}`);
  if (!ok) failures++;
}

if (failures) {
  console.error(`Some URLs failed (${failures}). Please verify before merge.`);
  process.exit(1);
}
