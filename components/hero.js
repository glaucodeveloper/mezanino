const HeroComponent = ({ id, props }) => {
  // Local state inside the closure of HeroComponent
  let activeDropdown = null; // null, "operation", "city", "neighborhood", "type"
  let neighborhoodSearch = "";

  // Selected filters
  let selectedOperation = "comprar"; // "comprar" or "alugar"
  let selectedCity = "Todos";
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
      else if (message.type === "selectCity") {
        selectedCity = message.value;
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
        const params = {
          operation: selectedOperation,
        };
        if (selectedCity !== "Todos") params.city = selectedCity;
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
      const allProperties = window.properties || [];
      const cities = [
        "Todos",
        ...new Set(
          allProperties
            .map((p) => p.cityName || p.city?.split(",")[0]?.trim())
            .filter(Boolean)
        ),
      ];

      const neighborhoods = [
        "(Selecionar tudo)",
        ...new Set(allProperties.map((p) => p.neighborhood).filter(Boolean)),
      ];

      const filteredNeighborhoods = neighborhoods.filter((n) =>
        n.toLowerCase().includes(neighborhoodSearch.toLowerCase())
      );

      const types = ["Todos", "Casa", "Apartamento", "Terreno"];

      // Trigger texts
      const triggerOpText = selectedOperation === "alugar" ? "Alugar" : "Comprar";
      
      const triggerCityText = selectedCity;
      
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
          <section id="home" class="hero" style="background-image: url('./medium-shot-woman-holding-keys (1).jpg'); background-size: cover; background-position: center; position: relative;">
            <div class="hero-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.35); z-index: 1;"></div>
            
            <div class="container hero-shell" style="position: relative; z-index: 2;">
              <div class="hero-stack" style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 30px;">
                
                <!-- Main Search Bar Card -->
                <div class="custom-search-panel" style="background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 15px 45px rgba(0,0,0,0.2); width: 100%; max-width: 1140px; margin-top: 40px; box-sizing: border-box;">
                  <div class="custom-search-row" style="display: grid; grid-template-columns: repeat(4, 1fr) auto; gap: 16px; align-items: center; width: 100%;">
                    
                    <!-- 1. O que deseja? -->
                    <div class="custom-select-field" style="position: relative; width: 100%;">
                      <div class="custom-select-trigger ${activeDropdown === "operation" ? "is-open" : ""}" data-cid="hero" data-message="toggleDropdown" data-value="operation" style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; background: #fff; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.95rem; color: #4a5568; transition: border-color 0.2s;">
                        <span>${escapeText(triggerOpText)}</span>
                        <span style="color: #a0aec0; font-size: 0.75rem;">▼</span>
                      </div>
                      ${activeDropdown === "operation" ? /*html*/ `
                        <div class="custom-select-dropdown" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 1000; padding: 6px 0; margin-top: 6px;">
                          <div class="dropdown-option-row ${selectedOperation === "comprar" ? "is-active-row" : ""}" data-cid="hero" data-message="selectOperation" data-value="comprar" style="padding: 10px 16px; display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.92rem; color: #2d3748; transition: background 0.15s;">
                            <span class="option-check-mark ${selectedOperation === "comprar" ? "checked" : ""}"></span>
                            <span>Comprar</span>
                          </div>
                          <div class="dropdown-option-row ${selectedOperation === "alugar" ? "is-active-row" : ""}" data-cid="hero" data-message="selectOperation" data-value="alugar" style="padding: 10px 16px; display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.92rem; color: #2d3748; transition: background 0.15s;">
                            <span class="option-check-mark ${selectedOperation === "alugar" ? "checked" : ""}"></span>
                            <span>Alugar</span>
                          </div>
                        </div>
                      ` : ""}
                    </div>

                    <!-- 2. Cidade -->
                    <div class="custom-select-field" style="position: relative; width: 100%;">
                      <div class="custom-select-trigger ${activeDropdown === "city" ? "is-open" : ""}" data-cid="hero" data-message="toggleDropdown" data-value="city" style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; background: #fff; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.95rem; color: #4a5568;">
                        <span>${escapeText(triggerCityText)}</span>
                        <span style="color: #a0aec0; font-size: 0.75rem;">▼</span>
                      </div>
                      ${activeDropdown === "city" ? /*html*/ `
                        <div class="custom-select-dropdown" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 1000; padding: 6px 0; margin-top: 6px; max-height: 240px; overflow-y: auto;">
                          ${cities.map((city) => `
                            <div class="dropdown-option-row ${selectedCity === city ? "is-active-row" : ""}" data-cid="hero" data-message="selectCity" data-value="${city}" style="padding: 10px 16px; display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.92rem; color: #2d3748;">
                              <span class="option-check-mark ${selectedCity === city ? "checked" : ""}"></span>
                              <span>${escapeText(city)}</span>
                            </div>
                          `).join("")}
                        </div>
                      ` : ""}
                    </div>

                    <!-- 3. Bairro -->
                    <div class="custom-select-field" style="position: relative; width: 100%;">
                      <div class="custom-select-trigger ${activeDropdown === "neighborhood" ? "is-open" : ""}" data-cid="hero" data-message="toggleDropdown" data-value="neighborhood" style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; background: #fff; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.95rem; color: #4a5568;">
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

                    <!-- 4. Tipos de imóvel -->
                    <div class="custom-select-field" style="position: relative; width: 100%;">
                      <div class="custom-select-trigger ${activeDropdown === "type" ? "is-open" : ""}" data-cid="hero" data-message="toggleDropdown" data-value="type" style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; background: #fff; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.95rem; color: #4a5568;">
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

                    <!-- 5. BUSCAR Button -->
                    <button class="custom-search-btn" type="button" data-cid="hero" data-message="triggerSearch" style="background: #a8a8a8; color: #fff; text-transform: uppercase; font-weight: bold; border-radius: 6px; padding: 14px 34px; border: 0; cursor: pointer; font-size: 0.98rem; letter-spacing: 0.05em; transition: background 0.2s;">
                      BUSCAR
                    </button>
                    
                  </div>

                  <!-- Code Search Row -->
                  <div style="display: flex; align-items: center; gap: 8px; margin-top: 20px; color: #4a5568; font-size: 0.92rem; cursor: pointer; width: fit-content;" data-route="comprar">
                    <span style="font-size: 0.98rem;">🔍</span>
                    <span style="font-weight: 500;">Buscar por código</span>
                  </div>
                </div>

                <!-- Featured Capsule -->
                <div class="destaque-capsule" style="background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); padding: 12px 30px; border-radius: 99px; font-weight: bold; font-size: 1rem; color: #718096; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 10px; border: 1px solid rgba(0,0,0,0.05);">
                  Imóveis Em Destaque
                </div>

              </div>
            </div>
          </section>
        `,
      };
    },
  };
};
