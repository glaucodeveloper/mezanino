# mezanino-crm

Levantamento funcional do CRM imobiliário em uma página HTML com visual Carbon Design.

## O que o formulário faz

- Organiza as perguntas por seção temática.
- Permite responder cada questão em campos individuais.
- Gera um JSON com todas as respostas.
- Salva o JSON em `localStorage` como rascunho.
- Usa um token pessoal do GitHub para:
  - criar um arquivo `responses/*.json` no repositório
  - abrir uma issue de notificação com o resumo do envio

## Como usar

1. Abra `index.html` em um servidor HTTP local.
2. Informe apenas o token do GitHub no campo superior.
3. Preencha as respostas.
4. Clique em `Salvar e notificar`.

## Repositório alvo

O destino está fixado no arquivo como `glaucodeveloper/mezanino-crm`.
Se o owner ou o nome do repositório forem diferentes, ajuste a constante `GITHUB_REPOSITORY` no script do `index.html`.

## Observação

O envio depende de acesso à API do GitHub e de um token com permissão para gravar conteúdo e abrir issues no repositório.
