const HeroComponent = ({ id, props }) => {
  // Local state inside the closure of HeroComponent
  let activeDropdown = null; // null, "neighborhood", "type"
  let neighborhoodSearch = "";

  // Selected filters
  let selectedOperation = "comprar"; // "comprar" or "alugar"
  let selectedNeighborhoods = ["(Selecionar tudo)"];
  let selectedTypes = ["Todos"];

  const escapeText = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  return {
    next(message = {}) {
      // Message handlers
      if (message.type === "toggleDropdown") {
        const value = message.value;
        activeDropdown = activeDropdown === value ? null : value;
      } 
      else if (message.type === "closeDropdowns") {
        activeDropdown = null;
      }
      else if (message.type === "selectOperation") {
        selectedOperation = message.value;
        activeDropdown = null;
      }
      else if (message.type === "toggleNeighborhood") {
        const val = message.value;
        if (val === "(Selecionar tudo)" || val === "Todos") {
          selectedNeighborhoods = ["(Selecionar tudo)"];
        } else {
          selectedNeighborhoods = selectedNeighborhoods.filter(
            (n) => n !== "(Selecionar tudo)" && n !== "Todos"
          );
          if (selectedNeighborhoods.includes(val)) {
            selectedNeighborhoods = selectedNeighborhoods.filter((n) => n !== val);
            if (selectedNeighborhoods.length === 0) {
              selectedNeighborhoods = ["(Selecionar tudo)"];
            }
          } else {
            selectedNeighborhoods.push(val);
          }
        }
      }
      else if (message.type === "searchNeighborhood") {
        neighborhoodSearch = message.value || "";
      }
      else if (message.type === "toggleType") {
        const val = message.value;
        if (val === "Todos") {
          selectedTypes = ["Todos"];
        } else {
          selectedTypes = selectedTypes.filter((t) => t !== "Todos");
          if (selectedTypes.includes(val)) {
            selectedTypes = selectedTypes.filter((t) => t !== val);
            if (selectedTypes.length === 0) {
              selectedTypes = ["Todos"];
            }
          } else {
            selectedTypes.push(val);
          }
        }
      }
      else if (message.type === "triggerSearch") {
        const activeOperation = message.value === "alugar" || message.value === "comprar"
          ? message.value
          : document.querySelector('.hero .mezanino-search-tab[aria-pressed="true"]')?.dataset.value || selectedOperation;
        const params = {
          operation: activeOperation,
        };
        if (!selectedNeighborhoods.includes("(Selecionar tudo)")) {
          params.neighborhood = selectedNeighborhoods.join(",");
        }
        if (!selectedTypes.includes("Todos")) {
          params.type = selectedTypes.join(",");
        }
        props.goToRoute?.("comprar", params);
        activeDropdown = null;
      }

      // Generate dynamic options from global properties
      const allProperties = window.properties || [];      const neighborhoods = [
        "(Selecionar tudo)",
        ...new Set(allProperties.map((p) => p.neighborhood).filter(Boolean)),
      ];

      const filteredNeighborhoods = neighborhoods.filter((n) =>
        n.toLowerCase().includes(neighborhoodSearch.toLowerCase())
      );

      const types = ["Todos", "Casa", "Apartamento", "Terreno"];

      // Trigger texts
      const triggerNeighborhoodText = selectedNeighborhoods.includes("(Selecionar tudo)")
        ? "Bairro"
        : selectedNeighborhoods.length > 1
          ? `Bairros (${selectedNeighborhoods.length})`
          : selectedNeighborhoods[0];

      const triggerTypeText = selectedTypes.includes("Todos")
        ? "Tipos de imóvel"
        : selectedTypes.length > 1
          ? `Tipos (${selectedTypes.length})`
          : selectedTypes[0];

      return {
        done: false,
        value: /*html*/ `
          <section id="home" class="hero">
            <div class="hero-overlay" style="position: absolute; inset: 0; background: transparent; z-index: 1;"></div>
            
            <div class="container hero-shell">
              <div class="hero-stack">
                
                <!-- Original Phrase -->
                <div class="mezanino-hero-editorial">
                   <h1 class="hero-title">Sonhe, conecte e realize</h1>
                 </div>

                <!-- Main Search Bar Card -->
                <div class="custom-search-panel" style="background: #fff; padding: 28px 30px; border-radius: 8px; box-shadow: 0 15px 45px rgba(0,0,0,0.15); width: 100%; max-width: 1140px; box-sizing: border-box; transform: translateY(50px); z-index: 10;">
                  <!-- Code Search Row -->
                  <div class="hero-code-search" style="z-index:10; display:flex; align-items:center; gap:5px; margin:0 0 18px; color:#4a5568; font-size:0.92rem; width:100%;" data-route="comprar">
                    <span style="font-size:0.98rem;"> <svg style="width:25px; fill:#bd6f31" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.8 579.1 554.2 566.6 566.7C554.2 579.1 533.8 579.1 521.4 566.6L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128z"/></svg> </span>
                    <input type="search" name="propertyCode" placeholder="Buscar por código" aria-label="Código do imóvel" autocomplete="off" spellcheck="false" style="font: inherit; font-weight:500; color:inherit; background:transparent; border:0; outline:0; width:100%; min-width:0; padding:0;">
                  </div>

                 <div class="mezanino-search-tabs" role="group" aria-label="Finalidade da busca">
  <button type="button" class="mezanino-search-tab ${selectedOperation === "comprar" ? "is-active" : ""}" data-cid="hero" data-message="selectOperation" data-value="comprar" aria-pressed="${selectedOperation === "comprar"}">Comprar</button>
  <button type="button" class="mezanino-search-tab ${selectedOperation === "alugar" ? "is-active" : ""}" data-cid="hero" data-message="selectOperation" data-value="alugar" aria-pressed="${selectedOperation === "alugar"}">Alugar</button>
</div>
                 <div   class="custom-search-row" style="display: grid; grid-template-columns: repeat(2, minmax(205px, 1fr)) minmax(150px, 180px); gap: 20px; align-items: stretch; justify-content: center; width: min(100%, 1040px); margin: 0 auto;">
                    
                    <!-- 1. Bairro -->
                    <div class="custom-select-field" style="position: relative; width: 100%;">
                      <div class="custom-select-trigger ${activeDropdown === "neighborhood" ? "is-open" : ""}" data-cid="hero" data-message="toggleDropdown" data-value="neighborhood" style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px 22px; background: #fff; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.95rem; color: #4a5568;">
                        <span>${escapeText(triggerNeighborhoodText)}</span>
                        <span style="color: #a0aec0; font-size: 0.75rem;">▼</span>
                      </div>
                      ${activeDropdown === "neighborhood" ? /*html*/ `
                        <div class="custom-select-dropdown" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 1000; padding: 12px; margin-top: 6px; width: 280px; box-sizing: border-box;">
                          <div class="dropdown-search-wrapper" style="display: flex; align-items: center; gap: 8px; border: 1px solid #cbd5e0; border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; background: #fff;">
                            <span style="color: #718096; font-size: 0.88rem;">🔍</span>
                            <input type="text" class="dropdown-search-input" placeholder="Pesquisar..." value="${escapeText(neighborhoodSearch)}" data-cid="hero" data-message="searchNeighborhood" style="border: 0; outline: none; width: 100%; font-size: 0.9rem; color: #2d3748;" autofocus>
                          </div>
                          <div class="dropdown-options-list" style="max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px;">
                            ${filteredNeighborhoods.map((n) => {
                              const isSelected = selectedNeighborhoods.includes(n);
                              return `
                                <div class="dropdown-option-row ${isSelected ? "is-selected-row" : ""}" data-cid="hero" data-message="toggleNeighborhood" data-value="${n}" style="padding: 8px 10px; display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.92rem; color: #2d3748; border-radius: 4px;">
                                  <input type="checkbox" style="pointer-events: none;" ${isSelected ? "checked" : ""}>
                                  <span>${escapeText(n)}</span>
                                </div>
                              `;
                            }).join("")}
                          </div>
                        </div>
                      ` : ""}
                    </div>

                    <!-- 2. Tipos de imóvel -->
                    <div class="custom-select-field" style="position: relative; width: 100%;">
                      <div class="custom-select-trigger ${activeDropdown === "type" ? "is-open" : ""}" data-cid="hero" data-message="toggleDropdown" data-value="type" style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px 22px; background: #fff; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.95rem; color: #4a5568;">
                        <span>${escapeText(triggerTypeText)}</span>
                        <span style="color: #a0aec0; font-size: 0.75rem;">▼</span>
                      </div>
                      ${activeDropdown === "type" ? /*html*/ `
                        <div class="custom-select-dropdown" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 1000; padding: 10px; margin-top: 6px; box-sizing: border-box;">
                          <div class="dropdown-options-list" style="display: flex; flex-direction: column; gap: 2px;">
                            ${types.map((t) => {
                              const isSelected = selectedTypes.includes(t);
                              return `
                                <div class="dropdown-option-row ${isSelected ? "is-selected-row" : ""}" data-cid="hero" data-message="toggleType" data-value="${t}" style="padding: 8px 10px; display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.92rem; color: #2d3748; border-radius: 4px;">
                                  <input type="checkbox" style="pointer-events: none;" ${isSelected ? "checked" : ""}>
                                  <span>${escapeText(t)}</span>
                                </div>
                              `;
                            }).join("")}
                          </div>
                        </div>
                      ` : ""}
                    </div>

                    <!-- 3. BUSCAR Button -->
                    <button class="custom-search-btn" type="button" data-cid="hero" data-message="triggerSearch" data-value="${selectedOperation}" style="background: var(--gold, #bd8d44); color: #fff; text-transform: uppercase; font-weight: bold; border-radius: 6px; padding: 16px 42px; border: 0; cursor: pointer; font-size: 0.98rem; letter-spacing: 0.05em; transition: background 0.2s;">
                      BUSCAR
                    </button>
                    
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
