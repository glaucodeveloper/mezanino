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
