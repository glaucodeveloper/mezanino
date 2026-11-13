# Mezanino — levantamento de CRM imobiliário

Protótipo de pesquisa funcional para definir o fluxo de operação de um CRM imobiliário. O formulário organiza perguntas por tema, salva rascunhos no navegador e gera respostas em JSON.

## Conteúdo

- [`index.html`](index.html): formulário interativo.
- [`survey_revisado_conciso.md`](survey_revisado_conciso.md): perguntas e propósitos das seções.
- [`survey-data.js`](survey-data.js): conteúdo Markdown preparado para consumo pelo navegador.
- [`scripts/build-pages.mjs`](scripts/build-pages.mjs): geração do arquivo de dados usado pela página.
- [`.github/workflows/pages.yml`](.github/workflows/pages.yml): publicação do site.

## Usar

Abra `index.html` em um navegador. O formulário mantém o rascunho localmente. Para enviar e notificar, precisa de um token GitHub com acesso de gravação ao repositório e permissão para abrir issues.

O site publicado está em [glaucodeveloper.github.io/mezanino](https://glaucodeveloper.github.io/mezanino/); o formulário fica em `/survey/`.

## Privacidade das respostas

Este repositório é público. Respostas enviadas são gravadas em `responses/*.json` e notificadas por issue, portanto ficam publicamente acessíveis. Não envie dados pessoais nem informações comerciais confidenciais por este formulário.

O projeto é um levantamento de requisitos, não um CRM operacional.
