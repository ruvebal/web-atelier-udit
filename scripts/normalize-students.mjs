// Normalizes/validates 2025-fall/students.yaml and prints warnings.
// Does not rewrite file by default; adapt as needed.

import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

const file = "2025-fall/students.yaml";
if (!fs.existsSync(file)) {
  console.log("No students.yaml found, skipping.");
  process.exit(0);
}

const text = fs.readFileSync(file, "utf-8");
let data;
try {
  data = yaml.parse(text);
} catch (e) {
  console.error("YAML parse error:", e.message);
  process.exit(1);
}

if (!Array.isArray(data)) {
  console.error("students.yaml must be a top-level array of students.");
  process.exit(1);
}

let ok = true;
const required = ["handle", "title", "url"];
for (const [i, s] of data.entries()) {
  for (const k of required) {
    if (!s[k]) {
      ok = false;
      console.error(`Row ${i}: missing "${k}"`);
    }
  }
  if (s.url && !/^https?:\/\//.test(s.url)) {
    ok = false;
    console.error(`Row ${i}: url must start with http(s)://`);
  }
}
if (!ok) process.exit(1);
console.log(`students.yaml looks structurally OK (${data.length} entries).`);
