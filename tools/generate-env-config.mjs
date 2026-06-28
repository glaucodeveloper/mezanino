import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(rootDir, ".env");
const outputPath = resolve(rootDir, "env-config.js");

const parseEnv = (content) =>
  content.split(/\r?\n/).reduce((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return acc;
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) return acc;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    acc[key] = value;
    return acc;
  }, {});

const env = parseEnv(await readFile(envPath, "utf8"));

const config = {
  dataUrl: env.CMS_DATA_URL || "",
  githubToken: env.CMS_GITHUB_TOKEN || "",
  loginEmail: env.CMS_LOGIN_EMAIL || "admin@suaimobiliaria.com.br",
  loginPassword: env.CMS_LOGIN_PASSWORD || "",
  geminiApiKey: env.GEMINI_API_KEY || "",
  geminiTextModel: env.GEMINI_TEXT_MODEL || "gemini-2.5-flash",
  geminiTtsModel: env.GEMINI_TTS_MODEL || "gemini-2.5-flash-preview-tts",
  geminiTtsVoice: env.GEMINI_TTS_VOICE || "Kore",
};

await writeFile(
  outputPath,
  `window.SuaImobiliariaCmsConfig = ${JSON.stringify(config, null, 2)};\n`,
  "utf8",
);

console.log(`Arquivo gerado: ${outputPath}`);
