#!/usr/bin/env node
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "references/api.md");
const skillsDir = join(root, "skills");

const skip = new Set(["suggestapi"]);
for (const name of readdirSync(skillsDir)) {
  if (skip.has(name)) continue;
  const destDir = join(skillsDir, name, "references");
  mkdirSync(destDir, { recursive: true });
  copyFileSync(src, join(destDir, "api.md"));
  console.log(`copied references/api.md -> skills/${name}/references/api.md`);
}
