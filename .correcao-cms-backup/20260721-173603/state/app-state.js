"use strict";
"use strict";
const ROUTES = [
  "home",
  "imoveis",
  "imovel",
  "imovel-novo",
  "imovel-editar",
  "anuncie",
  "login",
  "dashboard",
  "contato",
  "vendedores",
  "brokers",
  "sobre",
  "financiamento",
];
let properties = [
  {
    id: "alphaville",
    title: "Casa em Condominio Alphaville",
    type: "Casa a venda",
    kind: "Casa",
    city: "Alphaville, Camacari/BA",
    cityName: "Camacari",
    neighborhood: "Alphaville",
    price: "R$ 1.850.000",
    priceNumber: 1850000,
    bedrooms: 4,
    suites: 2,
    bathrooms: 5,
    parking: 4,
    area: 320,
    condominium: "R$ 780",
    iptu: "R$ 3.200/ano",
    meta: ["4 quartos", "5 banheiros", "4 vagas", "320m2"],
    tag: "Destaque",
    features: ["piscina", "condominio", "area gourmet"],
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82",
  },
  {
    id: "jardim-armacao",
    title: "Apartamento no Jardim Armacao",
    type: "Apartamento a venda",
    kind: "Apartamento",
    city: "Jardim Armacao, Salvador/BA",
    cityName: "Salvador",
    neighborhood: "Jardim Armacao",
    price: "R$ 650.000",
    priceNumber: 650000,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parking: 2,
    area: 98,
    condominium: "R$ 620",
    iptu: "R$ 1.400/ano",
    meta: ["3 quartos", "2 banheiros", "2 vagas", "98m2"],
    tag: "Com vista",
    features: ["vista mar", "varanda"],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=82",
  },
  {
    id: "vilarejo",
    title: "Casa no Vilarejo",
    type: "Casa a venda",
    kind: "Casa",
    city: "Vilarejo, Lauro de Freitas/BA",
    cityName: "Lauro de Freitas",
    neighborhood: "Vilarejo",
    price: "R$ 790.000",
    priceNumber: 790000,
    bedrooms: 3,
    suites: 1,
    bathrooms: 3,
    parking: 2,
    area: 180,
    condominium: "R$ 520",
    iptu: "R$ 1.900/ano",
    meta: ["3 quartos", "3 banheiros", "2 vagas", "180m2"],
    tag: "Novo",
    features: ["area gourmet", "condominio"],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82",
  },
  {
    id: "busca-vida",
    title: "Terreno em Busca Vida",
    type: "Terreno a venda",
    kind: "Terreno",
    city: "Busca Vida, Camacari/BA",
    cityName: "Camacari",
    neighborhood: "Busca Vida",
    price: "R$ 470.000",
    priceNumber: 470000,
    bedrooms: 0,
    suites: 0,
    bathrooms: 0,
    parking: 0,
    area: 450,
    condominium: "R$ 410",
    iptu: "R$ 900/ano",
    meta: ["450m2", "lote plano", "condominio"],
    tag: "Oportunidade",
    features: ["praia", "condominio"],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=82",
  },
  {
    id: "cobertura-barra",
    title: "Cobertura Vista Mar na Barra",
    type: "Cobertura a venda",
    kind: "Cobertura",
    city: "Barra, Salvador/BA",
    cityName: "Salvador",
    neighborhood: "Barra",
    price: "R$ 1.250.000",
    priceNumber: 1250000,
    bedrooms: 4,
    suites: 2,
    bathrooms: 4,
    parking: 3,
    area: 210,
    condominium: "R$ 1.200",
    iptu: "R$ 2.700/ano",
    meta: ["4 quartos", "4 banheiros", "3 vagas", "210m2"],
    tag: "Vista mar",
    features: ["vista mar", "area gourmet"],
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=82",
  },
  {
    id: "studio-caminho",
    title: "Studio no Caminho das Arvores",
    type: "Apartamento a venda",
    kind: "Apartamento",
    city: "Caminho das Arvores, Salvador/BA",
    cityName: "Salvador",
    neighborhood: "Caminho das Arvores",
    price: "R$ 420.000",
    priceNumber: 420000,
    bedrooms: 1,
    suites: 0,
    bathrooms: 1,
    parking: 1,
    area: 48,
    condominium: "R$ 490",
    iptu: "R$ 780/ano",
    meta: ["1 quarto", "1 banheiro", "1 vaga", "48m2"],
    tag: "Compacto",
    features: ["comercial"],
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=82",
  },
  {
    id: "sala-comercial-pituba",
    title: "Sala Comercial na Pituba",
    type: "Sala comercial a venda",
    kind: "Sala comercial",
    city: "Pituba, Salvador/BA",
    cityName: "Salvador",
    neighborhood: "Pituba",
    price: "R$ 350.000",
    priceNumber: 350000,
    bedrooms: 0,
    suites: 0,
    bathrooms: 1,
    parking: 1,
    area: 62,
    condominium: "R$ 680",
    iptu: "R$ 1.100/ano",
    meta: ["62m2", "1 banheiro", "1 vaga", "empresarial"],
    tag: "Comercial",
    features: ["comercial"],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=82",
  },
  {
    id: "terreno-jaua",
    title: "Terreno em Jaua",
    type: "Terreno a venda",
    kind: "Terreno",
    city: "Jaua, Camacari/BA",
    cityName: "Camacari",
    neighborhood: "Jaua",
    price: "R$ 290.000",
    priceNumber: 290000,
    bedrooms: 0,
    suites: 0,
    bathrooms: 0,
    parking: 0,
    area: 600,
    condominium: "R$ 0",
    iptu: "R$ 650/ano",
    meta: ["600m2", "lote plano", "perto da praia"],
    tag: "Praia",
    features: ["praia"],
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
  },
];

let brokers = [
  {
    name: "Joao Almeida",
    phone: "(71) 99999-0001",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=80",
    creci: "CRECI 12345",
  },
  {
    name: "Mariana Santos",
    phone: "(71) 99999-0002",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
    creci: "CRECI 22334",
  },
  {
    name: "Carlos Mendes",
    phone: "(71) 99999-0003",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    creci: "CRECI 33445",
  },
  {
    name: "Juliana Oliveira",
    phone: "(71) 99999-0004",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    creci: "CRECI 44556",
  },
];

let dashboardContent = {
  about: {
    historia: {
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      detail:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=82",
    },
    missao: {
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id nibh ut turpis interdum tincidunt nec sit amet mauris. Cras convallis purus non sapien malesuada, vel vestibulum odio iaculis.",
      detail:
        "Nulla facilisi. Morbi sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870740d34b0?auto=format&fit=crop&w=1100&q=82",
    },
    diferenciais: [
      {
        title: "CRECI ativo",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
      },
      {
        title: "Consultoria fiscal",
        desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      },
      {
        title: "Curadoria de portf\u00f3lio",
        desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
      },
      {
        title: "Atendimento exclusivo",
        desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
      },
      {
        title: "Cobertura metropolitana",
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      },
      {
        title: "P\u00f3s-venda",
        desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
    ],
  },
  metrics: [
    { label: "Total de imoveis", value: "56" },
    { label: "Imoveis ativos", value: "42", color: "#1f9b61" },
    { label: "Leads", value: "128" },
    { label: "Visitas este mes", value: "1.245" },
  ],
  activities: [
    {
      icon: "L",
      title: "Novo lead recebido",
      detail: "Apartamento no Jardim Armacao",
      time: "Hoje, 10:23",
      color: "var(--gold)",
      properties: ["jardim-armacao"],
      brokers: ["joao-almeida"],
      clients: ["lucas-andrade"],
    },
    {
      icon: "A",
      title: "Agendamento confirmado",
      detail: "Visita - Casa no Vilarejo",
      time: "Hoje, 09:15",
      color: "#24a45a",
      properties: ["vilarejo"],
      brokers: ["mariana-santos"],
      clients: ["patricia-souza"],
    },
    {
      icon: "I",
      title: "Novo imovel publicado",
      detail: "Casa em Alphaville",
      time: "Ontem",
      color: "#d48a1d",
      properties: ["alphaville"],
      brokers: ["joao-almeida"],
      clients: [],
    },
    {
      icon: "P",
      title: "Proposta enviada",
      detail: "Cobertura Vista Mar na Barra",
      time: "Ontem",
      color: "var(--gold)",
      properties: ["cobertura-barra"],
      brokers: ["carlos-mendes"],
      clients: ["eduardo-nunes"],
    },
  ],
  leads: [
    {
      name: "Lucas Andrade",
      source: "Home",
      interest: "Casa em Condominio Alphaville",
      stage: "novo",
    },
    {
      name: "Patricia Souza",
      source: "WhatsApp",
      interest: "Apartamento no Jardim Armacao",
      stage: "visita agendada",
    },
    {
      name: "Rafael Lima",
      source: "Anuncie",
      interest: "Casa no Vilarejo",
      stage: "qualificando",
    },
  ],
  clients: [
    {
      id: "lucas-andrade",
      name: "Lucas Andrade",
      profile: "Comprador",
      focus: "Casa em Alphaville",
      owner: "Joao Almeida",
      phone: "(71) 99999-0005",
    },
    {
      id: "patricia-souza",
      name: "Patricia Souza",
      profile: "Compradora",
      focus: "Apartamento no Jardim Armacao",
      owner: "Mariana Santos",
      phone: "(71) 99999-0006",
    },
    {
      id: "rafael-lima",
      name: "Rafael Lima",
      profile: "Investidor",
      focus: "Terrenos em Camacari",
      owner: "Carlos Mendes",
      phone: "(71) 99999-0007",
    },
    {
      id: "eduardo-nunes",
      name: "Eduardo Nunes",
      profile: "Investidor",
      focus: "Acima de R$ 1,2 mi",
      owner: "Carlos Mendes",
      phone: "(71) 99999-0008",
    },
  ],
  appointments: [
    {
      id: "apt-1",
      date: "22/06 - 09:30",
      time: "09:30",
      status: "confirmado",
      notes: "Primeira visita ao imovel.",
      properties: ["alphaville"],
      clients: ["lucas-andrade"],
      brokers: ["joao-almeida"],
    },
    {
      id: "apt-2",
      date: "22/06 - 14:00",
      time: "14:00",
      status: "confirmado",
      notes: "Segunda visita com familia.",
      properties: ["jardim-armacao"],
      clients: ["patricia-souza"],
      brokers: ["mariana-santos"],
    },
    {
      id: "apt-3",
      date: "23/06 - 10:00",
      time: "10:00",
      status: "pendente",
      notes: "Verificar terreno na praia.",
      properties: ["busca-vida"],
      clients: ["rafael-lima"],
      brokers: ["carlos-mendes"],
    },
  ],
  reports: [
    {
      title: "Conversao de leads",
      value: "18%",
      note: "Alta de 3 pontos na semana",
    },
    {
      title: "Tempo medio ate visita",
      value: "2,4 dias",
      note: "Melhor janela em 30 dias",
    },
  ],
  settings: [
    { label: "Aprovacao manual de novos anuncios", value: "Ativada" },
    { label: "Aviso de lead quente por e-mail", value: "Ativado" },
  ],
  editions: {
    hero: {
      title: "Bem-vindo a Mezanino Imobiliaria",
      subtitle:
        "Encontre o imovel dos seus sonhos com quem entende do mercado.",
      image: "",
    },
    featured: {
      title: "Imoveis em destaque",
      copy: "Selecao curada de propriedades premium nos melhores bairros da regiao metropolitana.",
      image: "",
    },
    about: {
      title: "Sobre nos",
      copy: "Conheca a equipe e a historia que transforma negocios imobiliarios em relacoes duradouras.",
      image: "",
    },
    contact: {
      title: "Fale conosco",
      copy: "Entre em contato com nossa equipe para agendar visitas ou tirar duvidas.",
      image: "",
    },
  },
};

const cmsConfig = () => ({
  dataUrl: "./cms-imobiliaria/data/site.okf.json",
  apiBase: "",
  ...(window.SuaImobiliariaCmsConfig || {}),
});

const cmsApiUrl = (path) => `${cmsConfig().apiBase || ""}${path}`;

const authenticateCmsSession = async (email, password) => {
  const response = await fetch(cmsApiUrl("/api/auth/session"), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Nao foi possivel autenticar no servico do CMS.");
  }
  return data;
};

const closeCmsSession = async () => {
  await fetch(cmsApiUrl("/api/auth/logout"), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  }).catch(() => null);
};

const toOkfCmsPayload = (data = {}) => {
  if (data?.format === "okf" || data?.collections || data?.views) {
    return {
      format: "okf",
      okfVersion: data.okfVersion || "1.0",
      meta: {
        id: "mezanino-imobiliaria-cms",
        title: "Mezanino Imobiliaria CMS",
        sourceFile: "data/site.okf.json",
        ...(data.meta || {}),
        generatedAt: new Date().toISOString(),
      },
      collections: {
        properties: data?.collections?.properties || [],
        brokers: data?.collections?.brokers || [],
      },
      views: {
        dashboard: data?.views?.dashboard || {},
      },
    };
  }

  return {
    format: "okf",
    okfVersion: "1.0",
    meta: {
      id: "mezanino-imobiliaria-cms",
      title: "Mezanino Imobiliaria CMS",
      generatedAt: new Date().toISOString(),
      sourceFile: "data/site.okf.json",
    },
    collections: {
      properties: data.properties || [],
      brokers: data.brokers || [],
    },
    views: {
      dashboard: data.dashboard || {},
    },
  };
};

const applyCmsData = (data) => {
  const normalized = toOkfCmsPayload(data);
  const nextProperties = normalized.collections.properties;
  const nextBrokers = normalized.collections.brokers;
  const nextDashboard = normalized.views.dashboard;
  if (Array.isArray(nextProperties))
    properties = nextProperties.map((item, index) =>
      normalizeDashboardItem("properties", item, index),
    );
  if (Array.isArray(nextBrokers))
    brokers = nextBrokers;
  if (nextDashboard && typeof nextDashboard === "object")
    dashboardContent = normalizeDashboardContent({
      ...dashboardContent,
      ...nextDashboard,
    });
};

const loadCmsData = async () => {
  const config = cmsConfig();
  if (config?.dataUrl) {
    try {
      const response = await fetch(config.dataUrl, { cache: "no-store" });
      if (!response.ok)
        throw new Error(`Nao foi possivel carregar o CMS em ${config.dataUrl}`);
      applyCmsData(await response.json());
      window.SuaImobiliariaCmsState = { source: config.dataUrl };
      return;
    } catch (error) {
      console.warn("CMS remoto/local indisponivel; tentando snapshot de contingencia.", error);
    }
  }
  const cachedSnapshot = localStorage.getItem("suaimobiliaria:cmsSnapshot");
  if (!cachedSnapshot) throw new Error("Nenhum snapshot do CMS esta disponivel.");
  applyCmsData(JSON.parse(cachedSnapshot));
  window.SuaImobiliariaCmsState = { source: "localStorage-fallback" };
};

const saveCmsDataLocally = (payload, message = "Produto salvo localmente.") => {
  try {
    localStorage.setItem("suaimobiliaria:cmsSnapshot", JSON.stringify(payload));
  } catch (error) {
    console.warn("Nao foi possivel persistir snapshot local do CMS.", error);
  }
  window.SuaImobiliariaCmsState = { source: "localStorage" };
  return { savedTo: "local", message };
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () =>
      reject(reader.error || new Error("Nao foi possivel ler a imagem."));
    reader.readAsDataURL(file);
  });

const createCmsPayload = () => ({
  format: "okf",
  okfVersion: "1.0",
  meta: {
    id: "mezanino-imobiliaria-cms",
    title: "Mezanino Imobiliaria CMS",
    generatedAt: new Date().toISOString(),
    sourceFile: "data/site.okf.json",
  },
  collections: { properties, brokers },
  views: { dashboard: dashboardContent },
});

const saveCmsDataToGitHub = async (payload) => {
  const okfPayload = toOkfCmsPayload(payload || createCmsPayload());
  if (window.SuaImobiliariaCmsConfig?.dashboardAuditMode) {
    return saveCmsDataLocally(
      okfPayload,
      "Alterações salvas somente neste aparelho de auditoria.",
    );
  }
  const response = await fetch(cmsApiUrl("/api/cms/snapshot"), {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      snapshot: okfPayload,
      message: "update cms data from dashboard",
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Falha ao salvar no CMS (${response.status}).`);
  }
  localStorage.removeItem("suaimobiliaria:cmsSnapshot");
  window.SuaImobiliariaCmsState = { source: "github-file-service" };
  return data;
};

const parseRoute = () => {
  const hash = window.location.hash.replace(/^#/, "").trim();
  const [routePartWithId, queryPart = ""] = hash.split("?");
  const [routePart = "", hashPropertyId = ""] = routePartWithId.split("#");
  const route = ROUTES.includes(routePart) ? routePart : "home";
  const params = new URLSearchParams(queryPart);
  const queryPropertyId = params.get("propertyId") || null;
  const propertyId =
    route === "imovel" || route === "imovel-editar"
      ? hashPropertyId || queryPropertyId
      : queryPropertyId;
  return {
    route,
    propertyId,
    brokerId: params.get("brokerId") || null,
    dashboardTab: params.get("tab") || null,
    entityId: params.get("entityId") || null,
    operation: params.get("operation") || null,
  };
};
const brand = () => /*html*/ `<img class="brand" src="./logo_teste.png.png" alt="Mezanino"/> `;
const active = (currentRoute, route) =>
  currentRoute === route ? "active" : "";
const money = (value) => Number(value).toLocaleString("pt-BR");
const favoriteMark = (isFavorite) =>
  isFavorite
    ? /*html*/ `<span class="heart-icon" aria-hidden="true">&#10084;</span>`
    : /*html*/ `<span class="heart-icon" aria-hidden="true">&#9825;</span>`;
const routeAttrs = (visible) =>
  `aria-hidden="${visible ? "false" : "true"}" style="display:${visible ? "block" : "none"};"`;
const option = (value, selected, label = value) =>
  /*html*/ `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`;
const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const DASHBOARD_COLLECTION_SCHEMAS = {
  properties: {
    label: "Imoveis",
    title: "Imoveis cadastrados",
    description:
      "Edite a vitrine principal do site com criar, atualizar e remover imoveis.",
    itemLabel: "imovel",
    fields: [
      { name: "id", label: "ID", type: "text", placeholder: "alphaville" },
      {
        name: "title",
        label: "Titulo",
        type: "text",
        placeholder: "Casa em Alphaville",
      },
      {
        name: "type",
        label: "Tipo",
        type: "text",
        placeholder: "Casa a venda",
      },
      { name: "kind", label: "Categoria", type: "text", placeholder: "Casa" },
      {
        name: "city",
        label: "Cidade completa",
        type: "text",
        placeholder: "Alphaville, Camacari/BA",
      },
      {
        name: "cityName",
        label: "Cidade-base",
        type: "text",
        placeholder: "Camacari",
      },
      {
        name: "neighborhood",
        label: "Bairro",
        type: "text",
        placeholder: "Alphaville",
      },
      {
        name: "price",
        label: "Preco",
        type: "text",
        placeholder: "R$ 1.850.000",
      },
      {
        name: "priceNumber",
        label: "Preco numerico",
        type: "number",
        placeholder: "1850000",
      },
      { name: "bedrooms", label: "Quartos", type: "number", placeholder: "4" },
      { name: "suites", label: "Suites", type: "number", placeholder: "2" },
      {
        name: "bathrooms",
        label: "Banheiros",
        type: "number",
        placeholder: "5",
      },
      { name: "parking", label: "Vagas", type: "number", placeholder: "4" },
      { name: "area", label: "Area", type: "number", placeholder: "320" },
      {
        name: "condominium",
        label: "Condominio",
        type: "text",
        placeholder: "R$ 780",
      },
      {
        name: "iptu",
        label: "IPTU",
        type: "text",
        placeholder: "R$ 3.200/ano",
      },
      { name: "tag", label: "Etiqueta", type: "text", placeholder: "Destaque" },
      {
        name: "image",
        label: "Imagem",
        type: "text",
        placeholder: "https://...",
      },
      {
        name: "meta",
        label: "Metadados",
        type: "textarea",
        placeholder: "4 quartos, 5 banheiros, 4 vagas, 320m2",
      },
      {
        name: "features",
        label: "Caracteristicas",
        type: "textarea",
        placeholder: "piscina, condominio, area gourmet",
      },
    ],
  },
  metrics: {
    label: "Metricas",
    title: "Metricas do painel",
    description: "Atualize os indicadores exibidos na abertura do CRM.",
    itemLabel: "metrica",
    fields: [
      {
        name: "label",
        label: "Rotulo",
        type: "text",
        placeholder: "Total de imoveis",
      },
      { name: "value", label: "Valor", type: "text", placeholder: "56" },
      { name: "color", label: "Cor", type: "text", placeholder: "#1f9b61" },
    ],
  },
  activities: {
    label: "Atividades",
    title: "Atividades recentes",
    description: "Registre contatos, visitas e encaminhamentos da operação comercial.",
    itemLabel: "atividade",
    fields: [
      { name: "type", label: "Tipo", type: "text", placeholder: "Contato, visita, nota ou tarefa" },
      {
        name: "title",
        label: "Resumo",
        type: "text",
        placeholder: "Cliente confirmou interesse no imóvel",
      },
      {
        name: "detail",
        label: "Registro",
        type: "textarea",
        placeholder: "Contexto do contato, objeções e decisão tomada.",
      },
      {
        name: "time",
        label: "Data e horário",
        type: "text",
        placeholder: "Hoje, 10:23",
      },
      { name: "owner", label: "Responsável", type: "text", placeholder: "Nome do vendedor" },
      { name: "outcome", label: "Resultado", type: "text", placeholder: "Avançou, aguardando ou sem interesse" },
      { name: "nextAction", label: "Próximo passo", type: "text", placeholder: "Retomar contato em 2 dias" },
      { name: "properties", label: "Imóveis vinculados", type: "textarea", placeholder: "Um imóvel por linha ou separado por vírgula" },
      { name: "clients", label: "Clientes vinculados", type: "textarea", placeholder: "Um cliente por linha ou separado por vírgula" },
      { name: "brokers", label: "Vendedores vinculados", type: "textarea", placeholder: "Um vendedor por linha ou separado por vírgula" },
    ],
  },
  leads: {
    label: "Leads",
    title: "Pipeline de leads",
    description: "Edite origem, intencao, narrativa e proximo compromisso dos contatos.",
    itemLabel: "lead",
    fields: [
      {
        name: "name",
        label: "Nome",
        type: "text",
        placeholder: "Lucas Andrade",
      },
      {
        name: "source",
        label: "Origem",
        type: "text",
        placeholder: "WhatsApp",
      },
      {
        name: "interest",
        label: "Interesse",
        type: "text",
        placeholder: "Casa em Alphaville",
      },
      { name: "stage", label: "Etapa", type: "text", placeholder: "novo" },
      {
        name: "transaction",
        label: "Intencao",
        type: "text",
        placeholder: "compra, locacao ou captacao-venda",
      },
      {
        name: "propertyId",
        label: "Imovel",
        type: "text",
        placeholder: "codigo do imovel",
      },
      {
        name: "narrative",
        label: "Narrativa",
        type: "textarea",
        placeholder: "Momento, objetivo e contexto informado pelo lead",
      },
      {
        name: "nextAction",
        label: "Proximo compromisso",
        type: "textarea",
        placeholder: "Acao, responsavel e prazo",
      },
      {
        name: "consentStatus",
        label: "Privacidade",
        type: "text",
        placeholder: "Origem, finalidade e base a revisar",
      },
    ],
  },
  clients: {
    label: "Clientes",
    title: "Base de clientes",
    description: "Atualize o perfil, foco e responsavel por cada cliente.",
    itemLabel: "cliente",
    fields: [
      {
        name: "name",
        label: "Nome",
        type: "text",
        placeholder: "Mariana Costa",
      },
      {
        name: "cpf",
        label: "CPF",
        type: "text",
        placeholder: "000.000.000-00",
      },
      {
        name: "phone",
        label: "Telefone",
        type: "text",
        placeholder: "(77) 981590101",
      },
      {
        name: "email",
        label: "E-mail",
        type: "text",
        placeholder: "cliente@email.com",
      },
      {
        name: "profile",
        label: "Perfil",
        type: "text",
        placeholder: "Compradora",
      },
      {
        name: "focus",
        label: "Foco",
        type: "text",
        placeholder: "3 quartos em Salvador",
      },
      {
        name: "owner",
        label: "Responsavel",
        type: "text",
        placeholder: "Joao Almeida",
      },
      {
        name: "transaction",
        label: "Intencao",
        type: "text",
        placeholder: "compra, locacao ou captacao-venda",
      },
      {
        name: "narrative",
        label: "Narrativa",
        type: "textarea",
        placeholder: "Gatilho, objetivo, contexto e restricoes",
      },
      {
        name: "nextAction",
        label: "Proximo compromisso",
        type: "textarea",
        placeholder: "Acao, responsavel e prazo",
      },
    ],
  },
  deals: {
    label: "Negocios",
    title: "Negocios de clientes",
    description:
      "Relacione cliente, imovel, etapa, fatos, lacunas, riscos e proximo compromisso.",
    itemLabel: "negocio",
    fields: [
      { name: "clientId", label: "ID do cliente", type: "text", placeholder: "mariana-costa" },
      { name: "clientName", label: "Cliente", type: "text", placeholder: "Mariana Costa" },
      { name: "transaction", label: "Intencao", type: "text", placeholder: "compra" },
      { name: "role", label: "Papel", type: "text", placeholder: "compradora" },
      { name: "propertyIds", label: "Imoveis", type: "textarea", placeholder: "alphaville, jardim-armacao" },
      { name: "stage", label: "Etapa", type: "text", placeholder: "qualificacao" },
      { name: "status", label: "Saude", type: "text", placeholder: "atencao" },
      { name: "owner", label: "Responsavel", type: "text", placeholder: "Joao Almeida" },
      {
        name: "narrative",
        label: "Narrativa do negocio",
        type: "textarea",
        placeholder: "Momento do cliente e sentido deste negocio",
      },
      {
        name: "confirmedFacts",
        label: "Fatos confirmados",
        type: "textarea",
        placeholder: "Um fato por linha",
      },
      {
        name: "missingInfo",
        label: "Lacunas",
        type: "textarea",
        placeholder: "O que ainda precisa ser perguntado ou verificado",
      },
      { name: "objections", label: "Objecoes", type: "textarea", placeholder: "Uma por linha" },
      { name: "riskFlags", label: "Alertas", type: "textarea", placeholder: "Um alerta por linha" },
      {
        name: "legalChecklist",
        label: "Checklist de revisao",
        type: "textarea",
        placeholder: "Verificacoes humanas necessarias",
      },
      {
        name: "nextAction",
        label: "Proximo compromisso",
        type: "textarea",
        placeholder: "Acao concreta",
      },
      { name: "nextActionAt", label: "Prazo", type: "text", placeholder: "em 1 dia util" },
    ],
  },
  marketAnalyses: {
    label: "Mercado",
    title: "Analises de mercado",
    description:
      "Leituras datadas de Vitoria da Conquista com fonte, limitacoes e nivel de confianca.",
    itemLabel: "analise",
    fields: [
      { name: "title", label: "Titulo", type: "text", placeholder: "Candeias: venda e locacao" },
      { name: "geography", label: "Recorte", type: "text", placeholder: "Candeias, Vitoria da Conquista/BA" },
      { name: "transaction", label: "Transacao", type: "text", placeholder: "venda-e-locacao" },
      { name: "propertyType", label: "Tipologia", type: "text", placeholder: "apartamento" },
      { name: "observedAt", label: "Observado em", type: "text", placeholder: "2026-07-10" },
      { name: "sourceUrl", label: "Fonte", type: "text", placeholder: "https://..." },
      { name: "analysis", label: "Analise", type: "textarea", placeholder: "Leitura dos dados observados" },
      { name: "limitations", label: "Limitacoes", type: "textarea", placeholder: "O que estes dados nao demonstram" },
      { name: "confidence", label: "Confianca", type: "text", placeholder: "media" },
    ],
  },
  appointments: {
    label: "Agendamentos",
    title: "Agenda comercial",
    description:
      "Gerencie visitas e encontros da equipe comercial com imoveis, vendedores e clientes.",
    itemLabel: "agendamento",
    fields: [
      {
        name: "date",
        label: "Data",
        type: "text",
        placeholder: "19/06 - 09:30",
      },
      { name: "time", label: "Horario", type: "text", placeholder: "09:30" },
      {
        name: "status",
        label: "Status",
        type: "text",
        placeholder: "confirmado",
      },
      {
        name: "notes",
        label: "Observacoes",
        type: "textarea",
        placeholder: "Detalhes do agendamento...",
      },
    ],
  },
  reports: {
    label: "Relatorios",
    title: "Indicadores e leitura",
    description: "Edite os blocos analiticos usados no dashboard.",
    itemLabel: "relatorio",
    fields: [
      {
        name: "title",
        label: "Titulo",
        type: "text",
        placeholder: "Conversao de leads",
      },
      { name: "value", label: "Valor", type: "text", placeholder: "18%" },
      {
        name: "note",
        label: "Observacao",
        type: "text",
        placeholder: "Alta de 3 pontos na semana",
      },
    ],
  },
  settings: {
    label: "Configuracoes",
    title: "Configuracoes operacionais",
    description: "Ajuste os controles administrativos do painel.",
    itemLabel: "configuracao",
    fields: [
      {
        name: "label",
        label: "Rotulo",
        type: "text",
        placeholder: "Aprovacao manual de novos anuncios",
      },
      { name: "value", label: "Valor", type: "text", placeholder: "Ativada" },
    ],
  },
  about: {
    label: "Sobre nos",
    title: "Conteudo da pagina Sobre",
    description:
      "Edite os textos e imagens que aparecem na pagina Sobre nos do site.",
    itemLabel: "secao",
    fields: [],
  },
  editions: {
    label: "Edicoes do site",
    title: "Edicoes das sessoes",
    description:
      "Edite titulos, textos e imagens das sessoes do site diretamente no painel.",
    itemLabel: "edicao",
    fields: [],
  },
};
const DASHBOARD_EDITABLE_COLLECTIONS = new Set(
  Object.keys(DASHBOARD_COLLECTION_SCHEMAS),
);

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const ensureItemId = (collection, item, index = 0) =>
  item.id ||
  `${collection}-${index + 1}-${slugify(item.title || item.name || item.label || item.subject || item.date || "item") || "item"}`;
const normalizeDashboardItem = (collection, item, index = 0) => {
  const schema = DASHBOARD_COLLECTION_SCHEMAS[collection];
  const nextItem = { ...item, id: ensureItemId(collection, item, index) };
  if (schema) {
    for (const field of schema.fields) {
      if (field.type === "number") {
        const value = Number(nextItem[field.name]);
        nextItem[field.name] = Number.isFinite(value) ? value : 0;
      }
      if (field.type === "textarea") {
        const raw = nextItem[field.name];
        if (Array.isArray(raw)) nextItem[field.name] = raw.join(", ");
      }
    }
    if (collection === "properties") {
      nextItem.meta = Array.isArray(item.meta)
        ? item.meta
        : String(item.meta || "")
            .split(",")
            .map((entry) => entry.trim())
            .filter(Boolean);
      nextItem.features = Array.isArray(item.features)
        ? item.features
        : String(item.features || "")
            .split(",")
            .map((entry) => entry.trim())
            .filter(Boolean);
      nextItem.images = Array.isArray(item.images)
        ? item.images.filter(Boolean)
        : String(item.images || "")
            .split(",")
            .map((entry) => entry.trim())
            .filter(Boolean);
      if (!nextItem.image && nextItem.images.length)
        nextItem.image = nextItem.images[0];
      nextItem.priceNumber = Number.isFinite(Number(nextItem.priceNumber))
        ? Number(nextItem.priceNumber)
        : Number(String(nextItem.price || "").replace(/[^\d]/g, "")) || 0;
      nextItem.bedrooms = Number(nextItem.bedrooms) || 0;
      nextItem.suites = Number(nextItem.suites) || 0;
      nextItem.bathrooms = Number(nextItem.bathrooms) || 0;
      nextItem.parking = Number(nextItem.parking) || 0;
      nextItem.area = Number(nextItem.area) || 0;
    }
  }
  return nextItem;
};
const normalizeDashboardCollection = (collection, items = []) =>
  Array.isArray(items)
    ? items.map((item, index) =>
        normalizeDashboardItem(collection, item, index),
      )
    : [];
const normalizeDashboardContent = (content = {}) => ({
  ...content,
  about: content.about || {},
  editions: content.editions || {},
  metrics: normalizeDashboardCollection("metrics", content.metrics),
  activities: normalizeDashboardCollection("activities", content.activities),
  leads: normalizeDashboardCollection("leads", content.leads),
  clients: normalizeDashboardCollection("clients", content.clients),
  deals: normalizeDashboardCollection("deals", content.deals),
  marketAnalyses: normalizeDashboardCollection(
    "marketAnalyses",
    content.marketAnalyses,
  ),
  appointments: normalizeDashboardCollection(
    "appointments",
    content.appointments,
  ),
  reports: normalizeDashboardCollection("reports", content.reports),
  settings: normalizeDashboardCollection("settings", content.settings),
});
const readFieldValue = (item, field) => {
  const value = item?.[field.name];
  if (field.type === "textarea")
    return Array.isArray(value) ? value.join(", ") : (value ?? "");
  return value ?? "";
};
const parseFieldValue = (field, rawValue) => {
  const value = String(rawValue ?? "").trim();
  if (field.type === "number") return value === "" ? 0 : Number(value);
  if (field.type === "textarea")
    return value
      .split(/\r?\n|,/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  return value;
};
const buildDraftFromItem = (collection, item = {}) => {
  const schema = DASHBOARD_COLLECTION_SCHEMAS[collection];
  const draft = { id: item.id || "" };
  if (!schema) return draft;
  for (const field of schema.fields)
    draft[field.name] = readFieldValue(item, field);
  if (collection === "properties") {
    draft.images = Array.isArray(item.images)
      ? item.images.filter(Boolean)
      : String(item.images || "")
          .split(",")
          .map((entry) => entry.trim())
          .filter(Boolean);
    if (!draft.images.length && item.image) draft.images = [item.image];
    if (!draft.image && draft.images[0]) draft.image = draft.images[0];
  }
  return draft;
};
const summarizeItem = (collection, item, index = 0) => {
  if (collection === "properties") {
    return {
      title: item.title || item.id || `Imovel ${index + 1}`,
      detail: `${item.kind || item.type || "Imovel"} &middot; ${item.city || item.neighborhood || ""}`,
      value: `${item.price || "Sem preco"}${item.area ? ` &middot; ${item.area}m2` : ""}`,
      badge: item.tag || "Imovel",
      icon: item.kind ? item.kind.slice(0, 1).toUpperCase() : "P",
    };
  }
  if (collection === "metrics")
    return {
      title: item.label || `Metrica ${index + 1}`,
      detail: item.value || "",
      value: item.color || "",
      icon: (item.label || "M").slice(0, 1).toUpperCase(),
    };
  if (collection === "activities")
    return {
      title: item.title || `Atividade ${index + 1}`,
      detail: item.detail || "",
      value: item.time || "",
      icon: item.icon || "A",
    };
  if (collection === "leads")
    return {
      title: item.name || `Lead ${index + 1}`,
      detail: item.interest || "",
      value: item.source || "",
      icon: "L",
    };
  if (collection === "clients")
    return {
      title: item.name || `Cliente ${index + 1}`,
      detail: item.focus || "",
      value: item.profile || "",
      icon: "C",
    };
  if (collection === "deals")
    return {
      title: item.clientName || item.clientId || `Negocio ${index + 1}`,
      detail: item.narrative || item.nextAction || "",
      value: `${item.transaction || "negocio"} - ${item.stage || "sem etapa"}`,
      badge: item.status || "acompanhar",
      icon: "N",
    };
  if (collection === "marketAnalyses") {
    const metrics = item.metrics || {};
    const metricValue =
      metrics.averageAskPriceM2 ||
      metrics.averageAskSaleM2 ||
      metrics.averageMonthlyAskRentM2 ||
      metrics.averageAskPrice ||
      "";
    return {
      title: item.title || `Analise ${index + 1}`,
      detail: item.analysis || "",
      value: metricValue ? `Referencia: ${metricValue}` : item.geography || "",
      badge: item.observedAt || item.confidence || "mercado",
      icon: "M",
    };
  }
  if (collection === "appointments")
    return {
      title: item.date || `Agendamento ${index + 1}`,
      detail: Array.isArray(item.properties)
        ? item.properties.join(", ")
        : item.property || "",
      value: Array.isArray(item.clients)
        ? item.clients.join(", ")
        : item.client || "",
      icon: "A",
    };
  if (collection === "reports")
    return {
      title: item.title || `Relatorio ${index + 1}`,
      detail: item.note || "",
      value: item.value || "",
      icon: "R",
    };
  if (collection === "settings")
    return {
      title: item.label || `Configuracao ${index + 1}`,
      detail: item.value || "",
      value: "",
      icon: "S",
    };
  return {
    title: item.title || item.name || `Item ${index + 1}`,
    detail: item.detail || "",
    value: item.value || "",
    icon: "&#8226;",
  };
};
const collectionFormTitle = (collection, mode) =>
  `${mode === "edit" ? "Editar" : "Novo"} ${DASHBOARD_COLLECTION_SCHEMAS[collection]?.itemLabel || "item"}`;
const collectionEmptyItem = (collection) => buildDraftFromItem(collection, {});
const propertyDraftFrom = (property = null) =>
  property
    ? buildDraftFromItem("properties", property)
    : collectionEmptyItem("properties");

dashboardContent = normalizeDashboardContent(dashboardContent);

const propertyFeatures = (property) =>
  new Set(
    [
      property.tag,
      property.kind,
      ...(property.features || []),
      ...(property.meta || []),
    ]
      .filter(Boolean)
      .map((item) => String(item).toLowerCase()),
  );

let actionNotice = "";
const renderActionBanner = () =>
  actionNotice
    ? `<div class="action-banner" role="status">${escapeHtml(actionNotice)}</div>`
    : "";

// --- SISTEMA GLOBAL DE VALIDAÇÃO, INTEGRIDADE DE TIPOS E QUANTIDADES E ANTI-EXPLOITS ---
const FormValidator = {
  lastSubmissions: new Map(),

  /**
   * Valida se um CPF é matematicamente correto.
   */
  validateCPF(cpf) {
    const cleanCPF = String(cpf || "").replace(/[^\d]/g, "");
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i), 10) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10), 10)) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i), 10) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11), 10)) return false;

    return true;
  },

  /**
   * Valida se o formato do e-mail é válido.
   */
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === "string" && regex.test(email.trim()) && email.length <= 150;
  },

  /**
   * Valida o telefone (mínimo 10 dígitos numéricos).
   */
  validatePhone(phone) {
    const cleanPhone = String(phone || "").replace(/[^\d]/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  },

  /**
   * Valida nome completo (mínimo 3 caracteres, sem números/caracteres suspeitos de injeção).
   */
  validateName(name) {
    if (typeof name !== "string") return false;
    const trimmed = name.trim();
    if (trimmed.length < 3 || trimmed.length > 100) return false;
    // Permitir letras, espaços e acentos comuns
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'.~^-]+$/;
    return regex.test(trimmed);
  },

  /**
   * Valida limites e integridade de quantidades numéricas.
   */
  validateQuantity(value, min = 0, max = 1000000000, allowFloat = false) {
    const num = allowFloat ? parseFloat(value) : parseInt(value, 10);
    if (Number.isNaN(num)) return false;
    return num >= min && num <= max;
  },

  /**
   * Sanitiza strings de forma agressiva contra XSS, injeções de tags e buffers.
   */
  sanitizeString(key, val) {
    if (typeof val !== "string") return val;
    let maxLength = 150;
    if (["interest", "description", "notes", "profile", "narrative", "outcome", "nextAction", "msg", "text", "about"].includes(key)) {
      maxLength = 1500;
    }
    // Remove tags de script e seus conteúdos
    let sanitized = val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    // Remove qualquer outra tag HTML
    sanitized = sanitized.replace(/<[^>]*>/g, "");
    // Escapa aspas e barras para evitar quebras em atributos HTML
    sanitized = sanitized
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
    
    if (sanitized.length > maxLength) {
      sanitized = sanitized.substring(0, maxLength);
    }
    return sanitized;
  },

  /**
   * Mecanismo anti-spam / anti-double-click contra múltiplos envios rápidos de formulários.
   */
  antiSpamCheck(formKey, cooldownMs = 2000) {
    const now = Date.now();
    const lastTime = this.lastSubmissions.get(formKey) || 0;
    if (now - lastTime < cooldownMs) {
      console.warn(`Envio bloqueado por cooldown anti-spam (${formKey})`);
      return false; // Bloqueado
    }
    this.lastSubmissions.set(formKey, now);
    return true; // Permitido
  }
};
window.FormValidator = FormValidator;
