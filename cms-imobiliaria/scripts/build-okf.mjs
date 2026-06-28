import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const cmsDir = resolve(scriptDir, "..");
const inputPath = resolve(cmsDir, "data", "site.json");
const outputPath = resolve(cmsDir, "data", "site.okf.json");
const bundleDir = resolve(cmsDir, "okf");

const raw = await readFile(inputPath, "utf8");
const site = JSON.parse(raw);

const yamlValue = (value) => {
  if (Array.isArray(value)) {
    return `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (value === undefined || value === null) {
    return '""';
  }
  return String(value);
};

const frontmatter = (fields) =>
  `---\n${Object.entries(fields)
    .map(([key, value]) => `${key}: ${yamlValue(value)}`)
    .join("\n")}\n---`;

const conceptFile = ({ type, title, description, tags, body, timestamp }) =>
  `${frontmatter({
    type,
    title,
    description,
    tags,
    timestamp
  })}\n\n# ${title}\n\n${body}\n`;

const jsonBlock = (value) => `\`\`\`json okf-profile\n${JSON.stringify(value, null, 2)}\n\`\`\``;

const slugify = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";

const timestamp = new Date().toISOString();

const okf = {
  format: "okf",
  okfVersion: "1.0",
  meta: {
    id: "mezanino-imobiliaria-cms",
    title: "Mezanino Imobiliaria CMS",
    generatedAt: timestamp,
    sourceFile: "data/site.json"
  },
  collections: {
    properties: site.properties || [],
    brokers: site.brokers || []
  },
  views: {
    dashboard: site.dashboard || {}
  }
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(okf, null, 2)}\n`, "utf8");

await rm(bundleDir, { recursive: true, force: true });

const files = {
  "index.md": conceptFile({
    type: "catalog",
    title: "Mezanino Imobiliaria CMS",
    description: "Bundle OKF raiz do CMS imobiliario.",
    tags: ["cms", "real-estate", "okf"],
    timestamp,
    body: [
      "Bundle principal do projeto.",
      "",
      "## Navegacao",
      "- [Catalogo](./catalog/index.md)",
      "- [Views](./views/index.md)"
    ].join("\n")
  }),
  "catalog/index.md": conceptFile({
    type: "collection-index",
    title: "Catalogo",
    description: "Colecoes principais do CRM imobiliario.",
    tags: ["catalog"],
    timestamp,
    body: [
      "## Colecoes",
      "- [Imoveis](./properties/index.md)",
      "- [Corretores](./brokers/index.md)"
    ].join("\n")
  }),
  "catalog/properties/index.md": conceptFile({
    type: "collection-index",
    title: "Imoveis",
    description: "Inventario de imoveis.",
    tags: ["properties"],
    timestamp,
    body: (site.properties || [])
      .map((property) => `- [${property.title}](./${property.id}.md)`)
      .join("\n")
  }),
  "catalog/brokers/index.md": conceptFile({
    type: "collection-index",
    title: "Corretores",
    description: "Diretorio de corretores.",
    tags: ["brokers"],
    timestamp,
    body: (site.brokers || [])
      .map((broker) => `- [${broker.name}](./${slugify(broker.name)}.md)`)
      .join("\n")
  }),
  "views/index.md": conceptFile({
    type: "view-index",
    title: "Views",
    description: "Views consumidas pelo site e pelo app mobile.",
    tags: ["views"],
    timestamp,
    body: "- [Dashboard](./dashboard.md)"
  }),
  "views/dashboard.md": conceptFile({
    type: "dashboard-view",
    title: "Dashboard",
    description: "Dados agregados do dashboard.",
    tags: ["dashboard", "crm"],
    timestamp,
    body: [
      "View agregada para o dashboard do site e do app.",
      "",
      jsonBlock(site.dashboard || {})
    ].join("\n")
  })
};

for (const property of site.properties || []) {
  files[`catalog/properties/${property.id}.md`] = conceptFile({
    type: "property",
    title: property.title,
    description: `${property.type || "Imovel"} em ${property.city || ""}`.trim(),
    tags: ["property", property.kind || "imovel", property.cityName || ""].filter(Boolean),
    timestamp,
    body: [
      `Preco de referencia: ${property.price || "-"}.`,
      "",
      jsonBlock(property)
    ].join("\n")
  });
}

for (const broker of site.brokers || []) {
  const id = slugify(broker.name);
  files[`catalog/brokers/${id}.md`] = conceptFile({
    type: "broker",
    title: broker.name,
    description: broker.creci || "Corretor imobiliario",
    tags: ["broker", "crm"],
    timestamp,
    body: jsonBlock({ id, ...broker })
  });
}

const manifest = {
  format: "okf-manifest",
  okfVersion: "0.1",
  generatedAt: timestamp,
  root: "index.md",
  entries: Object.keys(files)
};

files["manifest.json"] = `${JSON.stringify(manifest, null, 2)}\n`;

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = resolve(bundleDir, relativePath);
  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, content, "utf8");
}

console.log(`OKF snapshot gerado em ${outputPath}`);
console.log(`OKF bundle gerado em ${bundleDir}`);
