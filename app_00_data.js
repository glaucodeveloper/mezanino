"use strict";
  "use strict";

  const ROUTES = ["home", "destaques", "comprar", "imovel", "imovel-novo", "imovel-editar", "anuncie", "login", "dashboard", "contato"];
  const CMS_LOGIN_PASSWORD = "ZKUd4uCQ";
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
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82",
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
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=82",
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
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82",
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
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=82",
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
      image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=82",
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
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=82",
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
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=82",
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
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
    },
  ];

  let brokers = [
    { name: "Joao Almeida", phone: "(71) 99999-0001", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=80", creci: "CRECI 12345" },
    { name: "Mariana Santos", phone: "(71) 99999-0002", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80", creci: "CRECI 22334" },
    { name: "Carlos Mendes", phone: "(71) 99999-0003", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80", creci: "CRECI 33445" },
    { name: "Juliana Oliveira", phone: "(71) 99999-0004", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80", creci: "CRECI 44556" },
  ];

  let dashboardContent = {
    metrics: [
      { label: "Total de imoveis", value: "56" },
      { label: "Imoveis ativos", value: "42", color: "#1f9b61" },
      { label: "Leads", value: "128" },
      { label: "Visitas este mes", value: "1.245" },
    ],
    activities: [
      { icon: "L", title: "Novo lead recebido", detail: "Apartamento no Jardim Armacao", time: "Hoje, 10:23", color: "var(--gold)" },
      { icon: "A", title: "Agendamento confirmado", detail: "Visita - Casa no Vilarejo", time: "Hoje, 09:15", color: "#24a45a" },
      { icon: "I", title: "Novo imovel publicado", detail: "Casa em Alphaville", time: "Ontem", color: "#d48a1d" },
    ],
    leads: [
      { name: "Lucas Andrade", source: "Home", interest: "Casa em Condominio Alphaville", stage: "novo" },
      { name: "Patricia Souza", source: "WhatsApp", interest: "Apartamento no Jardim Armacao", stage: "visita agendada" },
      { name: "Rafael Lima", source: "Anuncie", interest: "Casa no Vilarejo", stage: "qualificando" },
    ],
    clients: [
      { name: "Mariana Costa", profile: "Compradora", focus: "3 quartos em Salvador", owner: "Joao Almeida" },
      { name: "Eduardo Nunes", profile: "Investidor", focus: "Acima de R$ 1,2 mi", owner: "Carlos Mendes" },
    ],
    appointments: [
      { date: "19/06 - 09:30", client: "Lucas Andrade", property: "Casa em Condominio Alphaville", broker: "Joao Almeida" },
      { date: "19/06 - 14:00", client: "Patricia Souza", property: "Apartamento no Jardim Armacao", broker: "Mariana Santos" },
    ],
    reports: [
      { title: "Conversao de leads", value: "18%", note: "Alta de 3 pontos na semana" },
      { title: "Tempo medio ate visita", value: "2,4 dias", note: "Melhor janela em 30 dias" },
    ],
    settings: [
      { label: "Aprovacao manual de novos anuncios", value: "Ativada" },
      { label: "Aviso de lead quente por e-mail", value: "Ativado" },
    ],
  };

  const cmsConfig = () => ({
      dataUrl: "./cms-imobiliaria/data/site.json",
      repoOwner: "glaucodeveloper",
      repoName: "nexus-based-imobiliaria-cms",
      branch: "main",
      contentPath: "data/site.json",
      ...(window.SuaImobiliariaCmsConfig || {}),
    });

  const applyCmsData = (data) => {
    if (Array.isArray(data?.properties) && data.properties.length) properties = data.properties.map((item, index) => normalizeDashboardItem("properties", item, index));
    if (Array.isArray(data?.brokers) && data.brokers.length) brokers = data.brokers;
    if (data?.dashboard && typeof data.dashboard === "object") dashboardContent = normalizeDashboardContent({ ...dashboardContent, ...data.dashboard });
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
    const response = await fetch(config.dataUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Nao foi possivel carregar o CMS em ${config.dataUrl}`);
    applyCmsData(await response.json());
    window.SuaImobiliariaCmsState = { source: config.dataUrl };
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

  const fileToDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Nao foi possivel ler a imagem."));
    reader.readAsDataURL(file);
  });

  const createCmsPayload = () => ({ properties, brokers, dashboard: dashboardContent });

  const saveCmsDataToGitHub = async (token, payload) => {
    if (!token) return saveCmsDataLocally(payload, "Produto salvo localmente. Configure githubToken para publicar no GitHub.");
    const config = cmsConfig();
    const apiUrl = `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contents/${config.contentPath}`;
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const headers = {
      ...authHeaders,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    let currentResponse = await fetch(`${apiUrl}?ref=${config.branch}`, { headers });
    if (currentResponse.status === 401 && token) {
      currentResponse = await fetch(`${apiUrl}?ref=${config.branch}`, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
    }
    if (!currentResponse.ok) throw new Error(`Nao foi possivel ler o arquivo atual do CMS (${currentResponse.status}).`);
    const currentFile = await currentResponse.json();
    const updateResponse = await fetch(apiUrl, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "update cms data from dashboard",
        content: encodeBase64Utf8(`${JSON.stringify(payload, null, 2)}\n`),
        sha: currentFile.sha,
        branch: config.branch,
      }),
    });
    if (!updateResponse.ok) {
      const errorData = await updateResponse.json().catch(() => ({}));
      if ([401, 403].includes(updateResponse.status)) {
        return saveCmsDataLocally(payload, "Nao foi possivel autenticar no GitHub. Alteracoes salvas localmente.");
      }
      throw new Error(errorData.message || `Falha ao salvar no GitHub (${updateResponse.status}).`);
    }
    return updateResponse.json();
  };

  const parseRoute = () => {
    const hash = window.location.hash.replace("#", "").trim();
    const [routePart, queryPart = ""] = hash.split("?");
    const route = ROUTES.includes(routePart) ? routePart : "home";
    const params = new URLSearchParams(queryPart);
    return { route, propertyId: params.get("propertyId") || null };
  };

  const brand = () => `<button class="brand" type="button" data-route="home" aria-label="SuaImobiliaria"><span class="brand-mark"></span><span>SuaImobiliaria</span></button>`;
  const active = (currentRoute, route) => (currentRoute === route ? "active" : "");
  const money = (value) => Number(value).toLocaleString("pt-BR");
  const favoriteMark = (isFavorite) => (isFavorite ? "♥" : "♡");
  const routeAttrs = (visible) => `class="route-panel" aria-hidden="${visible ? "false" : "true"}" style="display:${visible ? "block" : "none"};"`;
  const option = (value, selected, label = value) => `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`;
  const escapeHtml = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const DASHBOARD_COLLECTION_SCHEMAS = {
    properties: {
      label: "Imoveis",
      title: "Imoveis cadastrados",
      description: "Edite a vitrine principal do site com criar, atualizar e remover imoveis.",
      itemLabel: "imovel",
      fields: [
        { name: "id", label: "ID", type: "text", placeholder: "alphaville" },
        { name: "title", label: "Titulo", type: "text", placeholder: "Casa em Alphaville" },
        { name: "type", label: "Tipo", type: "text", placeholder: "Casa a venda" },
        { name: "kind", label: "Categoria", type: "text", placeholder: "Casa" },
        { name: "city", label: "Cidade completa", type: "text", placeholder: "Alphaville, Camacari/BA" },
        { name: "cityName", label: "Cidade-base", type: "text", placeholder: "Camacari" },
        { name: "neighborhood", label: "Bairro", type: "text", placeholder: "Alphaville" },
        { name: "price", label: "Preco", type: "text", placeholder: "R$ 1.850.000" },
        { name: "priceNumber", label: "Preco numerico", type: "number", placeholder: "1850000" },
        { name: "bedrooms", label: "Quartos", type: "number", placeholder: "4" },
        { name: "suites", label: "Suites", type: "number", placeholder: "2" },
        { name: "bathrooms", label: "Banheiros", type: "number", placeholder: "5" },
        { name: "parking", label: "Vagas", type: "number", placeholder: "4" },
        { name: "area", label: "Area", type: "number", placeholder: "320" },
        { name: "condominium", label: "Condominio", type: "text", placeholder: "R$ 780" },
        { name: "iptu", label: "IPTU", type: "text", placeholder: "R$ 3.200/ano" },
        { name: "tag", label: "Etiqueta", type: "text", placeholder: "Destaque" },
        { name: "image", label: "Imagem", type: "text", placeholder: "https://..." },
        { name: "meta", label: "Metadados", type: "textarea", placeholder: "4 quartos, 5 banheiros, 4 vagas, 320m2" },
        { name: "features", label: "Caracteristicas", type: "textarea", placeholder: "piscina, condominio, area gourmet" },
      ],
    },
    metrics: {
      label: "Metricas",
      title: "Metricas do painel",
      description: "Atualize os indicadores do bloco de abertura do dashboard.",
      itemLabel: "metrica",
      fields: [
        { name: "label", label: "Rotulo", type: "text", placeholder: "Total de imoveis" },
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
        { name: "title", label: "Titulo", type: "text", placeholder: "Novo lead recebido" },
        { name: "detail", label: "Detalhe", type: "text", placeholder: "Apartamento no Jardim Armacao" },
        { name: "time", label: "Horario", type: "text", placeholder: "Hoje, 10:23" },
        { name: "color", label: "Cor", type: "text", placeholder: "var(--gold)" },
      ],
    },
    leads: {
      label: "Leads",
      title: "Pipeline de leads",
      description: "Edite origem, interesse e etapa comercial dos contatos.",
      itemLabel: "lead",
      fields: [
        { name: "name", label: "Nome", type: "text", placeholder: "Lucas Andrade" },
        { name: "source", label: "Origem", type: "text", placeholder: "WhatsApp" },
        { name: "interest", label: "Interesse", type: "text", placeholder: "Casa em Alphaville" },
        { name: "stage", label: "Etapa", type: "text", placeholder: "novo" },
      ],
    },
    clients: {
      label: "Clientes",
      title: "Base de clientes",
      description: "Atualize o perfil, foco e responsavel por cada cliente.",
      itemLabel: "cliente",
      fields: [
        { name: "name", label: "Nome", type: "text", placeholder: "Mariana Costa" },
        { name: "profile", label: "Perfil", type: "text", placeholder: "Compradora" },
        { name: "focus", label: "Foco", type: "text", placeholder: "3 quartos em Salvador" },
        { name: "owner", label: "Responsavel", type: "text", placeholder: "Joao Almeida" },
      ],
    },
    appointments: {
      label: "Agendamentos",
      title: "Agenda comercial",
      description: "Gerencie visitas e encontros da equipe comercial.",
      itemLabel: "agendamento",
      fields: [
        { name: "date", label: "Data", type: "text", placeholder: "19/06 - 09:30" },
        { name: "client", label: "Cliente", type: "text", placeholder: "Lucas Andrade" },
        { name: "property", label: "Imovel", type: "text", placeholder: "Casa em Alphaville" },
        { name: "broker", label: "Corretor", type: "text", placeholder: "Joao Almeida" },
      ],
    },
    reports: {
      label: "Relatorios",
      title: "Indicadores e leitura",
      description: "Edite os blocos analiticos usados no dashboard.",
      itemLabel: "relatorio",
      fields: [
        { name: "title", label: "Titulo", type: "text", placeholder: "Conversao de leads" },
        { name: "value", label: "Valor", type: "text", placeholder: "18%" },
        { name: "note", label: "Observacao", type: "text", placeholder: "Alta de 3 pontos na semana" },
      ],
    },
    settings: {
      label: "Configuracoes",
      title: "Configuracoes operacionais",
      description: "Ajuste os controles administrativos do painel.",
      itemLabel: "configuracao",
      fields: [
        { name: "label", label: "Rotulo", type: "text", placeholder: "Aprovacao manual de novos anuncios" },
        { name: "value", label: "Valor", type: "text", placeholder: "Ativada" },
      ],
    },
  };
  const DASHBOARD_EDITABLE_COLLECTIONS = new Set(Object.keys(DASHBOARD_COLLECTION_SCHEMAS));

  const slugify = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const ensureItemId = (collection, item, index = 0) => item.id || `${collection}-${index + 1}-${slugify(item.title || item.name || item.label || item.subject || item.date || "item") || "item"}`;
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
        nextItem.meta = Array.isArray(item.meta) ? item.meta : String(item.meta || "").split(",").map((entry) => entry.trim()).filter(Boolean);
        nextItem.features = Array.isArray(item.features) ? item.features : String(item.features || "").split(",").map((entry) => entry.trim()).filter(Boolean);
        nextItem.images = Array.isArray(item.images)
          ? item.images.filter(Boolean)
          : String(item.images || "").split(",").map((entry) => entry.trim()).filter(Boolean);
        if (!nextItem.image && nextItem.images.length) nextItem.image = nextItem.images[0];
        nextItem.priceNumber = Number.isFinite(Number(nextItem.priceNumber)) ? Number(nextItem.priceNumber) : Number(String(nextItem.price || "").replace(/[^\d]/g, "")) || 0;
        nextItem.bedrooms = Number(nextItem.bedrooms) || 0;
        nextItem.suites = Number(nextItem.suites) || 0;
        nextItem.bathrooms = Number(nextItem.bathrooms) || 0;
        nextItem.parking = Number(nextItem.parking) || 0;
        nextItem.area = Number(nextItem.area) || 0;
      }
    }
    return nextItem;
  };
  const normalizeDashboardCollection = (collection, items = []) => (Array.isArray(items) ? items.map((item, index) => normalizeDashboardItem(collection, item, index)) : []);
  const normalizeDashboardContent = (content = {}) => ({
    ...content,
    metrics: normalizeDashboardCollection("metrics", content.metrics),
    activities: normalizeDashboardCollection("activities", content.activities),
    leads: normalizeDashboardCollection("leads", content.leads),
    clients: normalizeDashboardCollection("clients", content.clients),
    appointments: normalizeDashboardCollection("appointments", content.appointments),
    reports: normalizeDashboardCollection("reports", content.reports),
    settings: normalizeDashboardCollection("settings", content.settings),
  });
  const readFieldValue = (item, field) => {
    const value = item?.[field.name];
    if (field.type === "textarea") return Array.isArray(value) ? value.join(", ") : (value ?? "");
    return value ?? "";
  };
  const parseFieldValue = (field, rawValue) => {
    const value = String(rawValue ?? "").trim();
    if (field.type === "number") return value === "" ? 0 : Number(value);
    if (field.type === "textarea") return value.split(/\r?\n|,/).map((entry) => entry.trim()).filter(Boolean);
    return value;
  };
  const buildDraftFromItem = (collection, item = {}) => {
    const schema = DASHBOARD_COLLECTION_SCHEMAS[collection];
    const draft = { id: item.id || "" };
    if (!schema) return draft;
    for (const field of schema.fields) draft[field.name] = readFieldValue(item, field);
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
        detail: `${item.kind || item.type || "Imovel"} · ${item.city || item.neighborhood || ""}`,
        value: `${item.price || "Sem preco"}${item.area ? ` · ${item.area}m2` : ""}`,
        badge: item.tag || "Imovel",
        icon: item.kind ? item.kind.slice(0, 1).toUpperCase() : "P",
      };
    }
    if (collection === "metrics") return { title: item.label || `Metrica ${index + 1}`, detail: item.value || "", value: item.color || "", icon: (item.label || "M").slice(0, 1).toUpperCase() };
    if (collection === "activities") return { title: item.title || `Atividade ${index + 1}`, detail: item.detail || "", value: item.time || "", icon: item.icon || "A" };
    if (collection === "leads") return { title: item.name || `Lead ${index + 1}`, detail: item.interest || "", value: item.source || "", icon: "L" };
    if (collection === "clients") return { title: item.name || `Cliente ${index + 1}`, detail: item.focus || "", value: item.profile || "", icon: "C" };
    if (collection === "appointments") return { title: item.date || `Agendamento ${index + 1}`, detail: item.property || "", value: item.client || "", icon: "A" };
    if (collection === "reports") return { title: item.title || `Relatorio ${index + 1}`, detail: item.note || "", value: item.value || "", icon: "R" };
    if (collection === "settings") return { title: item.label || `Configuracao ${index + 1}`, detail: item.value || "", value: "", icon: "S" };
    return { title: item.title || item.name || `Item ${index + 1}`, detail: item.detail || "", value: item.value || "", icon: "•" };
  };
  const collectionFormTitle = (collection, mode) => `${mode === "edit" ? "Editar" : "Novo"} ${DASHBOARD_COLLECTION_SCHEMAS[collection]?.itemLabel || "item"}`;
  const collectionEmptyItem = (collection) => buildDraftFromItem(collection, {});
  const propertyDraftFrom = (property = null) => (property ? buildDraftFromItem("properties", property) : collectionEmptyItem("properties"));

  dashboardContent = normalizeDashboardContent(dashboardContent);

  const propertyFeatures = (property) => new Set([property.tag, property.kind, ...(property.features || []), ...(property.meta || [])].filter(Boolean).map((item) => String(item).toLowerCase()));

  const propertyCard = (property, tools) => {
    const favorite = tools.isFavorite(property.id);
    const compared = tools.isCompared?.(property.id);
    return `
      <article class="property-card fade-up">
        <button class="card-media" type="button" data-route="imovel" data-property-id="${property.id}" aria-label="Ver detalhes de ${property.title}">
          <img src="${property.image}" alt="${property.title}" loading="lazy">
          <span class="badge">${property.tag}</span>
        </button>
        <button class="heart ${favorite ? "active" : ""}" type="button" data-cid="${tools.componentId}" data-message="toggleFavorite" data-property-id="${property.id}" aria-label="Favoritar">${favoriteMark(favorite)}</button>
        <div class="property-body">
          <span class="property-type">${property.type}</span>
          <h3>${property.title}</h3>
          <div class="location">${property.city}</div>
          <div class="meta">${property.meta.map((item) => `<span>${item}</span>`).join("")}</div>
          <div class="price">${property.price}</div>
          ${tools.componentId === "listing" ? `<button class="ghost-btn compare-btn ${compared ? "active" : ""}" type="button" data-cid="listing" data-message="toggleCompare" data-property-id="${property.id}">${compared ? "Comparando" : "Comparar"}</button>` : ""}
        </div>
      </article>
    `;
  };

  const listCard = (property, tools) => {
    const favorite = tools.isFavorite(property.id);
    const compared = tools.isCompared(property.id);
    return `
      <article class="list-card">
        <img src="${property.image}" alt="${property.title}" loading="lazy">
        <div class="list-info">
          <span class="property-type">${property.type}</span>
          <h3>${property.title}</h3>
          <div class="location">${property.city}</div>
          <div class="meta">${property.meta.map((item) => `<span>${item}</span>`).join("")}</div>
        </div>
        <div class="list-price">
          <button class="heart ${favorite ? "active" : ""}" type="button" data-cid="listing" data-message="toggleFavorite" data-property-id="${property.id}">${favoriteMark(favorite)}</button>
          <strong class="price">${property.price}</strong>
          <button class="ghost-btn compare-btn ${compared ? "active" : ""}" type="button" data-cid="listing" data-message="toggleCompare" data-property-id="${property.id}">${compared ? "Comparando" : "Comparar"}</button>
          <button class="ghost-btn" type="button" data-route="imovel" data-property-id="${property.id}">Ver detalhes</button>
        </div>
      </article>
    `;
  };

  const TopbarComponent = ({ props }) => ({
    next() {
      const route = props.getRoute();
      return {
        done: false,
        value: `
          <header class="topbar">
            ${brand()}
            <nav class="nav" aria-label="Navegacao principal">
              <a class="${active(route, "comprar")}" href="#comprar" data-route="comprar">Comprar</a>
              <a class="${active(route, "comprar")}" href="#comprar" data-route="comprar">Alugar</a>
              <a class="${active(route, "destaques")}" href="#destaques" data-route="destaques">Lancamentos</a>
              <a class="${active(route, "anuncie")}" href="#anuncie" data-route="anuncie">Anuncie seu imovel</a>
              <a class="${active(route, "contato")}" href="#contato" data-route="contato">Contato</a>
            </nav>
            <button class="pill-btn" type="button" data-route="contato">Fale conosco</button>
          </header>
        `,
      };
    },
  });

  const HeroComponent = () => {
    let tab = "comprar";
    return {
      next(message = {}) {
        if (message.type === "setTab") tab = message.value || tab;
        return {
          done: false,
          value: `
            <section id="home" class="hero">
              <div class="container hero-content">
                <span class="eyebrow">Curadoria premium</span>
                <h1>Encontre o imovel ideal para voce</h1>
                <p>Casas, apartamentos e terrenos nas melhores localizacoes da cidade, com atendimento consultivo do primeiro clique ate a entrega das chaves.</p>
                <div class="search-panel" role="search">
                  <div class="tabs">
                    <button class="tab ${tab === "comprar" ? "active" : ""}" type="button" data-cid="hero" data-message="setTab" data-value="comprar">Comprar</button>
                    <button class="tab ${tab === "alugar" ? "active" : ""}" type="button" data-cid="hero" data-message="setTab" data-value="alugar">Alugar</button>
                  </div>
                  <div class="search-grid">
                    <label class="field"><span>Localizacao</span><input name="quickLocation" placeholder="Cidade, bairro ou condominio"></label>
                    <label class="field"><span>Tipo de imovel</span><select><option>Todos</option><option>Casa</option><option>Apartamento</option><option>Terreno</option></select></label>
                    <label class="field"><span>Faixa de preco</span><select><option>Qualquer preco</option><option>Ate R$ 700 mil</option><option>Acima de R$ 1 mi</option></select></label>
                    <button class="gold-btn" type="button" data-route="comprar">Buscar imoveis</button>
                  </div>
                </div>
              </div>
            </section>
          `,
        };
      },
    };
  };

  const StatsComponent = () => ({
    next: () => ({
      done: false,
      value: `
        <div class="stats-strip">
          <div class="container stats-grid">
            <div class="stat-card"><span class="icon-box">20</span><div><strong>+20 anos</strong><span>de experiencia</span></div></div>
            <div class="stat-card"><span class="icon-box">CR</span><div><strong>CRECI ativo</strong><span>operacao regular</span></div></div>
            <div class="stat-card"><span class="icon-box">At</span><div><strong>Atendimento</strong><span>especializado</span></div></div>
            <div class="stat-card"><span class="icon-box">Ok</span><div><strong>Seguranca</strong><span>em todas as negociacoes</span></div></div>
          </div>
        </div>
      `,
    }),
  });

  const FeaturedComponent = ({ props }) => ({
    next(message = {}) {
      if (message.type === "toggleFavorite") props.toggleFavorite(message.propertyId);
      return {
        done: false,
        value: `
          <section id="destaques" class="section">
            <div class="container">
              <div class="section-title">
                <div><span class="eyebrow">Destaques</span><h2>Imoveis em destaque</h2><p>Selecionamos as oportunidades mais fortes para voce.</p></div>
                <button class="ghost-btn" type="button" data-route="comprar">Ver todos</button>
              </div>
              <div class="property-grid">${properties.slice(0, 4).map((property) => propertyCard(property, { componentId: "featured", isFavorite: props.isFavorite })).join("")}</div>
            </div>
          </section>
        `,
      };
    },
  });

  const AnnounceComponent = ({ props }) => {
    let status = "";
    return {
      next(message = {}) {
        if (message.type === "announce") {
          props.addLead({
            name: message.fields.ownerName || "Lead de captacao",
            source: "Anuncie seu imovel",
            interest: message.fields.propertyType || "Imovel para avaliacao",
            stage: "novo",
          });
          status = "Lead de captacao salvo no dashboard.";
        }
        return {
          done: false,
          value: `
            <section id="anuncie" class="section">
              <div class="container">
                <div class="ad-banner">
                  <div class="ad-copy">
                    <h3>Anuncie seu imovel com quem entende</h3>
                    <p>Preencha os dados principais e a equipe comercial recebe o lead de captacao.</p>
                    <button class="gold-btn" type="button" data-route="contato">Falar com especialista</button>
                  </div>
                  <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1100&q=82" alt="Sala elegante" loading="lazy">
                </div>
                <form class="phone-strip" data-cid="announce" data-message="announce" aria-label="Fluxo de anuncio">
                  <article class="phone-card">
                    <h3>1. Proprietario</h3>
                    <div class="mini-field"><label>Nome</label><input name="ownerName" required placeholder="Digite seu nome"></div>
                    <div class="mini-field"><label>Telefone</label><input name="phone" required placeholder="(71) 99999-0000"></div>
                    <div class="mini-field"><label>E-mail</label><input name="email" type="email" placeholder="seuemail@email.com"></div>
                  </article>
                  <article class="phone-card">
                    <h3>2. Imovel</h3>
                    <div class="mini-field"><label>Tipo</label><select name="propertyType"><option>Casa</option><option>Apartamento</option><option>Terreno</option></select></div>
                    <div class="mini-field"><label>Bairro</label><input name="neighborhood" placeholder="Informe o bairro"></div>
                    <div class="mini-field"><label>Valor estimado</label><input name="value" placeholder="R$"></div>
                  </article>
                  <article class="phone-card">
                    <h3>3. Envio</h3>
                    <div class="mini-field"><label>Descricao</label><input name="description" placeholder="Resumo do imovel"></div>
                    <label class="check-list"><span><input name="privacy" type="checkbox" required> Aceito a politica de privacidade</span></label>
                    ${status ? `<p class="login-error">${status}</p>` : `<p class="location">Notificacao simulada para a equipe comercial.</p>`}
                    <button class="gold-btn" style="width:100%;" type="submit">Enviar interesse</button>
                  </article>
                </form>
              </div>
            </section>
          `,
        };
      },
    };
  };

  const ListingComponent = ({ props }) => {
    let viewMode = "grid";
    let page = 1;
    let sortBy = "recentes";
    const pageSize = 4;
    const filters = {
      kinds: new Set(),
      city: "Todos",
      neighborhood: "Todos",
      maxPrice: 2500000,
      bedrooms: "Qualquer",
      suites: "Qualquer",
      parking: "Qualquer",
      minArea: "Qualquer",
      features: new Set(),
    };

    const filterProperties = () => {
      const filtered = properties.filter((property) => {
        const minBedrooms = filters.bedrooms === "Qualquer" ? 0 : Number(filters.bedrooms.replace("+", ""));
        const minSuites = filters.suites === "Qualquer" ? 0 : Number(filters.suites.replace("+", ""));
        const minParking = filters.parking === "Qualquer" ? 0 : Number(filters.parking.replace("+", ""));
        const minArea = filters.minArea === "Qualquer" ? 0 : Number(filters.minArea);
        const features = propertyFeatures(property);
        return (
          (filters.kinds.size === 0 || filters.kinds.has(property.kind)) &&
          (filters.city === "Todos" || property.cityName === filters.city) &&
          (filters.neighborhood === "Todos" || property.neighborhood === filters.neighborhood) &&
          property.priceNumber <= Number(filters.maxPrice) &&
          (minBedrooms === 0 || property.bedrooms >= minBedrooms) &&
          (minSuites === 0 || property.suites >= minSuites) &&
          (minParking === 0 || property.parking >= minParking) &&
          (minArea === 0 || property.area >= minArea) &&
          (filters.features.size === 0 || [...filters.features].every((feature) => features.has(feature.toLowerCase())))
        );
      });
      return [...filtered].sort((a, b) => {
        if (sortBy === "menor-preco") return a.priceNumber - b.priceNumber;
        if (sortBy === "maior-preco") return b.priceNumber - a.priceNumber;
        if (sortBy === "maior-area") return b.area - a.area;
        return properties.indexOf(a) - properties.indexOf(b);
      });
    };

    const resetFilters = () => {
      filters.kinds.clear();
      filters.features.clear();
      filters.city = "Todos";
      filters.neighborhood = "Todos";
      filters.maxPrice = 2500000;
      filters.bedrooms = "Qualquer";
      filters.suites = "Qualquer";
      filters.parking = "Qualquer";
      filters.minArea = "Qualquer";
      sortBy = "recentes";
      page = 1;
    };

    const syncUrl = () => {
      const params = new URLSearchParams();
      if (filters.kinds.size) params.set("tipo", [...filters.kinds].join(","));
      if (filters.city !== "Todos") params.set("cidade", filters.city);
      if (filters.neighborhood !== "Todos") params.set("bairro", filters.neighborhood);
      if (Number(filters.maxPrice) < 2500000) params.set("preco", filters.maxPrice);
      if (filters.bedrooms !== "Qualquer") params.set("quartos", filters.bedrooms);
      if (filters.suites !== "Qualquer") params.set("suites", filters.suites);
      if (filters.parking !== "Qualquer") params.set("vagas", filters.parking);
      if (filters.minArea !== "Qualquer") params.set("area", filters.minArea);
      if (filters.features.size) params.set("caracteristicas", [...filters.features].join(","));
      if (sortBy !== "recentes") params.set("ordem", sortBy);
      if (page > 1) params.set("pagina", String(page));
      const query = params.toString();
      window.history.replaceState({ route: "comprar" }, "", `#comprar${query ? `?${query}` : ""}`);
    };

    return {
      next(message = {}) {
        if (message.type === "toggleFavorite") props.toggleFavorite(message.propertyId);
        if (message.type === "toggleCompare") props.toggleCompare(message.propertyId);
        if (message.type === "setView") viewMode = message.value || viewMode;
        if (message.type === "sort") {
          sortBy = message.value || sortBy;
          page = 1;
        }
        if (message.type === "filter") {
          if (message.name === "kind") {
            if (message.checked) filters.kinds.add(message.value);
            else filters.kinds.delete(message.value);
          } else if (message.name === "feature") {
            if (message.checked) filters.features.add(message.value);
            else filters.features.delete(message.value);
          } else if (message.name in filters) {
            filters[message.name] = message.value;
            if (message.name === "city") filters.neighborhood = "Todos";
          }
          page = 1;
        }
        if (message.type === "clearFilters") resetFilters();
        if (message.type === "setPage") page = Number(message.value) || 1;

        const filtered = filterProperties();
        const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
        page = Math.min(Math.max(page, 1), totalPages);
        syncUrl();
        const visibleProperties = filtered.slice((page - 1) * pageSize, page * pageSize);
        const neighborhoods = ["Todos", ...new Set(properties.filter((property) => filters.city === "Todos" || property.cityName === filters.city).map((property) => property.neighborhood))];
        const compared = properties.filter((property) => props.isCompared(property.id));
        const pager = Array.from({ length: totalPages }, (_, index) => index + 1)
          .map((item) => `<button class="${item === page ? "active" : ""}" type="button" data-cid="listing" data-message="setPage" data-value="${item}">${item}</button>`)
          .join("");

        return {
          done: false,
          value: `
            <section id="comprar" class="section listing-section">
              <div class="container">
                <div class="section-title">
                  <div><span class="eyebrow">Comprar / Alugar / Buscar</span><h2>Imoveis disponiveis</h2><p>Encontramos ${filtered.length} imoveis. Filtros ativos atualizam a URL.</p></div>
                </div>
                <div class="listing-layout">
                  <aside class="filter-box" aria-label="Filtros">
                    <div class="filter-head"><strong>Filtros</strong><button type="button" data-cid="listing" data-message="clearFilters">Limpar filtros</button></div>
                    <div class="filter-stack">
                      <div class="mini-field"><label>Tipo</label><div class="check-list">${["Casa", "Apartamento", "Terreno", "Cobertura", "Sala comercial"].map((kind) => `<label><input type="checkbox" data-cid="listing" data-message="filter" data-name="kind" value="${kind}" ${filters.kinds.has(kind) ? "checked" : ""}> ${kind}</label>`).join("")}</div></div>
                      <div class="mini-field"><label>Cidade</label><select data-cid="listing" data-message="filter" data-name="city">${["Todos", ...new Set(properties.map((property) => property.cityName))].map((city) => option(city, filters.city)).join("")}</select></div>
                      <div class="mini-field"><label>Bairro</label><select data-cid="listing" data-message="filter" data-name="neighborhood">${neighborhoods.map((item) => option(item, filters.neighborhood)).join("")}</select></div>
                      <div class="mini-field"><label>Preco maximo: R$ ${money(filters.maxPrice)}</label><input type="range" min="290000" max="2500000" step="50000" value="${filters.maxPrice}" data-cid="listing" data-message="filter" data-name="maxPrice"></div>
                      <div class="mini-field"><label>Quartos</label><select data-cid="listing" data-message="filter" data-name="bedrooms">${["Qualquer", "1+", "2+", "3+", "4+"].map((value) => option(value, filters.bedrooms)).join("")}</select></div>
                      <div class="mini-field"><label>Suites</label><select data-cid="listing" data-message="filter" data-name="suites">${["Qualquer", "1+", "2+"].map((value) => option(value, filters.suites)).join("")}</select></div>
                      <div class="mini-field"><label>Vagas</label><select data-cid="listing" data-message="filter" data-name="parking">${["Qualquer", "1+", "2+", "3+"].map((value) => option(value, filters.parking)).join("")}</select></div>
                      <div class="mini-field"><label>Area minima</label><select data-cid="listing" data-message="filter" data-name="minArea">${["Qualquer", "50", "100", "200", "400"].map((value) => option(value, filters.minArea, value === "Qualquer" ? value : `${value}m2`)).join("")}</select></div>
                      <div class="mini-field"><label>Caracteristicas</label><div class="check-list">${["vista mar", "praia", "condominio", "comercial"].map((feature) => `<label><input type="checkbox" data-cid="listing" data-message="filter" data-name="feature" value="${feature}" ${filters.features.has(feature) ? "checked" : ""}> ${feature}</label>`).join("")}</div></div>
                    </div>
                  </aside>
                  <div>
                    <div class="list-toolbar">
                      <strong>Pagina ${page} de ${totalPages}</strong>
                      <label class="mini-field sort-field"><span>Ordenar por</span><select data-cid="listing" data-message="sort">${[
                        ["recentes", "Mais recentes"],
                        ["menor-preco", "Menor preco"],
                        ["maior-preco", "Maior preco"],
                        ["maior-area", "Maior area"],
                      ].map(([value, label]) => option(value, sortBy, label)).join("")}</select></label>
                      <div class="view-toggle">
                        <button class="square-btn ${viewMode === "grid" ? "active" : ""}" type="button" data-cid="listing" data-message="setView" data-value="grid">Grade</button>
                        <button class="square-btn ${viewMode === "list" ? "active" : ""}" type="button" data-cid="listing" data-message="setView" data-value="list">Lista</button>
                      </div>
                    </div>
                    <div class="${viewMode === "grid" ? "property-grid listing-grid" : "list-stack"}">
                      ${visibleProperties.length ? visibleProperties.map((property) => (viewMode === "grid" ? propertyCard(property, { componentId: "listing", isFavorite: props.isFavorite, isCompared: props.isCompared }) : listCard(property, props))).join("") : `<article class="list-card"><div class="list-info"><h3>Nenhum imovel encontrado</h3><div class="location">Tente limpar filtros.</div></div></article>`}
                    </div>
                    ${compared.length >= 2 ? `<div class="compare-box"><strong>Comparando ${compared.length} imoveis</strong><div class="compare-table">${compared.map((property) => `<div><b>${property.title}</b><span>${property.price}</span><span>${property.neighborhood}</span><span>${property.area}m2</span><span>${property.bedrooms} quartos</span><span>${property.bathrooms} banheiros</span><span>${property.parking} vagas</span><span>Condominio ${property.condominium}</span><span>IPTU ${property.iptu}</span></div>`).join("")}</div><button class="ghost-btn whatsapp" type="button" data-route="contato">Enviar comparacao para WhatsApp</button></div>` : `<p class="route-note">Marque dois ou mais imoveis para comparar.</p>`}
                    <div class="pager"><button type="button" data-cid="listing" data-message="setPage" data-value="${page - 1}" ${page === 1 ? "disabled" : ""}>‹</button>${pager}<button type="button" data-cid="listing" data-message="setPage" data-value="${page + 1}" ${page === totalPages ? "disabled" : ""}>›</button></div>
                  </div>
                </div>
              </div>
            </section>
          `,
        };
      },
    };
  };

  const DetailComponent = ({ props }) => {
    let status = "";
    let galleryOpen = false;
    let galleryIndex = 0;
    let activePropertyId = "";
    return {
      next(message = {}) {
        if (message.type === "toggleFavorite") props.toggleFavorite(message.propertyId);
        if (message.type === "openGallery") {
          galleryOpen = true;
          galleryIndex = Number(message.target?.dataset?.index || message.value || 0) || 0;
        }
        if (message.type === "closeGallery") {
          galleryOpen = false;
        }
        if (message.type === "nextGallery") {
          galleryIndex += 1;
        }
        if (message.type === "prevGallery") {
          galleryIndex -= 1;
        }
        if (message.type === "proposal") {
          props.addLead({ name: message.fields.name || "Proposta", source: "Pagina do imovel", interest: props.getSelectedProperty().title, stage: "novo" });
          status = "Proposta registrada no dashboard.";
        }
        const property = props.getSelectedProperty();
        if (property?.id !== activePropertyId) {
          activePropertyId = property?.id || "";
          galleryOpen = false;
          galleryIndex = 0;
        }
        const broker = brokers[0];
        const galleryImages = [property.image, ...(Array.isArray(property.images) ? property.images : []), ...properties.filter((item) => item.id !== property.id).slice(0, 3).map((item) => item.image)].filter(Boolean);
        if (galleryImages.length) galleryIndex = ((galleryIndex % galleryImages.length) + galleryImages.length) % galleryImages.length;
        const currentGalleryImage = galleryImages[galleryIndex] || property.image;
        const renderGalleryItem = (item, index, isMain = false) => {
          const isActive = index === galleryIndex;
          const label = isMain ? "Abrir galeria" : `Abrir imagem ${index + 1}`;
          return `
            <button class="gallery-item ${isMain ? "gallery-main" : "gallery-thumb"} ${isActive ? "is-active" : ""}" type="button" data-cid="detail" data-message="openGallery" data-index="${index}" aria-label="${label}">
              <img src="${item}" alt="${property.title} - imagem ${index + 1}" loading="lazy">
              ${!isMain && index === 3 ? `<span class="gallery-more">ver todas</span>` : ""}
            </button>
          `;
        };
        return {
          done: false,
          value: `
            <section id="imovel" class="section detail-section">
              <div class="container detail-layout">
                <div>
                  <div class="gallery">
                    ${renderGalleryItem(galleryImages[0] || property.image, 0, true)}
                    ${galleryImages.slice(1, 4).map((item, index) => renderGalleryItem(item, index + 1)).join("")}
                  </div>
                  <div class="detail-copy">
                    <span class="eyebrow">Codigo ${property.id}</span>
                    <h2>${property.title}</h2>
                    <p>Descricao completa do imovel, com localizacao, atributos comerciais, mapa e contexto de compra.</p>
                    <ul class="feature-list">
                      <li>Area total: ${property.area}m2</li>
                      <li>Area privativa: ${Math.max(property.area - 20, property.area)}m2</li>
                      <li>${property.bedrooms} quartos, ${property.suites} suites, ${property.bathrooms} banheiros e ${property.parking} vagas</li>
                      <li>Condominio ${property.condominium} e IPTU ${property.iptu}</li>
                    </ul>
                  </div>
                </div>
                <aside class="detail-panel">
                  <span class="property-type">${property.type}</span>
                  <h3>${property.title}</h3>
                  <div class="location">${property.city}</div>
                  <div class="meta">${property.meta.map((item) => `<span>${item}</span>`).join("")}</div>
                  <strong class="price">${property.price}</strong>
                  <div class="action-stack">
                    <button class="gold-btn" type="button" data-route="contato">Agendar visita</button>
                    <button class="ghost-btn whatsapp" type="button" data-route="contato">WhatsApp</button>
                    <button class="ghost-btn" type="button" data-cid="detail" data-message="toggleFavorite" data-property-id="${property.id}">${favoriteMark(props.isFavorite(property.id))} Favoritar</button>
                  </div>
                  <form class="broker-card" data-cid="detail" data-message="proposal">
                    <strong>Formulario de proposta</strong>
                    <div class="mini-field"><label>Nome</label><input name="name" required placeholder="Seu nome"></div>
                    <div class="mini-field"><label>Telefone</label><input name="phone" required placeholder="(71) 99999-0000"></div>
                    <button class="gold-btn" type="submit">Enviar proposta</button>
                    ${status ? `<p class="login-error">${status}</p>` : ""}
                  </form>
                  <div class="broker-card">
                    <strong>Corretor responsavel</strong>
                    <div class="broker-person"><img class="avatar" src="${broker.photo}" alt="${broker.name}"><div><strong>${broker.name}</strong><div class="location">${broker.creci}</div></div></div>
                  </div>
                </aside>
              </div>
              ${galleryOpen ? `
                <div class="gallery-modal" role="dialog" aria-modal="true" aria-label="Galeria de imagens">
                  <button class="gallery-modal-backdrop" type="button" data-cid="detail" data-message="closeGallery" aria-label="Fechar galeria"></button>
                  <div class="gallery-modal-panel">
                    <button class="gallery-modal-close" type="button" data-cid="detail" data-message="closeGallery" aria-label="Fechar">×</button>
                    <button class="gallery-modal-nav gallery-modal-prev" type="button" data-cid="detail" data-message="prevGallery" aria-label="Imagem anterior">‹</button>
                    <img class="gallery-modal-image" src="${currentGalleryImage}" alt="${property.title}">
                    <button class="gallery-modal-nav gallery-modal-next" type="button" data-cid="detail" data-message="nextGallery" aria-label="Próxima imagem">›</button>
                  </div>
                </div>
              ` : ""}
              <div class="container"><div class="section-title"><div><span class="eyebrow">Semelhantes</span><h2>Imoveis semelhantes</h2></div></div><div class="property-grid">${properties.filter((item) => item.id !== property.id).slice(0, 3).map((item) => propertyCard(item, { componentId: "featured", isFavorite: props.isFavorite })).join("")}</div></div>
            </section>
          `,
        };
      },
    };
  };
