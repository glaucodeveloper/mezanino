---
type: "dashboard-view"
title: "Dashboard"
description: "Dados agregados do dashboard comercial."
tags: ["dashboard", "crm", "business"]
timestamp: "2026-07-10T12:00:00.000Z"
---

# Dashboard

View agregada para o dashboard do site e do app.

```json okf-profile
{
  "metrics": [
    {
      "label": "Comparaveis observados",
      "value": "9",
      "note": "confirmar na origem"
    },
    {
      "label": "Analises de mercado",
      "value": "7",
      "note": "Vitoria da Conquista/BA"
    },
    {
      "label": "Clientes reais",
      "value": "0",
      "note": "aguardando captacao autorizada"
    },
    {
      "label": "Data da leitura",
      "value": "10/07/2026",
      "note": "precos pedidos"
    }
  ],
  "activities": [
    {
      "id": "pesquisa-venda-vdc",
      "icon": "P",
      "title": "Leitura de venda atualizada",
      "detail": "Apartamentos e casas em Vitoria da Conquista",
      "time": "10/07/2026",
      "color": "var(--gold)"
    },
    {
      "id": "pesquisa-locacao-vdc",
      "icon": "L",
      "title": "Leitura de locacao atualizada",
      "detail": "Cidade, Candeias, Boa Vista e Recreio",
      "time": "10/07/2026",
      "color": "#1f9b61"
    }
  ],
  "leads": [],
  "clients": [],
  "deals": [],
  "appointments": [],
  "messages": [],
  "marketAnalyses": [
    {
      "id": "mercado-apartamentos-venda-vdc",
      "title": "Apartamentos a venda em Vitoria da Conquista",
      "geography": "Vitoria da Conquista/BA",
      "transaction": "venda",
      "propertyType": "apartamento",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.vivareal.com.br/venda/bahia/vitoria-da-conquista/apartamento_residencial/",
      "metrics": {
        "averageAskPrice": 384000,
        "averageAreaM2": 83,
        "averageAskPriceM2": 4600
      },
      "analysis": "A referencia agregada de oferta posiciona o apartamento medio anunciado em R$ 384 mil. Faixa, conservacao, condominio, rua e padrao do predio precisam ser controlados antes de comparar unidades.",
      "limitations": "Media de anuncios ativos; nao representa preco efetivamente negociado.",
      "confidence": "media"
    },
    {
      "id": "mercado-casas-venda-vdc",
      "title": "Casas a venda em Vitoria da Conquista",
      "geography": "Vitoria da Conquista/BA",
      "transaction": "venda",
      "propertyType": "casa",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.vivareal.com.br/venda/bahia/vitoria-da-conquista/casa_residencial/",
      "metrics": {
        "averageAskPrice": 520000,
        "averageAreaM2": 130,
        "averageAskPriceM2": 4000
      },
      "analysis": "A media anunciada de casas serve apenas como ponto inicial. Terreno, padrao construtivo, regularidade, estado e micro-localizacao tendem a explicar grande parte da dispersao.",
      "limitations": "Media de anuncios ativos; amostra e composicao variam diariamente.",
      "confidence": "media"
    },
    {
      "id": "mercado-apartamentos-locacao-vdc",
      "title": "Apartamentos para locacao em Vitoria da Conquista",
      "geography": "Vitoria da Conquista/BA",
      "transaction": "locacao",
      "propertyType": "apartamento",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.vivareal.com.br/aluguel/bahia/vitoria-da-conquista/apartamento_residencial/",
      "metrics": {
        "averageMonthlyAskRent": 1700,
        "averageAreaM2": 70,
        "averageMonthlyAskRentM2": 24
      },
      "analysis": "O custo de ocupacao deve somar aluguel, condominio, IPTU e demais encargos informados. A media de R$ 1,7 mil nao substitui comparacao por bairro e padrao.",
      "limitations": "Preco pedido mensal; nao inclui necessariamente encargos nem descontos.",
      "confidence": "media"
    },
    {
      "id": "mercado-candeias",
      "title": "Candeias: venda e locacao",
      "geography": "Candeias, Vitoria da Conquista/BA",
      "transaction": "venda-e-locacao",
      "propertyType": "residencial",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.zapimoveis.com.br/valor-m2/ba%2Bvitoria-da-conquista%2B%2Bcandeias/",
      "metrics": {
        "averageAskSaleM2": 5221,
        "averageMonthlyAskRentM2": 26,
        "grossAnnualAskRatio": 0.0598
      },
      "analysis": "Candeias apresenta referencia de oferta acima da media municipal de apartamentos. A razao bruta anual entre aluguel e venda pedidos fica perto de 6%, antes de vacancia, encargos, manutencao, impostos e negociacao.",
      "limitations": "Razao calculada com medias de anuncios, nao rentabilidade liquida ou garantida.",
      "confidence": "media"
    },
    {
      "id": "mercado-boa-vista",
      "title": "Boa Vista: apartamentos a venda",
      "geography": "Boa Vista, Vitoria da Conquista/BA",
      "transaction": "venda",
      "propertyType": "apartamento",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.vivareal.com.br/venda/bahia/vitoria-da-conquista/bairros/boa-vista/apartamento_residencial/",
      "metrics": {
        "averageAskPrice": 350000,
        "averageAreaM2": 79,
        "averageAskPriceM2": 4400
      },
      "analysis": "A referencia agregada coloca Boa Vista abaixo de Candeias em preco pedido por metro quadrado. Comparacoes devem controlar idade, elevador, lazer, vagas e acesso viario.",
      "limitations": "Media de anuncios ativos; nao e avaliacao individual.",
      "confidence": "media"
    },
    {
      "id": "mercado-recreio",
      "title": "Recreio: venda e locacao",
      "geography": "Recreio, Vitoria da Conquista/BA",
      "transaction": "venda-e-locacao",
      "propertyType": "residencial",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.zapimoveis.com.br/valor-m2/ba%2Bvitoria-da-conquista%2B%2Brecreio/",
      "metrics": {
        "averageAskSaleM2": 5651,
        "averageMonthlyAskRentM2": 25,
        "grossAnnualAskRatio": 0.0531
      },
      "analysis": "A referencia de venda pedida e superior a Candeias, enquanto o aluguel pedido por metro quadrado e proximo. Isso reduz a razao bruta indicada e reforca a necessidade de avaliar liquidez e custos por unidade.",
      "limitations": "Razao de anuncios, sem considerar fechamento, vacancia ou despesas.",
      "confidence": "media"
    },
    {
      "id": "territorio-pddu-vdc",
      "title": "Consulta territorial e urbanistica",
      "geography": "Vitoria da Conquista/BA",
      "transaction": "todas",
      "propertyType": "todas",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.pmvc.ba.gov.br/pddu/",
      "metrics": {},
      "analysis": "Uso, ocupacao, zoneamento e viabilidade nao devem ser inferidos pelo bairro. Cada imovel exige consulta aos instrumentos municipais vigentes e, quando necessario, analise tecnica.",
      "limitations": "A pagina municipal agrega estudos e minutas de anos diferentes; confirmar a norma vigente no caso concreto.",
      "confidence": "alta para o procedimento, nao para uma conclusao sobre imovel"
    }
  ],
  "reports": [
    {
      "id": "relatorio-mercado-apartamentos-venda-vdc",
      "title": "Apartamentos a venda em Vitoria da Conquista",
      "value": 4600,
      "note": "A referencia agregada de oferta posiciona o apartamento medio anunciado em R$ 384 mil. Faixa, conservacao, condominio, rua e padrao do predio precisam ser controlados antes de comparar unidades.",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.vivareal.com.br/venda/bahia/vitoria-da-conquista/apartamento_residencial/",
      "limitations": "Media de anuncios ativos; nao representa preco efetivamente negociado."
    },
    {
      "id": "relatorio-mercado-casas-venda-vdc",
      "title": "Casas a venda em Vitoria da Conquista",
      "value": 4000,
      "note": "A media anunciada de casas serve apenas como ponto inicial. Terreno, padrao construtivo, regularidade, estado e micro-localizacao tendem a explicar grande parte da dispersao.",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.vivareal.com.br/venda/bahia/vitoria-da-conquista/casa_residencial/",
      "limitations": "Media de anuncios ativos; amostra e composicao variam diariamente."
    },
    {
      "id": "relatorio-mercado-apartamentos-locacao-vdc",
      "title": "Apartamentos para locacao em Vitoria da Conquista",
      "value": 24,
      "note": "O custo de ocupacao deve somar aluguel, condominio, IPTU e demais encargos informados. A media de R$ 1,7 mil nao substitui comparacao por bairro e padrao.",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.vivareal.com.br/aluguel/bahia/vitoria-da-conquista/apartamento_residencial/",
      "limitations": "Preco pedido mensal; nao inclui necessariamente encargos nem descontos."
    },
    {
      "id": "relatorio-mercado-candeias",
      "title": "Candeias: venda e locacao",
      "value": 26,
      "note": "Candeias apresenta referencia de oferta acima da media municipal de apartamentos. A razao bruta anual entre aluguel e venda pedidos fica perto de 6%, antes de vacancia, encargos, manutencao, impostos e negociacao.",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.zapimoveis.com.br/valor-m2/ba%2Bvitoria-da-conquista%2B%2Bcandeias/",
      "limitations": "Razao calculada com medias de anuncios, nao rentabilidade liquida ou garantida."
    },
    {
      "id": "relatorio-mercado-boa-vista",
      "title": "Boa Vista: apartamentos a venda",
      "value": 4400,
      "note": "A referencia agregada coloca Boa Vista abaixo de Candeias em preco pedido por metro quadrado. Comparacoes devem controlar idade, elevador, lazer, vagas e acesso viario.",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.vivareal.com.br/venda/bahia/vitoria-da-conquista/bairros/boa-vista/apartamento_residencial/",
      "limitations": "Media de anuncios ativos; nao e avaliacao individual."
    },
    {
      "id": "relatorio-mercado-recreio",
      "title": "Recreio: venda e locacao",
      "value": 25,
      "note": "A referencia de venda pedida e superior a Candeias, enquanto o aluguel pedido por metro quadrado e proximo. Isso reduz a razao bruta indicada e reforca a necessidade de avaliar liquidez e custos por unidade.",
      "observedAt": "2026-07-10",
      "sourceUrl": "https://www.zapimoveis.com.br/valor-m2/ba%2Bvitoria-da-conquista%2B%2Brecreio/",
      "limitations": "Razao de anuncios, sem considerar fechamento, vacancia ou despesas."
    }
  ],
  "settings": [
    {
      "label": "Foco territorial",
      "value": "Vitoria da Conquista/BA"
    },
    {
      "label": "Natureza dos precos",
      "value": "Pedidos em anuncios, nao fechamentos"
    },
    {
      "label": "Disponibilidade",
      "value": "Sempre confirmar na origem"
    },
    {
      "label": "Pessoas no seed",
      "value": "Nenhuma; clientes entram por captacao autorizada"
    }
  ]
}
```
