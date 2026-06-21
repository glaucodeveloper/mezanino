  const TopbarComponent = ({ props }) => ({
    next() {
      const route = props.getRoute();
      const routeInfo = props.getRouteInfo?.() || {};
      const session = props.getSession();
      const favoritesCount = session.favorites?.size || 0;
      const isBuyingMode = route === "comprar" && routeInfo.operation !== "alugar";
      const isRentingMode = route === "comprar" && routeInfo.operation === "alugar";
      return {
        done: false,
        value: /*html*/`
          <header class="topbar">
            <div class="topbar-brand-slot">
              ${brand()}
            </div>
            <nav class="nav" aria-label="Navegacao principal">
              <a class="${active(route, "home")}" href="#home" data-route="home">Inicio</a>
              <a class="${isBuyingMode ? "active" : active(route, "comprar")}" href="#comprar" data-route="comprar" data-operation="comprar">Comprar</a>
              <a class="${isRentingMode ? "active" : ""}" href="#comprar?operation=alugar" data-route="comprar" data-operation="alugar">Alugar</a>
              <a class="${active(route, "destaques")}" href="#destaques" data-route="destaques">Lancamentos</a>
              <a class="nav-wide ${active(route, "anuncie")}" href="#anuncie" data-route="anuncie"><span>Anuncie</span><span>seu imovel</span></a>
              <a class="${active(route, "favoritos")}" href="#favoritos" data-route="favoritos">Favoritos</a>
              <a class="${active(route, "quiz")}" href="#quiz" data-route="quiz">Quiz</a>
              <a class="${active(route, "vendedores")}" href="#vendedores" data-route="vendedores">Vendedores</a>
              <a class="${active(route, "contato")}" href="#contato" data-route="contato">Contato</a>
            </nav>
            <div class="topbar-tools">
              <a class="icon-btn" href="${isRentingMode ? "#comprar?operation=alugar" : "#comprar"}" data-route="comprar" data-operation="${isRentingMode ? "alugar" : "comprar"}" aria-label="Buscar">
                <span>⌕</span>
              </a>
              <a class="icon-btn ${active(route, "favoritos")}" href="#favoritos" data-route="favoritos" aria-label="Favoritos">
                <span>${favoriteMark(favoritesCount > 0)}</span>
                ${favoritesCount ? `<small>${favoritesCount}</small>` : ""}
              </a>
              <a class="icon-btn ${active(route, session.authenticated ? "dashboard" : "login")}" href="#${session.authenticated ? "dashboard" : "login"}" data-route="${session.authenticated ? "dashboard" : "login"}" aria-label="Conta">
                <span>${session.authenticated ? "☻" : "∘"}</span>
              </a>
              <a class="pill-btn" href="#contato" data-route="contato">Fale conosco</a>
            </div>
          </header>
        `,
      };
    },
  });

