const DetailComponent = ({ props }) => {
  let status = "";
  let galleryOpen = false;
  let galleryIndex = 0;
  let activePropertyId = "";
  let galleryZoom = null;
  let activeTab = "sobre";

  let simulatorValues = {
    propertyValue: 850000,
    downPayment: 170000,
    termMonths: 360,
    annualRate: 9.5,
  };
  let leadStatus = "";
  let shareFeedback = "";

  const getWhatsAppLink = (phone, text) => {
    const cleaned = String(phone || "71999990000").replace(/[^\d]/g, "");
    const phoneWithCountry = cleaned.startsWith("55") || cleaned.length > 11 ? cleaned : `55${cleaned}`;
    return `https://api.whatsapp.com/send?phone=${phoneWithCountry}&text=${encodeURIComponent(text)}`;
  };

  const loadGoogleMapsScript = (address, callback) => {
    // Registra a rotina de recuperação imediata em caso de falha de autenticação/restrição da API Key
    window.gm_authFailure = () => {
      console.warn("Google Maps Key rejeitada ou sem faturamento ativo. Revertendo para iframe público.");
      const el = document.getElementById("detail-google-map");
      if (el) {
        el.innerHTML = /*html*/`
          <iframe 
            width="100%" 
            height="100%" 
            style="border:0;" 
            loading="lazy" 
            allowfullscreen 
            referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed">
          </iframe>
        `;
      }
    };

    if (window.google && window.google.maps) {
      callback();
      return;
    }
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      existingScript.addEventListener("load", callback);
      return;
    }
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBCVhhiXk5-VlRAl5BujJf32_sT-Skwv4A";
    script.async = true;
    script.defer = true;
    script.onload = callback;
    script.onerror = () => {
      console.warn("Script do Google Maps falhou no carregamento físico. Revertendo para iframe.");
      if (window.gm_authFailure) window.gm_authFailure();
    };
    document.head.appendChild(script);
  };

  const initDetailMap = (address) => {
    loadGoogleMapsScript(address, () => {
      const el = document.getElementById("detail-google-map");
      if (!el) return;
      if (!window.google || !window.google.maps) return;

      // Consulta a geocodificação gratuita via Nominatim para contornar restrições de faturamento/API Key
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`)
        .then((res) => res.json())
        .then((data) => {
          let coords = { lat: -12.9777, lng: -38.5016 }; // Centro padrão (Salvador, BA)
          let found = false;

          if (data && data[0]) {
            coords = {
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
            };
            found = true;
          }

          const map = new google.maps.Map(el, {
            zoom: 15,
            center: coords,
            mapTypeControl: false,
            streetViewControl: false,
          });

          if (found) {
            new google.maps.Marker({
              position: coords,
              map: map,
            });
          }
        })
        .catch((err) => {
          console.warn("Resilient geocoding failed, trying Google Geocoder fallback...", err);
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK" && results[0]) {
              const map = new google.maps.Map(el, {
                zoom: 15,
                center: results[0].geometry.location,
                mapTypeControl: false,
                streetViewControl: false,
              });
              new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
              });
            } else {
              console.warn("All geocoding fallbacks exhausted.", status);
            }
          });
        });
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const parseCurrencyInput = (raw) => {
    const cleaned = String(raw || "").replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", ".");
    const num = parseFloat(cleaned);
    return Number.isNaN(num) ? 0 : num;
  };

  const formatCurrencyInput = (value) => {
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calcMonthlyPayment = () => {
    const principal = simulatorValues.propertyValue - simulatorValues.downPayment;
    if (principal <= 0) return 0;
    const monthlyRate = simulatorValues.annualRate / 100 / 12;
    if (monthlyRate === 0) return principal / simulatorValues.termMonths;
    const n = simulatorValues.termMonths;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  };

  const calcTotalPayment = () => {
    return calcMonthlyPayment() * simulatorValues.termMonths + simulatorValues.downPayment;
  };

  const calcTotalInterest = () => {
    return calcMonthlyPayment() * simulatorValues.termMonths - (simulatorValues.propertyValue - simulatorValues.downPayment);
  };

  const applyStep = (name, dir) => {
    const steps = { propertyValue: 50000, downPayment: 10000, termMonths: 12, annualRate: 0.5 };
    const mins = { propertyValue: 100000, downPayment: 0, termMonths: 12, annualRate: 0.5 };
    const maxs = { propertyValue: 10000000, downPayment: simulatorValues.propertyValue, termMonths: 420, annualRate: 18 };
    const step = steps[name] || 1;
    const min = mins[name] || 0;
    const max = maxs[name] || 999999;
    if (dir === "up") simulatorValues[name] = Math.min(simulatorValues[name] + step, max);
    if (dir === "down") simulatorValues[name] = Math.max(simulatorValues[name] - step, min);
    if (simulatorValues.downPayment > simulatorValues.propertyValue) simulatorValues.downPayment = simulatorValues.propertyValue;
  };

  const renderStepper = (name, value, min, max, step, suffix, prefix, editable) => {
    const displayValue = prefix ? `${prefix} ${formatCurrency(value)}` : `${value} ${suffix || ""}`;
    if (editable === "currency") {
      return /*html*/`
        <div class="financing-stepper">
          <button class="financing-step-btn" type="button" data-cid="detail" data-message="stepValue" data-name="${name}" data-direction="down" ${value <= min ? "disabled" : ""}>−</button>
          <input class="financing-step-input" type="text" inputmode="decimal" data-cid="detail" data-message="editValue" data-name="${name}" value="${formatCurrencyInput(value)}" autocomplete="off">
          <button class="financing-step-btn" type="button" data-cid="detail" data-message="stepValue" data-name="${name}" data-direction="up" ${value >= max ? "disabled" : ""}>+</button>
        </div>
      `;
    }
    if (editable === "number") {
      return /*html*/`
        <div class="financing-stepper">
          <button class="financing-step-btn" type="button" data-cid="detail" data-message="stepValue" data-name="${name}" data-direction="down" ${value <= min ? "disabled" : ""}>−</button>
          <input class="financing-step-input" type="text" inputmode="decimal" data-cid="detail" data-message="editValue" data-name="${name}" value="${suffix === "% a.a." ? value.toFixed(1) : value}" autocomplete="off">
          <button class="financing-step-btn" type="button" data-cid="detail" data-message="stepValue" data-name="${name}" data-direction="up" ${value >= max ? "disabled" : ""}>+</button>
        </div>
      `;
    }
    return /*html*/`
      <div class="financing-stepper">
        <button class="financing-step-btn" type="button" data-cid="detail" data-message="stepValue" data-name="${name}" data-direction="down" ${value <= min ? "disabled" : ""}>−</button>
        <span class="financing-step-value">${displayValue}</span>
        <button class="financing-step-btn" type="button" data-cid="detail" data-message="stepValue" data-name="${name}" data-direction="up" ${value >= max ? "disabled" : ""}>+</button>
      </div>
    `;
  };

  const escapeText = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  return {
    next(message = {}) {
      if (message.type === "stepValue") {
        const name = message.name;
        const dir = message.direction;
        if (name && dir) applyStep(name, dir);
      }
      if (message.type === "editValue") {
        const name = message.name;
        if (name) {
          if (name === "propertyValue" || name === "downPayment") {
            const parsed = parseCurrencyInput(message.value);
            if (parsed > 0) {
              const clamped = Math.max(name === "propertyValue" ? 100000 : 0, Math.min(parsed, name === "propertyValue" ? 10000000 : simulatorValues.propertyValue));
              simulatorValues[name] = clamped;
              if (simulatorValues.downPayment > simulatorValues.propertyValue) simulatorValues.downPayment = simulatorValues.propertyValue;
            }
          } else if (name === "termMonths") {
            const parsed = parseInt(message.value, 10);
            if (!Number.isNaN(parsed) && parsed >= 12) simulatorValues.termMonths = Math.min(parsed, 420);
          } else if (name === "annualRate") {
            const parsed = parseFloat(message.value);
            if (!Number.isNaN(parsed) && parsed >= 0) simulatorValues.annualRate = Math.min(parsed, 18);
          }
        }
      }
      if (message.type === "submitFinancingLead") {
        props.addLead({
          name: message.fields.name || "Lead financiamento",
          source: "Financiamento",
          interest: `Imóvel de ${formatCurrency(simulatorValues.propertyValue)} (Simulação)`,
          stage: "novo",
        });
        leadStatus = "Solicitação de financiamento enviada. Um especialista entrará em contato.";
      }
      if (message.type === "toggleFavorite") props.toggleFavorite(message.propertyId);
      if (message.type === "setDetailTab") activeTab = message.value || activeTab;
      if (message.type === "shareProperty") {
        const selected = props.getSelectedProperty();
        const shareUrl = `${window.location.origin}${window.location.pathname}#imovel?propertyId=${selected.id}`;
        const shareText = `Confira este imóvel: ${selected.title}`;
        
        const doCopy = () => {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(shareUrl);
          }
          const textArea = document.createElement("textarea");
          textArea.value = shareUrl;
          textArea.style.position = "fixed";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand("copy");
            document.body.removeChild(textArea);
            return Promise.resolve();
          } catch (err) {
            document.body.removeChild(textArea);
            return Promise.reject(err);
          }
        };

        if (navigator.share) {
          navigator.share({
            title: selected.title,
            text: shareText,
            url: shareUrl,
          })
          .then(() => {
            shareFeedback = "Compartilhado!";
            props.goToRoute("imovel", { propertyId: selected.id });
            setTimeout(() => {
              shareFeedback = "";
              props.goToRoute("imovel", { propertyId: selected.id });
            }, 3000);
          })
          .catch((err) => {
            console.warn("Erro ao compartilhar:", err);
            if (err.name !== "AbortError") {
              doCopy().then(() => {
                shareFeedback = "Link copiado!";
                props.goToRoute("imovel", { propertyId: selected.id });
                setTimeout(() => {
                  shareFeedback = "";
                  props.goToRoute("imovel", { propertyId: selected.id });
                }, 3000);
              });
            }
          });
        } else {
          doCopy()
            .then(() => {
              shareFeedback = "Link copiado!";
              props.goToRoute("imovel", { propertyId: selected.id });
              setTimeout(() => {
                shareFeedback = "";
                props.goToRoute("imovel", { propertyId: selected.id });
              }, 3000);
            })
            .catch((err) => {
              console.error("Erro ao copiar:", err);
              shareFeedback = "Não foi possível copiar.";
              props.goToRoute("imovel", { propertyId: selected.id });
              setTimeout(() => {
                shareFeedback = "";
                props.goToRoute("imovel", { propertyId: selected.id });
              }, 3000);
            });
        }
      }
      if (message.type === "openGallery") {
        if (message.event?.type === "pointermove") {
          const rect = message.target?.getBoundingClientRect?.();
          if (rect?.width && rect?.height) {
            const rawX = (message.event.clientX - rect.left) / rect.width;
            const rawY = (message.event.clientY - rect.top) / rect.height;
            galleryZoom = {
              x: Math.min(0.84, Math.max(0.16, rawX)),
              y: Math.min(0.84, Math.max(0.16, rawY)),
            };
          }
        } else {
          galleryOpen = true;
          galleryIndex = Number(message.target?.dataset?.index || message.value || 0) || 0;
          galleryZoom = { x: 0.5, y: 0.5 };
        }
      }
      if (message.type === "closeGallery") {
        galleryOpen = false;
        galleryZoom = null;
      }
      if (message.type === "nextGallery") galleryIndex += 1;
      if (message.type === "prevGallery") galleryIndex -= 1;
      if (message.type === "proposal") {
        const selected = props.getSelectedProperty();
        props.addLead({
          name: message.fields.name || "Contato de agendamento",
          source: "Agendamento de visita",
          interest: `Visita agendada para ${message.fields.date || "data não informada"}: ${selected.title}`,
          propertyId: selected.id,
          transaction: selected.purpose || "analise",
          email: message.fields.email || "",
          phone: message.fields.phone || "",
          narrative: `Solicitou agendamento de visita para o dia ${message.fields.date || "não especificado"}.`,
          nextAction: "Confirmar agendamento de visita.",
          stage: "novo",
        });
        status = "Agendamento enviado imediatamente!";
      }

      const property = props.getSelectedProperty();
      if (property?.id !== activePropertyId) {
        activePropertyId = property?.id || "";
        galleryOpen = false;
        galleryIndex = 0;
        galleryZoom = null;
        activeTab = "sobre";
        if (property) {
          simulatorValues.propertyValue = property.priceNumber || 850000;
          simulatorValues.downPayment = Math.round(simulatorValues.propertyValue * 0.20);
          leadStatus = "";
          shareFeedback = "";
        }
      }

      const broker = brokers[0] || null;
      const renderPropertyCard = (item) => PropertyCardComponent({
        props: {
          property: item,
          tools: { componentId: "featured", isFavorite: props.isFavorite },
        },
      }).next().value;
      const galleryImages = [property.image, ...(Array.isArray(property.images) ? property.images : []), ...properties.filter((item) => item.id !== property.id).slice(0, 3).map((item) => item.image)].filter(Boolean);
      if (galleryImages.length) galleryIndex = ((galleryIndex % galleryImages.length) + galleryImages.length) % galleryImages.length;
      const currentGalleryImage = galleryImages[galleryIndex] || property.image;
      const renderGalleryItem = (item, index, isMain = false) => {
        const isActive = index === galleryIndex;
        const label = isMain ? "Abrir galeria" : `Abrir imagem ${index + 1}`;
        const zoomStyle = isMain
          ? `style="--zoom-x:${galleryZoom?.x ?? 0.5};--zoom-y:${galleryZoom?.y ?? 0.5};--zoom-image:url('${item}')"`
          : "";
        return /*html*/`
          <button class="gallery-item ${isMain ? "gallery-main" : "gallery-thumb"} ${isActive ? "is-active" : ""} ${isMain && galleryZoom ? "is-zooming" : ""}" type="button" data-cid="detail" data-message="openGallery" data-index="${index}" aria-label="${label}" ${zoomStyle}>
            <img src="${item}" alt="${property.title} - imagem ${index + 1}" loading="lazy">
            ${isMain ? `<div class="gallery-lens" aria-hidden="true"></div>` : ""}
            ${!isMain && index === 3 ? `<span class="gallery-more">ver todas</span>` : ""}
          </button>
        `;
      };

      const detailTabs = [
        {
          id: "sobre",
          label: "Sobre o imovel",
          title: "Resumo do cadastro",
          body: /*html*/`
            <ul class="detail-bullet-list">
              <li><strong>Titulo:</strong> ${escapeText(property.title)}</li>
              <li><strong>Tipo:</strong> ${escapeText(property.type)}</li>
              <li><strong>Categoria:</strong> ${escapeText(property.kind)}</li>
              <li><strong>Preco:</strong> ${escapeText(property.price)}</li>
              <li><strong>Area:</strong> ${escapeText(property.area)}m2</li>
            </ul>
            <div class="detail-card-grid">
              <article class="detail-info-card"><span>Quartos</span><strong>${escapeText(property.bedrooms)}</strong></article>
              <article class="detail-info-card"><span>Suites</span><strong>${escapeText(property.suites)}</strong></article>
              <article class="detail-info-card"><span>Banheiros</span><strong>${escapeText(property.bathrooms)}</strong></article>
              <article class="detail-info-card"><span>Vagas</span><strong>${escapeText(property.parking)}</strong></article>
            </div>
          `,
        },
        {
          id: "caracteristicas",
          label: "Caracteristicas",
          title: "Dados do formulario de imoveis",
          body: /*html*/`
            <div class="detail-chip-cloud">
              ${(property.features || []).map((item) => `<span>${escapeText(item)}</span>`).join("")}
            </div>
            <ul class="detail-bullet-list">
              ${(property.meta || []).map((item) => `<li>${escapeText(item)}</li>`).join("")}
            </ul>
          `,
        },
        {
          id: "localizacao",
          label: "Localização",
          title: "Endereço",
          body: /*html*/`
            <ul class="detail-bullet-list">
              <li><strong>Cidade completa:</strong> ${escapeText(property.city)}</li>
              <li><strong>Cidade-base:</strong> ${escapeText(property.cityName || property.city)}</li>
              <li><strong>Bairro:</strong> ${escapeText(property.neighborhood)}</li>
              <li><strong>Operacao:</strong> ${escapeText(property.operation || "Comprar")}</li>
            </ul>

            <div id="detail-google-map" class="detail-map" style="margin-top: 20px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); height: 260px;">
              <iframe 
                width="100%" 
                height="100%" 
                style="border:0;" 
                loading="lazy" 
                allowfullscreen 
                referrerpolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=${encodeURIComponent(property.neighborhood + ', ' + property.city)}&t=&z=15&ie=UTF8&iwloc=&output=embed">
              </iframe>
            </div>
          `,
        },
        {
          id: "condominio",
          label: "Condominio",
          title: "Custos recorrentes",
          body: /*html*/`
            <ul class="detail-bullet-list">
              <li><strong>Condominio:</strong> ${escapeText(property.condominium || "Nao informado")}</li>
              <li><strong>IPTU:</strong> ${escapeText(property.iptu || "Nao informado")}</li>
              <li><strong>Etiqueta:</strong> ${escapeText(property.tag || "Nao informada")}</li>
              <li><strong>Base de calculo:</strong> ${property.priceNumber ? `R$ ${Number(property.priceNumber).toLocaleString("pt-BR")}` : escapeText(property.price)}</li>
            </ul>
          `,
        },
        {
          id: "documentacao",
          label: "Documentacao",
          title: "Identificacao do produto",
          body: /*html*/`
            <div class="detail-card-grid">
              <article class="detail-info-card"><span>ID</span><strong>${escapeText(property.id)}</strong></article>
              <article class="detail-info-card"><span>Categoria</span><strong>${escapeText(property.kind)}</strong></article>
              <article class="detail-info-card"><span>Galeria</span><strong>${galleryImages.length}</strong></article>
              <article class="detail-info-card"><span>Publicacao</span><strong>${escapeText(property.tag || "Ativa")}</strong></article>
            </div>
            <p class="route-note">Os campos acima vem do mesmo cadastro editado no dashboard e no editor de produto.</p>
          `,
        },
      ];
      const currentTab = detailTabs.find((tab) => tab.id === activeTab) || detailTabs[0];

      const monthly = calcMonthlyPayment();
      const total = calcTotalPayment();
      const interest = calcTotalInterest();
      const financed = simulatorValues.propertyValue - simulatorValues.downPayment;
      const downPct = simulatorValues.propertyValue > 0 ? Math.round(simulatorValues.downPayment / simulatorValues.propertyValue * 100) : 0;
      const interestPct = total > 0 ? Math.round(interest / (total - simulatorValues.downPayment) * 100) : 0;
      const termYears = Math.floor(simulatorValues.termMonths / 12);
      const termRemainder = simulatorValues.termMonths % 12;
      const termDisplay = termYears > 0 ? `${termYears} ano${termYears > 1 ? "s" : ""}${termRemainder > 0 ? ` e ${termRemainder} mese${termRemainder > 1 ? "s" : ""}` : ""}` : `${simulatorValues.termMonths} meses`;

      if (activeTab === "localizacao") {
        setTimeout(() => {
          initDetailMap(`${property.neighborhood}, ${property.city}`);
        }, 150);
      }

      return {
        done: false,
        value: /*html*/`
          <section id="imovel" class="section detail-section">
            <div class="container">
            </div>
            <div class="container detail-layout">
              <div>
                <div class="gallery">
                  ${renderGalleryItem(galleryImages[0] || property.image, 0, true)}
                  ${galleryImages.slice(1, 4).map((item, index) => renderGalleryItem(item, index + 1)).join("")}
                </div>
                <div class="detail-copy">
                  <span class="eyebrow">${escapeText(property.type)}</span>
                  <h2>${escapeText(property.title)}</h2>
                  <p>${property.recordType === "market-comparable" ? `Referencia observada em ${escapeText(property.observedAt || "data nao informada")}. O preco e pedido, a imagem e ilustrativa e a disponibilidade precisa ser confirmada na fonte.` : "Cadastro comercial do imovel."}</p>
                  <ul class="feature-list">
                    <li>Area total: ${escapeText(property.area)}m2</li>
                    <li>Area privativa: ${Math.max(Number(property.area) - 20, Number(property.area))}m2</li>
                    <li>${escapeText(property.bedrooms)} quartos, ${escapeText(property.suites)} suites, ${escapeText(property.bathrooms)} banheiros e ${escapeText(property.parking)} vagas</li>
                    <li>Condominio ${escapeText(property.condominium)} e IPTU ${escapeText(property.iptu)}</li>
                  </ul>
                  <div class="detail-tabs" role="tablist" aria-label="Detalhes do imovel">
                    ${detailTabs.map((tab) => /*html*/`<button class="${tab.id === currentTab.id ? "active" : ""}" type="button" role="tab" aria-selected="${tab.id === currentTab.id ? "true" : "false"}" data-cid="detail" data-message="setDetailTab" data-value="${tab.id}">${escapeText(tab.label)}</button>`).join("")}
                  </div>
                  <div class="detail-tab-panel" role="tabpanel" aria-label="${escapeText(currentTab.title)}">
                    <h3>${escapeText(currentTab.title)}</h3>
                    ${currentTab.body}
                  </div>
                </div>
              </div>
              <aside class="detail-panel">
                <h3>${escapeText(property.title)}</h3>
                <div class="location">${escapeText(property.city)}</div>
                <div class="meta">${(property.meta || []).map((item) => /*html*/`<span>${escapeText(item)}</span>`).join("")}</div>
                <strong class="price">${escapeText(property.price)}</strong>
                <div class="action-stack" style="display: flex; flex-direction: column; gap: 10px;">
                  <button class="gold-btn" type="button" data-route="contato">Solicitar confirmacao</button>
                  <a class="ghost-btn whatsapp" href="${getWhatsAppLink(broker?.phone || '71999990000', `Olá! Gostaria de obter mais informações sobre o imóvel "${property.title}" que vi no site: ${window.location.origin}${window.location.pathname}#imovel?propertyId=${property.id}`)}" target="_blank" rel="noreferrer" style="text-decoration: none; text-align: center; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
                    💬 WhatsApp
                  </a>
                  <button class="ghost-btn share-btn" type="button" data-cid="detail" data-message="shareProperty" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;">
                    🔗 Compartilhar
                  </button>
                  ${shareFeedback ? `<p style="color: var(--gold); margin: 4px 0 0 0; font-size: 0.85rem; text-align: center;">${escapeText(shareFeedback)}</p>` : ""}
                </div>
                <form class="broker-card" data-cid="detail" data-message="proposal">
                  <strong>Agendar Visita ao Imóvel</strong>
                  <div class="mini-field"><label>Data Desejada *</label><input name="date" type="date" required></div>
                  <button class="gold-btn" type="submit" style="width: 100%; margin-top: 10px;">Agendar agora</button>
                  ${status ? `<p class="login-error" style="color: var(--gold); margin-top: 8px;">${escapeText(status)}</p>` : ""}
                </form>
                ${property.sourceUrl ? `<div class="broker-card"><strong>Fonte da observacao</strong><p class="route-note">${escapeText(property.availabilityStatus || "Confirmar disponibilidade na origem.")}</p><a class="ghost-btn" href="${escapeText(property.sourceUrl)}" target="_blank" rel="noreferrer">Abrir fonte</a></div>` : ""}
              </aside>
            </div>
            ${galleryOpen ? `
              <div class="gallery-modal" role="dialog" aria-modal="true" aria-label="Galeria de imagens">
                <button class="gallery-modal-backdrop" type="button" data-cid="detail" data-message="closeGallery" aria-label="Fechar galeria"></button>
                <div class="gallery-modal-panel">
                  <button class="gallery-modal-close" type="button" data-cid="detail" data-message="closeGallery" aria-label="Fechar">&times;</button>
                  <button class="gallery-modal-nav gallery-modal-prev" type="button" data-cid="detail" data-message="prevGallery" aria-label="Imagem anterior">&lsaquo;</button>
                  <img class="gallery-modal-image" src="${currentGalleryImage}" alt="${escapeText(property.title)}">
                  <button class="gallery-modal-nav gallery-modal-next" type="button" data-cid="detail" data-message="nextGallery" aria-label="Proxima imagem">&rsaquo;</button>
                </div>
              </div>
            ` : ""}
            <!-- Seção de Simulador de Financiamento Dinâmico -->
            <div class="container" id="financing-section" style="margin-top: 60px; margin-bottom: 60px;">
              <div class="section-title">
                <div>
                  <span class="eyebrow">Financiamento</span>
                  <h2>Simulação de Financiamento para este Imóvel</h2>
                </div>
              </div>

              <div class="financing-simulator" style="background: var(--card-bg, #ffffff); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 24px; box-sizing: border-box;">
                <div class="financing-simulator-controls">
                  <h3 style="margin-top: 0; margin-bottom: 20px;">Configurar simulação</h3>
                  <div class="financing-control-grid">
                    <div class="financing-control">
                      <label class="financing-control-label">Valor do imóvel</label>
                      ${renderStepper("propertyValue", simulatorValues.propertyValue, 100000, 10000000, 50000, "", "R$", "currency")}
                    </div>
                    <div class="financing-control">
                      <label class="financing-control-label">Entrada</label>
                      ${renderStepper("downPayment", simulatorValues.downPayment, 0, simulatorValues.propertyValue, 10000, "", "R$", "currency")}
                      <span class="financing-control-hint">${downPct}% do valor</span>
                    </div>
                    <div class="financing-control">
                      <label class="financing-control-label">Prazo</label>
                      ${renderStepper("termMonths", simulatorValues.termMonths, 12, 420, 12, "meses", "", "number")}
                      <span class="financing-control-hint">${termDisplay}</span>
                    </div>
                    <div class="financing-control">
                      <label class="financing-control-label">Taxa anual</label>
                      ${renderStepper("annualRate", simulatorValues.annualRate, 0.5, 18, 0.5, "% a.a.", "", "number")}
                    </div>
                  </div>
                </div>
                <div class="financing-simulator-results">
                  <h3 style="margin-top: 0; margin-bottom: 20px;">Resultado da Simulação</h3>
                  <div class="financing-result-main">
                    <span class="financing-result-label">Parcela mensal estimada</span>
                    <strong class="financing-result-value">${formatCurrency(monthly)}</strong>
                    <span class="financing-result-sub">em ${termDisplay}</span>
                  </div>
                  <div class="financing-result-grid">
                    <div class="financing-result-stat">
                      <span>Valor financiado</span>
                      <strong>${formatCurrency(financed)}</strong>
                    </div>
                    <div class="financing-result-stat">
                      <span>Total pago</span>
                      <strong>${formatCurrency(total)}</strong>
                    </div>
                    <div class="financing-result-stat">
                      <span>Juros totais</span>
                      <strong>${formatCurrency(interest > 0 ? interest : 0)}</strong>
                      <span class="financing-result-detail">${interestPct}% do financiado</span>
                    </div>
                    <div class="financing-result-stat">
                      <span>Entrada</span>
                      <strong>${downPct}%</strong>
                      <span class="financing-result-detail">${formatCurrency(simulatorValues.downPayment)}</span>
                    </div>
                  </div>
                  <div class="financing-bar-track">
                    <div class="financing-bar-fill" style="width: ${downPct}%;"></div>
                  </div>
                  <div class="financing-bar-labels">
                    <span>Entrada ${formatCurrency(simulatorValues.downPayment)}</span>
                    <span>Financiado ${formatCurrency(financed)}</span>
                  </div>
                </div>
              </div>

              <div class="financing-info-section" style="margin-top: 30px;">
                <div class="financing-info-grid">
                  <article class="financing-info-card">
                    <h3>Como funciona</h3>
                    <ul class="detail-bullet-list">
                      <li>Simule as condições ideais para seu orçamento</li>
                      <li>Envie sua proposta e documentos para análise de crédito</li>
                      <li>O banco avalia o risco e aprova o limite</li>
                      <li>Assinatura do contrato e liberação das chaves</li>
                    </ul>
                  </article>
                  <article class="financing-info-card">
                    <h3>Documentos necessários</h3>
                    <ul class="detail-bullet-list">
                      <li>RG, CPF e comprovante de estado civil</li>
                      <li>Comprovante de renda (holerite ou IR)</li>
                      <li>Comprovante de residência atualizado</li>
                      <li>Extrato bancário (últimos 3 meses)</li>
                    </ul>
                  </article>
                  <article class="financing-info-card financing-info-card--highlight">
                    <h3>Fale com um especialista</h3>
                    <p>Preencha o formulário e nossa equipe financeira entrará em contato para guiar seu financiamento.</p>
                    <form class="financing-lead-form" data-cid="detail" data-message="submitFinancingLead">
                      <div class="mini-field"><label>Nome</label><input name="name" required placeholder="Seu nome"></div>
                      <div class="mini-field"><label>Telefone</label><input name="phone" required placeholder="(71) 99999-0000"></div>
                      <div class="mini-field"><label>Renda mensal</label><input name="income" placeholder="R$"></div>
                      <button class="gold-btn" type="submit">Solicitar contato</button>
                      ${leadStatus ? `<p class="route-note" style="color: var(--gold); margin-top: 8px;">${escapeText(leadStatus)}</p>` : ""}
                    </form>
                  </article>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="section-title"><div><span class="eyebrow">Semelhantes</span><h2>Imoveis semelhantes</h2></div></div>
              <div class="property-grid">${properties.filter((item) => item.id !== property.id).slice(0, 3).map((item) => renderPropertyCard(item)).join("")}</div>
            </div>
          </section>
        `,
      };
    },
  };
};
