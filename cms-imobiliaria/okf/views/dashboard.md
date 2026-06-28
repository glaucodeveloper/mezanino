---
type: "dashboard-view"
title: "Dashboard"
description: "Dados agregados do dashboard."
tags: ["dashboard", "crm"]
timestamp: "2026-06-28T16:26:25.221Z"
---

# Dashboard

View agregada para o dashboard do site e do app.

```json okf-profile
{
  "metrics": [
    {
      "label": "Total de imoveis",
      "value": "56"
    },
    {
      "label": "Imoveis ativos",
      "value": "42",
      "color": "#1f9b61"
    },
    {
      "label": "Leads",
      "value": "128"
    },
    {
      "label": "Visitas este mes",
      "value": "1.245"
    }
  ],
  "activities": [
    {
      "icon": "A",
      "title": "Novo lead recebido",
      "detail": "Apartamento no Jardim Armacao",
      "time": "Hoje, 10:23",
      "color": "var(--gold)"
    },
    {
      "icon": "G",
      "title": "Agendamento confirmado",
      "detail": "Visita - Casa no Vilarejo",
      "time": "Hoje, 09:15",
      "color": "#24a45a"
    },
    {
      "icon": "N",
      "title": "Novo imovel publicado",
      "detail": "Casa em Alphaville",
      "time": "Ontem",
      "color": "#d48a1d"
    },
    {
      "icon": "C",
      "title": "Cliente reativado",
      "detail": "Juliana Oliveira pediu retorno",
      "time": "Ontem, 17:40",
      "color": "#4d7bd6"
    }
  ],
  "leads": [
    {
      "name": "Lucas Andrade",
      "source": "Landing page home",
      "interest": "Casa em Condominio Alphaville",
      "stage": "Quente"
    },
    {
      "name": "Patricia Souza",
      "source": "WhatsApp",
      "interest": "Apartamento no Jardim Armacao",
      "stage": "Em visita"
    },
    {
      "name": "Rafael Lima",
      "source": "Formulario de anuncio",
      "interest": "Casa no Vilarejo",
      "stage": "Qualificando"
    },
    {
      "name": "Helena Prado",
      "source": "Quiz mobile",
      "interest": "Terreno em Busca Vida",
      "stage": "Novo"
    }
  ],
  "clients": [
    {
      "name": "Mariana Costa",
      "profile": "Compradora",
      "focus": "3 quartos em Salvador",
      "owner": "Joao Almeida"
    },
    {
      "name": "Eduardo Nunes",
      "profile": "Investidor",
      "focus": "Imoveis acima de R$ 1,2 mi",
      "owner": "Carlos Mendes"
    },
    {
      "name": "Bianca Ramos",
      "profile": "Locataria",
      "focus": "Apartamento compacto",
      "owner": "Juliana Oliveira"
    },
    {
      "name": "Fernando Pires",
      "profile": "Proprietario",
      "focus": "Captacao no litoral",
      "owner": "Mariana Santos"
    }
  ],
  "appointments": [
    {
      "date": "19/06 - 09:30",
      "client": "Lucas Andrade",
      "property": "Casa em Condominio Alphaville",
      "broker": "Joao Almeida"
    },
    {
      "date": "19/06 - 14:00",
      "client": "Patricia Souza",
      "property": "Apartamento no Jardim Armacao",
      "broker": "Mariana Santos"
    },
    {
      "date": "20/06 - 11:00",
      "client": "Eduardo Nunes",
      "property": "Casa no Vilarejo",
      "broker": "Carlos Mendes"
    },
    {
      "date": "20/06 - 16:30",
      "client": "Helena Prado",
      "property": "Terreno em Busca Vida",
      "broker": "Juliana Oliveira"
    }
  ],
  "messages": [
    {
      "from": "Site institucional",
      "subject": "Pedido de retorno comercial",
      "status": "Nao lida"
    },
    {
      "from": "WhatsApp",
      "subject": "Cliente quer simular financiamento",
      "status": "Respondida"
    },
    {
      "from": "Formulario de anuncio",
      "subject": "Novo imovel para avaliacao",
      "status": "Triagem"
    },
    {
      "from": "Instagram",
      "subject": "Pergunta sobre taxa de corretagem",
      "status": "Nao lida"
    }
  ],
  "reports": [
    {
      "title": "Conversao de leads",
      "value": "18%",
      "note": "Alta de 3 pontos na semana"
    },
    {
      "title": "Tempo medio ate visita",
      "value": "2,4 dias",
      "note": "Melhor janela em 30 dias"
    },
    {
      "title": "Imoveis com maior intencao",
      "value": "Casas premium",
      "note": "Alphaville e Busca Vida lideram"
    },
    {
      "title": "Canal com melhor custo",
      "value": "WhatsApp",
      "note": "Maior taxa de resposta organica"
    }
  ],
  "settings": [
    {
      "label": "Aprovacao manual de novos anuncios",
      "value": "Ativada"
    },
    {
      "label": "Aviso de lead quente por e-mail",
      "value": "Ativado"
    },
    {
      "label": "Sincronizacao com CRM externo",
      "value": "Planejada"
    },
    {
      "label": "Relatorio semanal para diretoria",
      "value": "Toda segunda, 08:00"
    }
  ]
}
```
