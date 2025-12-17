# GitHub Repository Search 🔍
![React](https://img.shields.io/badge/react-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/typescript-blue?logo=typescript)
![Vite](https://img.shields.io/badge/vite-purple?logo=vite)
![Vercel](https://img.shields.io/badge/vercel-black?logo=vercel)

Aplicação frontend desenvolvida com **React + TypeScript + Vite** que consome a **API pública do GitHub** para buscar e listar repositórios, exibindo seus detalhes de forma simples, performática e organizada.

O projeto foi estruturado seguindo **boas práticas de Clean Code**, **composição de componentes**, **hooks customizados** e **testes unitários**.
Você pode acessar ele pelo link: https://github-repo-search-orpin.vercel.app

---

## 🧠 Funcionalidades

- 🔎 Buscar repositórios públicos do GitHub
- 📄 Listagem paginada de repositórios
- 🧩 Visualização dos detalhes do repositório em um card
- ⏳ Estados de loading e vazio
- 🔐 Autenticação via token (opcional) para evitar rate limit da API
- 🧪 Testes unitários com React Testing Library

---

## 🛠️ Tecnologias utilizadas

- **React**
- **TypeScript**
- **Vite**
- **CSS Modules**
- **React Testing Library**
- **Jest**
- **GitHub REST API**

---

## 📁 Estrutura do projeto

```txt
src/
 ├─ components/
 │   ├─ Header/
 │   ├─ RepoModalCard/
 │   ├─ SearchInput/
 │   ├─ RepoList/
 │   │   └─ RepoCard/
 ├─ hooks/
 │   └─ useGithubRepos.ts
 ├─ services/
 │   └─ githubApi.ts
 ├─ types/
 │   └─ github.ts
 └─ App.tsx
```
---

## 🚀 Como rodar o projeto localmente
- 1️⃣ Clone o repositório
```bash
git clone git@github.com:andrevsilva/github-repo-search.git
cd github-repo-search
```

- 2️⃣ Instale as dependências
```bash
npm install
```

- 3️⃣ Configure as variáveis de ambiente

É necessario utilizar um token pessoal para evitar limitações de requisições da API do GitHub.

- Crie um arquivo .env na raiz do projeto:
```bash
VITE_GITHUB_TOKEN=seu_token_aqui
```


⚠️ O arquivo .env não deve ser versionado.

- 4️⃣ Inicie o projeto
npm run dev


A aplicação estará disponível em: http://localhost:5173

## 🧪 Executando os testes
```bash
npm run test
```

## 🧼 Boas práticas aplicadas

- Separação de responsabilidades

- Hooks customizados para lógica de negócio

- Componentes reutilizáveis

- Tipagem forte com TypeScript

- CSS Modules para isolamento de estilos

- Tratamento de estados (loading, erro e vazio)

- Código legível e comentado

## 🔐 Segurança

- Tokens e informações sensíveis são gerenciados via variáveis de ambiente

- Nenhuma credencial é versionada no repositório

## 📌 Considerações finais

Este projeto foi desenvolvido com foco em:

- Clareza de código

- Boas práticas de frontend moderno

- Organização e manutenibilidade

- Qualidade e legibilidade

Fique à vontade para sugerir melhorias ou abrir uma issue 🚀

## 👨‍💻 Autor

André Silva
GitHub: @andrevsilva
