const TopbarComponent = ({ props }) => {
  let mobileMenuOpen = false;
  let lastRoute = null;

  return {
    next(message = {}) {
      if (message.type === "toggleMobileMenu") mobileMenuOpen = !mobileMenuOpen;

      const route = props.getRoute();
      if (lastRoute && lastRoute !== route) mobileMenuOpen = false;
      lastRoute = route;

      const routeInfo = props.getRouteInfo?.() || {};
      const session = props.getSession();
      const favoritesCount = session.favorites?.size || 0;
      const operation = routeInfo.operation === "alugar" ? "alugar" : "comprar";
      const pageTitleMap = {
        home: "Início",
        destaques: "Destaques",
        comprar: operation === "alugar" ? "Alugar" : "Comprar",
        imovel: "Imóvel",
        favoritos: "Favoritos",
        quiz: "Quiz",
        anuncie: "Anuncie",
        login: "Acesso",
        dashboard: "Dashboard",
        contato: "Contato",
        sobre: "Sobre",
        vendedores: "Vendedores",
        brokers: "Vendedores",
      };
      const pageSubtitleMap = {
        home: "Curadoria premium e busca rápida",
        destaques: "Lançamentos e oportunidades em destaque",
        comprar:
          operation === "alugar" ? "Busca para locação" : "Busca para compra",
        imovel: "Detalhes do produto",
        favoritos: "Seleção salva pelo usuário",
        quiz: "Perfil de preferência e recomendação",
        anuncie: "Captação e conversão",
        login: "Acesso ao painel",
        dashboard: "Gestão comercial",
        contato: "Fale com a imobiliária",
        sobre: "Conheça a equipe e o processo",
        financiamento: "Simulação e apoio financeiro",
        vendedores: "Base comercial e atendimento",
        brokers: "Base comercial e atendimento",
      };
      const pageTitle = pageTitleMap[route] || "Página";
      const pageSubtitle = pageSubtitleMap[route] || "";
      const navLinks = [
        { route: "imoveis", label: "Buscar imóvel" },
        { route: "anuncie", label: "Anunciar imóvel" },
        { route: "contato", label: "Contato" },
      ];
      const renderSearchPanel = () => /*html*/ `
        <div class="search-panel topbar-search-panel" role="search" aria-label="Pesquisa principal">
          <div class="tabs topbar-search-tabs">
            <button class="tab ${operation === "comprar" ? "active" : ""}" type="button" data-cid="hero" data-message="setTab" data-value="comprar">Comprar</button>
            <button class="tab ${operation === "alugar" ? "active" : ""}" type="button" data-cid="hero" data-message="setTab" data-value="alugar">Alugar</button>
          </div>
          <div class="search-grid topbar-search-grid">
            <label class="field"><span>Localizacao</span><input name="quickLocation" placeholder="Cidade, bairro ou condominio"></label>
            <label class="field"><span>Tipo de imovel</span><select><option>Todos</option><option>Casa</option><option>Apartamento</option><option>Terreno</option></select></label>
            <label class="field"><span>Faixa de preco</span><select><option>Qualquer preco</option><option>Ate R$ 700 mil</option><option>Acima de R$ 1 mi</option></select></label>
            <button class="gold-btn topbar-search-btn" type="button" data-route="imoveis" data-operation="${operation}">${operation === "alugar" ? "Buscar para alugar" : "Buscar para comprar"}</button>
          </div>
        </div>
      `;

      return {
        done: false,
        value: /*html*/ `
          <header class="topbar ${mobileMenuOpen ? "topbar--mobile-open" : ""}">
            <!-- 1. Eyebrow strip -->
            <div class="topbar-eyebrow">
              <div class="container topbar-eyebrow-container">
                <div class="topbar-eyebrow-left">
                  <span>📞 (77) 3028-0606</span>
                </div>
                <div class="topbar-eyebrow-right">
                  <button class="eyebrow-buscar-btn" type="button" data-route="imoveis">Buscar</button>
                </div>
              </div>
            </div>

            <!-- 2. Main white bar -->
            <div class="topbar-main">
              <div class="container topbar-main-container">
                <a class="${active(route, "home")} topbar-brand" href="#home" data-route="home">
                  ${window.LOGO_SVG}
                </a>
                
                <nav class="topbar-nav">
                  ${navLinks
                    .map((item) => {
                      const isActive = item.active ?? active(route, item.route);
                      const href = item.operation
                        ? `#${item.route}?operation=${encodeURIComponent(item.operation)}`
                        : `#${item.route}`;
                      const operationAttr = item.operation
                        ? ` data-operation="${item.operation}"`
                        : item.route === "imoveis"
                          ? ` data-operation="${operation}"`
                          : "";
                      return `<a class="${isActive}" href="${href}" data-route="${item.route}"${operationAttr}>${item.label}</a>`;
                    })
                    .join("")}
                </nav>
              </div>
            </div>

            <div class="topbar-shell container" style="display: none;">
              <div class="topbar-search-shell">
                ${renderSearchPanel()}
              </div>
            </div>
          </header>
        `,
      };
    },
  };
};
