import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "www");
const entries = [
  "index.html",
  "styles.css",
  "tokens.css",
  "runtime-config.js",
  "wordmark.js",
  "wordmark.png",
  "logo.png",
  "logo.svg",
  "mezanino_imobiliaria_logo.svg",
  "mezanino_imobiliaria_logo_pathing.svg",
  "state",
  "components",
  "events"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(entries.map((entry) => cp(resolve(root, entry), resolve(output, entry), { recursive: true })));
const apiBase = String(process.env.MEZANINO_API_BASE_URL || "").replace(/\/$/, "");
const auditMode = process.env.MEZANINO_AUDIT_MODE === "true";
await writeFile(
  resolve(output, "runtime-config.js"),
  `window.MezaninoRuntimeConfig = ${JSON.stringify({ apiBase, auditMode })};\n`,
  "utf8"
);
console.log(`Web bundle preparado em ${output}`);
