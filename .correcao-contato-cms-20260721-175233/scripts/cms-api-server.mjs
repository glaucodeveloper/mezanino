import http from "node:http";

const host = process.env.CMS_HOST || "127.0.0.1";
const port = Number(process.env.CMS_PORT || 8787);
const token = process.env.GITHUB_TOKEN || "";
const [repoOwner, repoName] = String(
  process.env.GITHUB_REPOSITORY || "glaucodeveloper/mezanino-imobiliaria-cms",
).split("/");
const branch = process.env.GITHUB_BRANCH || "main";
const contentPath = process.env.GITHUB_CONTENT_PATH || "data/site.json";
const allowedOrigins = new Set(
  String(
    process.env.CMS_ALLOWED_ORIGINS ||
      "http://localhost:5500,http://127.0.0.1:5500",
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

if (!token) {
  console.error("Defina GITHUB_TOKEN em .env.cms antes de iniciar o servidor.");
  process.exit(1);
}

if (!repoOwner || !repoName) {
  console.error("GITHUB_REPOSITORY deve usar o formato owner/repo.");
  process.exit(1);
}

const responseOrigin = (request) => {
  const origin = request.headers.origin;
  if (!origin) return [...allowedOrigins][0] || "*";
  return allowedOrigins.has(origin) ? origin : null;
};

const sendJson = (response, status, data, origin) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  response.writeHead(status, headers);
  response.end(JSON.stringify(data));
};

const readJson = async (request, maxBytes = 8 * 1024 * 1024) => {
  const chunks = [];
  let total = 0;

  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxBytes) throw new Error("Payload excede o limite permitido.");
    chunks.push(chunk);
  }

  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
};

const removeCpfFields = (value) => {
  if (Array.isArray(value)) return value.map(removeCpfFields);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key.toLowerCase() !== "cpf")
      .map(([key, item]) => [key, removeCpfFields(item)]),
  );
};

const validateSnapshot = (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Snapshot inválido.");
  }
  if (!Array.isArray(payload.properties)) {
    throw new Error("properties deve ser um array.");
  }
  if (!Array.isArray(payload.brokers)) {
    throw new Error("brokers deve ser um array.");
  }
  if (!payload.dashboard || typeof payload.dashboard !== "object") {
    throw new Error("dashboard deve ser um objeto.");
  }
};

const githubHeaders = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "mezanino-imobiliaria-cms-local",
};

const encodedContentPath = contentPath
  .split("/")
  .map(encodeURIComponent)
  .join("/");

const saveSnapshot = async (rawPayload) => {
  const payload = removeCpfFields(rawPayload);
  validateSnapshot(payload);

  const apiUrl =
    `https://api.github.com/repos/${encodeURIComponent(repoOwner)}` +
    `/${encodeURIComponent(repoName)}/contents/${encodedContentPath}`;

  const currentResponse = await fetch(
    `${apiUrl}?ref=${encodeURIComponent(branch)}`,
    { headers: githubHeaders },
  );

  let sha;
  if (currentResponse.ok) {
    const currentFile = await currentResponse.json();
    sha = currentFile.sha;
  } else if (currentResponse.status !== 404) {
    const errorData = await currentResponse.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Não foi possível ler o CMS no GitHub (${currentResponse.status}).`,
    );
  }

  const content = Buffer.from(
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8",
  ).toString("base64");

  const body = {
    message: `Atualiza CMS imobiliário em ${new Date().toISOString()}`,
    content,
    branch,
  };
  if (sha) body.sha = sha;

  const updateResponse = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      ...githubHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!updateResponse.ok) {
    const errorData = await updateResponse.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Falha ao salvar o CMS no GitHub (${updateResponse.status}).`,
    );
  }

  return updateResponse.json();
};

const server = http.createServer(async (request, response) => {
  const origin = responseOrigin(request);

  if (request.headers.origin && !origin) {
    sendJson(response, 403, { error: "Origem não permitida." }, null);
    return;
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    });
    response.end();
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    sendJson(
      response,
      200,
      {
        ok: true,
        repository: `${repoOwner}/${repoName}`,
        path: contentPath,
      },
      origin,
    );
    return;
  }

  if (request.method !== "PUT" || request.url !== "/api/cms/snapshot") {
    sendJson(response, 404, { error: "Rota não encontrada." }, origin);
    return;
  }

  try {
    const payload = await readJson(request);
    const result = await saveSnapshot(payload);
    sendJson(
      response,
      200,
      {
        message: "CMS salvo no GitHub.",
        commit: result.commit?.sha || null,
      },
      origin,
    );
  } catch (error) {
    console.error(error);
    sendJson(
      response,
      500,
      { error: error instanceof Error ? error.message : String(error) },
      origin,
    );
  }
});

server.listen(port, host, () => {
  console.log(`CMS API ativa em http://${host}:${port}`);
  console.log(`Repositório: ${repoOwner}/${repoName}`);
  console.log(`Arquivo: ${contentPath}`);
});
