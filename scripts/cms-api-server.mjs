import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectDir = process.cwd();
const envPath = path.join(projectDir, ".env.cms");

const loadEnvFile = (filename) => {
  if (!fs.existsSync(filename)) return;

  const source = fs.readFileSync(filename, "utf8");

  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) process.env[key] = value;
  }
};

loadEnvFile(envPath);

const port = Number(process.env.CMS_PORT || 8787);
const repository =
  process.env.GITHUB_REPOSITORY ||
  "glaucodeveloper/mezanino-imobiliaria-cms";
const branch = process.env.GITHUB_BRANCH || "main";
const contentPath = process.env.GITHUB_CONTENT_PATH || "data/site.json";
const token = process.env.GITHUB_TOKEN || "";
const configuredOrigins = String(
  process.env.CMS_ALLOWED_ORIGIN ||
    "http://localhost:5500,http://127.0.0.1:5500",
)
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

const sendJson = (response, status, payload, origin = "") => {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": origin || configuredOrigins[0] || "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    Vary: "Origin",
  });

  response.end(JSON.stringify(payload));
};

const resolveOrigin = (request) => {
  const origin = String(request.headers.origin || "");

  if (!origin) return configuredOrigins[0] || "*";
  if (configuredOrigins.includes("*")) return origin;
  if (configuredOrigins.includes(origin)) return origin;

  if (
    /^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(origin)
  ) {
    return origin;
  }

  return configuredOrigins[0] || "null";
};

const readJsonBody = async (request, limit = 15 * 1024 * 1024) => {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;

    if (size > limit) {
      const error = new Error("Payload acima do limite permitido.");
      error.statusCode = 413;
      throw error;
    }

    chunks.push(chunk);
  }

  const text = Buffer.concat(chunks).toString("utf8");

  if (!text.trim()) return {};

  try {
    return JSON.parse(text);
  } catch {
    const error = new Error("JSON inválido.");
    error.statusCode = 400;
    throw error;
  }
};

const githubHeaders = () => ({
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "mezanino-imobiliaria-cms-local-api",
});

const githubUrl = () =>
  `https://api.github.com/repos/${repository}/contents/${contentPath}`;

const getCurrentFile = async () => {
  const url = new URL(githubUrl());
  url.searchParams.set("ref", branch);

  const response = await fetch(url, {
    method: "GET",
    headers: githubHeaders(),
  });

  if (response.status === 404) return null;

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      payload?.message ||
        `GitHub respondeu ${response.status} ao consultar o arquivo.`,
    );
    error.statusCode = response.status;
    error.details = payload;
    throw error;
  }

  return payload;
};

const updateFile = async (snapshot) => {
  const current = await getCurrentFile();

  const requestBody = {
    message: `Atualiza CMS imobiliário em ${new Date().toISOString()}`,
    content: Buffer.from(
      `${JSON.stringify(snapshot, null, 2)}\n`,
      "utf8",
    ).toString("base64"),
    branch,
  };

  if (current?.sha) requestBody.sha = current.sha;

  const response = await fetch(githubUrl(), {
    method: "PUT",
    headers: {
      ...githubHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      payload?.message ||
        `GitHub respondeu ${response.status} ao salvar o CMS.`,
    );
    error.statusCode = response.status;
    error.details = payload;
    throw error;
  }

  return payload;
};

const server = http.createServer(async (request, response) => {
  const origin = resolveOrigin(request);
  const url = new URL(
    request.url || "/",
    `http://${request.headers.host || `127.0.0.1:${port}`}`,
  );

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    });
    response.end();
    return;
  }

  if (request.method === "GET" && url.pathname === "/health") {
    sendJson(
      response,
      200,
      {
        ok: true,
        tokenConfigured: Boolean(token),
        repository,
        branch,
        path: contentPath,
        port,
      },
      origin,
    );
    return;
  }

  if (
    request.method === "PUT" &&
    url.pathname === "/api/cms/snapshot"
  ) {
    if (!token) {
      sendJson(
        response,
        503,
        {
          ok: false,
          error: "GITHUB_TOKEN não configurado em .env.cms.",
        },
        origin,
      );
      return;
    }

    try {
      const snapshot = await readJsonBody(request);

      if (
        !snapshot ||
        typeof snapshot !== "object" ||
        Array.isArray(snapshot)
      ) {
        sendJson(
          response,
          400,
          {
            ok: false,
            error: "Snapshot inválido.",
          },
          origin,
        );
        return;
      }

      const result = await updateFile(snapshot);

      sendJson(
        response,
        200,
        {
          ok: true,
          message: "CMS salvo no GitHub.",
          commitSha: result?.commit?.sha || null,
          contentSha: result?.content?.sha || null,
        },
        origin,
      );
    } catch (error) {
      console.error(error);

      sendJson(
        response,
        Number(error.statusCode) || 500,
        {
          ok: false,
          error: error.message || "Falha ao salvar o CMS.",
          details: error.details || null,
        },
        origin,
      );
    }

    return;
  }

  sendJson(
    response,
    404,
    {
      ok: false,
      error: "Rota não encontrada.",
    },
    origin,
  );
});

server.listen(port, "127.0.0.1", () => {
  console.log(
    `CMS API ativa em http://127.0.0.1:${port}`,
  );
  console.log(`Repositório: ${repository}`);
  console.log(`Arquivo: ${contentPath}`);
  console.log(`Token configurado: ${token ? "sim" : "não"}`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
