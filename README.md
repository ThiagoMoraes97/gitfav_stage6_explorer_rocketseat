# GitFav

GitFav é uma aplicação web simples para favoritar perfis do GitHub.

O usuário informa um username, a aplicação consulta a API pública do GitHub e exibe os dados principais em uma tabela de favoritos. A lista fica salva no `localStorage`, então os favoritos continuam disponíveis mesmo após recarregar a página.

## Funcionalidades

- Buscar usuários pela API do GitHub.
- Adicionar perfis à lista de favoritos.
- Evitar usuários duplicados.
- Exibir avatar, nome, username, repositórios públicos e seguidores.
- Remover usuários da lista.
- Persistir favoritos no navegador com `localStorage`.
- Exibir estado vazio quando não há favoritos.
- Layout responsivo para telas menores.

## Tecnologias

- HTML
- CSS
- JavaScript
- GitHub Users API

## Como Executar

Abra o arquivo `index.html` no navegador.

Também é possível servir a pasta com uma extensão como Live Server no VS Code ou outro servidor estático local.

## Estrutura

```text
.
├── assets/
│   ├── logo.svg
│   └── star_table.svg
├── JS/
│   └── main.js
├── index.html
├── style.css
└── tbody.html
```

## Observações

Este projeto foi desenvolvido como exercício de manipulação do DOM, consumo de API com `fetch` e persistência de dados no navegador.
