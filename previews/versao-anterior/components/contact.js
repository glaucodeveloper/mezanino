const ContactComponent = () => ({
  next() {
    const contactConfig = window.MezaninoContactConfig || {};
    const phoneDisplay = contactConfig.phoneDisplay || "(77) 98159-0101";
    const phoneDigits = contactConfig.phoneDigits || "5577981590101";
    const message = encodeURIComponent(
      "Olá! Gostaria de falar com um corretor da Mezanino Imobiliária.",
    );

    return {
      done: false,
      value: /*html*/ `
        <section class="section detail-section contact-section">
          <style>
            .contact-section .contact-whatsapp-only {
              display: grid;
              grid-template-columns: minmax(0, 1.08fr) minmax(360px, .92fr);
              min-height: 540px;
              overflow: hidden;
              border-radius: 28px;
              background: #082b59;
              box-shadow: 0 28px 70px rgba(12, 34, 61, .16);
            }
            .contact-section .contact-whatsapp-copy {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: clamp(36px, 6vw, 82px);
              color: #fff;
            }
            .contact-section .contact-whatsapp-copy .eyebrow {
              color: #d8ad61;
            }
            .contact-section .contact-whatsapp-copy h2 {
              max-width: 10ch;
              margin: 10px 0 18px;
              color: #fff;
              font-size: clamp(2.5rem, 5vw, 5.4rem);
              line-height: .94;
              letter-spacing: -.055em;
            }
            .contact-section .contact-whatsapp-copy p {
              max-width: 560px;
              margin: 0 0 30px;
              color: rgba(255,255,255,.78);
              font-size: 1rem;
              line-height: 1.75;
            }
            .contact-section .contact-whatsapp-actions {
              display: flex;
              flex-wrap: wrap;
              gap: 14px;
              align-items: center;
            }
            .contact-section .contact-whatsapp-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              min-height: 52px;
              padding: 0 24px;
              border-radius: 8px;
              background: #d3a251;
              color: #fff;
              text-decoration: none;
              font-weight: 750;
              box-shadow: 0 12px 30px rgba(0,0,0,.18);
            }
            .contact-section .contact-whatsapp-number {
              color: rgba(255,255,255,.84);
              font-weight: 650;
            }
            .contact-section .contact-whatsapp-media {
              position: relative;
              min-height: 540px;
            }
            .contact-section .contact-whatsapp-media::after {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(90deg, rgba(8,43,89,.2), transparent 42%);
              pointer-events: none;
            }
            .contact-section .contact-whatsapp-media img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            @media (max-width: 860px) {
              .contact-section .contact-whatsapp-only {
                grid-template-columns: 1fr;
              }
              .contact-section .contact-whatsapp-media {
                min-height: 320px;
                order: -1;
              }
            }
          </style>

          <div class="container">
            <div class="breadcrumb-row"><span>Home</span><span>Contato</span></div>

            <div class="contact-whatsapp-only">
              <div class="contact-whatsapp-copy">
                <span class="eyebrow">Contato direto</span>
                <h2>Fale pelo WhatsApp</h2>
                <p>Atendimento consultivo para imóveis, visitas, propostas e dúvidas em um único canal.</p>

                <div class="contact-whatsapp-actions">
                  <a
                    class="contact-whatsapp-button"
                    href="https://api.whatsapp.com/send?phone=${phoneDigits}&text=${message}"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span aria-hidden="true">◉</span>
                    Iniciar conversa
                  </a>
                  <span class="contact-whatsapp-number">${phoneDisplay}</span>
                </div>
              </div>

              <div class="contact-whatsapp-media">
                <img
                  src="./ChatGPT Image 22 de jul. de 2026, 16_55_05.png"
                  alt="Sala contemporânea"
                  loading="lazy"
                >
              </div>
            </div>
          </div>
        </section>
      `,
    };
  },
});
