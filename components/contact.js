const ContactComponent = ({ props }) => {
  let status = "";
  let announceStatus = "";
  let announceOpen = false;

  return {
    next(message = {}) {
      if (message.type === "contact") {
        props.addLead({
          name: message.fields.name || "Contato",
          source: "Contato",
          interest: message.fields.interest || "Mensagem geral",
          email: message.fields.email || "",
          phone: message.fields.phone || "",
          stage: "novo",
        });
        status = "Mensagem enviada imediatamente!";
      }

      if (message.type === "toggleAnnounce") {
        announceOpen = !announceOpen;
        announceStatus = "";
      }

      if (message.type === "announce") {
        props.addLead({
          name: message.fields.ownerName || "Lead de captacao",
          source: "Anuncie seu imovel",
          interest: message.fields.propertyType || "Imovel para avaliacao",
          stage: "novo",
        });
        announceOpen = true;
        announceStatus = "Lead de captacao salvo no dashboard.";
      }

      const announcePanelClass = announceOpen ? "is-active" : "is-inactive";
      const contactPanelClass = announceOpen ? "is-inactive" : "is-active";

      return {
        done: false,
        value: /*html*/ `
            <section class="section detail-section contact-section">
              <div class="container">
                <div class="breadcrumb-row"><span>Home</span><span>Contato</span></div>

                <div class="ad-banner contact-banner">
                  <div class="ad-copy contact-banner-copy">
                    <div class="section-title">
										<div>
											<span class="eyebrow">Contato</span>
											<h2>Fale com a imobiliaria</h2>
											<p>Atendimento consultivo, envio de favoritos, visitas e captacao em um unico ponto de contato.</p>
										</div>
                </div>
                    <div class="contact-banner-actions">
                      <button class="gold-btn" type="button" data-cid="contact" data-message="toggleAnnounce">${announceOpen ? "Voltar ao contato" : "Anuncie"}</button>
                    </div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1100&q=82" alt="Sala elegante" loading="lazy">
                  <div class="contact-banner-slot">
                    <div class="contact-panel ${contactPanelClass}">
                      <div class="phone-strip contact-strip">
                        <article class="phone-card">
                          <h3>WhatsApp</h3>
                          <p class="location">(71) 99999-0000</p>
                          <a class="gold-btn" href="https://api.whatsapp.com/send?phone=5571999990000&text=${encodeURIComponent('Olá! Gostaria de falar com um corretor da Mezanino Imobiliária.')}" target="_blank" rel="noreferrer" style="text-decoration: none; text-align: center; display: inline-flex; align-items: center; justify-content: center;">Iniciar conversa</a>
                        </article>
                        <form class="phone-card" data-cid="contact" data-message="contact">
                          <h3>Formulario</h3>
                          <div>
                            <div class="mini-field">
                              <label>Mensagem / Interesse *</label>
                              <textarea name="interest" required placeholder="Quero saber mais sobre..." style="width: 100%; height: 110px; padding: 10px; border-radius: 6px; border: 1px solid #cbd5e0; background: #ffffff; color: #2d3748; outline: none; box-sizing: border-box; font-family: var(--font-body); font-size: 0.9rem;"></textarea>
                            </div>
                            <button class="gold-btn" type="submit" style="width: 100%; margin-top: 15px;">Enviar Imediato</button>
                            ${status ? `<p class="login-error" style="color: var(--gold); margin-top: 8px;">${status}</p>` : ""}
                          </div>
                        </form>
                        <article class="phone-card">
                          <h3>Endereco</h3>
                          <p class="location">Rua das Acacias, 129<br>Caminho das Arvores, Salvador/BA</p>
                          <a class="ghost-btn" href="https://www.google.com/maps?q=${encodeURIComponent('Rua das Acacias, 129, Caminho das Arvores, Salvador, BA')}" target="_blank" rel="noreferrer" style="text-decoration: none; text-align: center; display: inline-flex; align-items: center; justify-content: center;">Ver mapa</a>
                        </article>
                      </div>
                    </div>
                    <div class="contact-panel ${announcePanelClass}">
                      <form class="phone-strip announce-form-grid" data-cid="contact" data-message="announce" aria-label="Fluxo de anuncio" style="grid-template-columns: 1fr 1fr; gap: 20px;">
                        <article class="phone-card">
                          <h3>1. Imovel</h3>
                          <div class="mini-field"><label>Tipo</label><select name="propertyType"><option>Casa</option><option>Apartamento</option><option>Terreno</option></select></div>
                          <div class="mini-field"><label>Bairro</label><input name="neighborhood" placeholder="Informe o bairro"></div>
                          <div class="mini-field"><label>Valor estimado</label><input name="value" placeholder="R$"></div>
                        </article>
                        <article class="phone-card">
                          <h3>2. Envio</h3>
                          <div class="mini-field"><label>Descricao</label><input name="description" placeholder="Resumo do imovel"></div>
                          <label class="check-list"><span><input name="privacy" type="checkbox" required> Aceito a politica de privacidade</span></label>
                          ${announceStatus ? `<p class="login-error">${announceStatus}</p>` : `<p class="location">Notificacao simulada para a equipe comercial.</p>`}
                          <button class="gold-btn" style="width:100%; margin-top: 15px;" type="submit">Continuar</button>
                        </article>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          `,
      };
    },
  };
};
