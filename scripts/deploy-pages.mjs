import { execFileSync } from "node:child_process";

const repository = "glaucodeveloper/mezanino";
const workflow = "static.yml";
const credentialInput = "protocol=https\nhost=github.com\n\n";

let credentialOutput;
try {
  credentialOutput = execFileSync("git", ["credential", "fill"], {
    input: credentialInput,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "ignore"],
  });
} catch {
  console.error("Não foi possível obter a credencial GitHub pelo Git Credential Manager.");
  process.exit(1);
}

const credentials = Object.fromEntries(
  credentialOutput
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const separator = line.indexOf("=");
      return separator < 0 ? [line, ""] : [line.slice(0, separator), line.slice(separator + 1)];
    }),
);

if (!credentials.password) {
  console.error("Credencial GitHub ausente. Configure a autenticação Git antes do deploy.");
  process.exit(1);
}

const response = await fetch(
  `https://api.github.com/repos/${repository}/actions/workflows/${workflow}/dispatches`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.password}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref: "main" }),
  },
);

if (response.status !== 204) {
  const details = await response.text();
  console.error(`GitHub recusou o deploy (${response.status} ${response.statusText}): ${details}`);
  process.exit(1);
}

console.log(`Deploy do GitHub Pages iniciado pelo workflow ${workflow} em main.`);
