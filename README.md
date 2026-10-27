# 🎯 Estudos Front-End: do JavaScript ao React e Next.js

Repositório com a minha jornada de estudos de front-end, do JavaScript ao React e Next.js, vindo do **Java**. Cada aula traz a teoria (com comparações com Java) e os meus exercícios resolvidos.

**Objetivo:** tornar-me desenvolvedor **FullStack** (Java/Spring no back + React/Next.js no front), sem me especializar em front-end, mas sabendo o que o mercado espera, e conseguindo também tocar **freelas e produtos próprios** (como um renderizador com IA para o SketchUp).

## 📁 Estrutura

```
NN-modulo/
  aula-NN-tema/
    aula.md         ← teoria da aula
    exercicios.js   ← exercícios resolvidos (ou uma pasta exercicios/, nas aulas com vários arquivos)
```

Para rodar os exercícios de JavaScript, é preciso ter o [Node.js](https://nodejs.org) instalado:

```bash
node 01-javascript/aula-02-objetos-spread-destructuring/exercicios.js
```

**Versões-alvo:** React 19.3 · Next.js 16.4 · TypeScript 6 · Tailwind CSS 4 · Node 22+ (você tem o Node 24 ✅)

**Baseado em:** [roadmap.sh/frontend](https://roadmap.sh/frontend), [roadmap.sh/react](https://roadmap.sh/react), [roadmap.sh/nextjs](https://roadmap.sh/nextjs), [roadmap.sh/typescript](https://roadmap.sh/typescript), [roadmap.sh/ai-engineer](https://roadmap.sh/ai-engineer), [roadmap.sh/ai-agents](https://roadmap.sh/ai-agents), [roadmap.sh/claude-code](https://roadmap.sh/claude-code); nas documentações oficiais ([react.dev](https://react.dev), [nextjs.org/docs](https://nextjs.org/docs) e o curso [Learn Next.js](https://nextjs.org/learn), [ui.shadcn.com](https://ui.shadcn.com)); e nas grades de cursos atuais.

## Como estudar cada aula

1. Leia o `aula.md` com calma (o IntelliJ já abre o Markdown com a visualização formatada ao lado; no VS Code, use **Ctrl+Shift+V**).
2. **Digite** os exemplos (não copie e cole) e rode com `node arquivo.js` no terminal da IDE (no IntelliJ: **Alt+F12**).
3. Resolva os exercícios da aula.
4. Diga no chat **"corrige a aula X.Y"**, que eu leio seus arquivos direto da pasta.
5. Só avance quando conseguir **explicar** cada conceito com suas palavras.

## Legenda

| Marca | Significado |
|---|---|
| ✅ | **Essencial:** aprender a fundo e praticar |
| 🔍 | **Conhecer:** entender o que é, quando usar e saber consultar a doc |
| 🛠️ | Projeto prático |

---

## Módulo 1: JavaScript (lógica, sem página)
- [x] 1.1 ✅ Fundamentos: variáveis, tipos, operadores, controle de fluxo, funções, arrow functions, arrays (`map`/`filter`/`reduce`)
- [x] 1.2 ✅ Objetos, valor x referência, imutabilidade, spread, rest e destructuring
- [x] 1.3 ✅ Truthy/falsy, `null` x `undefined`, `?.` e `??`, mais métodos de array, ordenação
- [x] 1.4 ✅ Escopo, hoisting, closures e `this`
- [x] 1.5 ✅ Classes, herança e getters/setters (comparando com Java)
- [x] 1.6 ✅ Tratamento de erros (`try/catch`, `throw`) e JSON (`JSON.parse`/`JSON.stringify`)
- [x] 1.7 ✅ Módulos ES (`import`/`export`)

## Módulo 2: Como a web funciona + ferramentas do dia a dia
- [x] 2.1 ✅ **A IDE para front-end:** o IntelliJ IDEA Ultimate para JS/TS/React/Next.js (e o que muda na versão gratuita e no WebStorm), configurar o Node na IDE, terminal integrado, rodar e **depurar** código JS com breakpoints (como você já faz com Java), atalhos úteis
- [x] 2.2 ✅ Como a internet funciona: HTTP/HTTPS, métodos e status codes, DNS, domínio, hospedagem
- [x] 2.3 ✅ Como o navegador funciona: parsing, DOM, renderização; DevTools (Elements, Console, Network, Sources)
- [x] 2.4 ✅ npm a fundo: `package.json`, `dependencies` x `devDependencies`, scripts, `npx`, versionamento semântico, `package-lock.json` (🔍 pnpm/yarn)
- [x] 2.5 ✅ **Linters e formatadores:** ESLint e Prettier (o que são, diferença entre eles, instalar, configurar, integrar à IDE, formatar ao salvar)
- [ ] 2.6 ✅ Git e GitHub para front-end: `.gitignore`, branches, pull requests, conventional commits, a integração Git do IntelliJ (🔍 Husky + lint-staged)
- [ ] 2.7 ✅ **Bundlers e o Vite:** o que um bundler faz, criar um projeto com o Vite, servidor de desenvolvimento, build de produção, variáveis de ambiente (🔍 esbuild, Rollup e o Turbopack, que o Next.js usa)
- [ ] 2.8 ✅ Estudando com IA: usar a IA como tutor, e não como atalho (o que pedir e o que **não** pedir enquanto aprende)

## Módulo 3: HTML e CSS (revisão completa)
- [ ] 3.1 ✅ HTML semântico e estrutura de um documento
- [ ] 3.2 ✅ Formulários HTML e validação nativa
- [ ] 3.3 ✅ Acessibilidade (a11y): semântica, `alt`, `label`, ARIA básico, navegação por teclado
- [ ] 3.4 🔍 SEO básico: meta tags, títulos, semântica
- [ ] 3.5 ✅ CSS: seletores, cascata, especificidade, herança e box model
- [ ] 3.6 ✅ Unidades (`px`, `rem`, `%`, `vw`), cores, tipografia e variáveis CSS (custom properties)
- [ ] 3.7 ✅ Flexbox
- [ ] 3.8 ✅ Grid
- [ ] 3.9 ✅ Responsividade: mobile first e media queries
- [ ] 3.10 ✅ **Tailwind CSS:** classes utilitárias, responsividade, estados (`hover:`, `focus:`), dark mode, tema e variáveis (é a base do shadcn/ui)
- [ ] 3.11 🔍 Sass/SCSS e CSS Modules (para ler projetos que usam essas abordagens)
- [ ] 🛠️ Mini projeto: landing page responsiva e acessível com Tailwind

## Módulo 4: JavaScript no navegador
- [ ] 4.1 ✅ DOM: selecionar, criar, alterar e remover elementos
- [ ] 4.2 ✅ Eventos: listeners, propagação (bubbling) e delegação
- [ ] 4.3 ✅ Web APIs úteis: `localStorage`/`sessionStorage`, timers, URL e query params (`URLSearchParams`)
- [ ] 4.4 ✅ Assincronismo: event loop, callbacks, Promises, `async/await`
- [ ] 4.5 ✅ `fetch` e consumo de API REST (GET/POST/PUT/DELETE, headers, `response.ok`, tratamento de erros)
- [ ] 4.6 ✅ **CORS:** o que é e por que sua API Spring bloqueia o front
- [ ] 🛠️ Mini projeto com Vite + ESLint + Prettier: app de tarefas consumindo uma API

## Módulo 5: TypeScript
- [ ] 5.1 ✅ O que é TS, TS x JS e como o TS vira JS (transpilação)
- [ ] 5.2 ✅ **Instalação e execução:** `npm i -D typescript`, `tsc`, `tsc --init`, `tsconfig.json` (`strict`, `target`, `module`, `outDir`), modo watch, rodar `.ts` direto no Node, TS Playground
- [ ] 5.3 ✅ Tipos primitivos, arrays, tuplas, inferência de tipos, `any` x `unknown` x `never`, `void`
- [ ] 5.4 ✅ Tipando objetos: `interface` x `type`, propriedades opcionais e `readonly`, estender interfaces
- [ ] 5.5 ✅ Union, intersection e literal types; `keyof`; enums x union de strings
- [ ] 5.6 ✅ Narrowing/type guards (`typeof`, `instanceof`, `in`, type predicates) e assertions (`as`, `!`, `as const`, `satisfies`)
- [ ] 5.7 ✅ Funções tipadas: parâmetros opcionais/padrão, sobrecarga, callbacks tipados
- [ ] 5.8 ✅ Classes em TS: modificadores de acesso, parameter properties, classes abstratas, `implements`
- [ ] 5.9 ✅ Generics e constraints
- [ ] 5.10 ✅ Utility types: `Partial`, `Required`, `Pick`, `Omit`, `Readonly`, `Record`, `ReturnType`, `Awaited`
- [ ] 5.11 ✅ Módulos em TS, arquivos de tipos (`.d.ts`, pacotes `@types`) e 🔍 decorators (usados no Angular e no NestJS)
- [ ] 5.12 ✅ ESLint com TypeScript (typescript-eslint)
- [ ] 5.13 ✅ **Zod:** validar dados em tempo de execução e gerar tipos a partir do schema (parecido com o Bean Validation do Spring; é usado nos formulários e no Next.js)
- [ ] 5.14 🔍 Tipos avançados: mapped, conditional e template literal types
- [ ] 5.15 ✅ Testes unitários com Vitest (`describe`, `it`, `expect`, mocks), o runner padrão dos projetos com o Vite

## Módulo 6: Segurança web e autenticação (visão de FullStack)
- [ ] 6.1 ✅ Autenticação no front: sessão x token, JWT (estrutura, onde guardar: cookie `httpOnly` x `localStorage`, expiração e refresh), 🔍 OAuth2/OIDC
- [ ] 6.2 ✅ Riscos principais: XSS, CSRF, HTTPS, CSP, 🔍 OWASP Top 10

## Módulo 7: React, fundamentos
- [ ] 7.1 ✅ O que é o React: biblioteca de interface, abordagem declarativa x imperativa (comparando com o DOM da aula 4.1), SPA, e a diferença entre React, Next.js e Angular
- [ ] 7.2 ✅ Criando o projeto: Vite + React + TypeScript, estrutura de pastas, servidor de desenvolvimento, React DevTools, suporte no IntelliJ; 🔍 o React Compiler
- [ ] 7.3 ✅ Componentes e JSX: componentes como funções, regras do JSX, expressões `{ }`, fragments, um componente por arquivo (aula 1.7)
- [ ] 7.4 ✅ Props: passando dados, `children`, destructuring nas props (aula 1.2) e tipando as props com TypeScript
- [ ] 7.5 ✅ Renderização condicional e listas (`map` e `key`)
- [ ] 7.6 ✅ Eventos e estado: `useState`, estado como "foto" de cada renderização, função atualizadora e **por que o React exige imutabilidade** (aula 1.2): atualizar objetos e arrays no estado
- [ ] 7.7 ✅ Pensando em React: dividir a tela em componentes, levantar o estado (*lifting state up*), fonte única da verdade e inputs controlados
- [ ] 7.8 ✅ Estilizando componentes: Tailwind no React (`className`), classes condicionais (`clsx`/`cn`) e 🔍 CSS Modules
- [ ] 7.9 ✅ Efeitos e refs: `useEffect` (sincronizar com o mundo externo), dependências e limpeza, **"você talvez não precise de um efeito"**, `useRef`
- [ ] 7.10 ✅ Context API (`createContext`, `useContext`) e `useReducer` para estados mais complexos
- [ ] 7.11 ✅ Hooks customizados (extrair lógica reutilizável) e as regras dos hooks; 🔍 `useMemo`, `useCallback`, `memo` e por que o React Compiler os torna menos necessários
- [ ] 7.12 ✅ Lint e formatação no projeto React: ESLint (com as regras dos hooks) e Prettier
- [ ] 7.13 🔍 Componentes de classe: só para reconhecer em código antigo
- [ ] 🛠️ Mini projeto: catálogo de produtos com carrinho (só front, dados locais)

## Módulo 8: React, aplicação real (SPA + API Spring)
- [ ] 8.1 ✅ Rotas: React Router (rotas, parâmetros, rotas aninhadas e layouts, página 404, navegação pelo código) e 🔍 TanStack Router
- [ ] 8.2 ✅ Consumindo a API Spring: `fetch` em componentes, estados de carregamento e erro, e os problemas de buscar dados "na mão" com `useEffect`
- [ ] 8.3 ✅ **TanStack Query:** "estado do servidor", queries, mutations, cache, invalidação, paginação e atualização otimista
- [ ] 8.4 ✅ **Formulários:** React Hook Form + Zod (validação tipada, mensagens de erro, enviar para a API e exibir os erros de validação que o Spring devolve)
- [ ] 8.5 ✅ Estado global do cliente: quando usar Context e quando usar o **Zustand** (🔍 Jotai e Redux Toolkit)
- [ ] 8.6 ✅ Autenticação na SPA: login com a API Spring (JWT), rotas protegidas, enviar o token em todas as requisições, tratar o 401 e o refresh
- [ ] 8.7 ✅ **shadcn/ui:** o que é (componentes que são **copiados** para o seu projeto, e não uma dependência), Radix/Base UI por baixo, a CLI (`init`, `add`), tema, *blocks* e acessibilidade
- [ ] 8.8 ✅ Erros e carregamento: Error Boundaries, Suspense, `lazy` (carregar telas sob demanda) e 🔍 Portals
- [ ] 8.9 ✅ Testes: Vitest + React Testing Library (testar o comportamento, e não a implementação) e 🔍 MSW para simular a API
- [ ] 8.10 🔍 Testes E2E com Playwright
- [ ] 8.11 ✅ Variáveis de ambiente no Vite (URL da API em dev e prod), proxy para a API local, build e deploy de uma SPA
- [ ] 🛠️ Mini projeto: CRUD com login consumindo uma API Spring Boot, com shadcn/ui

## Módulo 9: Next.js (o framework full stack do React)
- [ ] 9.1 ✅ O que é o Next.js: CSR x SSR x SSG, quando usar o Next e quando uma SPA com o Vite basta; `create-next-app` (TypeScript, Tailwind, ESLint, App Router) e a estrutura do projeto
- [ ] 9.2 ✅ App Router: rotas por pastas, `page`, `layout`, `loading`, `error`, `not-found`, rotas dinâmicas (`[id]`), grupos de rotas, `Link` e navegação
- [ ] 9.3 ✅ **Server Components x Client Components:** o que roda no servidor e o que roda no navegador, `'use client'` e como compor os dois (o conceito mais importante do Next)
- [ ] 9.4 ✅ Buscando dados: Server Components `async` chamando a API Spring, streaming com Suspense, buscas em paralelo, dados sensíveis só no servidor
- [ ] 9.5 ✅ **Cache Components:** `'use cache'`, `cacheLife`, revalidação, conteúdo estático x dinâmico (o modelo padrão desde o Next.js 16.4)
- [ ] 9.6 ✅ Mutations: Server Actions, formulários, revalidação dos dados e validação com Zod no servidor
- [ ] 9.7 ✅ Route Handlers (endpoints de API dentro do Next), `proxy.ts` (o antigo middleware), cookies e cabeçalhos
- [ ] 9.8 ✅ **Autenticação no Next + Spring:** o Next como BFF (o token num cookie `httpOnly`, sem passar pelo navegador), proteger rotas e 🔍 bibliotecas como o Auth.js e o Better Auth
- [ ] 9.9 ✅ Otimizações: `next/image`, `next/font`, metadata e SEO, `next/script` e carregamento sob demanda
- [ ] 9.10 ✅ Next.js + shadcn/ui na prática: montando um painel (dashboard) com tabelas, formulários e gráficos
- [ ] 9.11 ✅ Variáveis de ambiente, build e deploy (Vercel; 🔍 Docker, servidor Node próprio e *static export*)
- [ ] 9.12 🔍 Performance e Core Web Vitals: Lighthouse, Profiler do React DevTools e o analisador de bundle
- [ ] 9.13 🔍 **Angular para conhecer:** o mesmo componente em React e em Angular lado a lado (templates, signals, injeção de dependência), quando as empresas escolhem o Angular e como ler um projeto Angular se uma vaga pedir
- [ ] 🛠️ Mini projeto: site + painel com Next.js consumindo a API Spring (por exemplo, a página de vendas e o painel de clientes do seu renderizador)

## Módulo 10: IA como ferramenta de desenvolvimento (back e front)
> 💡 Pode ser estudado **em paralelo a partir do Módulo 5**. As aulas 10.8 a 10.10 rendem mais depois do Módulo 8, quando você já consegue avaliar o código React que a IA gera.

- [ ] 10.1 ✅ Como LLMs funcionam: tokens, janela de contexto, temperatura, alucinações, modelos de raciocínio x padrão, custo e escolha do modelo
- [ ] 10.2 ✅ Engenharia de prompt: anatomia de um bom prompt (papel, contexto, tarefa, restrições, formato), exemplos (few-shot), pedir um plano antes do código, iterar; prompts para bugs, refatoração e testes
- [ ] 10.3 ✅ Engenharia de contexto: o que colocar no contexto e o que deixar de fora; arquivos de instruções (`CLAUDE.md`, `AGENTS.md`, regras do Copilot e do Cursor), `llms.txt`; gerenciar o contexto em sessões longas
- [ ] 10.4 ✅ Agentes de código: o que é um agente, o loop agêntico, ferramentas (Claude Code, GitHub Copilot, Cursor, Codex, JetBrains AI Assistant/Junie) e a integração delas com o IntelliJ, modos de permissão e modo de planejamento
- [ ] 10.5 ✅ Fluxo de trabalho com agentes: explorar → planejar → implementar → testar → revisar; TDD com IA; tarefas pequenas e commits frequentes; git worktrees
- [ ] 10.6 ✅ **MCP na prática:** o que é (host, client, server), configurar servidores úteis (o MCP do **shadcn/ui**, GitHub, Playwright, banco de dados) e os riscos de cada um
- [ ] 10.7 ✅ Personalizando o agente: skills (inclusive as oficiais do Next.js e do shadcn), subagentes, comandos customizados, hooks (ex.: rodar lint e testes após cada edição) e plugins
- [ ] 10.8 ✅ IA na sua stack: React/Next.js (documentação para agentes, `next upgrade --agent`, evitar código gerado em padrões antigos, como o Pages Router e os componentes de classe), shadcn/ui com IA e Spring Boot (testes, migrations, revisão de JPA/N+1 e de segurança); 🔍 geradores de interface, como o v0
- [ ] 10.9 ✅ Revisando código gerado por IA: APIs e pacotes inventados, segredos expostos, vulnerabilidades, código desatualizado; nunca aceitar o que você não entende
- [ ] 10.10 🔍 Automação: agentes em modo headless, revisão de pull requests por IA e IA no CI (GitHub Actions)

## Módulo 11: IA dentro das suas aplicações (Spring AI + React/Next.js)
- [ ] 11.1 ✅ APIs de LLM: mensagens e papéis (system/user/assistant), parâmetros, tokens, custo, rate limits e por que a chave de API **nunca** vai para o navegador (no Next.js, ela fica só no servidor)
- [ ] 11.2 ✅ Saídas estruturadas (JSON com schema) e streaming de respostas (SSE)
- [ ] 11.3 ✅ Spring AI: `ChatClient`, templates de prompt, advisors e memória de conversa
- [ ] 11.4 ✅ Tool calling: o modelo chamando métodos do seu back-end
- [ ] 11.5 ✅ Embeddings, busca semântica e banco vetorial (PostgreSQL + pgvector)
- [ ] 11.6 ✅ RAG: chunking, indexação, recuperação e geração ("converse com seus documentos")
- [ ] 11.7 ✅ Criando um servidor MCP: em Java (Spring AI MCP) e em TypeScript (SDK oficial)
- [ ] 11.8 ✅ Agentes: o loop agêntico do zero, padrões (ReAct, planejador-executor, multiagentes) e 🔍 frameworks (Claude Agent SDK, Spring AI, LangChain4j)
- [ ] 11.9 ✅ **Front-end para IA com React/Next.js:** chat com streaming (o **AI SDK** da Vercel e o `useChat`), consumir o streaming do Spring AI, renderizar markdown, estados de carregamento e erro, boas práticas de UX para IA e 🔍 componentes de chat prontos feitos com shadcn/ui
- [ ] 11.10 ✅ Onde fica a IA: chamar o modelo pelo Spring ou direto do servidor do Next.js (AI SDK), e como decidir
- [ ] 11.11 ✅ Segurança em apps com IA: prompt injection, dados pessoais (LGPD), permissões das ferramentas e guardrails
- [ ] 11.12 🔍 Avaliação e observabilidade: evals, testes de regressão de prompts, tracing, monitoramento de custo e latência
- [ ] 11.13 🔍 Modelos locais (Ollama) x modelos via API: quando usar cada um
- [ ] 🛠️ Mini projeto: assistente que responde perguntas sobre documentos (RAG) com Spring AI + Next.js

## Módulo 12: 🏁 Projeto final FullStack
- [ ] 12.1 ✅ API Spring Boot: CORS, autenticação JWT, validação e respostas de erro padronizadas
- [ ] 12.2 ✅ Front completo em Next.js com shadcn/ui: rotas protegidas, BFF, formulários, cache dos dados e testes
- [ ] 12.3 ✅ Uma funcionalidade com IA (ex.: busca semântica ou assistente) usando o que foi visto no Módulo 11
- [ ] 12.4 ✅ CI com GitHub Actions (lint + testes + build) e deploy das duas pontas
- [ ] 12.5 🔍 Bônus para o seu produto: a interface de um plugin do SketchUp com React + Vite dentro do `HtmlDialog`, conversando com o Ruby

---

## ⏭️ Fora do escopo (de propósito)

Está nos roadmaps, mas não é necessário para o seu objetivo de FullStack Java + React/Next.js:
Angular a fundo (fica só a aula 9.13) · Vue, Svelte, Solid · Remix/React Router como framework, Astro, TanStack Start · React Native e apps mobile · Electron e apps desktop · GraphQL · Redux a fundo · CSS-in-JS (styled-components, Emotion) · PWAs · Web Components a fundo · treinar ou fazer fine-tuning de modelos · machine learning/ciência de dados · IA multimodal (geração de imagem, áudio e vídeo) · ecossistema Python de IA.

Se algum dia precisar, a base que você vai construir aqui torna tudo isso fácil de aprender.

---

## 📝 Histórico do roadmap

- **Até a aula 2.2**, o curso era voltado para o **Angular**. Por isso, as aulas do Módulo 1 têm seções "E no Angular?".
- **Em 22/10/2026**, o foco mudou para **React + Next.js**. Motivo: numa análise de 1.131 vagas da Gupy, as vagas de **Java** citam React e Angular quase na mesma proporção (87 x 97), mas o **React lidera** nas vagas de front-end, nas remotas e no ecossistema para freelas e produtos próprios. O Angular continua no curso como uma aula para conhecer (9.13).
