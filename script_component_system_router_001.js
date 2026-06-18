(() => {
  "use strict";

  const ROUTES = ["home", "destaques", "comprar", "imovel", "anuncie", "login", "dashboard", "contato"];
  const CMS_LOGIN_PASSWORD = "ZKUd4uCQ";

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
    messages: [
      { from: "Site", subject: "Pedido de retorno comercial", status: "Nao lida" },
      { from: "Formulario de anuncio", subject: "Novo imovel para avaliacao", status: "Triagem" },
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
    if (Array.isArray(data?.properties) && data.properties.length) properties = data.properties;
    if (Array.isArray(data?.brokers) && data.brokers.length) brokers = data.brokers;
    if (data?.dashboard && typeof data.dashboard === "object") dashboardContent = { ...dashboardContent, ...data.dashboard };
  };

  const loadCmsData = async () => {
    const config = cmsConfig();
    if (!config?.dataUrl) return;
    const response = await fetch(config.dataUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Nao foi possivel carregar o CMS em ${config.dataUrl}`);
    applyCmsData(await response.json());
    window.SuaImobiliariaCmsState = { source: config.dataUrl };
  };

  const encodeBase64Utf8 = (value) => {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  };

  const createCmsPayload = () => ({ properties, brokers, dashboard: dashboardContent });

  const saveCmsDataToGitHub = async (token, payload) => {
    const config = cmsConfig();
    const apiUrl = `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contents/${config.contentPath}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const currentResponse = await fetch(`${apiUrl}?ref=${config.branch}`, { headers });
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
      throw new Error(errorData.message || `Falha ao salvar no GitHub (${updateResponse.status}).`);
    }
    return updateResponse.json();
  };

  const createStateComponent = (initialState, reducer = (state) => state) => {
    let state = initialState;
    return {
      next(message = {}) {
        state = reducer(state, message) ?? state;
        return { done: false, value: state };
      },
      value: () => state,
    };
  };

  const parseRoute = () => {
    const hash = window.location.hash.replace("#", "").split("?")[0].trim();
    return ROUTES.includes(hash) ? hash : "home";
  };

  const brand = () => `<button class="brand" type="button" data-route="home" aria-label="SuaImobiliaria"><span class="brand-mark"></span><span>SuaImobiliaria</span></button>`;
  const active = (currentRoute, route) => (currentRoute === route ? "active" : "");
  const money = (value) => Number(value).toLocaleString("pt-BR");
  const favoriteMark = (isFavorite) => (isFavorite ? "♥" : "♡");
  const routeAttrs = (visible) => `class="route-panel" aria-hidden="${visible ? "false" : "true"}" style="display:${visible ? "block" : "none"};"`;
  const option = (value, selected, label = value) => `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`;

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
    return {
      next(message = {}) {
        if (message.type === "toggleFavorite") props.toggleFavorite(message.propertyId);
        if (message.type === "proposal") {
          props.addLead({ name: message.fields.name || "Proposta", source: "Pagina do imovel", interest: props.getSelectedProperty().title, stage: "novo" });
          status = "Proposta registrada no dashboard.";
        }
        const property = props.getSelectedProperty();
        const broker = brokers[0];
        return {
          done: false,
          value: `
            <section id="imovel" class="section detail-section">
              <div class="container detail-layout">
                <div>
                  <div class="gallery">
                    <div class="gallery-main"><img src="${property.image}" alt="${property.title}"></div>
                    ${properties.slice(0, 4).map((item, index) => `<div class="gallery-thumb"><img src="${item.image}" alt="${item.title}" loading="lazy">${index === 3 ? `<span class="gallery-more">ver todas</span>` : ""}</div>`).join("")}
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
              <div class="container"><div class="section-title"><div><span class="eyebrow">Semelhantes</span><h2>Imoveis semelhantes</h2></div></div><div class="property-grid">${properties.filter((item) => item.id !== property.id).slice(0, 3).map((item) => propertyCard(item, { componentId: "featured", isFavorite: props.isFavorite })).join("")}</div></div>
            </section>
          `,
        };
      },
    };
  };

  const BrokersComponent = () => ({
    next: () => ({
      done: false,
      value: `<section class="section brokers"><div class="container"><div class="section-title" style="justify-content:center;text-align:center;"><div><span class="eyebrow">Corretores</span><h2>Conte com nossos corretores</h2><p>Foto, CRECI, telefone e atendimento direto.</p></div></div><div class="broker-grid">${brokers.map((broker) => `<article class="broker-tile"><img src="${broker.photo}" alt="${broker.name}" loading="lazy"><strong>${broker.name}</strong><div class="location">${broker.creci}</div><div class="location">${broker.phone}</div></article>`).join("")}</div></div></section>`,
    }),
  });

  const DashboardComponentStateful = ({ props }) => {
    let activeTab = "overview";
    let saveStatus = "";
    const tabs = [
      ["overview", "Dashboard"],
      ["properties", "Imoveis"],
      ["leads", "Leads"],
      ["clients", "Clientes"],
      ["appointments", "Agendamentos"],
      ["messages", "Mensagens"],
      ["reports", "Relatorios"],
      ["settings", "Configuracoes"],
    ];
    const renderCollection = (title, items) => `<article class="dashboard-card"><h3>${title}</h3><div class="activity">${items.map((item) => `<div class="activity-row"><span class="dot" style="background:${item.color || "var(--gold)"};">${item.icon || "•"}</span><div><strong>${item.title || item.name || item.label || item.from || item.date}</strong><div class="location">${item.detail || item.interest || item.subject || item.focus || item.property || item.value || item.note || item.stage}</div></div><small>${item.time || item.status || item.owner || item.broker || item.source || ""}</small></div>`).join("")}</div></article>`;
    const renderPropertiesPanel = () => `<div class="dashboard-columns">${renderCollection("Carteira de imoveis", properties.map((property) => ({ title: property.title, detail: `${property.kind} - ${property.city}`, value: property.price })))}${renderCollection("Resumo comercial", properties.slice(0, 5).map((property) => ({ title: property.price, detail: property.title, value: `${property.area}m2` })))}</div>`;
    const renderSettings = () => `
      <div class="dashboard-columns">
        ${renderCollection("Configuracoes operacionais", dashboardContent.settings)}
        <article class="dashboard-card">
          <h3>Salvar CMS no GitHub</h3>
          <p class="location">Use um token com permissao Contents: Read and write. Ele fica salvo apenas na sessao do navegador.</p>
          <form class="filter-stack" data-cid="dashboard" data-message="saveCms">
            <div class="mini-field"><label>Token GitHub</label><input name="githubToken" type="password" value="${props.getCmsToken()}" placeholder="github_pat_..."></div>
            <button class="gold-btn" type="submit">Salvar dados do site.json</button>
          </form>
          ${saveStatus ? `<p class="login-error">${saveStatus}</p>` : ""}
        </article>
      </div>
    `;
    const renderTabPanel = () => {
      if (activeTab === "overview") {
        return `<div class="metric-grid">${dashboardContent.metrics.map((metric) => `<div class="metric"><small>${metric.label}</small><strong${metric.color ? ` style="color:${metric.color};"` : ""}>${metric.value}</strong></div>`).join("")}</div><div class="dashboard-columns">${renderCollection("Atividades recentes", dashboardContent.activities)}${renderCollection("Imoveis mais acessados", properties.slice(0, 3).map((property, index) => ({ title: property.title, detail: `${1250 - index * 230} visualizacoes`, value: `#${index + 1}` })))}</div>`;
      }
      if (activeTab === "properties") return renderPropertiesPanel();
      if (activeTab === "leads") return renderCollection("Pipeline de leads", dashboardContent.leads);
      if (activeTab === "clients") return renderCollection("Base de clientes", dashboardContent.clients);
      if (activeTab === "appointments") return renderCollection("Agenda comercial", dashboardContent.appointments);
      if (activeTab === "messages") return renderCollection("Caixa de mensagens", dashboardContent.messages);
      if (activeTab === "reports") return renderCollection("Indicadores e leitura", dashboardContent.reports);
      return renderSettings();
    };
    return {
      next(message = {}) {
        if (message.type === "setTab") activeTab = message.value || activeTab;
        if (message.type === "saveCms") {
          const token = message.fields.githubToken || props.getCmsToken();
          props.setCmsToken(token);
          saveStatus = "Salvando...";
          saveCmsDataToGitHub(token, createCmsPayload()).then(() => {
            saveStatus = "CMS salvo no repositorio com sucesso.";
            props.requestRender();
          }).catch((error) => {
            saveStatus = error.message;
            props.requestRender();
          });
        }
        const currentLabel = tabs.find(([id]) => id === activeTab)?.[1] || "Dashboard";
        return {
          done: false,
          value: `
            <section id="dashboard" class="section dashboard-section">
              <div class="container">
                <div class="section-title"><div><span class="eyebrow">Area interna</span><h2>Dashboard administrativo</h2><p>Estado ficticio para imoveis, leads, clientes, agendamentos, mensagens e relatorios.</p></div></div>
                <div class="dashboard-grid">
                  <aside class="dashboard-nav">${brand()}<div class="dash-menu">${tabs.map(([id, label]) => `<button class="${id === activeTab ? "active" : ""}" type="button" data-cid="dashboard" data-message="setTab" data-value="${id}">${label}</button>`).join("")}<button type="button" data-cid="dashboard" data-message="logout">Sair</button></div></aside>
                  <div class="dashboard-board"><div class="dashboard-head"><h2>${currentLabel}</h2><div class="broker-person"><img class="avatar" src="${brokers[1].photo}" alt="Admin"><strong>Admin</strong></div></div>${renderTabPanel()}</div>
                </div>
              </div>
            </section>
          `,
        };
      },
    };
  };

  const LoginComponent = ({ props }) => {
    let error = "";
    return {
      next(message = {}) {
        if (message.type === "login") {
          const ok = props.login(message.fields.email, message.fields.password);
          error = ok ? "" : "Use admin@suaimobiliaria.com.br e a senha derivada do token CMS.";
        }
        return {
          done: false,
          value: `<section id="login" class="section login-section"><div class="container login-layout"><div class="login-copy"><span class="eyebrow">Area restrita</span><h2>Entrar no dashboard</h2><p>Acesse indicadores, leads, imoveis e salvamento do CMS.</p></div><form class="login-card" data-cid="login" data-message="login"><label class="mini-field"><span>E-mail</span><input name="email" type="email" value="admin@suaimobiliaria.com.br" autocomplete="username"></label><label class="mini-field"><span>Senha</span><input name="password" type="password" value="${CMS_LOGIN_PASSWORD}" autocomplete="current-password"></label>${error ? `<p class="login-error">${error}</p>` : `<p class="route-note">Senha sincronizada com um fragmento do token do CMS para esta demonstracao.</p>`}<button class="gold-btn" type="submit">Acessar dashboard</button></form></div></section>`,
        };
      },
    };
  };

  const ContactComponent = ({ props }) => {
    let status = "";
    return {
      next(message = {}) {
        if (message.type === "contact") {
          props.addLead({ name: message.fields.name || "Contato", source: "Contato", interest: message.fields.interest || "Mensagem geral", stage: "novo" });
          status = "Mensagem salva como lead.";
        }
        return {
          done: false,
          value: `<section class="section detail-section"><div class="container"><div class="section-title"><div><span class="eyebrow">Contato</span><h2>Fale com a imobiliaria</h2><p>Contato, WhatsApp, endereco, mapa e formulario de interesse.</p></div></div><div class="phone-strip"><article class="phone-card"><h3>WhatsApp</h3><p class="location">(71) 99999-0000</p><button class="gold-btn" type="button">Iniciar conversa</button></article><form class="phone-card" data-cid="contact" data-message="contact"><h3>Formulario</h3><div class="mini-field"><label>Nome</label><input name="name" required></div><div class="mini-field"><label>Telefone</label><input name="phone" required></div><div class="mini-field"><label>Interesse</label><input name="interest"></div><button class="gold-btn" type="submit">Enviar</button>${status ? `<p class="login-error">${status}</p>` : ""}</form><article class="phone-card"><h3>Endereco</h3><p class="location">Rua das Acacias, 129<br>Caminho das Arvores, Salvador/BA</p><button class="ghost-btn" type="button">Ver mapa</button></article></div></div></section>`,
        };
      },
    };
  };

  const FooterComponent = () => ({
    next: () => ({
      done: false,
      value: `<footer id="contato" class="site-footer"><div class="container footer-grid"><div>${brand()}<p>Conectando pessoas aos melhores imoveis e oportunidades.</p><p>Instagram · Facebook · WhatsApp · YouTube</p><a class="footer-dashboard" href="#dashboard" data-route="dashboard">Dashboard</a></div><div><h4>Institucional</h4><div class="footer-links"><a>Sobre nos</a><a>Trabalhe conosco</a><a>Politica de privacidade</a><a>Termos de uso</a></div></div><div><h4>Imoveis</h4><div class="footer-links"><a data-route="comprar">Comprar</a><a data-route="comprar">Alugar</a><a data-route="destaques">Lancamentos</a><a data-route="anuncie">Anuncie seu imovel</a></div></div><div><h4>Contato</h4><p>(71) 99999-0000<br>contato@suaimobiliaria.com.br<br>Rua das Acacias, 129<br>Salvador/BA</p></div></div></footer>`,
    }),
  });

  const FloatingWhatsComponent = () => ({
    next: () => ({ done: false, value: `<button class="float-whats" type="button" data-route="contato" aria-label="WhatsApp">☎</button>` }),
  });

  const createApp = (rootSelector = "#app") => {
    const root = document.querySelector(rootSelector) || document.body.appendChild(Object.assign(document.createElement("div"), { id: "app" }));
    root.classList.add("app-shell");

    const routeState = createStateComponent({ route: parseRoute(), selectedPropertyId: properties[0]?.id || null }, (state, message) => {
      if (message.type !== "route") return state;
      const nextRoute = ROUTES.includes(message.route) ? message.route : "home";
      return { ...state, route: message.authenticated || nextRoute !== "dashboard" ? nextRoute : "login", selectedPropertyId: message.propertyId || state.selectedPropertyId };
    });
    const sessionState = createStateComponent(
      {
        favorites: new Set(JSON.parse(localStorage.getItem("suaimobiliaria:favorites") || "[]")),
        compare: new Set(),
        authenticated: false,
        cmsToken: sessionStorage.getItem("suaimobiliaria:cms-token") || "",
      },
      (state, message) => {
        if (message.type === "toggleFavorite") {
          const favorites = new Set(state.favorites);
          if (favorites.has(message.propertyId)) favorites.delete(message.propertyId);
          else favorites.add(message.propertyId);
          localStorage.setItem("suaimobiliaria:favorites", JSON.stringify([...favorites]));
          return { ...state, favorites };
        }
        if (message.type === "toggleCompare") {
          const compare = new Set(state.compare);
          if (compare.has(message.propertyId)) compare.delete(message.propertyId);
          else compare.add(message.propertyId);
          return { ...state, compare };
        }
        if (message.type === "login") return { ...state, authenticated: true };
        if (message.type === "logout") return { ...state, authenticated: false };
        if (message.type === "cmsToken") {
          sessionStorage.setItem("suaimobiliaria:cms-token", message.value || "");
          return { ...state, cmsToken: message.value || "" };
        }
        return state;
      }
    );
    const dashboardState = createStateComponent(dashboardContent, (state, message) => {
      if (message.type !== "lead") return state;
      dashboardContent = {
        ...dashboardContent,
        leads: [message.value, ...dashboardContent.leads],
        messages: [{ from: message.value.source, subject: message.value.interest, status: "Novo" }, ...dashboardContent.messages],
        activities: [{ icon: "L", title: "Novo lead recebido", detail: message.value.interest, time: "Agora", color: "var(--gold)" }, ...dashboardContent.activities],
      };
      return dashboardContent;
    });

    const components = new Map();
    const add = (id, createComponent, props = {}) => {
      const component = createComponent({ id, props });
      if (!component || typeof component.next !== "function") throw new Error(`Component ${id} must expose next().`);
      components.set(id, component);
      return component;
    };
    const getRoute = () => routeState.value().route;
    const getSession = () => sessionState.value();
    const addLead = (lead) => dashboardState.next({ type: "lead", value: lead });
    let requestRender = () => {};
    const propertyTools = {
      isFavorite: (id) => getSession().favorites.has(id),
      isCompared: (id) => getSession().compare.has(id),
      toggleFavorite: (id) => sessionState.next({ type: "toggleFavorite", propertyId: id }),
      toggleCompare: (id) => sessionState.next({ type: "toggleCompare", propertyId: id }),
      getSelectedProperty: () => properties.find((property) => property.id === routeState.value().selectedPropertyId) || properties[0],
      addLead,
    };
    const routeTools = { getRoute };

    add("topbar", TopbarComponent, routeTools);
    add("hero", HeroComponent, routeTools);
    add("stats", StatsComponent);
    add("featured", FeaturedComponent, propertyTools);
    add("announce", AnnounceComponent, { addLead });
    add("listing", ListingComponent, propertyTools);
    add("detail", DetailComponent, propertyTools);
    add("brokers", BrokersComponent);
    add("dashboard", DashboardComponentStateful, {
      getCmsToken: () => getSession().cmsToken,
      setCmsToken: (value) => sessionState.next({ type: "cmsToken", value }),
      requestRender: () => requestRender(),
    });
    add("login", LoginComponent, {
      login: (email, password) => {
        const ok = email === "admin@suaimobiliaria.com.br" && password === CMS_LOGIN_PASSWORD;
        if (ok) {
          sessionState.next({ type: "login" });
          setRoute("dashboard");
        }
        return ok;
      },
    });
    add("contact", ContactComponent, { addLead });
    add("footer", FooterComponent);
    add("floating-whats", FloatingWhatsComponent);

    const renderComponent = (id) => {
      const result = components.get(id)?.next();
      return result?.value || "";
    };
    const panel = (route, html) => `<div ${routeAttrs(getRoute() === route)}>${html}</div>`;
    const render = () => {
      const route = getRoute();
      root.innerHTML = `
        ${renderComponent("topbar")}
        <main>
          ${panel("home", route === "home" ? `${renderComponent("hero")}${renderComponent("stats")}${renderComponent("featured")}${renderComponent("announce")}${renderComponent("brokers")}` : "")}
          ${panel("destaques", route === "destaques" ? renderComponent("featured") : "")}
          ${panel("comprar", route === "comprar" ? renderComponent("listing") : "")}
          ${panel("imovel", route === "imovel" ? `${renderComponent("detail")}${renderComponent("brokers")}` : "")}
          ${panel("anuncie", route === "anuncie" ? renderComponent("announce") : "")}
          ${panel("login", route === "login" ? renderComponent("login") : "")}
          ${panel("dashboard", route === "dashboard" ? renderComponent("dashboard") : "")}
          ${panel("contato", route === "contato" ? renderComponent("contact") : "")}
        </main>
        ${renderComponent("footer")}
        ${renderComponent("floating-whats")}
      `;
    };
    requestRender = render;
    const setRoute = (route, options = {}) => {
      routeState.next({ type: "route", route, propertyId: options.propertyId, authenticated: getSession().authenticated });
      if (options.syncHash !== false) window.history.pushState({ route: getRoute() }, "", `#${getRoute()}`);
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const fieldsFrom = (form) => Object.fromEntries(new FormData(form).entries());
    const dispatch = async (target, event) => {
      const component = components.get(target.dataset.cid);
      if (!component) return;
      const isForm = target.tagName === "FORM";
      const message = {
        type: target.dataset.message,
        name: target.dataset.name || target.name,
        propertyId: target.dataset.propertyId,
        value: target.dataset.value ?? target.value,
        checked: target.checked,
        fields: isForm ? fieldsFrom(target) : {},
        target,
        event,
      };
      const result = component.next(message);
      if (result?.then) await result;
      if (message.type === "logout") {
        sessionState.next({ type: "logout" });
        setRoute("login");
        return;
      }
      render();
    };

    root.addEventListener("click", (event) => {
      const routeTarget = event.target.closest("[data-route]");
      if (routeTarget) {
        event.preventDefault();
        setRoute(routeTarget.dataset.route, { propertyId: routeTarget.dataset.propertyId || undefined });
        return;
      }
      const actionTarget = event.target.closest("[data-cid][data-message]");
      if (actionTarget && actionTarget.tagName !== "FORM") void dispatch(actionTarget, event);
    });
    root.addEventListener("change", (event) => {
      const actionTarget = event.target.closest("[data-cid][data-message]");
      if (actionTarget) void dispatch(actionTarget, event);
    });
    root.addEventListener("submit", (event) => {
      const actionTarget = event.target.closest("form[data-cid][data-message]");
      if (!actionTarget) return;
      event.preventDefault();
      void dispatch(actionTarget, event);
    });
    window.addEventListener("popstate", () => {
      routeState.next({ type: "route", route: parseRoute(), authenticated: getSession().authenticated });
      render();
    });
    window.addEventListener("hashchange", () => {
      const route = parseRoute();
      if (route !== getRoute()) setRoute(route, { syncHash: false });
    });
    if (getRoute() === "dashboard" && !getSession().authenticated) setRoute("login", { syncHash: false });
    else render();
    return { next: (message = {}) => (message.type === "render" ? render() : routeState.next(message)), states: { routeState, sessionState, dashboardState } };
  };

  window.SuaImobiliariaApp = { createApp, createStateComponent };

  document.addEventListener("DOMContentLoaded", async () => {
    try {
      await loadCmsData();
    } catch (error) {
      console.warn("CMS indisponivel, usando dados locais.", error);
    }
    createApp("#app");
  });
})();
