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
        financiamento: "Financiamento imobiliário",
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
        value: `
            <style>
              /* topbar-phone-white-navbar */
              .topbar-main {
                background: #ffffff;
              }

              .topbar-white-contact {
                min-height: 25px;
                display: flex;
                align-items: center;
                background: #ffffff;
                color: #0b315f;
                position: relative;
                z-index: 5;
              }

              .topbar-white-contact .container {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
              }

              .topbar-white-phone {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                color: #0b315f !important;
                text-decoration: none !important;
                border: 0 !important;
                box-shadow: none !important;
                font-family: var(--font-body, Arial, sans-serif);
                font-size: 12px;
                font-weight: 600;
                line-height: 1;
                letter-spacing: 0.025em;
                white-space: nowrap;
              }

              .topbar-white-phone:hover {
                color: #bd8d44 !important;
              }

              .topbar-white-phone::before,
              .topbar-white-phone::after {
                display: none !important;
                content: none !important;
              }

              .topbar-white-phone-icon {
                width: 13px;
                height: 13px;
                fill: currentColor;
                flex: 0 0 auto;
              }

              @media (max-width: 720px) {
                .topbar-white-contact {
                  min-height: 23px;
                }

                .topbar-white-contact .container {
                  padding-inline: 16px;
                  box-sizing: border-box;
                }

                .topbar-white-phone {
                  font-size: 11px;
                }
              }
            </style>

<header class="topbar ${mobileMenuOpen ? "topbar--mobile-open" : ""}">

            <!-- 1. Eyebrow strip -->


<!-- 2. Main white bar -->
            <div class="topbar-main">
              

              <div class="container topbar-main-container">
                <a class="topbar-brand" href="#home" data-route="home" style="text-decoration: none; border-bottom: 0;">
                  <img class="topbar-brand-image" src="./assets/identidade/logo-extenso.svg" alt="Mezanino Imobiliária">
                </a>
                
                <button
                  class="topbar-menu-button"
                  type="button"
                  data-cid="topbar"
                  data-message="toggleMobileMenu"
                  aria-expanded="${mobileMenuOpen ? "true" : "false"}"
                  aria-controls="topbar-mobile-nav topbar-mobile-search"
                  aria-label="${mobileMenuOpen ? "Fechar menu" : "Abrir menu"}"
                >
                  <span class="topbar-menu-button-lines" aria-hidden="true">
                    <span></span>
                  </span>
                </button>
                <nav id="topbar-mobile-nav" class="topbar-nav" aria-label="Navegação principal">
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
                                        <a
                      class="phone-in-bar phone-in-bar--whatsapp"
                      href="https://api.whatsapp.com/send?phone=5577981590101&text=Ol%C3%A1%21%20Gostaria%20de%20falar%20com%20um%20corretor%20da%20Mezanino%20Imobili%C3%A1ria."
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Conversar pelo WhatsApp no número (77) 98159-0101"
                    >
                      <svg
                        class="phone-in-bar-whatsapp-icon"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M16.05 4.2a11.54 11.54 0 0 0-9.82 17.6L4.7 27.4l5.73-1.5a11.55 11.55 0 1 0 5.62-21.7Zm0 20.98a9.42 9.42 0 0 1-4.8-1.31l-.34-.2-3.4.9.91-3.31-.22-.35a9.44 9.44 0 1 1 7.85 4.27Zm5.17-7.06c-.28-.14-1.67-.82-1.93-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4a8.55 8.55 0 0 1-1.58-1.97c-.16-.28-.02-.43.12-.57.13-.13.28-.33.43-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44 0 1.44 1.05 2.83 1.2 3.02.14.19 2.06 3.14 4.98 4.4.7.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.67-.69 1.91-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.54-.33Z"/>
                      </svg>
                      <span>(77) 98159-0101</span>
                    </a>
    
                </nav>
              </div>
            </div>

            <div id="topbar-mobile-search" class="topbar-shell container">
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
