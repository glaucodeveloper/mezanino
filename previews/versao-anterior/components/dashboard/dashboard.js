const DashboardComponentStateful = ({ props }) => {
  let activeTab = props.getRouteInfo?.().dashboardTab || "properties";
  let crudStatus = "";
  let clientAttachmentRows = 2;
  let crudWorkspace = null;
  let sidebarCollapsed = false;
  const escapeText = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  const viewModes = {
    clients: "grid",
    deals: "grid",
    marketAnalyses: "grid",
    brokers: "grid",
    properties: "grid",
    reports: "grid",
  };

  const nativeDashboardOnly = Boolean(window.SuaImobiliariaCmsConfig?.nativeDashboardOnly);
  const allTabs = [
    ["properties", "Imóveis", "&#127968;"],
  ];
  const tabs = allTabs;
  const adminBroker = brokers[1] || brokers[0] || {
    name: "Equipe Mezanino",
    photo: ""
  };

  const getRouteInfo = () => props.getRouteInfo?.() || {};
  const getSession = () => props.getSession?.() || { favorites: new Set() };
  const schemaLabel = (collection) => DASHBOARD_COLLECTION_SCHEMAS[collection]?.label || collection || "item";
  const getCollectionItems = (collection) => (collection === "properties" ? properties : collection === "brokers" ? brokers : dashboardContent[collection] || []);
  const setCollectionItems = (collection, items) => {
    if (collection === "properties") {
      properties = normalizeDashboardCollection("properties", items);
      return;
    }
    if (collection === "brokers") {
      brokers = items;
      return;
    }
    dashboardContent = { ...dashboardContent, [collection]: normalizeDashboardCollection(collection, items) };
  };
  const persistDashboard = async () => {
    if (typeof props.saveDashboard === "function") await props.saveDashboard(dashboardContent);
    else props.requestRender?.();
  };
  const buildMetrics = () => {
    const session = getSession();
    const appointments = getCollectionItems("appointments");
    const reports = getCollectionItems("reports");
    const clients = getCollectionItems("clients");
    const leads = getCollectionItems("leads");
    const deals = getCollectionItems("deals");
    const marketAnalyses = getCollectionItems("marketAnalyses");
    return [
      { label: "Comparaveis", value: String(properties.length), note: "disponibilidade a confirmar" },
      { label: "Leads captados", value: String(leads.length), note: "entradas do site" },
      { label: "Negocios ativos", value: String(deals.length), note: "casos reais vinculados" },
      { label: "Leituras de mercado", value: String(marketAnalyses.length), note: "Vitoria da Conquista" },
      { label: "Clientes cadastrados", value: String(clients.length), note: "cadastros autorizados" },
      { label: "Agendamentos ativos", value: String(appointments.length), note: "calendario operacional" },
      { label: "Relatorios gerados", value: String(reports.length), note: "pdfs e cards" },
      { label: "Favoritos salvos", value: String(session.favorites?.size || 0), note: "movimento do publico" },
    ];
  };
  const downloadPdf = (report) => {
    const escapePdf = (value) => String(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/[^\x20-\x7E]/g, "");
    const lines = [
      `Gerado em: ${report.generatedAt || new Date().toLocaleString("pt-BR")}`,
      `Valor: ${report.value || ""}`,
      `Resumo: ${report.note || ""}`,
      "Metricas:",
      ...buildMetrics().slice(0, 4).map((metric) => `${metric.label}: ${metric.value}`),
    ].map((line) => escapePdf(line));
    const stream = ["BT", "/F1 18 Tf", "72 760 Td", `(${escapePdf(report.title || "Relatorio")}) Tj`, "/F1 11 Tf", ...lines.map((line, index) => `${index === 0 ? "0 -26 Td" : "0 -16 Td"} (${line}) Tj`), "ET"].join("\n");
    const objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    ];
    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let index = 1; index <= objects.length; index += 1) pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${String(report.title || "relatorio").toLowerCase().replace(/[^a-z0-9]+/g, "-") || "relatorio"}.pdf`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 800);
  };
  const renderCollectionCard = (collection) => DashboardCollectionCardComponent({
    props: {
      collection,
      items: getCollectionItems(collection),
      metrics: buildMetrics(),
      activities: getCollectionItems("activities"),
      appointments: getCollectionItems("appointments"),
      propertiesCount: properties.length,
      attachmentRows: clientAttachmentRows,
      crudStatus,
      viewMode: viewModes[collection] || "grid",
      selectedEntityId: getRouteInfo().selectedEntityId,
      routeInfo: getRouteInfo(),
      crudWorkspace,
    },
  }).next().value;
  const renderOverview = () => DashboardOverviewComponent({
    props: {
      metrics: buildMetrics(),
      activities: getCollectionItems("activities"),
      appointments: getCollectionItems("appointments"),
      properties: getCollectionItems("properties"),
    },
  }).next().value;

  return {
    next(message = {}) {
      dashboardContent = { ...dashboardContent, metrics: buildMetrics() };
      const routeTab = getRouteInfo().dashboardTab || "properties";
      if (routeTab !== activeTab) activeTab = routeTab;
      if (message.type === "setTab") {
        activeTab = message.value || activeTab;
        crudWorkspace = null;
        props.goToRoute?.("dashboard", { dashboardTab: activeTab });
      }
      if (message.type === "toggleSidebar") {
        sidebarCollapsed = !sidebarCollapsed;
      }
      if (message.type === "setCollectionView") {
        viewModes[message.collection] = message.value || viewModes[message.collection] || "grid";
      }
      if (message.type === "newItem") {
        crudStatus = "";
        crudWorkspace = { collection: message.collection || activeTab, mode: "create", entityId: null };
        activeTab = crudWorkspace.collection;
        if (crudWorkspace.collection === "appointments") {
          props.goToRoute?.("dashboard", { dashboardTab: "appointments" });
        } else {
          props.goToRoute?.("dashboard", { dashboardTab: crudWorkspace.collection });
        }
      }
      if (message.type === "editBroker") {
        crudWorkspace = { collection: "brokers", mode: "edit", entityId: message.brokerId || null };
        activeTab = "brokers";
        props.goToRoute?.("dashboard", { dashboardTab: "brokers", entityId: message.brokerId || null });
      }
      if (message.type === "editItem") {
        const collection = message.collection || activeTab;
        crudWorkspace = { collection, mode: "edit", entityId: message.itemId || null };
        activeTab = collection;
        props.goToRoute?.("dashboard", { dashboardTab: collection, entityId: message.itemId || null });
      }
      if (message.type === "closeCrudWorkspace") crudWorkspace = null;
      if (message.type === "addAttachmentRow") clientAttachmentRows += 1;
      if (message.type === "refreshMetrics") crudStatus = "Indicadores atualizados com os registros disponíveis.";
      if (message.type === "newActivity") {
        crudStatus = "";
        crudWorkspace = { collection: "activities", mode: "create", entityId: null };
        activeTab = "activities";
        props.goToRoute?.("dashboard", { dashboardTab: "activities" });
      }
      if (message.type === "jumpToday") {
        activeTab = "appointments";
        crudWorkspace = null;
        props.goToRoute?.("dashboard", { dashboardTab: "appointments" });
      }
      if (message.type === "downloadReport") {
        const report = getCollectionItems("reports").find((entry) => entry.id === message.reportId);
        if (report) downloadPdf(report);
      }
      if (message.type === "generateReport") {
        const metrics = buildMetrics();
        const report = {
          id: `report-${Date.now()}`,
          title: `Relatorio corporativo ${new Date().toLocaleDateString("pt-BR")}`,
          value: `${metrics.length} indicadores`,
          note: `Resumo com ${metrics[0].value} imoveis, ${metrics[1].value} leads e ${metrics[2].value} agendamentos.`,
          generatedAt: new Date().toLocaleString("pt-BR"),
          period: "PDF corporativo",
        };
        dashboardContent = { ...dashboardContent, reports: [report, ...dashboardContent.reports] };
        downloadPdf(report);
        crudStatus = "Relatorio PDF gerado e baixado.";
        persistDashboard();
      }
      if (message.type === "deleteItem") {
        const collection = message.collection || activeTab;
        const itemId = message.itemId;
        const item = getCollectionItems(collection).find((entry) => entry.id === itemId);
        if (item && window.confirm(`Excluir ${item.title || item.name || item.label || "este item"}?`)) {
          if (collection === "properties") return props.deleteProperty(itemId).then((result) => { crudStatus = result.message || "Imóvel removido."; props.requestRender?.(); });
          if (collection === "brokers") return props.deleteBroker?.(itemId).then((result) => { crudStatus = result.message || "Vendedor removido."; props.requestRender?.(); });
          setCollectionItems(collection, getCollectionItems(collection).filter((entry) => entry.id !== itemId));
          crudStatus = "Registro removido.";
          persistDashboard();
        }
      }
      if (message.type === "saveItem") {
        const collection = message.collection || activeTab;
        const fields = message.fields || {};
        if (collection === "clients") {
          const form = message.target?.tagName === "FORM" ? message.target : message.target?.closest?.("form");
          const labelInputs = Array.from(form?.querySelectorAll('[data-attachment-label="true"]') || []);
          const fileInputs = Array.from(form?.querySelectorAll('[data-attachment-file="true"]') || []);
          const attachments = [];
          const readFile = (file) => new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = () => resolve("");
            reader.readAsDataURL(file);
          });
          return Promise.all(fileInputs.map(async (input, index) => {
            const file = input.files?.[0];
            if (!file) return;
            const dataUrl = await readFile(file);
            attachments.push({ name: file.name, label: labelInputs[index]?.value || file.name, type: file.type, size: file.size, dataUrl });
          })).then(() => {
            const currentClient = dashboardContent.clients.find(
              (item) => String(item.id) === String(fields.id || ""),
            );
            const nextAttachments = attachments.length
              ? [...(currentClient?.attachments || []), ...attachments]
              : currentClient?.attachments || [];
            const client = normalizeDashboardItem("clients", {
              ...(currentClient || {}),
              ...fields,
              objections: Array.isArray(fields.objections)
                ? fields.objections
                : String(fields.objections || "")
                    .split(/\r?\n|,/)
                    .map((entry) => entry.trim())
                    .filter(Boolean),
              attachments: nextAttachments,
            });
            const nextClients = currentClient
              ? dashboardContent.clients.map((item) =>
                  String(item.id) === String(currentClient.id) ? client : item,
                )
              : [client, ...dashboardContent.clients];
            dashboardContent = { ...dashboardContent, clients: nextClients };
            crudStatus = `Cliente ${client.name || "salvo"} ${currentClient ? "atualizado" : "cadastrado"} com ${nextAttachments.length} anexo(s).`;
            clientAttachmentRows = Math.max(2, nextAttachments.length || 2);
            crudWorkspace = null;
            props.goToRoute?.("dashboard", { dashboardTab: "clients", entityId: client.id || client.name || null });
            return persistDashboard();
          });
        }
        if (collection === "brokers") {
          return props.saveBroker?.(fields).then((result = {}) => {
            crudStatus = result.message || "Vendedor salvo.";
            crudWorkspace = null;
            props.goToRoute?.("dashboard", { dashboardTab: "brokers", entityId: result.broker?.id || fields.id || fields.name || null });
            props.requestRender?.();
          });
        }
        if (collection === "appointments") {
          const appointment = normalizeDashboardItem("appointments", {
            ...fields,
            properties: Array.isArray(fields.properties) ? fields.properties : (fields.properties ? String(fields.properties).split(/\r?\n|,/).map((entry) => entry.trim()).filter(Boolean) : []),
            clients: Array.isArray(fields.clients) ? fields.clients : (fields.clients ? String(fields.clients).split(/\r?\n|,/).map((entry) => entry.trim()).filter(Boolean) : []),
            brokers: Array.isArray(fields.brokers) ? fields.brokers : (fields.brokers ? String(fields.brokers).split(/\r?\n|,/).map((entry) => entry.trim()).filter(Boolean) : []),
            status: fields.status || "confirmado",
          });
          const currentAppointment = dashboardContent.appointments.find((item) => String(item.id) === String(fields.id || ""));
          dashboardContent = {
            ...dashboardContent,
            appointments: currentAppointment
              ? dashboardContent.appointments.map((item) => String(item.id) === String(currentAppointment.id) ? appointment : item)
              : [appointment, ...dashboardContent.appointments],
          };
          crudStatus = `Agendamento ${currentAppointment ? "atualizado" : "salvo"} para ${appointment.date || "nova data"}.`;
          crudWorkspace = null;
          return persistDashboard();
        }
        if (collection === "properties") {
          const draft = normalizeDashboardItem("properties", fields);
          crudStatus = "Salvando imóvel...";
          return props.saveProperty?.(draft, fields.id || null).then((result = {}) => {
            crudStatus = result.message || "Imóvel salvo.";
            crudWorkspace = null;
            props.goToRoute?.("dashboard", { dashboardTab: "properties", entityId: result.property?.id || draft.id || null });
            props.requestRender?.();
          });
        }
        const nextItem = normalizeDashboardItem(collection, fields);
        const currentItem = getCollectionItems(collection).find((item) => String(item.id) === String(fields.id || ""));
        dashboardContent = {
          ...dashboardContent,
          [collection]: currentItem
            ? getCollectionItems(collection).map((item) => String(item.id) === String(currentItem.id) ? nextItem : item)
            : [nextItem, ...getCollectionItems(collection)],
        };
        crudStatus = `${schemaLabel(collection)} ${currentItem ? "atualizado" : "salvo"}.`;
        crudWorkspace = null;
        persistDashboard();
        if (nextItem?.id || nextItem?.name || nextItem?.title) {
          props.goToRoute?.("dashboard", { dashboardTab: collection, entityId: nextItem.id || nextItem.name || nextItem.title });
        }
      }

      actionNotice = crudStatus;
      const currentLabel = tabs.find(([id]) => id === activeTab)?.[1] || "Painel";
      const mainPanel = () => {
        if (activeTab === "properties") return renderCollectionCard("properties");
        return renderCollectionCard("properties");
      };

      return {
        done: false,
        value: /*html*/`
          <section id="dashboard" class="dashboard-section dashboard-fullscreen">
            <div class="dashboard-shell ${sidebarCollapsed ? "is-sidebar-collapsed" : ""}">
              <aside class="dashboard-nav">
                <div class="dashboard-nav-top">
                  <div class="dashboard-brand-row">
                    ${brand()}
                    <button class="dashboard-nav-toggle" type="button" data-cid="dashboard" data-message="toggleSidebar" aria-expanded="${sidebarCollapsed ? "false" : "true"}" aria-label="${sidebarCollapsed ? "Expandir navegacao" : "Recolher navegacao"}">
                      <span aria-hidden="true">${sidebarCollapsed ? "›" : "‹"}</span>
                    </button>
                  </div>
                  ${nativeDashboardOnly ? "" : '<button class="ghost-btn dashboard-back" type="button" data-route="home">Voltar ao site</button>'}
                </div>
                <div class="dash-menu">
                  ${tabs.map(([id, label, icon]) => /*html*/`<button class="${id === activeTab ? "active" : ""}" type="button" data-cid="dashboard" data-message="setTab" data-value="${id}"><span class="dash-menu-icon">${icon}</span><span>${label}</span></button>`).join("")}
                  <button type="button" data-cid="dashboard" data-message="logout"><span class="dash-menu-icon">&#8599;</span><span>Sair</span></button>
                </div>
              </aside>
              ${sidebarCollapsed ? `<button class="dashboard-edge-toggle" type="button" data-cid="dashboard" data-message="toggleSidebar" aria-label="Expandir navegacao"><span aria-hidden="true">›</span></button>` : ""}
              <div class="dashboard-board">
                <div class="dashboard-head">
                  <div>
                    <span class="eyebrow">Mezanino CRM</span>
                    <h2>${currentLabel}</h2>
                    <p>${activeTab === "overview" ? "Visão geral para priorizar a operação comercial." : activeTab === "properties" ? "Cadastre e atualize os imóveis disponíveis para atendimento e publicação." : activeTab === "brokers" ? "Cadastre e acompanhe a equipe comercial." : activeTab === "clients" ? "Base de clientes com ficha, contexto e anexos." : activeTab === "activities" ? "Acompanhe os acontecimentos e os registros relacionados." : activeTab === "editions" ? "Atualize textos e imagens das páginas públicas." : DASHBOARD_COLLECTION_SCHEMAS[activeTab]?.description || "Operação do CRM."}</p>
                  </div>
                  <div class="broker-person">${adminBroker.photo ? `<img class="avatar" src="${adminBroker.photo}" alt="${escapeText(adminBroker.name)}">` : '<span class="avatar avatar--fallback">M</span>'}<div><strong>${escapeText(adminBroker.name)}</strong><div class="location">Operação comercial</div></div></div>
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
