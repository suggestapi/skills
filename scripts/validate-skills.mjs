#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(root, "skills");
let failed = 0;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed += 1;
}

function parseFrontmatter(text, skill) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    fail(`${skill}: missing YAML frontmatter`);
    return null;
  }
  const block = match[1];
  const name = block.match(/^name:\s*(.+)$/m)?.[1].trim();
  let description = "";
  const descLine = block.match(/^description:\s*(.*)$/m);
  if (!descLine) {
    fail(`${skill}: missing description`);
  } else if (descLine[1] === ">" || descLine[1] === "|") {
    const start = block.indexOf(descLine[0]) + descLine[0].length + 1;
    const rest = block.slice(start).split(/\n(?=[a-zA-Z0-9_-]+:)/)[0];
    description = rest
      .split("\n")
      .map((line) => line.replace(/^\s{2}/, "").trim())
      .filter(Boolean)
      .join(" ");
  } else {
    description = descLine[1].trim();
  }
  return { name, description, block, body: text.slice(match[0].length) };
}

const canonicalApi = readFileSync(join(root, "references/api.md"), "utf8");
const skills = readdirSync(skillsDir).filter((name) => existsSync(join(skillsDir, name, "SKILL.md")));

if (skills.length !== 8) fail(`expected 8 skills, found ${skills.length}`);

for (const skill of skills) {
  const skillFile = join(skillsDir, skill, "SKILL.md");
  const text = readFileSync(skillFile, "utf8");
  const fm = parseFrontmatter(text, skill);
  if (!fm) continue;

  if (fm.name !== skill) fail(`${skill}: name '${fm.name}' does not match directory`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.name || "")) fail(`${skill}: invalid name`);
  if (!fm.description || fm.description.length > 1024) {
    fail(`${skill}: description length ${fm.description?.length || 0}`);
  }
  if (!/use when|use for/i.test(fm.description || "")) {
    fail(`${skill}: description should include when to use the skill`);
  }
  if (text.includes("../../references/")) {
    fail(`${skill}: uses ../../references path; copy references into the skill`);
  }
  if (/references\/api\.md/.test(text) && !existsSync(join(skillsDir, skill, "references/api.md"))) {
    fail(`${skill}: SKILL.md references api.md but skills/${skill}/references/api.md is missing`);
  }
  const localApi = join(skillsDir, skill, "references/api.md");
  if (existsSync(localApi) && readFileSync(localApi, "utf8") !== canonicalApi) {
    fail(`${skill}: references/api.md is out of sync with repo references/api.md (run node scripts/sync-api-reference.mjs)`);
  }
}

function loadJsonl(file) {
  const path = join(root, file);
  if (!existsSync(path)) {
    fail(`missing ${file}`);
    return;
  }
  const lines = readFileSync(path, "utf8").split("\n").filter(Boolean);
  for (const [i, line] of lines.entries()) {
    try {
      const row = JSON.parse(line);
      if (!row.prompt || !Array.isArray(row.expected)) fail(`${file}:${i + 1} needs prompt and expected[]`);
    } catch {
      fail(`${file}:${i + 1} invalid JSON`);
    }
  }
}

loadJsonl("evals/routing/positive.jsonl");
loadJsonl("evals/routing/negative.jsonl");
loadJsonl("evals/routing/collision.jsonl");

if (failed) {
  console.error(`\n${failed} validation error(s)`);
  process.exit(1);
}
console.log(`OK: ${skills.length} skills and routing evals validated`);
