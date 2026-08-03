#!/usr/bin/env node
import fs from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const args = {
    source: "survey_processual_especifico.md",
    rootRef: process.env.PAGES_ROOT_REF || "site-root",
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

    if (current === "--root-ref" && next) {
      args.rootRef = next;
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
const markdown = await fs.readFile(sourcePath, "utf8");

const jsContent = [
  `window.MEZANINO_SURVEY_MARKDOWN_SOURCE = ${JSON.stringify(path.basename(sourcePath))};`,
  `window.MEZANINO_SURVEY_MARKDOWN = ${JSON.stringify(markdown)};`,
  "",
].join("\n");

await fs.writeFile(path.resolve(repoRoot, "survey-data.js"), jsContent, "utf8");

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });

const archiveFile = path.join(os.tmpdir(), `mezanino-pages-${Date.now()}.tar`);
const archiveResult = spawnSync("git", ["archive", "--format=tar", args.rootRef, "-o", archiveFile], {
  cwd: repoRoot,
  encoding: "utf8",
  maxBuffer: 1024 * 1024,
});

if (archiveResult.status !== 0) {
  throw new Error(
    `Falha ao montar o site raiz a partir de ${args.rootRef}: ${archiveResult.stderr || archiveResult.error?.message || "erro desconhecido"}`,
  );
}

const extractResult = spawnSync("tar", ["-xf", archiveFile, "-C", outputRoot], {
  cwd: repoRoot,
  encoding: "utf8",
  maxBuffer: 1024 * 1024,
});

if (extractResult.status !== 0) {
  throw new Error(`Falha ao extrair o site raiz: ${extractResult.stderr || extractResult.error?.message || "erro desconhecido"}`);
}

await fs.rm(archiveFile, { force: true });

const surveyDir = path.join(outputRoot, "survey");
await fs.mkdir(surveyDir, { recursive: true });
await fs.copyFile(path.resolve(repoRoot, "index.html"), path.join(surveyDir, "index.html"));
await fs.copyFile(path.resolve(repoRoot, "survey-data.js"), path.join(surveyDir, "survey-data.js"));

console.log(`survey-data.js gerado a partir de ${args.source}`);
console.log(`Pages preparado com raiz ${args.rootRef} e survey em /survey/`);
