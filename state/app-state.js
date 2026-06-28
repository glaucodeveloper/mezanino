"use strict";
"use strict";
const ROUTES = [
  "home",
  "destaques",
  "comprar",
  "imovel",
  "favoritos",
  "quiz",
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
const CMS_LOGIN_EMAIL =
  window.SuaImobiliariaCmsConfig?.loginEmail || "admin@suaimobiliaria.com.br";
const CMS_LOGIN_PASSWORD = window.SuaImobiliariaCmsConfig?.loginPassword || "";
const CMS_GITHUB_TOKEN = window.SuaImobiliariaCmsConfig?.githubToken || "";

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
  dataUrl: "./cms-imobiliaria/okf/manifest.json",
  repoOwner: "glaucodeveloper",
  repoName: "mezanino-imobiliaria-cms",
  branch: "main",
  contentPath: "okf/manifest.json",
  legacyDataUrl: "./cms-imobiliaria/data/site.json",
  legacyContentPath: "data/site.json",
  ...(window.SuaImobiliariaCmsConfig || {}),
});

const AI_TEXT_MODEL =
  window.SuaImobiliariaCmsConfig?.geminiTextModel || "gemini-2.5-flash";
const AI_TTS_MODEL =
  window.SuaImobiliariaCmsConfig?.geminiTtsModel ||
  "gemini-2.5-flash-preview-tts";
const AI_TTS_VOICE =
  window.SuaImobiliariaCmsConfig?.geminiTtsVoice || "Kore";
const VOICE_ASSETS_KEY = "suaimobiliaria:voiceAssets";

const parseYamlScalar = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) =>
        item.startsWith('"') && item.endsWith('"') ? item.slice(1, -1) : item,
      );
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
};

const parseFrontmatter = (markdown) => {
  const match = String(markdown || "").match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return match[1].split("\n").reduce((acc, line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return acc;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    acc[key] = parseYamlScalar(value);
    return acc;
  }, {});
};

const parseOkfJsonBlock = (markdown) => {
  const match = String(markdown || "").match(
    /```json okf-profile\n([\s\S]*?)\n```/,
  );
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    console.warn("Bloco JSON invalido em arquivo OKF.", error);
    return null;
  }
};

const extractCmsPayload = (data) => {
  if (data?.format === "okf" || data?.okfVersion || data?.collections || data?.views) {
    return {
      properties: data?.collections?.properties || [],
      brokers: data?.collections?.brokers || [],
      dashboard: data?.views?.dashboard || {},
    };
  }
  return data || {};
};

const buildOkfBundleFromCurrentState = () =>
  createOkfPayload({
    properties,
    brokers,
    dashboard: dashboardContent,
  });

const buildOkfContextSummary = ({
  propertyId = null,
  query = "",
  maxProperties = 6,
} = {}) => {
  const bundle = window.SuaImobiliariaOkfBundle || buildOkfBundleFromCurrentState();
  const payload = extractCmsPayload(bundle);
  const focusedProperty =
    payload.properties?.find((item) => item.id === propertyId) || null;
  const shortlist = focusedProperty
    ? [focusedProperty]
    : (payload.properties || []).slice(0, maxProperties);
  const brokerList = (payload.brokers || []).slice(0, 4);
  const leadList = (payload.dashboard?.leads || []).slice(0, 4);
  const activityList = (payload.dashboard?.activities || []).slice(0, 3);

  return [
    "Contexto OKF do CRM imobiliario:",
    focusedProperty
      ? `Imovel foco: ${focusedProperty.title} | ${focusedProperty.type} | ${focusedProperty.city} | ${focusedProperty.price}.`
      : "Catalogo principal:",
    ...shortlist.map(
      (item) =>
        `- ${item.title} | ${item.type} | ${item.city} | ${item.price} | ${(
          item.features || []
        ).join(", ")}`,
    ),
    "Corretores disponiveis:",
    ...brokerList.map((item) => `- ${item.name} | ${item.creci || ""} | ${item.phone || ""}`),
    "Leads recentes:",
    ...leadList.map(
      (item) => `- ${item.name} | interesse: ${item.interest} | etapa: ${item.stage}`,
    ),
    "Atividades recentes:",
    ...activityList.map((item) => `- ${item.title}: ${item.detail} (${item.time})`),
    query ? `Solicitacao atual: ${query}` : "",
  ]
    .filter(Boolean)
    .join("\n");
};

const fallbackAiInference = ({
  prompt = "",
  propertyId = null,
  customerName = "",
  channel = "whatsapp",
} = {}) => {
  const property =
    properties.find((item) => item.id === propertyId) || properties[0] || null;
  const name = customerName || "cliente";
  const opening =
    channel === "whatsapp" ? `Oi ${name}!` : `Olá ${name},`;
  const recommendation = property
    ? `${property.title} em ${property.city}, com valor de ${property.price}`
    : "algumas opcoes alinhadas ao seu perfil";
  const detail = prompt
    ? `Considerando o que voce pediu sobre "${prompt}",`
    : "Pelo contexto do CRM e do OKF,";
  const close =
    "se quiser, eu posso te enviar disponibilidade, detalhes de documentacao e os proximos passos por aqui.";

  return {
    text: `${opening} ${detail} a melhor recomendacao inicial e ${recommendation}. ${close}`,
    source: "local-okf",
    context: buildOkfContextSummary({ propertyId, query: prompt }),
  };
};

const callGeminiText = async ({
  prompt = "",
  propertyId = null,
  customerName = "",
  channel = "whatsapp",
} = {}) => {
  const apiKey = window.SuaImobiliariaCmsConfig?.geminiApiKey;
  if (!apiKey) {
    return fallbackAiInference({ prompt, propertyId, customerName, channel });
  }

  const context = buildOkfContextSummary({ propertyId, query: prompt });
  const body = {
    systemInstruction: {
      parts: [
        {
          text:
            "Voce e um assistente comercial imobiliario. Responda em pt-BR, com foco em WhatsApp, objetividade comercial, contexto do CRM e sem inventar fatos fora do contexto fornecido."
        }
      ]
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: [
              context,
              `Nome do cliente: ${customerName || "cliente"}`,
              `Canal: ${channel}`,
              `Pedido: ${prompt || "Gerar uma resposta comercial curta e util."}`,
              "Entregue apenas a mensagem final pronta para envio no WhatsApp."
            ].join("\n\n")
          }
        ]
      }
    ]
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${AI_TEXT_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    return fallbackAiInference({ prompt, propertyId, customerName, channel });
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("\n")
      .trim() || fallbackAiInference({ prompt, propertyId, customerName, channel }).text;

  return {
    text,
    source: AI_TEXT_MODEL,
    context,
  };
};

const saveVoiceAsset = (asset) => {
  const record = {
    id: `voice-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...asset,
  };
  const current = JSON.parse(localStorage.getItem(VOICE_ASSETS_KEY) || "[]");
  localStorage.setItem(VOICE_ASSETS_KEY, JSON.stringify([record, ...current].slice(0, 24)));
  return record;
};

const listVoiceAssets = () =>
  JSON.parse(localStorage.getItem(VOICE_ASSETS_KEY) || "[]");

const decodeInlineAudio = (data) => {
  if (!data) return null;
  const mimeType =
    data?.mimeType ||
    data?.inlineData?.mimeType ||
    data?.audio?.mimeType ||
    "audio/wav";
  const base64 =
    data?.data || data?.inlineData?.data || data?.audio?.data || null;
  if (!base64) return null;
  return {
    mimeType,
    base64,
    dataUrl: `data:${mimeType};base64,${base64}`,
  };
};

const callGeminiTts = async ({
  text,
  label = "Resposta comercial",
  voiceName = AI_TTS_VOICE,
  propertyId = null,
} = {}) => {
  const apiKey = window.SuaImobiliariaCmsConfig?.geminiApiKey;
  if (!apiKey || !text) {
    return saveVoiceAsset({
      label,
      text,
      propertyId,
      mimeType: "",
      base64: "",
      dataUrl: "",
      pendingAudio: true,
      provider: "local-script",
    });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${AI_TTS_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text }],
          },
        ],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName,
              },
            },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    return saveVoiceAsset({
      label,
      text,
      propertyId,
      mimeType: "",
      base64: "",
      dataUrl: "",
      pendingAudio: true,
      provider: "tts-fallback",
    });
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const audioPart =
    parts.find((part) => part.inlineData?.data) ||
    parts.find((part) => part.data) ||
    null;
  const audio = decodeInlineAudio(audioPart);

  return saveVoiceAsset({
    label,
    text,
    propertyId,
    mimeType: audio?.mimeType || "",
    base64: audio?.base64 || "",
    dataUrl: audio?.dataUrl || "",
    pendingAudio: !audio?.dataUrl,
    provider: AI_TTS_MODEL,
  });
};

const buildWhatsappHref = (phone, text) => {
  const normalizedPhone = String(phone || "5571999990000").replace(/\D/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text || "")}`;
};

window.SuaImobiliariaAI = {
  buildOkfContextSummary,
  callGeminiText,
  callGeminiTts,
  saveVoiceAsset,
  listVoiceAssets,
  buildWhatsappHref,
};

const loadOkfBundle = async (manifestUrl) => {
  const manifestResponse = await fetch(manifestUrl, { cache: "no-store" });
  if (!manifestResponse.ok) {
    throw new Error(`Nao foi possivel carregar o manifest OKF em ${manifestUrl}`);
  }
  const manifest = await manifestResponse.json();
  const baseUrl = new URL("./", new URL(manifestUrl, window.location.href));
  const entries = Array.isArray(manifest?.entries) ? manifest.entries : [];
  const markdownEntries = entries.filter((entry) => /\.md$/i.test(entry));
  const contents = await Promise.all(
    markdownEntries.map(async (entry) => {
      const url = new URL(entry, baseUrl).toString();
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Nao foi possivel carregar ${url}`);
      }
      const markdown = await response.text();
      return {
        entry,
        frontmatter: parseFrontmatter(markdown),
        data: parseOkfJsonBlock(markdown),
      };
    }),
  );

  return {
    format: "okf",
    okfVersion: manifest?.okfVersion || "0.1",
    meta: {
      generatedAt: manifest?.generatedAt || null,
      manifestUrl,
    },
    collections: {
      properties: contents
        .filter((item) => item.frontmatter.type === "property" && item.data)
        .map((item) => item.data),
      brokers: contents
        .filter((item) => item.frontmatter.type === "broker" && item.data)
        .map((item) => item.data),
    },
    views: {
      dashboard:
        contents.find(
          (item) => item.frontmatter.type === "dashboard-view" && item.data,
        )?.data || {},
    },
  };
};

const createOkfPayload = (payload) => ({
  format: "okf",
  okfVersion: "1.0",
  meta: {
    id: "mezanino-imobiliaria-cms",
    title: "Mezanino Imobiliaria CMS",
    generatedAt: new Date().toISOString(),
    source: "nexus-based-imobiliaria",
  },
  collections: {
    properties: payload.properties || [],
    brokers: payload.brokers || [],
  },
  views: {
    dashboard: payload.dashboard || {},
  },
});

const cmsSlugify = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";

const yamlSerialize = (value) => {
  if (Array.isArray(value)) {
    return `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
  }
  if (typeof value === "string") return JSON.stringify(value);
  if (value === undefined || value === null) return '""';
  return String(value);
};

const createFrontmatter = (fields) =>
  `---\n${Object.entries(fields)
    .map(([key, value]) => `${key}: ${yamlSerialize(value)}`)
    .join("\n")}\n---`;

const createConceptMarkdown = ({
  type,
  title,
  description,
  tags,
  body,
  timestamp,
}) =>
  `${createFrontmatter({
    type,
    title,
    description,
    tags,
    timestamp,
  })}\n\n# ${title}\n\n${body}\n`;

const createJsonBlock = (value) =>
  `\`\`\`json okf-profile\n${JSON.stringify(value, null, 2)}\n\`\`\``;

const createOkfBundleFiles = (payload) => {
  const timestamp = new Date().toISOString();
  const files = {
    "okf/index.md": createConceptMarkdown({
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
        "- [Views](./views/index.md)",
      ].join("\n"),
    }),
    "okf/catalog/index.md": createConceptMarkdown({
      type: "collection-index",
      title: "Catalogo",
      description: "Colecoes principais do CRM imobiliario.",
      tags: ["catalog"],
      timestamp,
      body: [
        "## Colecoes",
        "- [Imoveis](./properties/index.md)",
        "- [Corretores](./brokers/index.md)",
      ].join("\n"),
    }),
    "okf/catalog/properties/index.md": createConceptMarkdown({
      type: "collection-index",
      title: "Imoveis",
      description: "Inventario de imoveis.",
      tags: ["properties"],
      timestamp,
      body: (payload.properties || [])
        .map((property) => `- [${property.title}](./${property.id}.md)`)
        .join("\n"),
    }),
    "okf/catalog/brokers/index.md": createConceptMarkdown({
      type: "collection-index",
      title: "Corretores",
      description: "Diretorio de corretores.",
      tags: ["brokers"],
      timestamp,
      body: (payload.brokers || [])
        .map((broker) => `- [${broker.name}](./${cmsSlugify(broker.name)}.md)`)
        .join("\n"),
    }),
    "okf/views/index.md": createConceptMarkdown({
      type: "view-index",
      title: "Views",
      description: "Views consumidas pelo site e pelo app mobile.",
      tags: ["views"],
      timestamp,
      body: "- [Dashboard](./dashboard.md)",
    }),
    "okf/views/dashboard.md": createConceptMarkdown({
      type: "dashboard-view",
      title: "Dashboard",
      description: "Dados agregados do dashboard.",
      tags: ["dashboard", "crm"],
      timestamp,
      body: ["View agregada para o dashboard.", "", createJsonBlock(payload.dashboard || {})].join(
        "\n",
      ),
    }),
  };

  (payload.properties || []).forEach((property) => {
    files[`okf/catalog/properties/${property.id}.md`] = createConceptMarkdown({
      type: "property",
      title: property.title,
      description: `${property.type || "Imovel"} em ${property.city || ""}`.trim(),
      tags: ["property", property.kind || "imovel", property.cityName || ""].filter(
        Boolean,
      ),
      timestamp,
      body: [`Preco de referencia: ${property.price || "-"}.`, "", createJsonBlock(property)].join(
        "\n",
      ),
    });
  });

  (payload.brokers || []).forEach((broker) => {
    const id = cmsSlugify(broker.name);
    files[`okf/catalog/brokers/${id}.md`] = createConceptMarkdown({
      type: "broker",
      title: broker.name,
      description: broker.creci || "Corretor imobiliario",
      tags: ["broker", "crm"],
      timestamp,
      body: createJsonBlock({ id, ...broker }),
    });
  });

  files["okf/manifest.json"] = `${JSON.stringify(
    {
      format: "okf-manifest",
      okfVersion: "0.1",
      generatedAt: timestamp,
      root: "index.md",
      entries: Object.keys(files).map((path) => path.replace(/^okf\//, "")),
    },
    null,
    2,
  )}\n`;

  files["data/site.okf.json"] = `${JSON.stringify(createOkfPayload(payload), null, 2)}\n`;
  files["data/site.json"] = `${JSON.stringify(payload, null, 2)}\n`;

  return files;
};

const applyCmsData = (data) => {
  const payload = extractCmsPayload(data);
  window.SuaImobiliariaOkfBundle =
    data?.format === "okf" || data?.okfVersion ? data : createOkfPayload(payload);
  if (Array.isArray(payload?.properties) && payload.properties.length)
    properties = payload.properties.map((item, index) =>
      normalizeDashboardItem("properties", item, index),
    );
  if (Array.isArray(payload?.brokers) && payload.brokers.length)
    brokers = payload.brokers;
  if (payload?.dashboard && typeof payload.dashboard === "object")
    dashboardContent = normalizeDashboardContent({
      ...dashboardContent,
      ...payload.dashboard,
    });
};

const loadCmsData = async () => {
  const config = cmsConfig();
  const cachedSnapshot = localStorage.getItem("suaimobiliaria:cmsSnapshot");
  if (cachedSnapshot) {
    try {
      applyCmsData(JSON.parse(cachedSnapshot));
      window.SuaImobiliariaCmsState = { source: "localStorage" };
      return;
    } catch (error) {
      console.warn("Snapshot local do CMS invalido, ignorando.", error);
    }
  }
  if (!config?.dataUrl) return;
  const attemptUrls = [config.dataUrl, config.legacyDataUrl].filter(Boolean);
  let lastError = null;
  for (const url of attemptUrls) {
    try {
      const data = /\.json$/i.test(url) && /\/okf\/manifest\.json$/i.test(url)
        ? await loadOkfBundle(url)
        : await (async () => {
            const response = await fetch(url, { cache: "no-store" });
            if (!response.ok)
              throw new Error(`Nao foi possivel carregar o CMS em ${url}`);
            return response.json();
          })();
      applyCmsData(data);
      window.SuaImobiliariaCmsState = { source: url };
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Nao foi possivel carregar o CMS.");
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

const encodeBase64Utf8 = (value) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () =>
      reject(reader.error || new Error("Nao foi possivel ler a imagem."));
    reader.readAsDataURL(file);
  });

const createCmsPayload = () =>
  createOkfPayload({
    properties,
    brokers,
    dashboard: dashboardContent,
  });

const saveCmsDataToGitHub = async (token, payload) => {
  if (!token)
    return saveCmsDataLocally(
      payload,
      "Produto salvo localmente. Configure githubToken para publicar no GitHub.",
    );
  const config = cmsConfig();
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  const headers = {
    ...authHeaders,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const bundleFiles = createOkfBundleFiles(extractCmsPayload(payload));
  const repoBase = `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contents`;

  for (const [path, content] of Object.entries(bundleFiles)) {
    const apiUrl = `${repoBase}/${path}`;
    let currentResponse = await fetch(`${apiUrl}?ref=${config.branch}`, {
      headers,
    });
    if (currentResponse.status === 401 && token) {
      currentResponse = await fetch(`${apiUrl}?ref=${config.branch}`, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
    }
    let sha;
    if (currentResponse.ok) {
      const currentFile = await currentResponse.json();
      sha = currentFile.sha;
    } else if (![404].includes(currentResponse.status)) {
      throw new Error(
        `Nao foi possivel ler o arquivo atual do CMS (${currentResponse.status}).`,
      );
    }

    const updateResponse = await fetch(apiUrl, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `update cms data ${path}`,
        content: encodeBase64Utf8(content),
        sha,
        branch: config.branch,
      }),
    });
    if (!updateResponse.ok) {
      const errorData = await updateResponse.json().catch(() => ({}));
      if ([401, 403].includes(updateResponse.status)) {
        return saveCmsDataLocally(
          payload,
          "Nao foi possivel autenticar no GitHub. Alteracoes salvas localmente.",
        );
      }
      throw new Error(
        errorData.message || `Falha ao salvar no GitHub (${updateResponse.status}).`,
      );
    }
  }
  return { savedTo: "github", message: "Bundle OKF salvo no GitHub." };
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
const brand = () => /*html*/ `<img src="./logo.svg" alt="Mezanino Imobiliaria"/> `;
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
    description: "Atualize os indicadores do bloco de abertura do dashboard.",
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
    description: "Controle a linha do tempo operacional exibida no overview.",
    itemLabel: "atividade",
    fields: [
      { name: "icon", label: "Icone", type: "text", placeholder: "L" },
      {
        name: "title",
        label: "Titulo",
        type: "text",
        placeholder: "Novo lead recebido",
      },
      {
        name: "detail",
        label: "Detalhe",
        type: "text",
        placeholder: "Apartamento no Jardim Armacao",
      },
      {
        name: "time",
        label: "Horario",
        type: "text",
        placeholder: "Hoje, 10:23",
      },
      { name: "color", label: "Cor", type: "text", placeholder: "var(--gold)" },
    ],
  },
  leads: {
    label: "Leads",
    title: "Pipeline de leads",
    description: "Edite origem, interesse e etapa comercial dos contatos.",
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
