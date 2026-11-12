/* Mezanino — financiamento sem simulador e sem etapas substitutas. */
const FinancingComponent = ({ props }) => ({
  next() {
    return {
      done: false,
      value: /*html*/`
        <section id="financing-section" class="section financing-section mezanino-financing-clean">
          <div class="container">
            <div class="breadcrumb-row"><span>Início</span><span>Financiamento</span></div>
            <div class="financing-hero">
              <div class="financing-hero-text">
                <span class="eyebrow">Mezanino Imobiliária</span>
                <h2>Financiamento imobiliário</h2>
                <p>Para conhecer as possibilidades de financiamento de um imóvel, consulte as condições diretamente com a instituição financeira de sua preferência.</p>
              </div>
            </div>
          </div>
        </section>
      `,
    };
  },
});
