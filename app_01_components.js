"use strict";
  let actionNotice = "";
  const renderActionBanner = () => actionNotice ? `<div class="action-banner" role="status">${escapeHtml(actionNotice)}</div>` : "";

  const ProductEditorComponent = ({ props }) => {
    let draft = collectionEmptyItem("properties");
    let activeKey = "";
    let status = "";
    const renderEditable = (tag, label, name, value, type = "text", className = "", attrs = "") => {
      const empty = value === "" || value === null || value === undefined;
      const editableAttrs = `contenteditable="true" spellcheck="false" role="textbox" aria-label="${escapeHtml(label)}" data-cid="editor" data-message="updateField" data-name="${name}" data-type="${type}" data-placeholder="${escapeHtml(label)}" data-empty="${empty ? "true" : "false"}"`;
      const body = empty ? "" : escapeHtml(value);
      const classes = ["editable-surface", className].filter(Boolean).join(" ");
      return `<${tag} class="${classes}" ${editableAttrs} ${attrs}>${body}</${tag}>`;
    };
    const renderImageSlot = (property, index, image, label, className = "", mode = "thumb") => {
      const hasImage = Boolean(image);
      const alt = escapeHtml(property.title || label);
      const body = hasImage
        ? `<img class="editable-media-image" src="${image}" alt="${alt}" loading="lazy">`
        : `<div class="editable-media-placeholder" aria-hidden="true"><span class="editable-media-icon editable-media-icon-large"><svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M7 7l1.5-2h7L17 7h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3zm5 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2.2A1.8 1.8 0 1 1 12 10.8a1.8 1.8 0 0 1 0 3.6z"></path></svg></span></div>`;
      const overlay = mode === "main" ? `
          <span class="editable-media-overlay">
            <span class="editable-media-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M7 7l1.5-2h7L17 7h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3zm5 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2.2A1.8 1.8 0 1 1 12 10.8a1.8 1.8 0 0 1 0 3.6z"></path>
              </svg>
            </span>
            <span class="editable-media-text">Trocar imagem</span>
          </span>
      ` : "";
      if (mode === "main") {
      return `
        <label class="editable-media ${className}" aria-label="${escapeHtml(label)}">
          ${body}
          ${overlay}
          <input class="editable-media-input" type="file" accept="image/*" data-cid="editor" data-message="updateImage" data-name="images" data-image-index="${index}">
        </label>
      `;
      }
      return `
        <button class="editable-media ${className}" type="button" aria-label="${escapeHtml(label)}" data-cid="editor" data-message="promoteImage" data-image-index="${index}">
          ${body}
        </button>
      `;
    };
    const renderPreview = (property, editMode) => {
      const meta = Array.isArray(property.meta) ? property.meta : [];
      const features = Array.isArray(property.features) ? property.features : [];
      const images = Array.isArray(property.images) ? property.images.filter(Boolean) : [];
      const previewImage = property.image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85";
      const thumbs = images.length ? images : [];
      return `
        <div>
          <div class="gallery">
            ${renderImageSlot(property, 0, thumbs[0] || previewImage, editMode ? "Imagem principal - editar" : "Imagem principal", "gallery-main", "main")}
            ${renderImageSlot(property, 1, thumbs[1] || "", "Imagem secundária 1", "gallery-thumb")}
            ${renderImageSlot(property, 2, thumbs[2] || "", "Imagem secundária 2", "gallery-thumb")}
            ${renderImageSlot(property, 3, thumbs[3] || "", "Imagem secundária 3", "gallery-thumb")}
          </div>
          <div class="detail-copy">
            <span class="eyebrow">${editMode ? "Editar produto" : "Novo produto"}</span>
            <span class="editor-line">
              <span class="editor-line-label">Codigo</span>
              ${renderEditable("span", "Codigo", "id", property.id || "gerado automaticamente", "text", "editable-inline editable-code")}
            </span>
            ${renderEditable("h2", "Titulo do produto", "title", property.title || "", "text", "editable-title")}
            ${renderEditable("p", "Subtitulo", "type", property.type || "", "text", "editable-kicker")}
            ${renderEditable("p", "Descricao", "description", property.description || "Esta tela espelha a pagina do imovel, mas com o formulario embutido para criar ou ajustar o produto antes de publicar no GitHub.", "textarea", "editable-description")}
            <ul class="feature-list">
              <li>Area total: ${renderEditable("span", "Area total", "area", String(property.area || 0), "number", "editable-inline editable-number")} m2</li>
              <li>${renderEditable("span", "Quartos", "bedrooms", String(property.bedrooms || 0), "number", "editable-inline editable-number")} quartos, ${renderEditable("span", "Suites", "suites", String(property.suites || 0), "number", "editable-inline editable-number")} suites, ${renderEditable("span", "Banheiros", "bathrooms", String(property.bathrooms || 0), "number", "editable-inline editable-number")} banheiros e ${renderEditable("span", "Vagas", "parking", String(property.parking || 0), "number", "editable-inline editable-number")} vagas</li>
              <li>Condominio ${renderEditable("span", "Condominio", "condominium", property.condominium || "sem valor", "text", "editable-inline")} e IPTU ${renderEditable("span", "IPTU", "iptu", property.iptu || "sem valor", "text", "editable-inline")}</li>
            </ul>
            <div class="editor-preview-grid">
              ${renderEditable("strong", "Preco", "price", property.price || "Sem preco", "text", "preview-stat editable-price")}
              ${renderEditable("span", "Categoria", "kind", property.kind || property.type || "Imovel", "text", "editable-chip")}
              ${renderEditable("span", "Etiqueta", "tag", property.tag || "Sem etiqueta", "text", "editable-chip")}
            </div>
            ${renderEditable("div", "Cidade completa", "city", property.city || "", "text", "location editable-location")}
            ${renderEditable("div", "Cidade-base", "cityName", property.cityName || "", "text", "location editable-location")}
            ${renderEditable("div", "Bairro", "neighborhood", property.neighborhood || "", "text", "location editable-location")}
            ${renderEditable("div", "Metadados", "meta", meta.length ? meta.join(", ") : "", "textarea", "editable-meta")}
            ${renderEditable("div", "Caracteristicas", "features", features.length ? features.join(", ") : "", "textarea", "editable-meta")}
          </div>
        </div>
      `;
    };
    return {
      next(message = {}) {
        const route = props.getRoute();
        const editMode = route === "imovel-editar";
        const baseProperty = editMode ? props.getSelectedProperty() : null;
        const editorKey = `${route}:${baseProperty?.id || "new"}`;
        if (editorKey !== activeKey) {
          draft = propertyDraftFrom(baseProperty);
          activeKey = editorKey;
          status = "";
        }
        if (message.type === "updateField") {
          const fieldType = message.target?.dataset?.type || "text";
          const rawValue = typeof message.value === "string"
            ? message.value
            : String(message.target?.textContent ?? "");
          const nextValue = fieldType === "textarea" ? rawValue : rawValue.trim();
          draft = { ...draft, [message.name]: fieldType === "number" ? nextValue.replace(/[^\d.-]/g, "") : nextValue };
        }
        if (message.type === "updateImage") {
          const file = message.target?.files?.[0];
          if (!file) return;
          const slotIndex = Number(message.target?.dataset?.imageIndex || 0);
          return fileToDataUrl(file).then((dataUrl) => {
            const nextImages = Array.isArray(draft.images) ? draft.images.slice() : [];
            nextImages[slotIndex] = dataUrl;
            const primaryImage = nextImages.find(Boolean) || dataUrl;
            draft = {
              ...draft,
              images: nextImages.filter(Boolean),
              image: primaryImage,
            };
            status = "Imagem atualizada no editor.";
          });
        }
        if (message.type === "promoteImage") {
          const slotIndex = Number(message.target?.dataset?.imageIndex || 0);
          const nextImages = Array.isArray(draft.images) ? draft.images.slice() : [];
          if (!nextImages[slotIndex]) return;
          if (slotIndex === 0) return;
          const [selectedImage] = nextImages.splice(slotIndex, 1);
          nextImages.unshift(selectedImage);
          draft = {
            ...draft,
            images: nextImages.filter(Boolean),
            image: nextImages[0] || selectedImage,
          };
          status = "Imagem principal atualizada.";
        }
        if (message.type === "saveProperty") {
          status = "Salvando no GitHub...";
          actionNotice = "Salvando produto no GitHub...";
          return props.saveProperty(draft, baseProperty?.id).then((result) => {
            status = result.message || "Produto salvo no GitHub.";
            actionNotice = result.message || "Produto salvo no GitHub.";
            props.goToRoute("imovel", { propertyId: result.property.id });
            return result;
          }).catch((error) => {
            status = error.message;
            actionNotice = error.message;
            throw error;
          });
        }
        if (message.type === "deleteProperty") {
          status = "Excluindo...";
          actionNotice = "Excluindo produto...";
          return props.deleteProperty(baseProperty?.id).then((result) => {
            status = result.message || "Produto removido.";
            actionNotice = result.message || "Produto removido.";
            props.goToRoute("dashboard");
            return result;
          }).catch((error) => {
            status = error.message;
            actionNotice = error.message;
            throw error;
          });
        }
        if (message.type === "cancel") {
          actionNotice = editMode ? "Alteracoes descartadas." : "Operacao cancelada.";
          props.goToRoute(editMode ? "imovel" : "dashboard", editMode && baseProperty ? { propertyId: baseProperty.id } : {});
        }
        const normalized = normalizeDashboardItem("properties", draft);
        const fields = DASHBOARD_COLLECTION_SCHEMAS.properties.fields;
        return {
          done: false,
          value: `
            <section id="${editMode ? "imovel-editar" : "imovel-novo"}" class="dashboard-section editor-section">
              <div class="dashboard-shell editor-shell">
                <aside class="dashboard-nav">
                  <div class="dashboard-nav-top">
                    ${brand()}
                    <button class="ghost-btn dashboard-back" type="button" data-cid="editor" data-message="cancel">Voltar</button>
                  </div>
                  <div class="dash-menu">
                    <button class="active" type="button">${editMode ? "Editar produto" : "Novo produto"}</button>
                    <button type="button" data-cid="editor" data-message="saveProperty">${editMode ? "Salvar alterações" : "Criar produto"}</button>
                    ${editMode ? `<button type="button" data-cid="editor" data-message="deleteProperty">Excluir produto</button>` : ""}
                    <button type="button" data-cid="editor" data-message="cancel">Cancelar</button>
                    <p class="route-note editor-note">Clique em qualquer bloco com contorno para editar direto na página. O salvamento continua indo para o GitHub.</p>
                  </div>
                </aside>
                <div class="dashboard-board editor-board">
                  <div class="dashboard-head">
                    <div>
                      <span class="eyebrow">Produto</span>
                      <h2>${editMode ? "Editar produto" : "Criar produto"}</h2>
                      <p>${editMode ? "Ajuste os dados e publique a nova versao do imovel no GitHub." : "Preencha os dados para gerar um novo produto e publicar no GitHub."}</p>
                    </div>
                    <div class="broker-person"><img class="avatar" src="${normalized.image || props.editorImage?.() || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"}" alt="Preview"><div><strong>${escapeHtml(normalized.title || "Produto")}</strong><div class="location">${escapeHtml(normalized.city || "Sem localizacao")}</div></div></div>
                  </div>
                  ${renderActionBanner()}
                  <div class="detail-layout editor-layout">
                    ${renderPreview(normalized, editMode)}
                  </div>
                  ${status ? `<p class="login-error">${status}</p>` : ""}
                </div>
              </div>
            </section>
          `,
        };
      },
    };
  };

  const BrokersComponent = () => ({
    next: () => ({
      done: false,
      value: `<section class="section brokers"><div class="container"><div class="section-title" style="justify-content:center;text-align:center;"><div><span class="eyebrow">Corretores</span><h2>Conte com nossos corretores</h2><p>Foto, CRECI, telefone e atendimento direto.</p></div></div><div class="broker-grid">${brokers.map((broker) => `<article class="broker-tile"><img src="${broker.photo}" alt="${broker.name}" loading="lazy"><strong>${broker.name}</strong><div class="location">${broker.creci}</div><div class="location">${broker.phone}</div></article>`).join("")}</div></div></section>`,
    }),
  });

  const DashboardComponentStateful = ({ props }) => {
    let activeTab = "overview";
    let crudStatus = "";
    const tabs = [
      ["overview", "Dashboard"],
      ...Object.entries(DASHBOARD_COLLECTION_SCHEMAS).map(([id, schema]) => [id, schema.label]),
    ];
    const getCollectionItems = (collection) => {
      if (collection === "properties") return properties;
      return dashboardContent[collection] || [];
    };
    const setCollectionItems = (collection, items) => {
      if (collection === "properties") {
        properties = normalizeDashboardCollection("properties", items);
        return;
      }
      dashboardContent = {
        ...dashboardContent,
        [collection]: normalizeDashboardCollection(collection, items),
      };
    };
    const renderListRow = (collection, item, index) => {
      const summary = summarizeItem(collection, item, index);
      const propertyActions = collection === "properties";
      return `
        <article class="activity-row dashboard-item-row">
          <span class="dot" style="background:${item.color || "var(--gold)"};">${summary.icon || "•"}</span>
          <div>
            <strong>${summary.title}</strong>
            <div class="location">${summary.detail || ""}</div>
            ${summary.badge ? `<small class="route-note">${summary.badge}</small>` : ""}
          </div>
          ${propertyActions ? `<div class="dashboard-item-actions"><button class="ghost-btn" type="button" data-route="imovel-editar" data-property-id="${item.id}">Editar</button><button class="ghost-btn danger-btn" type="button" data-cid="dashboard" data-message="deleteItem" data-collection="${collection}" data-item-id="${item.id}">Excluir</button></div>` : ""}
        </article>
      `;
    };
    const renderPropertiesWorkspace = () => `
      <div class="dashboard-columns dashboard-crud-layout">
        <article class="dashboard-card dashboard-form-card">
          <h3>Novo produto</h3>
          <p class="location">Abra uma tela de edição baseada na própria página do produto para criar um novo imóvel e publicar no GitHub.</p>
          <div class="dashboard-form-actions">
            <button class="gold-btn" type="button" data-route="imovel-novo">Novo produto</button>
            <button class="ghost-btn" type="button" data-route="imovel-novo">Editar como novo</button>
          </div>
          <p class="route-note">A criação e a edição usam a mesma tela com preview ao vivo.</p>
        </article>
        <article class="dashboard-card">
          <div class="dashboard-card-head">
            <h3>Produtos cadastrados</h3>
            <span>${properties.length}</span>
          </div>
          <div class="activity dashboard-items">
            ${properties.map((item, index) => renderListRow("properties", item, index)).join("")}
          </div>
        </article>
      </div>
    `;
    const renderCollectionCard = (collection) => {
      const schema = DASHBOARD_COLLECTION_SCHEMAS[collection];
      const items = getCollectionItems(collection);
      const fields = schema.fields.filter((field) => field.name !== "id");
      const formFields = fields
        .map((field) => {
          const sample = items[0]?.[field.name];
          const value = field.type === "textarea" ? (Array.isArray(sample) ? sample.join(", ") : sample || "") : sample || "";
          if (field.type === "textarea") {
            return `<label class="mini-field"><span>${field.label}</span><textarea name="${field.name}" rows="3" placeholder="${field.placeholder || ""}">${escapeHtml(Array.isArray(value) ? value.join(", ") : value)}</textarea></label>`;
          }
          return `<label class="mini-field"><span>${field.label}</span><input name="${field.name}" type="${field.type === "number" ? "number" : "text"}" value="${escapeHtml(value)}" placeholder="${field.placeholder || ""}"></label>`;
        })
        .join("");
      return `
        <div class="dashboard-columns dashboard-crud-layout">
          <article class="dashboard-card dashboard-form-card">
            <h3>${collectionFormTitle(collection, "create")}</h3>
            <p class="location">${schema.description}</p>
            <form class="filter-stack crud-form" data-cid="dashboard" data-message="saveItem" data-collection="${collection}">
              ${formFields}
              <div class="dashboard-form-actions">
                <button class="ghost-btn" type="button" data-cid="dashboard" data-message="newItem" data-collection="${collection}">Novo ${schema.itemLabel}</button>
                <button class="gold-btn" type="submit">Salvar item</button>
              </div>
            </form>
            ${crudStatus ? `<p class="route-note">${crudStatus}</p>` : ""}
          </article>
          <article class="dashboard-card">
            <div class="dashboard-card-head">
              <h3>${schema.title}</h3>
              <span>${items.length}</span>
            </div>
            <div class="activity dashboard-items">
              ${items.length ? items.map((item, index) => renderListRow(collection, item, index)).join("") : `<div class="route-note">Nenhum item cadastrado ainda.</div>`}
            </div>
          </article>
        </div>
      `;
    };
  const renderPreviewCard = (collection, title, targetTab) => {
      const items = getCollectionItems(collection).slice(0, 4);
      return `
        <article class="dashboard-card">
          <div class="dashboard-card-head">
            <h3>${title}</h3>
            <button class="ghost-btn" type="button" data-cid="dashboard" data-message="setTab" data-value="${targetTab}">Abrir</button>
          </div>
          <div class="activity dashboard-items">
            ${items.length ? items.map((item, index) => renderListRow(collection, item, index)).join("") : `<div class="route-note">Nenhum item cadastrado ainda.</div>`}
          </div>
        </article>
      `;
    };
    const renderSettingsWorkspace = () => `
      <div class="dashboard-columns dashboard-settings-layout">
        ${renderCollectionCard("settings")}
      </div>
    `;
    const renderOverview = () => `
      <div class="metric-grid">${dashboardContent.metrics.map((metric) => `<div class="metric"><small>${metric.label}</small><strong${metric.color ? ` style="color:${metric.color};"` : ""}>${metric.value}</strong></div>`).join("")}</div>
      <div class="dashboard-columns">
        ${renderPreviewCard("activities", "Atividades recentes", "activities")}
        ${renderPreviewCard("properties", "Imoveis em destaque", "properties")}
      </div>
    `;
    return {
      next(message = {}) {
        if (message.type === "setTab") {
          activeTab = message.value || activeTab;
        }
        if (message.type === "newItem") {
          crudStatus = "";
        }
        if (message.type === "deleteItem") {
          const collection = message.collection || activeTab;
          const itemId = message.itemId;
          const item = getCollectionItems(collection).find((entry) => entry.id === itemId);
          if (item && window.confirm(`Excluir ${item.title || item.name || item.label || item.subject || "este item"}?`)) {
            if (collection === "properties") {
              props.deleteProperty(itemId).then(() => {
                crudStatus = "Produto removido do GitHub.";
                props.requestRender();
              }).catch((error) => {
                crudStatus = error.message;
                props.requestRender();
              });
            } else {
              setCollectionItems(collection, getCollectionItems(collection).filter((entry) => entry.id !== itemId));
              crudStatus = "Item removido localmente.";
            }
          }
        }
        if (message.type === "saveItem") {
          const collection = message.collection || activeTab;
          const schema = DASHBOARD_COLLECTION_SCHEMAS[collection];
          if (schema && collection !== "properties") crudStatus = `${schema.itemLabel.charAt(0).toUpperCase()}${schema.itemLabel.slice(1)} gerado apenas como entrada do dashboard.`;
        }
        const currentLabel = tabs.find(([id]) => id === activeTab)?.[1] || "Dashboard";
        const mainPanel = () => {
          if (activeTab === "overview") return renderOverview();
          if (activeTab === "properties") return renderPropertiesWorkspace();
          if (activeTab === "settings") return renderSettingsWorkspace();
          if (DASHBOARD_EDITABLE_COLLECTIONS.has(activeTab)) return renderCollectionCard(activeTab);
          return renderOverview();
        };
        return {
          done: false,
          value: `
            <section id="dashboard" class="dashboard-section dashboard-fullscreen">
              <div class="dashboard-shell">
                <aside class="dashboard-nav">
                  <div class="dashboard-nav-top">
                    ${brand()}
                    <button class="ghost-btn dashboard-back" type="button" data-route="home">Voltar ao site</button>
                  </div>
                  <div class="dash-menu">${tabs.map(([id, label]) => `<button class="${id === activeTab ? "active" : ""}" type="button" data-cid="dashboard" data-message="setTab" data-value="${id}">${label}</button>`).join("")}<button type="button" data-cid="dashboard" data-message="logout">Sair</button></div>
                </aside>
                <div class="dashboard-board">
                  <div class="dashboard-head">
                    <div>
                      <span class="eyebrow">Area interna</span>
                      <h2>${currentLabel}</h2>
                      <p>${activeTab === "overview" ? "Visao geral com acessos rapidos para o CRUD do painel." : activeTab === "properties" ? "Gerencie os produtos abrindo a pagina de edição ou criando um novo produto em tela cheia." : DASHBOARD_COLLECTION_SCHEMAS[activeTab]?.description || "Gestao interna do painel."}</p>
                    </div>
                    <div class="broker-person"><img class="avatar" src="${brokers[1].photo}" alt="Admin"><div><strong>Admin</strong><div class="location">Conteudo do painel</div></div></div>
                  </div>
                  ${renderActionBanner()}
                  ${mainPanel()}
                </div>
              </div>
            </section>
          `,
        };
      },
    };
  };

  const LoginComponent = ({ props }) => {
    let error = "";
    return {
      next(message = {}) {
        if (message.type === "login") {
          const ok = props.login(message.fields.email, message.fields.password);
          error = ok ? "" : "Use admin@suaimobiliaria.com.br e a senha derivada do token CMS.";
        }
        return {
          done: false,
          value: `<section id="login" class="section login-section"><div class="container login-layout"><div class="login-copy"><span class="eyebrow">Area restrita</span><h2>Entrar no dashboard</h2><p>Acesse indicadores, leads, imoveis e salvamento do CMS.</p></div><form class="login-card" data-cid="login" data-message="login"><label class="mini-field"><span>E-mail</span><input name="email" type="email" value="admin@suaimobiliaria.com.br" autocomplete="username"></label><label class="mini-field"><span>Senha</span><input name="password" type="password" value="${CMS_LOGIN_PASSWORD}" autocomplete="current-password"></label>${error ? `<p class="login-error">${error}</p>` : `<p class="route-note">Senha sincronizada com um fragmento do token do CMS para esta demonstracao.</p>`}<button class="gold-btn" type="submit">Acessar dashboard</button></form></div></section>`,
        };
      },
    };
  };

  const ContactComponent = ({ props }) => {
    let status = "";
    return {
      next(message = {}) {
        if (message.type === "contact") {
          props.addLead({ name: message.fields.name || "Contato", source: "Contato", interest: message.fields.interest || "Mensagem geral", stage: "novo" });
          status = "Mensagem salva como lead.";
        }
        return {
          done: false,
          value: `<section class="section detail-section"><div class="container"><div class="section-title"><div><span class="eyebrow">Contato</span><h2>Fale com a imobiliaria</h2><p>Contato, WhatsApp, endereco, mapa e formulario de interesse.</p></div></div><div class="phone-strip"><article class="phone-card"><h3>WhatsApp</h3><p class="location">(71) 99999-0000</p><button class="gold-btn" type="button">Iniciar conversa</button></article><form class="phone-card" data-cid="contact" data-message="contact"><h3>Formulario</h3><div class="mini-field"><label>Nome</label><input name="name" required></div><div class="mini-field"><label>Telefone</label><input name="phone" required></div><div class="mini-field"><label>Interesse</label><input name="interest"></div><button class="gold-btn" type="submit">Enviar</button>${status ? `<p class="login-error">${status}</p>` : ""}</form><article class="phone-card"><h3>Endereco</h3><p class="location">Rua das Acacias, 129<br>Caminho das Arvores, Salvador/BA</p><button class="ghost-btn" type="button">Ver mapa</button></article></div></div></section>`,
        };
      },
    };
  };

  const FooterComponent = () => ({
    next: () => ({
      done: false,
      value: `<footer id="contato" class="site-footer"><div class="container footer-grid"><div>${brand()}<p>Conectando pessoas aos melhores imoveis e oportunidades.</p><p>Instagram · Facebook · WhatsApp · YouTube</p><a class="footer-dashboard" href="#dashboard" data-route="dashboard">Dashboard</a></div><div><h4>Institucional</h4><div class="footer-links"><a>Sobre nos</a><a>Trabalhe conosco</a><a>Politica de privacidade</a><a>Termos de uso</a></div></div><div><h4>Imoveis</h4><div class="footer-links"><a data-route="comprar">Comprar</a><a data-route="comprar">Alugar</a><a data-route="destaques">Lancamentos</a><a data-route="anuncie">Anuncie seu imovel</a></div></div><div><h4>Contato</h4><p>(71) 99999-0000<br>contato@suaimobiliaria.com.br<br>Rua das Acacias, 129<br>Salvador/BA</p></div></div></footer>`,
    }),
  });

  const FloatingWhatsComponent = () => ({
    next: () => ({ done: false, value: `<button class="float-whats" type="button" data-route="contato" aria-label="WhatsApp">☎</button>` }),
  });
