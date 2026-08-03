# mezanino

Levantamento funcional do CRM imobiliário em uma página HTML com visual Carbon Design.

## O que o formulário faz

- Organiza as perguntas por seção temática.
- Permite responder cada questão em campos individuais.
- Gera um JSON com todas as respostas.
- Salva o último rascunho em `localStorage`, incluindo as respostas preenchidas.
- Mantém o formulário de perguntas em [`survey_revisado_conciso.md`](/home/icarogdo/dev/mezanino-crm/survey_revisado_conciso.md) para edição e revisão.
- Empacota esse Markdown em [`survey-data.js`](/home/icarogdo/dev/mezanino-crm/survey-data.js) para o HTML consumir direto no navegador sem servidor.
- Publica uma rota do branch em GitHub Pages via workflow em [`.github/workflows/pages.yml`](/home/icarogdo/dev/mezanino-crm/.github/workflows/pages.yml).
- Usa um token pessoal do GitHub para:
  - criar um arquivo `responses/*.json` no repositório
  - atualizar o mesmo arquivo quando já existir um rascunho salvo
  - abrir uma issue de notificação com o resumo do envio

## Como usar

1. Abra `index.html` diretamente no navegador.
2. Libere o acesso com o token do GitHub.
3. Preencha as respostas localmente no navegador.
4. Clique em `Salvar e notificar`.

## Formulário em Markdown

Se quiser revisar ou editar o levantamento fora da interface, use [`survey_revisado_conciso.md`](/home/icarogdo/dev/mezanino-crm/survey_revisado_conciso.md) como referência do conteúdo das perguntas e dos propósitos de cada seção. O `scripts/build-pages.mjs` transforma esse Markdown em `survey-data.js` para o `index.html`.

## GitHub Pages

O workflow publica o website principal na raiz do Pages e o formulário em `/survey/`.

A URL do formulário é `https://glaucodeveloper.github.io/mezanino/survey/`.

## Repositório alvo

O destino está fixado no arquivo como `glaucodeveloper/mezanino`.
Se o owner ou o nome do repositório forem diferentes, ajuste a constante `GITHUB_REPOSITORY` no script do `index.html`.

## Observação

O envio depende de acesso à API do GitHub e de um token com permissão para gravar conteúdo e abrir issues no repositório.
Quando o JSON já existe, o formulário faz `PUT` no mesmo arquivo para manter o levantamento editável e reenviável.
