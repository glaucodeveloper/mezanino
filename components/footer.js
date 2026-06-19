  const FooterComponent = () => ({
    next: () => ({
      done: false,
      value: `<footer id="contato" class="site-footer"><div class="container footer-grid"><div>${brand()}<p>Conectando pessoas aos melhores imoveis e oportunidades.</p><p>Instagram · Facebook · WhatsApp · YouTube</p><a class="footer-dashboard" href="#dashboard" data-route="dashboard">Dashboard</a></div><div><h4>Institucional</h4><div class="footer-links"><a>Sobre nos</a><a>Trabalhe conosco</a><a>Politica de privacidade</a><a>Termos de uso</a></div></div><div><h4>Imoveis</h4><div class="footer-links"><a data-route="comprar">Comprar</a><a data-route="comprar">Alugar</a><a data-route="destaques">Lancamentos</a><a data-route="anuncie">Anuncie seu imovel</a></div></div><div><h4>Contato</h4><p>(71) 99999-0000<br>contato@suaimobiliaria.com.br<br>Rua das Acacias, 129<br>Salvador/BA</p></div></div></footer>`,
    }),
  });
