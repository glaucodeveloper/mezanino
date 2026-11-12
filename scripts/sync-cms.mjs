import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const baseDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(baseDir, "..");
const sourceCms = resolve(appDir, "..", "cms-imobiliaria");
const targetCms = resolve(appDir, "cms-imobiliaria");

await mkdir(resolve(targetCms, "data"), { recursive: true });
await copyFile(resolve(sourceCms, "data", "site.okf.json"), resolve(targetCms, "data", "site.okf.json"));
await copyFile(resolve(sourceCms, "data", "site.json"), resolve(targetCms, "data", "site.json"));
await rm(resolve(targetCms, "okf"), { recursive: true, force: true });
await cp(resolve(sourceCms, "okf"), resolve(targetCms, "okf"), { recursive: true });

console.log(`CMS sincronizado: ${sourceCms} -> ${targetCms}`);
