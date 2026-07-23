"use strict";
const bootApp = (rootSelector = "#app") => {
  const root =
    document.querySelector(rootSelector) ||
    document.body.appendChild(
      Object.assign(document.createElement("div"), { id: "app" }),
    );
  root.classList.add("app-shell");
  const nativeDashboardOnly = Boolean(window.SuaImobiliariaCmsConfig?.nativeDashboardOnly || window.Capacitor);
  const dashboardAuditMode = Boolean(window.SuaImobiliariaCmsConfig?.dashboardAuditMode);
  root.classList.toggle("native-dashboard-app", nativeDashboardOnly);

  const initialRoute = parseRoute();
  const routeState = {
    state: {
      route: nativeDashboardOnly ? "dashboard" : initialRoute.route,
      selectedPropertyId: initialRoute.propertyId || properties[0]?.id || null,
      selectedBrokerId: initialRoute.brokerId || null,
      dashboardTab: initialRoute.dashboardTab || "overview",
      selectedEntityId: initialRoute.entityId || null,
      operation: initialRoute.operation || "comprar",
    },
    current() {
      return this.state;
    },
    apply(message = {}) {
      if (message.type !== "route") return this.state;
      const requestedRoute = ROUTES.includes(message.route) ? message.route : "home";
      const nextRoute = nativeDashboardOnly && requestedRoute !== "login" ? "dashboard" : requestedRoute;
      this.state = {
        ...this.state,
        route:
          message.authenticated || nextRoute !== "dashboard"
            ? nextRoute
            : "login",
        selectedPropertyId:
          message.propertyId ||
          this.state.selectedPropertyId ||
          properties[0]?.id ||
          null,
        selectedBrokerId:
          message.brokerId !== undefined
            ? message.brokerId
            : this.state.selectedBrokerId,
        dashboardTab:
          message.dashboardTab || this.state.dashboardTab || "overview",
        selectedEntityId:
          message.entityId !== undefined
            ? message.entityId
            : this.state.selectedEntityId,
        operation: message.operation || this.state.operation || "comprar",
      };
      return this.state;
    },
    setRoute(route, options = {}) {
      return this.apply({
        type: "route",
        route,
        propertyId: options.propertyId,
        brokerId: options.brokerId,
        dashboardTab: options.dashboardTab,
        entityId: options.entityId,
        operation: options.operation,
        authenticated: options.authenticated,
      });
    },
  };

  const sessionState = {
    state: {
      favorites: new Set(
        JSON.parse(localStorage.getItem("suaimobiliaria:favorites") || "[]"),
      ),
      authenticated: nativeDashboardOnly && dashboardAuditMode,
    },
    current() {
      return this.state;
    },
    apply(message = {}) {
      if (message.type === "toggleFavorite") {
        const favorites = new Set(this.state.favorites);
        if (favorites.has(message.propertyId))
          favorites.delete(message.propertyId);
        else favorites.add(message.propertyId);
        localStorage.setItem(
          "suaimobiliaria:favorites",
          JSON.stringify([...favorites]),
        );
        this.state = { ...this.state, favorites };
        return this.state;
      }
      if (message.type === "login") {
        this.state = { ...this.state, authenticated: true };
        return this.state;
      }
      if (message.type === "logout") {
        this.state = { ...this.state, authenticated: false };
        return this.state;
      }
      return this.state;
    },
  };

  const featuredHoverState = {};

  const dashboardState = {
    state: dashboardContent,
    current() {
      return this.state;
    },
    addLead(lead) {
      this.state = {
        ...dashboardContent,
        leads: [lead, ...dashboardContent.leads],
        activities: [
          {
            icon: "L",
            title: "Novo lead recebido",
            detail: lead.interest,
            time: "Agora",
            color: "var(--gold)",
            properties: [],
            brokers: [],
            clients: [],
          },
          ...dashboardContent.activities,
        ],
      };
      dashboardContent = this.state;
      return this.state;
    },
  };

  const components = new Map();
  const add = (id, createComponent, props = {}) => {
    const component = createComponent({ id, props });
    if (!component || typeof component.next !== "function")
      throw new Error(`Component ${id} must expose next().`);
    components.set(id, component);
    return component;
  };
  const getRoute = () => routeState.current().route;
  const getSession = () => sessionState.current();
  const getSelectedBroker = () =>
    brokers.find(
      (broker) =>
        (broker.id || slugify(broker.name || broker.title || "")) ===
        routeState.current().selectedBrokerId,
    ) ||
    brokers[0] ||
    null;
  let leadAuthModal = {
    open: false,
    mode: "login", // "login" or "register"
    error: "",
    leadData: null,
  };

  const submitLeadAndPersist = async (lead) => {
    dashboardState.addLead(lead);
    try {
      await persistCmsSnapshot(properties, dashboardContent);
      console.log("Lead persistido no CMS com sucesso!");
    } catch (err) {
      console.error("Erro ao persistir lead no CMS:", err);
    }
    render();
  };

  const addLead = (lead) => {
    const session = getSession();
    if (session.leadUser) {
      lead.cpf = session.leadUser.cpf;
      lead.name = session.leadUser.name;
      lead.phone = session.leadUser.phone || lead.phone;
      lead.email = session.leadUser.email || lead.email;
      submitLeadAndPersist(lead);
    } else {
      leadAuthModal.open = true;
      leadAuthModal.leadData = lead;
      leadAuthModal.mode = "login";
      leadAuthModal.error = "";
      render();
    }
  };
  let requestRender = () => {};
  const persistCmsSnapshot = async (
    nextProperties = properties,
    nextDashboard = dashboardContent,
    nextBrokers = brokers,
  ) => {
    return saveCmsDataToGitHub({
      properties: nextProperties,
      brokers: nextBrokers,
      dashboard: nextDashboard,
    });
  };
  const saveDashboard = async (nextDashboard = dashboardContent) => {
    const normalizedDashboard = normalizeDashboardContent(nextDashboard);
    dashboardContent = normalizedDashboard;
    dashboardState.state = normalizedDashboard;
    const result = await persistCmsSnapshot(properties, normalizedDashboard);
    propsSync();
    return { message: result?.message || "Alterações do CRM salvas." };
  };
  const saveProperty = async (draft, originalId = null) => {
    const normalized = normalizeDashboardItem("properties", draft);
    const nextProperties = properties.slice();
    const index = originalId
      ? nextProperties.findIndex((item) => item.id === originalId)
      : -1;
    if (index >= 0) nextProperties.splice(index, 1, normalized);
    else nextProperties.unshift(normalized);
    const result = await persistCmsSnapshot(nextProperties, dashboardContent);
    properties = nextProperties;
    propsSync();
    return { property: normalized, message: result?.message || "Imóvel salvo e publicado." };
  };
  const deleteProperty = async (propertyId) => {
    const nextProperties = properties.filter((item) => item.id !== propertyId);
    if (nextProperties.length === properties.length)
      throw new Error("Produto nao encontrado.");
    const result = await persistCmsSnapshot(nextProperties, dashboardContent);
    properties = nextProperties;
    propsSync();
    return { message: result?.message || "Imóvel removido." };
  };
  const saveBroker = async (draft, originalId = null) => {
    const normalized = {
      id:
        draft.id ||
        slugify(draft.name || draft.title || "vendedor") ||
        `vendedor-${Date.now()}`,
      name: draft.name || draft.title || "Vendedor",
      phone: draft.phone || "",
      photo: draft.photo || draft.image || "",
      creci: draft.creci || "",
      city: draft.city || "",
      specialty: draft.specialty || draft.role || "",
      bio: draft.bio || draft.note || "",
      performance: draft.performance || "",
      status: draft.status || "Ativo",
    };
    const nextBrokers = brokers.slice();
    const index = originalId
      ? nextBrokers.findIndex(
          (item) =>
            (item.id || slugify(item.name || item.title || "")) === originalId,
        )
      : -1;
    if (index >= 0) nextBrokers.splice(index, 1, normalized);
    else nextBrokers.unshift(normalized);
    const result = await persistCmsSnapshot(properties, dashboardContent, nextBrokers);
    brokers = nextBrokers;
    propsSync();
    return { broker: normalized, message: result?.message || "Vendedor salvo." };
  };
  const deleteBroker = async (brokerId) => {
    const nextBrokers = brokers.filter(
      (item) =>
        (item.id || slugify(item.name || item.title || "")) !== brokerId,
    );
    if (nextBrokers.length === brokers.length)
      throw new Error("Vendedor nao encontrado.");
    const result = await persistCmsSnapshot(properties, dashboardContent, nextBrokers);
    brokers = nextBrokers;
    propsSync();
    return { message: result?.message || "Vendedor removido." };
  };
  const propsSync = () => requestRender();
  const propertyTools = {
    getRouteInfo: () => routeState.current(),
    getFeaturedScrollState: () => featuredScrollState,
    isFavorite: (id) => getSession().favorites.has(id),
    toggleFavorite: (id) =>
      sessionState.apply({ type: "toggleFavorite", propertyId: id }),
    getSelectedProperty: () =>
      properties.find(
        (property) => property.id === routeState.current().selectedPropertyId,
      ) || properties[0],
    addLead,
    saveProperty,
    deleteProperty,
    goToRoute: (route, options = {}) => setRoute(route, options),
  };
  const routeTools = {
    getRoute,
    getSession,
    getSelectedBroker,
    getRouteInfo: () => routeState.current(),
    goToRoute: (route, options = {}) => setRoute(route, options),
  };

  add("topbar", TopbarComponent, routeTools);
  add("hero", HeroComponent, routeTools);
  add("stats", StatsComponent);
  add("featured", FeaturedComponent, propertyTools);
  add("announce", AnnounceComponent, { addLead });
  add("listing", ListingComponent, propertyTools);
  add("detail", DetailComponent, propertyTools);

  // Componente virtual de autenticação do lead antes do envio (dados de contato simplificados)
  components.set("leadAuth", {
    async next(message = {}) {
      if (message.type === "closeModal") {
        leadAuthModal.open = false;
        leadAuthModal.error = "";
        render();
      }
      else if (message.type === "submitContactDetails" || message.type === "submitCpfRegistration") {
        const name = message.fields.name;
        const phone = message.fields.phone;
        const email = message.fields.email;
        const cpf = message.fields.cpf;
        
        // Cooldown anti-spam
        if (!FormValidator.antiSpamCheck("leadAuthForm")) {
          leadAuthModal.error = "Por favor, aguarde alguns segundos antes de enviar novamente.";
          render();
          return;
        }

        if (!name || !phone || !email || !cpf) {
          leadAuthModal.error = "Por favor, preencha todos os campos obrigatórios (*).";
          render();
          return;
        }

        // Validações de tipo, integridade e quantidade
        if (!FormValidator.validateName(name)) {
          leadAuthModal.error = "Nome inválido. Por favor, insira seu nome e sobrenome (somente letras).";
          render();
          return;
        }

        if (!FormValidator.validatePhone(phone)) {
          leadAuthModal.error = "Telefone inválido. Por favor, insira um número com DDD (mínimo 10 dígitos).";
          render();
          return;
        }

        if (!FormValidator.validateEmail(email)) {
          leadAuthModal.error = "E-mail inválido. Por favor, insira um endereço de e-mail correto.";
          render();
          return;
        }

        if (!FormValidator.validateCPF(cpf)) {
          leadAuthModal.error = "CPF inválido. Por favor, digite um CPF correto.";
          render();
          return;
        }
        
        // Registra o cliente de forma simplificada no banco de dados com seu CPF
        const cleanPhone = String(phone).replace(/[^\d]/g, "");
        const cleanCpf = String(cpf).replace(/[^\d]/g, "");
        const newClient = {
          id: `client-${Date.now()}`,
          name,
          phone: cleanPhone,
          email,
          cpf: cleanCpf,
          profile: "Registrado via formulário de cadastro e autenticação por CPF.",
          focus: "Comprar",
          created: new Date().toISOString(),
        };
        
        dashboardContent.clients = dashboardContent.clients || [];
        dashboardContent.clients.push(newClient);
        
        try {
          await persistCmsSnapshot(properties, dashboardContent);
          console.log("Novo cliente registrado no CMS com sucesso!");
        } catch (err) {
          console.error("Erro ao registrar cliente no CMS:", err);
        }
        
        // Salva a sessão do usuário com o CPF
        sessionState.state = {
          ...sessionState.state,
          leadUser: {
            name,
            phone: cleanPhone,
            email,
            cpf: cleanCpf,
          }
        };
        
        // Envia o lead pendente
        leadAuthModal.open = false;
        leadAuthModal.error = "";
        if (leadAuthModal.leadData) {
          const pending = { ...leadAuthModal.leadData };
          leadAuthModal.leadData = null;
          pending.name = name;
          pending.phone = cleanPhone;
          pending.email = email;
          pending.cpf = cleanCpf;
          await submitLeadAndPersist(pending);
        } else {
          render();
        }
      }
    }
  });
  add("editor", ProductEditorComponent, {
    getRoute,
    getSelectedProperty: () =>
      properties.find(
        (property) => property.id === routeState.current().selectedPropertyId,
      ) || null,
    saveProperty,
    deleteProperty,
    goToRoute: (route, options = {}) => setRoute(route, options),
    editorImage: () => properties[0]?.image || "",
  });
  add("brokers", BrokersComponent, {
    ...routeTools,
    saveBroker,
    deleteBroker,
    requestRender: () => requestRender(),
    goToRoute: (route, options = {}) => setRoute(route, options),
  });
  add("dashboard", DashboardComponentStateful, {
    requestRender: () => requestRender(),
    goToRoute: (route, options = {}) => setRoute(route, options),
    deleteProperty,
    saveBroker,
    deleteBroker,
    getSession: () => getSession(),
    getRouteInfo: () => routeState.current(),
    saveDashboard,
    renderAbout: () => renderComponent("dashboard-about"),
    renderEditions: () => renderComponent("dashboard-editions"),
  });
  add("login", LoginComponent, {
    login: async (email, password) => {
      try {
        await authenticateCmsSession(email, password);
        sessionState.apply({ type: "login" });
        const currentTab = routeState.current().dashboardTab;
        setRoute("dashboard", {
          dashboardTab:
            currentTab && currentTab !== "overview" ? currentTab : undefined,
        });
        return true;
      } catch {
        return false;
      }
    },
    requestRender: () => requestRender(),
  });
  add("contact", ContactComponent, { addLead });
  add("about", AboutComponent, { ...routeTools });
  add("dashboard-about", AboutComponent, {
    ...routeTools,
    requestRender: () => requestRender(),
    saveDashboard,
  });
  add("editions", DashboardEditionsComponent, {
    saveDashboard,
    requestRender: () => requestRender(),
  });
  add("dashboard-editions", DashboardEditionsComponent, {
    saveDashboard,
    requestRender: () => requestRender(),
  });
  add("financing", FinancingComponent, { addLead });
  add("footer", FooterComponent);
  add("floating-whats", FloatingWhatsComponent);

  const renderComponent = (id) => {
    const result = components.get(id)?.next();
    return result?.value || "";
  };
  const panel = (route, html) => {
    const offset = route !== "home";
    return /*html*/ `<div class="route-panel${offset ? " route-panel--offset" : ""}" ${routeAttrs(getRoute() === route)}>${html}</div>`;
  };
  const syncTopbarState = () => {
    const topbar = root.querySelector(".topbar");
    if (!topbar) return;
    const topbarHeight = topbar.getBoundingClientRect().height;
    const route = getRoute();
    const hero = route === "home" ? root.querySelector(".hero") : null;
    const heroScrollEnd = hero
      ? hero.offsetTop + hero.offsetHeight * 0.4 - topbarHeight
      : 64;
    const scrolledThreshold =
      route === "home" ? Math.max(64, heroScrollEnd) : 64;
    root.style.setProperty(
      "--toolbar-offset",
      `${Math.max(92, Math.round(topbarHeight + 28))}px`,
    );
    root.classList.toggle("is-scrolled", window.scrollY >= scrolledThreshold);
  };
  const renderLeadAuthModal = () => {
    if (!leadAuthModal.open) return "";
    
    return /*html*/`
      <div class="lead-modal-overlay">
        <style>
          .lead-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(10, 17, 20, 0.7);
            backdrop-filter: blur(8px);
            z-index: 11000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            box-sizing: border-box;
          }
          .lead-modal-box {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 440px;
            padding: 32px;
            box-sizing: border-box;
            position: relative;
            color: #16273f;
            font-family: var(--font-body, system-ui, sans-serif);
            animation: leadModalFadeIn 0.3s ease;
          }
          @keyframes leadModalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .lead-modal-close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #718096;
            cursor: pointer;
            transition: color 0.15s;
            line-height: 1;
          }
          .lead-modal-close-btn:hover {
            color: #16273f;
          }
          .lead-modal-box h3 {
            margin: 0 0 8px;
            font-size: 1.35rem;
            color: #16273f;
            font-weight: 700;
          }
          .lead-modal-box p {
            margin: 0 0 20px;
            font-size: 0.88rem;
            color: #718096;
            line-height: 1.5;
          }
          .lead-modal-form {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .lead-modal-error {
            color: #e53e3e;
            font-size: 0.82rem;
            margin-top: 4px;
            font-weight: 500;
          }
          .lead-modal-form .mini-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
            text-align: left;
          }
          .lead-modal-form .mini-field label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #4a5568;
            margin-bottom: 2px;
          }
          .lead-modal-form .mini-field input {
            padding: 10px 12px;
            border: 1px solid #cbd5e0;
            border-radius: 6px;
            font-size: 0.9rem;
            outline: none;
            box-sizing: border-box;
            width: 100%;
            background: #ffffff;
            color: #2d3748;
          }
          .lead-modal-form .mini-field input:focus {
            border-color: #bd8d44;
            box-shadow: 0 0 0 2px rgba(189, 141, 68, 0.15);
          }
          .lead-modal-form button[type="submit"] {
            margin-top: 10px;
            padding: 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            border: none;
          }
        </style>
        <div class="lead-modal-box">
          <button class="lead-modal-close-btn" type="button" data-cid="leadAuth" data-message="closeModal" aria-label="Fechar">&times;</button>
          
          <h3>Dados de Contato</h3>
          <p>Preencha os dados abaixo de forma rápida para confirmar sua solicitação de contato.</p>
          
          <form class="lead-modal-form" data-cid="leadAuth" data-message="submitContactDetails">
            <div class="mini-field">
              <label>Nome Completo *</label>
              <input name="name" type="text" required placeholder="Digite seu nome completo">
            </div>
            <div class="mini-field">
              <label>Telefone / WhatsApp *</label>
              <input name="phone" type="text" required placeholder="(77) 981590101" autocomplete="tel">
            </div>
            <div class="mini-field">
              <label>E-mail *</label>
              <input name="email" type="email" required placeholder="seu@email.com" autocomplete="email">
            </div>
            <div class="mini-field">
              <label>CPF *</label>
              <input name="cpf" type="text" required placeholder="000.000.000-00" autocomplete="off">
            </div>
            
            ${leadAuthModal.error ? `<div class="lead-modal-error">${escapeHtml(leadAuthModal.error)}</div>` : ""}
            
            <button class="gold-btn" type="submit">Confirmar e Enviar Solicitação</button>
          </form>
        </div>
      </div>
    `;
  };

  const render = () => {
    const route = getRoute();
    root.classList.toggle("dashboard-mode", route === "dashboard");
    root.classList.toggle(
      "editor-mode",
      route === "imovel-novo" || route === "imovel-editar",
    );
    root.classList.toggle("route-home", route === "home");
    if (nativeDashboardOnly && route === "login") {
      root.innerHTML = renderComponent("login");
      syncTopbarState();
      return;
    }
    if (
      route === "dashboard" ||
      route === "imovel-novo" ||
      route === "imovel-editar"
    ) {
      root.innerHTML = /*html*/ `${route === "dashboard" ? renderComponent("dashboard") : renderComponent("editor")}`;
      syncTopbarState();
      return;
    }
    root.innerHTML = /*html*/ `
        ${renderComponent("topbar")}
        <main>
          ${panel("home", route === "home" ? `${renderComponent("hero")}${renderComponent("featured")}${renderComponent("brokers")}` : "")}
          ${panel("imoveis", route === "imoveis" ? renderComponent("listing") : "")}
          ${panel("imovel", route === "imovel" ? `${renderComponent("detail")}${renderComponent("brokers")}` : "")}
          ${panel("vendedores", route === "vendedores" || route === "brokers" ? renderComponent("brokers") : "")}
          ${panel("anuncie", route === "anuncie" ? renderComponent("announce") : "")}
          ${panel("login", route === "login" ? renderComponent("login") : "")}
          ${panel("contato", route === "contato" ? renderComponent("contact") : "")}
          ${panel("sobre", route === "sobre" ? renderComponent("about") : "")}
        </main>
        ${renderComponent("footer")}
        ${renderLeadAuthModal()}
    `;
    syncTopbarState();
  };
  requestRender = render;
  window.addEventListener("scroll", syncTopbarState, { passive: true });
  window.addEventListener("resize", syncTopbarState, { passive: true });
  const setRoute = (route, options = {}) => {
    let requestedRoute = ROUTES.includes(route) ? route : "home";
    if (requestedRoute === "financiamento") {
      requestedRoute = "imovel";
      setTimeout(() => {
        const sec = root.querySelector("#financing-section");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
    const nextRoute = nativeDashboardOnly && requestedRoute !== "login" ? "dashboard" : requestedRoute;
    const current = routeState.current();
    const propertyId =
      options.propertyId ||
      routeState.current().selectedPropertyId ||
      properties[0]?.id ||
      null;
    const hasBrokerId = Object.prototype.hasOwnProperty.call(
      options,
      "brokerId",
    );
    const brokerId = hasBrokerId
      ? options.brokerId || null
      : routeState.current().selectedBrokerId || null;
    const sameRoute =
      current.route === nextRoute &&
      current.selectedPropertyId === propertyId &&
      current.selectedBrokerId === brokerId &&
      current.dashboardTab === options.dashboardTab &&
      current.selectedEntityId === options.entityId &&
      current.operation === options.operation;
    if (sameRoute && options.syncHash !== false) return;
    if (sameRoute) return;
    routeState.setRoute(nextRoute, {
      propertyId,
      brokerId,
      dashboardTab: options.dashboardTab,
      entityId: options.entityId,
      operation: options.operation,
      authenticated: getSession().authenticated,
    });
    if (nextRoute !== "destaques") {
      featuredForceClose();
    }
    if (options.syncHash !== false) {
      const query = new URLSearchParams();
      if (options.operation) query.set("operation", options.operation);
      if (brokerId && (nextRoute === "vendedores" || nextRoute === "brokers"))
        query.set("brokerId", brokerId);
      if (nextRoute === "dashboard") {
        if (options.dashboardTab) query.set("tab", options.dashboardTab);
        if (options.entityId) query.set("entityId", options.entityId);
      }
      const nextHash =
        (nextRoute === "imovel" || nextRoute === "imovel-editar") && propertyId
          ? `#${nextRoute}#${encodeURIComponent(propertyId)}`
          : `#${nextRoute}${query.toString() ? `?${query.toString()}` : ""}`;
      window.history.pushState(
        {
          route: nextRoute,
          propertyId,
          brokerId,
          dashboardTab: options.dashboardTab || null,
          entityId: options.entityId || null,
          operation: options.operation || null,
        },
        "",
        nextHash,
      );
    }
    render();
    syncTopbarState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const fieldsFrom = (form) => {
    const result = {};
    for (const [key, value] of new FormData(form).entries()) {
      const sanitized = typeof value === "string" ? FormValidator.sanitizeString(key, value) : value;
      if (key in result) {
        if (Array.isArray(result[key])) result[key].push(sanitized);
        else result[key] = [result[key], sanitized];
      } else {
        result[key] = sanitized;
      }
    }
    return result;
  };
  const dispatch = async (target, event) => {
    const component = components.get(target.dataset.cid);
    if (!component) return;
    const isForm = target.tagName === "FORM";
    const message = {
      type: target.dataset.message,
      name: target.dataset.name || target.name,
      direction: target.dataset.direction,
      propertyId: target.dataset.propertyId,
      value:
        target.dataset.value ??
        (target.isContentEditable ? target.textContent : target.value),
      checked: target.checked,
      fields: isForm ? fieldsFrom(target) : {},
      target,
      event,
    };
    const routeBefore = getRoute();
    try {
      const result = component.next(message);
      if (result?.then) await result;
    } catch (error) {
      console.error(`Action ${message.type} failed`, error);
    }
    if (message.type === "logout") {
      await closeCmsSession();
      sessionState.apply({ type: "logout" });
      setRoute("login");
      return;
    }
    if (getRoute() === routeBefore) {
      render();
      syncTopbarState();
    }
  };

  const featuredScrollState = {
    expandedPropertyId: null,
    expandedHeight: null,
    hoverTimerId: null,
    hoverPendingId: null,
    stageTimerId: null,
    expansionStage: null,
  };
  const featuredMeasureExpandedHeight = () => {
    const topbar = root.querySelector(".topbar");
    const topbarHeight = topbar?.getBoundingClientRect().height || 0;
    const viewportHeight = window.innerHeight || 900;
    return Math.max(
      420,
      Math.min(760, Math.round(viewportHeight - topbarHeight - 96)),
    );
  };
  const FEATURED_HOVER_ACTIVATION_DELAY = 520;
  const featuredClearTimers = () => {
    if (featuredScrollState.hoverTimerId)
      clearTimeout(featuredScrollState.hoverTimerId);
    if (featuredScrollState.stageTimerId)
      clearTimeout(featuredScrollState.stageTimerId);
    featuredScrollState.hoverTimerId = null;
    featuredScrollState.hoverPendingId = null;
    featuredScrollState.stageTimerId = null;
  };
  const featuredForceClose = ({ shouldRender = true } = {}) => {
    const hadState =
      featuredScrollState.expandedPropertyId ||
      featuredScrollState.hoverPendingId ||
      featuredScrollState.expansionStage;
    featuredClearTimers();
    featuredScrollState.expandedPropertyId = null;
    featuredScrollState.expandedHeight = null;
    featuredScrollState.expansionStage = null;
    if (!hadState || !shouldRender) return;
    render();
    syncTopbarState();
  };
  const featuredOpen = (propertyId) => {
    if (!propertyId || getRoute() !== "destaques") return;
    featuredClearTimers();
    featuredScrollState.expandedPropertyId = propertyId;
    featuredScrollState.expandedHeight = featuredMeasureExpandedHeight();
    featuredScrollState.expansionStage = "compact";
    render();
    syncTopbarState();
    featuredScrollState.stageTimerId = setTimeout(() => {
      if (featuredScrollState.expandedPropertyId !== propertyId) return;
      featuredScrollState.expansionStage = "expanded";
      featuredScrollState.stageTimerId = null;
      render();
      syncTopbarState();
      setTimeout(() => {
        if (featuredScrollState.expandedPropertyId !== propertyId) return;
        const expandedCard = root.querySelector(
          `.featured-showcase-card.is-expanded[data-property-id="${CSS.escape(propertyId)}"]`,
        );
        expandedCard?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 160);
    }, 460);
  };
  const featuredScheduleOpen = (propertyId) => {
    if (!propertyId || getRoute() !== "destaques") return;
    if (
      featuredScrollState.expandedPropertyId ||
      featuredScrollState.hoverPendingId === propertyId
    )
      return;
    featuredClearTimers();
    featuredScrollState.hoverPendingId = propertyId;
    featuredScrollState.hoverTimerId = setTimeout(
      () => featuredOpen(propertyId),
      FEATURED_HOVER_ACTIVATION_DELAY,
    );
  };
  const featuredShouldCloseFromScrollIntent = (event) => {
    if (!featuredScrollState.expandedPropertyId)
      return Boolean(featuredScrollState.hoverPendingId);
    const expandedCard = root.querySelector(
      ".featured-showcase-card.is-expanded",
    );
    if (!expandedCard) return true;
    const rect = expandedCard.getBoundingClientRect();
    const point = event?.touches?.[0] || event;
    const y = typeof point?.clientY === "number" ? point.clientY : null;
    if (y === null) return false;
    const tolerance = Math.min(140, Math.max(72, rect.height * 0.16));
    return y <= rect.top + tolerance || y >= rect.bottom - tolerance;
  };
  const featuredCloseOnScrollIntent = (event) => {
    if (getRoute() !== "destaques") return;
    if (!featuredShouldCloseFromScrollIntent(event)) return;
    featuredForceClose();
  };
  window.addEventListener("wheel", featuredCloseOnScrollIntent, {
    passive: true,
  });
  window.addEventListener("touchmove", featuredCloseOnScrollIntent, {
    passive: true,
  });
  root.addEventListener("pointerover", (event) => {
    if (getRoute() !== "destaques") return;
    const card = event.target.closest(
      ".featured-showcase-card[data-property-id]",
    );
    if (!card) return;
    if (card.contains(event.relatedTarget)) return;
    featuredScheduleOpen(card.dataset.propertyId);
  });
  root.addEventListener("pointerout", (event) => {
    if (getRoute() !== "destaques") return;
    const grid = event.target.closest(".featured-showcase-grid");
    if (!grid || grid.contains(event.relatedTarget)) return;
    featuredForceClose();
  });
  let sidebarSwipeStart = null;
  root.addEventListener("touchstart", (event) => {
    if (getRoute() !== "dashboard") return;
    const touch = event.touches?.[0];
    if (!touch) return;
    const shell = root.querySelector(".dashboard-shell");
    const sidebar = shell?.querySelector(".dashboard-nav");
    if (!shell || !sidebar) return;
    const isCollapsed = shell.classList.contains("is-sidebar-collapsed");
    const drawerRect = sidebar.getBoundingClientRect();
    const drawerWidth = drawerRect.width;
    const canOpenFromOffset = isCollapsed && touch.clientX >= 28 && touch.clientX <= 96;
    const canCloseFromDrawer = !isCollapsed && touch.clientX >= drawerRect.left && touch.clientX <= drawerRect.right;
    if (!canOpenFromOffset && !canCloseFromDrawer) return;
    sidebarSwipeStart = {
      x: touch.clientX,
      y: touch.clientY,
      sidebar,
      shell,
      drawerWidth,
      initialProgress: isCollapsed ? 0 : 1,
      isCollapsed,
      progress: isCollapsed ? 0 : 1,
    };
  }, { passive: true });
  root.addEventListener("touchmove", (event) => {
    if (!sidebarSwipeStart) return;
    const touch = event.touches?.[0];
    if (!touch) return;
    const horizontalDistance = touch.clientX - sidebarSwipeStart.x;
    const verticalDistance = touch.clientY - sidebarSwipeStart.y;
    if (Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) return;
    event.preventDefault();
    const progress = Math.max(0, Math.min(1, sidebarSwipeStart.initialProgress + horizontalDistance / sidebarSwipeStart.drawerWidth));
    sidebarSwipeStart.progress = progress;
    sidebarSwipeStart.shell.classList.add("is-sidebar-dragging");
    sidebarSwipeStart.sidebar.style.transform = `translateX(${(progress - 1) * sidebarSwipeStart.drawerWidth}px)`;
  }, { passive: false });
  root.addEventListener("touchend", (event) => {
    if (!sidebarSwipeStart) return;
    const gesture = sidebarSwipeStart;
    sidebarSwipeStart = null;
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    const horizontalDistance = touch.clientX - gesture.x;
    const verticalDistance = touch.clientY - gesture.y;
    const finalProgress = Math.max(0, Math.min(1, gesture.initialProgress + horizontalDistance / gesture.drawerWidth));
    const shouldOpen = finalProgress >= 0.5;
    gesture.sidebar.style.transform = "";
    gesture.shell.classList.remove("is-sidebar-dragging");
    if (Math.abs(horizontalDistance) < 18 || Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) return;
    if ((gesture.isCollapsed && shouldOpen) || (!gesture.isCollapsed && !shouldOpen)) {
      const toggle = gesture.sidebar.querySelector("[data-message='toggleSidebar']");
      if (toggle) void dispatch(toggle, event);
    }
  });
  root.addEventListener("click", (event) => {
    const routeTarget = event.target.closest("[data-route]");
    if (routeTarget) {
      event.preventDefault();
      const route = routeTarget.dataset.route;
      setRoute(route, {
        propertyId: routeTarget.dataset.propertyId || undefined,
        brokerId: routeTarget.dataset.brokerId || undefined,
        dashboardTab: routeTarget.dataset.dashboardTab || undefined,
        entityId: routeTarget.dataset.entityId || undefined,
        operation: routeTarget.dataset.operation || undefined,
      });
      if (route === "imovel" && (routeTarget.textContent.includes("Financiamento") || routeTarget.textContent.includes("Financiamentos"))) {
        setTimeout(() => {
          const sec = root.querySelector("#financing-section");
          if (sec) sec.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
      return;
    }
    const actionTarget = event.target.closest("[data-cid][data-message]");
    if (
      actionTarget &&
      actionTarget.tagName !== "FORM" &&
      !actionTarget.isContentEditable &&
      !(actionTarget.tagName === "INPUT" && actionTarget.type === "file")
    )
      void dispatch(actionTarget, event);
  });
  root.addEventListener("input", (event) => {
    if (event.target.name === "cpf") {
      let value = event.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      if (value.length > 9) {
        event.target.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
      } else if (value.length > 6) {
        event.target.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
      } else if (value.length > 3) {
        event.target.value = `${value.slice(0, 3)}.${value.slice(3)}`;
      } else {
        event.target.value = value;
      }
    }
    const actionTarget = event.target.matches?.("[data-cid][data-message]")
      ? event.target
      : null;
    if (actionTarget) void dispatch(actionTarget, event);
  });
  root.addEventListener("change", (event) => {
    const actionTarget = event.target.matches?.("[data-cid][data-message]")
      ? event.target
      : null;
    if (actionTarget) void dispatch(actionTarget, event);
  });
  root.addEventListener("submit", (event) => {
    const actionTarget = event.target.closest("form[data-cid][data-message]");
    if (!actionTarget) return;
    event.preventDefault();
    void dispatch(actionTarget, event);
  });
  window.addEventListener("popstate", () => {
    const parsed = parseRoute();
    routeState.apply({
      type: "route",
      route: parsed.route,
      propertyId: parsed.propertyId,
      brokerId: parsed.brokerId || null,
      dashboardTab: parsed.dashboardTab || null,
      entityId: parsed.entityId || null,
      operation: parsed.operation || null,
      authenticated: getSession().authenticated,
    });
    render();
  });
  window.addEventListener("hashchange", () => {
    const parsed = parseRoute();
    if (
      parsed.route !== getRoute() ||
      parsed.propertyId !== routeState.current().selectedPropertyId ||
      parsed.brokerId !== routeState.current().selectedBrokerId ||
      parsed.dashboardTab !== routeState.current().dashboardTab ||
      parsed.entityId !== routeState.current().selectedEntityId ||
      parsed.operation !== routeState.current().operation
    ) {
      setRoute(parsed.route, {
        propertyId: parsed.propertyId,
        brokerId: parsed.brokerId || null,
        dashboardTab: parsed.dashboardTab || null,
        entityId: parsed.entityId || null,
        operation: parsed.operation || null,
        syncHash: false,
      });
    }
  });
  if (getRoute() === "dashboard" && !getSession().authenticated) {
    routeState.apply({
      type: "route",
      route: "login",
      propertyId: null,
      brokerId: null,
      dashboardTab: null,
      entityId: null,
      operation: null,
      authenticated: false,
    });
    window.history.replaceState({ route: "login" }, "", "#login");
    render();
  } else render();
  return {
    next: (message = {}) =>
      message.type === "render" ? render() : routeState.apply(message),
    states: { routeState, sessionState, dashboardState },
  };
};

window.SuaImobiliariaApp = { bootApp };

document.addEventListener("DOMContentLoaded", () => {
  loadCmsData()
    .catch((error) => {
      console.warn("CMS indisponivel, usando dados locais.", error);
    })
    .then(() => bootApp("#app"));
});
