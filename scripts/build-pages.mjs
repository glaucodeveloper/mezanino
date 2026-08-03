#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const args = {
    source: "survey_revisado_conciso.md",
    branch: process.env.GITHUB_REF_NAME || "main",
    output: "dist",
  };

  for (let index = 2; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === "--source" && next) {
      args.source = next;
      index += 1;
      continue;
    }

    if (current === "--branch" && next) {
      args.branch = next;
      index += 1;
      continue;
    }

    if (current === "--output" && next) {
      args.output = next;
      index += 1;
    }
  }

  return args;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const args = parseArgs(process.argv);
const sourcePath = path.resolve(repoRoot, args.source);
const outputRoot = path.resolve(repoRoot, args.output);
const branchRoute = slugify(args.branch);
const markdown = await fs.readFile(sourcePath, "utf8");

const jsContent = [
  `window.MEZANINO_SURVEY_MARKDOWN_SOURCE = ${JSON.stringify(path.basename(sourcePath))};`,
  `window.MEZANINO_SURVEY_MARKDOWN = ${JSON.stringify(markdown)};`,
  "",
].join("\n");

await fs.writeFile(path.resolve(repoRoot, "survey-data.js"), jsContent, "utf8");

const branchDir = path.join(outputRoot, branchRoute);
await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(branchDir, { recursive: true });
await fs.copyFile(path.resolve(repoRoot, "index.html"), path.join(branchDir, "index.html"));
await fs.copyFile(path.resolve(repoRoot, "survey-data.js"), path.join(branchDir, "survey-data.js"));

const redirectHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=./${escapeHtml(branchRoute)}/" />
    <title>Mezanino CRM</title>
  </head>
  <body>
    <p>Redirecionando para <a href="./${escapeHtml(branchRoute)}/">./${escapeHtml(branchRoute)}/</a>.</p>
  </body>
</html>
`;

await fs.writeFile(path.join(outputRoot, "index.html"), redirectHtml, "utf8");

console.log(`survey-data.js gerado a partir de ${args.source}`);
console.log(`Pages preparado em ${path.relative(repoRoot, outputRoot)}/${branchRoute}/`);
