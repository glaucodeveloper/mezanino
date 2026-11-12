  const FooterComponent = () => ({
    next: () => ({
      done: false,
      value: /*html*/`<footer id="contato" class="site-footer">
        <div class="container footer-grid" style="grid-template-columns: 1fr 1fr; gap: 40px;">
          <div>
            ${brand()}
            <p style="margin: 15px 0 20px; color: #4a5568; max-width: 420px;">Conectando pessoas aos melhores imóveis e oportunidades com curadoria premium.</p>
            <p style="color: #bd8d44; font-weight: 500; font-size: 0.92rem;">Instagram · Facebook · WhatsApp · YouTube</p>
          </div>
          <div class="footer-contact-column" style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; justify-content: end;">
            <h4 style="margin: 0; color: #16273f; font-family: var(--font-display); font-size: 1.25rem;">Contato</h4>
            <p style="margin: 0; color: #4a5568; line-height: 1.6; font-size: 0.95rem;">
              (77) 981590101<br>
              contato@suaimobiliaria.com.br<br>
              Rua das Acácias, 129 - Salvador/BA
            </p>
            <div style="display: flex; gap: 15px; margin-top: 10px; flex-wrap: wrap; justify-content: flex-end;">
              <a href="#home" data-route="home" style="color: #4a5568; font-size: 0.88rem; text-decoration: none;">Início</a>
              <a href="#comprar" data-route="comprar" style="color: #4a5568; font-size: 0.88rem; text-decoration: none;">Comprar</a>
              <a href="#comprar?operation=alugar" data-route="comprar" data-operation="alugar" style="color: #4a5568; font-size: 0.88rem; text-decoration: none;">Alugar</a>
              <a href="#anuncie" data-route="anuncie" style="color: #4a5568; font-size: 0.88rem; text-decoration: none;">Anuncie</a>
              <a href="#contato" data-route="contato" style="color: #4a5568; font-size: 0.88rem; text-decoration: none;">Contato</a>
              <a href="#login" data-route="login" style="color: #4a5568; font-size: 0.88rem; text-decoration: none;">Área Interna</a>
            </div>
          </div>
        </div>
      </footer>`,
    }),
  });
