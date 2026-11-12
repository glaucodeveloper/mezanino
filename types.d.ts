/**
 * Mezanino Imobiliária - Definições de Tipos (TypeScript / JSDoc JSDoc Reference)
 * 
 * Este arquivo define todos os tipos de dados, estruturas de entidades do CRM,
 * ações de infraestrutura e as novas ações de cadastro de clientes por CPF.
 * Fornece também interfaces para os validadores de tipos, quantidades e anti-exploits.
 */

declare global {
  interface Window {
    FormValidator: typeof FormValidator;
    SuaImobiliariaCmsConfig: CmsConfig;
    SuaImobiliariaCmsState: { source: string };
    SuaImobiliariaApp: { bootApp: (selector?: string) => AppInstance };
    MezaninoRuntimeConfig?: { apiBase: string; auditMode: boolean };
  }

  /**
   * Validador global de formulários e mecanismo de mitigação de exploits.
   */
  const FormValidator: {
    lastSubmissions: Map<string, number>;

    /**
     * Valida um número de CPF utilizando o algoritmo matemático dos dígitos verificadores.
     * @param cpf CPF formatado ou contendo apenas dígitos numéricos.
     */
    validateCPF(cpf: string): boolean;

    /**
     * Valida o formato de um endereço de e-mail usando expressão regular padrão.
     * @param email Endereço de e-mail a ser validado.
     */
    validateEmail(email: string): boolean;

    /**
     * Valida um número de telefone/WhatsApp garantindo o mínimo de 10 dígitos numéricos.
     * @param phone String de telefone com formatação ou crua.
     */
    validatePhone(phone: string): boolean;

    /**
     * Valida um nome completo (mínimo de 3 caracteres, apenas letras, espaços e acentos comuns).
     * @param name Nome a ser validado.
     */
    validateName(name: string): boolean;

    /**
     * Valida os limites de quantidades e integridade numérica.
     * Previne buffers, injeção de floats inapropriados ou números negativos gigantes.
     * @param value O valor numérico ou string representativa.
     * @param min Limite mínimo permitido (padrão 0).
     * @param max Limite máximo permitido (padrão 1.000.000.000).
     * @param allowFloat Se permite números decimais ou apenas inteiros.
     */
    validateQuantity(value: string | number, min?: number, max?: number, allowFloat?: boolean): boolean;

    /**
     * Sanitiza agressivamente strings contra XSS, injeção de HTML e ataques de buffer/overflow.
     * @param key Chave ou nome do campo que está sendo sanitizado.
     * @param val Valor bruto da string enviado no formulário.
     */
    sanitizeString(key: string, val: string): string;

    /**
     * Mecanismo anti-spam que bloqueia múltiplos cliques ou requisições rápidas consecutivas.
     * @param formKey Identificador do formulário ou ação (ex: 'leadAuthForm').
     * @param cooldownMs Tempo mínimo de espera em milissegundos entre envios (padrão 2000ms).
     */
    antiSpamCheck(formKey: string, cooldownMs?: number): boolean;
  };
}

/**
 * Configurações da infraestrutura do CMS integrado ao GitHub.
 */
export interface CmsConfig {
  dataUrl: string;
  githubToken: string;
  apiBase: string;
  nativeDashboardOnly: boolean;
  dashboardAuditMode: boolean;
}

/**
 * Instância gerada ao inicializar o shell da aplicação.
 */
export interface AppInstance {
  next: (message?: ActionMessage) => void;
  states: {
    routeState: { state: RouteState; current: () => RouteState; apply: (msg?: ActionMessage) => RouteState };
    sessionState: { state: SessionState; current: () => SessionState; apply: (msg?: ActionMessage) => SessionState };
    dashboardState: { state: DashboardContent; current: () => DashboardContent };
  };
}

/**
 * Estado da rota atual da aplicação cliente.
 */
export interface RouteState {
  route: string;
  selectedPropertyId: string | null;
  selectedBrokerId: string | null;
  dashboardTab: string;
  selectedEntityId: string | null;
  operation: string;
}

/**
 * Estado da sessão local do visitante ou lead.
 */
export interface SessionState {
  favorites: Set<string>;
  authenticated: boolean;
  leadUser?: {
    name: string;
    phone: string;
    email: string;
    cpf?: string; // Armazena o CPF do usuário registrado
  };
}

/**
 * Modelo de dados de um Imóvel (Property).
 */
export interface Property {
  id: string;
  title: string;
  type: string;
  kind: "Casa" | "Apartamento" | "Terreno" | "Comercial";
  city: string;
  cityName: string;
  neighborhood: string;
  price: string;
  priceNumber: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  area: number;
  condominium: string;
  iptu: string;
  meta?: string[];
  tag?: string;
  features?: string[];
  image: string;
  images?: string[];
  description?: string;
  availabilityStatus?: string;
  sourceUrl?: string;
}

/**
 * Modelo de dados de um Corretor/Vendedor (Broker).
 */
export interface Broker {
  id: string;
  name: string;
  creci: string;
  phone: string;
  email: string;
  image?: string;
  bio?: string;
}

/**
 * Modelo de dados de um Cliente (Client).
 */
export interface Client {
  id: string;
  name: string;
  cpf?: string; // CPF associado ao cliente
  phone?: string;
  email?: string;
  profile?: string;
  focus?: string;
  owner?: string;
  transaction?: "compra" | "locacao" | "captacao-venda";
  narrative?: string;
  nextAction?: string;
  created?: string;
}

/**
 * Modelo de dados de um Lead do CRM.
 */
export interface Lead {
  id?: string;
  name: string;
  source: "WhatsApp" | "Contato" | "Anuncie seu imovel" | "Financiamento" | "Agendamento de visita" | "Quiz" | "Cadastro por CPF";
  interest: string;
  stage: "novo" | "contato_feito" | "visita_agendada" | "negociacao" | "fechado" | "perdido";
  email?: string;
  phone?: string;
  cpf?: string; // CPF associado ao lead
  propertyId?: string;
  transaction?: string;
  narrative?: string;
  nextAction?: string;
  consentStatus?: string;
  created?: string;
}

/**
 * Negócios comerciais vinculados a clientes (Deals).
 */
export interface Deal {
  id: string;
  clientId: string;
  clientName: string;
  transaction: "compra" | "locacao";
  role: string;
  propertyIds: string[];
  stage: string;
  status: "saudavel" | "atencao" | "risco";
  owner: string;
  narrative: string;
  confirmedFacts?: string[];
  missingInfo?: string[];
  objections?: string[];
  riskFlags?: string[];
}

/**
 * Estrutura unificada do dashboard e dados operacionais (CRM).
 */
export interface DashboardContent {
  metrics: Array<{ label: string; value: string; color: string }>;
  leads: Lead[];
  clients: Client[];
  deals: Deal[];
  activities: Array<{
    icon: string;
    title: string;
    detail: string;
    time: string;
    color?: string;
    properties?: string[];
    brokers?: string[];
    clients?: string[];
  }>;
  appointments?: Array<{
    id: string;
    date: string;
    time: string;
    status: string;
    notes?: string;
    properties?: string[];
    clients?: string[];
    brokers?: string[];
  }>;
}

/**
 * Unificação de todos os tipos de mensagens que tramitam no barramento de eventos da SPA.
 */
export type ActionMessage =
  | RoutingAction
  | FavoriteAction
  | CompareAction
  | LoginAction
  | LogoutAction
  | CloseModalAction
  | SubmitContactDetailsAction
  | SubmitCpfRegistrationAction
  | UpdateFieldAction
  | UpdateImageAction
  | PromoteImageAction
  | SavePropertyAction
  | DeletePropertyAction
  | CancelAction
  | SetTabAction
  | NewItemAction
  | DeleteItemAction
  | SaveItemAction
  | ToggleAnnounceAction
  | AnnounceAction
  | ContactAction
  | SetViewAction
  | SortAction
  | FilterAction
  | ClearFiltersAction
  | SetPageAction
  | ToggleDropdownAction
  | CloseDropdownsAction
  | SelectOperationAction
  | SelectCityAction
  | ToggleNeighborhoodAction
  | SearchNeighborhoodAction
  | ToggleTypeAction
  | TriggerSearchAction
  | StepValueAction
  | EditValueAction
  | SubmitFinancingLeadAction
  | SelectOptionAction
  | NextStepAction
  | PrevStepAction
  | SubmitQuizAction;

export interface RoutingAction {
  type: "route";
  route: string;
  propertyId?: string;
  brokerId?: string | null;
  dashboardTab?: string;
  entityId?: string | null;
  operation?: string | null;
  authenticated?: boolean;
}

export interface FavoriteAction {
  type: "toggleFavorite";
  propertyId: string;
}

export interface CompareAction {
  type: "toggleCompare";
  propertyId: string;
}

export interface LoginAction {
  type: "login";
  fields: {
    email: string;
    password?: string;
  };
}

export interface LogoutAction {
  type: "logout";
}

export interface CloseModalAction {
  type: "closeModal";
}

/**
 * Nova Ação: Submeter dados de contato e CPF para cadastro do Lead.
 */
export interface SubmitContactDetailsAction {
  type: "submitContactDetails";
  fields: {
    name: string;
    phone: string;
    email: string;
    cpf: string; // Exige CPF na ação de dados de contato
  };
}

/**
 * Nova Ação: Submeter explicitamente um cadastro baseado no CPF.
 */
export interface SubmitCpfRegistrationAction {
  type: "submitCpfRegistration";
  fields: {
    name: string;
    phone: string;
    email: string;
    cpf: string; // Registro obrigatório por CPF
    profile?: string;
  };
}

export interface UpdateFieldAction {
  type: "updateField";
  name: string;
  value?: string;
  target?: HTMLElement & { textContent?: string; dataset?: { type?: string } };
}

export interface UpdateImageAction {
  type: "updateImage";
  name: string;
  target?: HTMLInputElement & { files?: FileList; dataset?: { imageIndex?: string } };
}

export interface PromoteImageAction {
  type: "promoteImage";
  target?: HTMLElement & { dataset?: { imageIndex?: string } };
}

export interface SavePropertyAction {
  type: "saveProperty";
}

export interface DeletePropertyAction {
  type: "deleteProperty";
}

export interface CancelAction {
  type: "cancel";
}

export interface SetTabAction {
  type: "setTab";
  value: string;
}

export interface NewItemAction {
  type: "newItem";
}

export interface DeleteItemAction {
  type: "deleteItem";
}

export interface SaveItemAction {
  type: "saveItem";
}

export interface ToggleAnnounceAction {
  type: "toggleAnnounce";
}

export interface AnnounceAction {
  type: "announce";
  fields: {
    ownerName?: string;
    propertyType: "Casa" | "Apartamento" | "Terreno";
    neighborhood?: string;
    value?: string;
    description?: string;
    privacy?: "on" | "";
  };
}

export interface ContactAction {
  type: "contact";
  fields: {
    interest?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface SetViewAction {
  type: "setView";
  value: "list" | "grid";
}

export interface SortAction {
  type: "sort";
  value: string;
}

export interface FilterAction {
  type: "filter";
  name: string;
  value: string;
}

export interface ClearFiltersAction {
  type: "clearFilters";
}

export interface SetPageAction {
  type: "setPage";
  value: string | number;
}

export interface ToggleDropdownAction {
  type: "toggleDropdown";
}

export interface CloseDropdownsAction {
  type: "closeDropdowns";
}

export interface SelectOperationAction {
  type: "selectOperation";
  value: string;
}

export interface SelectCityAction {
  type: "selectCity";
  value: string;
}

export interface ToggleNeighborhoodAction {
  type: "toggleNeighborhood";
  value: string;
}

export interface SearchNeighborhoodAction {
  type: "searchNeighborhood";
  value: string;
}

export interface ToggleTypeAction {
  type: "toggleType";
  value: string;
}

export interface TriggerSearchAction {
  type: "triggerSearch";
}

export interface StepValueAction {
  type: "stepValue";
  name: string;
  direction: "up" | "down";
}

export interface EditValueAction {
  type: "editValue";
  name: string;
  value: string;
}

export interface SubmitFinancingLeadAction {
  type: "submitFinancingLead";
  fields: {
    name?: string;
  };
}

export interface SelectOptionAction {
  type: "selectOption";
}

export interface NextStepAction {
  type: "nextStep";
}

export interface PrevStepAction {
  type: "prevStep";
}

export interface SubmitQuizAction {
  type: "submitQuiz";
}

/**
 * --- INFRAESTRUTURA: SISTEMA DE STORAGE E CONEXÕES BACKUP ---
 */
export namespace Infrastructure {
  /**
   * Carrega os dados persistidos do CMS a partir do repositório remoto do GitHub
   * ou faz fallback para os dados de cache local em caso de falha de conexão.
   */
  function loadCmsData(): Promise<void>;

  /**
   * Salva as alterações de dados localmente no navegador (localStorage)
   * como uma camada de auditoria e contingência off-line.
   * @param payload Estrutura CMS no formato OKF 1.0.
   * @param message Mensagem de log/auditoria.
   */
  function saveCmsDataLocally(payload: any, message: string): { savedTo: "local"; message: string };

  /**
   * Converte um arquivo enviado (File) em uma URI no formato Base64 (DataURL) para visualização assíncrona.
   * @param file Arquivo binário de imagem.
   */
  function fileToDataUrl(file: File): Promise<string>;

  /**
   * Gera a estrutura CMS unificada (formato OKF) contendo coleções de propriedades, corretores e painel.
   */
  function createCmsPayload(): any;

  /**
   * Envia as alterações da imobiliária e do CRM (leads, clientes, imóveis, corretores)
   * diretamente para o repositório GitHub de destino via snapshot API.
   * @param payload Objeto contendo os dados modificados ou payload de snapshot unificado.
   */
  function saveCmsDataToGitHub(payload?: any): Promise<any>;

  /**
   * Realiza a persistência sincronizada disparando o backup remoto no GitHub.
   * @param nextProperties Lista atualizada de propriedades.
   * @param nextDashboard Estrutura operacional do painel administrativo.
   * @param nextBrokers Lista atualizada de corretores credenciados.
   */
  function persistCmsSnapshot(nextProperties?: Property[], nextDashboard?: DashboardContent, nextBrokers?: Broker[]): Promise<any>;

  /**
   * Salva e publica as alterações realizadas no CRM (configurações do painel, novos clientes e leads).
   * @param nextDashboard Estrutura do dashboard CRM modificada.
   */
  function saveDashboard(nextDashboard?: DashboardContent): Promise<{ message: string }>;

  /**
   * Salva as alterações de um imóvel específico na vitrine e sincroniza com o repositório remoto.
   * @param draft Rascunho da propriedade editada.
   * @param originalId ID anterior da propriedade (em caso de edição) ou null para novo cadastro.
   */
  function saveProperty(draft: Partial<Property>, originalId?: string | null): Promise<{ property: Property; message: string }>;

  /**
   * Remove em definitivo um imóvel do catálogo vitrine e atualiza o CMS do GitHub.
   * @param propertyId Identificador único do imóvel.
   */
  function deleteProperty(propertyId: string): Promise<{ message: string }>;

  /**
   * Salva as alterações cadastrais de um corretor de vendas no CMS e sincroniza com o repositório.
   * @param draft Rascunho do corretor.
   * @param originalId ID anterior ou null se for um novo corretor.
   */
  function saveBroker(draft: Partial<Broker>, originalId?: string | null): Promise<{ broker: Broker; message: string }>;

  /**
   * Remove em definitivo o cadastro de um corretor de vendas.
   * @param brokerId Identificador do corretor.
   */
  function deleteBroker(brokerId: string): Promise<{ message: string }>;

  /**
   * Autentica e abre uma sessão administrativa de auditoria/escrita integrada ao CMS.
   */
  function authenticateCmsSession(email: string, password?: string): Promise<any>;

  /**
   * Encerra a sessão administrativa local e limpa as credenciais de auditoria ativa.
   */
  function closeCmsSession(): Promise<any>;
}
