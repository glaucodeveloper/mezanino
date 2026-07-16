---
type: "knowledge"
id: "estrutura-funcional-crm"
title: "Estrutura Funcional e Entidades do CRM"
category: "crm"
summary: "Organizacao logica dos dados, catalogos, transacoes e fluxos de dados percebidos pelo usuario do Mezanino CRM."
tags: ["crm", "dados", "entidades", "transacoes", "funcional"]
updatedAt: "2026-07-15T15:00:00.000Z"
---

```json okf-profile
{
  "id": "estrutura-funcional-crm",
  "title": "Estrutura Funcional e Entidades do CRM",
  "category": "crm",
  "summary": "Organizacao logica dos dados, catalogos, transacoes e fluxos de dados percebidos pelo usuario do Mezanino CRM.",
  "tags": ["crm", "dados", "entidades", "transacoes", "funcional"],
  "body": "O Mezanino CRM organiza suas operacoes em Arquivos Logicos Internos (como catalogos de imoveis, corretores, leads e favoritos) e Funcoes Transacionais (como busca, comparacao, favoritamento, envio de leads e editores). Isso divide claramente a persistencia e o fluxo de dados em operacoes de leitura e escrita estruturadas."
}
```

# Estrutura Funcional e Entidades do CRM

Este documento mapeia a estrutura conceitual do **Mezanino CRM** sob a ótica das funções de dados (persistência lógica) e das funções de transação (fluxos operacionais disparados por usuários), refletindo como as entidades de domínio interagem dentro do sistema.

---

## 1. Funções de Dados (Arquivos Lógicos Internos)

As informações do CRM são divididas em grupos lógicos de dados mantidos internamente pelo sistema ou integrados de forma transparente com repositórios externos.

### A. Catálogo e Atributos de Imóveis
* **Definição**: Conjunto de registros contendo a totalidade dos ativos imobiliários gerenciados.
* **Atributos Principais**: 
  * Identificação: ID lógico, código, título, descrição e finalidade (comprar/alugar/investir).
  * Georreferenciamento: Cidade, bairro, endereço, latitude/longitude lógicas ou mapa.
  * Características Físicas: Área útil/privativa, número de quartos, banheiros, suítes, vagas de garagem e comodidades.
  * Valores: Preço de venda ou locação, taxa de condomínio estimada e IPTU.
  * Mídia: Lista ordenada de caminhos para fotos digitais, indicação de foto de capa/principal e galeria ampliada.

### B. Diretório de Corretores
* **Definição**: Base operacional com as credenciais e vínculos de atuação de cada profissional de vendas.
* **Atributos Principais**: Foto de perfil comercial, nome, número de registro no órgão profissional (CRECI), telefone móvel e link de redirecionamento de WhatsApp.

### C. Registro de Leads e Follow-Up Comercial
* **Definição**: Banco de oportunidades acumuladas em tempo de execução, associando um interesse de transação a um indivíduo e a um corretor.
* **Atributos Principais**: Dados básicos (nome, telefone, e-mail), origem da captação, histórico cronológico de interações, notas de atendimento, data da próxima ação agendada, e status atual do funil Kanban.

### D. Dados Globais do Painel (Dashboard Content)
* **Definição**: Agregadores de desempenho comercial, configurações sistêmicas locais e listas táticas utilizadas para gerar visualizações dinâmicas e relatórios em PDF.

### E. Favoritos e Estado da Sessão
* **Definição**: Estado temporário ou persistente do cliente final, armazenando as escolhas e interações imediatas com o catálogo. 
* **Regra de Negócio**: Persistido em `localStorage` local para visitantes anônimos e sincronizado com o banco de dados principal após o login do usuário.

---

## 2. Funções Transacionais (Fluxos Operacionais)

As funções transacionais representam as ações que entram e saem dos limites do CRM para atualizar dados ou exibir informações aos operadores e clientes.

### A. Operações de Consulta e Filtros (Leituras)
* **Busca Rápida de Imóveis**: O portal lê o arquivo lógico do catálogo, aplica múltiplos critérios dinâmicos de filtro (bairro, faixa de preço, tipo de imóvel, quartos, vagas) e retorna uma lista ordenada (recente, preço, área) com paginação inteligente.
* **Comparador de Ativos**: Transação que lê em paralelo os registros selecionados na sessão do usuário e os expõe em uma matriz comparativa estruturada por preço, localização e área.
* **Ficha de Detalhes**: Recuperação do registro completo do imóvel, cruzando suas informações com o corretor responsável pela captação e exibindo imóveis correlatos na mesma região.

### B. Operações de Entrada e Registro (Gravações)
* **Geração de Leads por Formulário**: Formulários públicos capturam dados textuais de clientes em pontos estratégicos (Proposta, "Anuncie seu Imóvel" ou Contato Geral), validam e gravam novos registros na coleção de Leads do CRM.
* **Perfilador de Interesse (Quiz)**: Um questionário em etapas mapeia a real intenção de compra ou investimento do cliente e, ao concluir, dispara duas ações:
  1. Grava o lead qualificado no CRM.
  2. Executa uma consulta direcionada ao catálogo para apresentar opções compatíveis e gerar um link direto para WhatsApp com o resultado.
* **Editor de Ativos (CRUD do Dashboard)**: Permite ao corretor com privilégios de acesso autenticado realizar a manutenção completa do catálogo (Criar, Editar, Desativar, Arquivar, Publicar e Atualizar mídias). Cada alteração de estado no editor atualiza em cascata o arquivo lógico do CMS imobiliário.
