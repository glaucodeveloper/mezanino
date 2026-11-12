---
type: "knowledge"
id: "modelo-negocio-imobiliario"
title: "Modelo de negocio imobiliario"
category: "dominio"
summary: "Entidades, relacoes e limites entre fatos, inferencias e decisoes no CRM."
tags: ["dominio", "crm", "negocio", "okf"]
updatedAt: "2026-07-10T12:00:00.000Z"
---

```json okf-profile
{
  "id": "modelo-negocio-imobiliario",
  "title": "Modelo de negocio imobiliario",
  "category": "dominio",
  "summary": "Entidades, relacoes e limites entre fatos, inferencias e decisoes no CRM.",
  "tags": ["dominio", "crm", "negocio", "okf"],
  "body": "O CRM distingue cliente, lead, negocio, imovel, corretor, interacao, compromisso, documento, evidencia, risco e consentimento. O negocio liga uma pessoa a uma intencao transacional e guarda etapa, narrativa, fatos confirmados, lacunas, objecoes, riscos, evidencias e proxima acao. Fatos informados ou verificados nunca devem ser misturados com inferencias do modelo. Toda recomendacao automatica permanece sujeita a revisao humana."
}
```

# Modelo de negocio imobiliario

## Entidades

- **Cliente**: pessoa ou organizacao com identidade, preferencias de contato e historico.
- **Lead**: sinal de interesse ainda em qualificacao, com origem e momento de entrada.
- **Negocio**: oportunidade que liga cliente, papel transacional, imovel, corretor e etapa.
- **Imovel**: produto ou ativo com dados comerciais e fatos tecnicos verificaveis.
- **Interacao**: mensagem, ligacao, visita ou reuniao, sempre ligada ao contexto do negocio.
- **Compromisso**: proxima acao com responsavel e prazo.
- **Documento/evidencia**: registro recebido ou verificado; o status nao equivale a parecer juridico.
- **Risco**: alerta comercial, documental, financeiro ou de privacidade que exige tratamento humano.

## Relacoes

Um cliente pode exercer papeis diferentes em negocios distintos: comprador, vendedor, locatario,
locador ou investidor. Um lead pode virar cliente e originar mais de um negocio. Um negocio pode
considerar varios imoveis, mas deve ter uma intencao principal, uma etapa atual e um unico proximo
compromisso claramente atribuivel.

## Regra de conhecimento

O OKF separa tres camadas:

1. **Fato**: informado pelo cliente ou confirmado por evidencia, com origem e data.
2. **Inferencia**: hipotese explicavel, nunca apresentada como certeza.
3. **Decisao**: tomada por pessoa autorizada e registrada com justificativa.

Dados pessoais e documentos do cliente pertencem ao armazenamento privado do CRM. A arvore de
knowledge guarda modelos, playbooks e criterios reutilizaveis, nao copias de documentos pessoais.
