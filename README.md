# 🎯 Estudos Front-End: do JavaScript ao Angular

Repositório com a minha jornada de estudos de front-end, do JavaScript ao Angular, vindo do **Java**. Cada aula traz a teoria (com comparações com Java) e os meus exercícios resolvidos.

**Objetivo:** tornar-me desenvolvedor **FullStack** (Java/Spring no back + Angular no front), sem me especializar em front-end, mas sabendo tudo o que o mercado espera de um dev Angular.

## 📁 Estrutura

```
NN-modulo/
  aula-NN-tema/
    aula.md         ← teoria da aula
    exercicios.js   ← exercícios resolvidos
```

Para rodar os exercícios de JavaScript, é preciso ter o [Node.js](https://nodejs.org) instalado:

```bash
node 01-javascript/aula-02-objetos-spread-destructuring/exercicios.js
```

**Versões-alvo:** Angular 22 · TypeScript 6 · Node 22+ (você tem o Node 24 ✅)

**Baseado em:** [roadmap.sh/frontend](https://roadmap.sh/frontend), [roadmap.sh/angular](https://roadmap.sh/angular), [roadmap.sh/typescript](https://roadmap.sh/typescript), [roadmap.sh/ai-engineer](https://roadmap.sh/ai-engineer), [roadmap.sh/ai-agents](https://roadmap.sh/ai-agents), [roadmap.sh/claude-code](https://roadmap.sh/claude-code), na documentação oficial ([angular.dev](https://angular.dev)) e nas grades de cursos atuais.

## Como estudar cada aula

1. Leia o `aula.md` com calma (no VS Code, **Ctrl+Shift+V** abre a visualização formatada).
2. **Digite** os exemplos (não copie e cole) e rode com `node arquivo.js`.
3. Resolva o `exercicios.js` da aula.
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
- [ ] 1.2 ✅ Objetos, valor x referência, imutabilidade, spread, rest e destructuring
- [ ] 1.3 ✅ Truthy/falsy, `null` x `undefined`, `?.` e `??`, mais métodos de array, ordenação
- [ ] 1.4 ✅ Escopo, hoisting, closures e `this`
- [ ] 1.5 ✅ Classes, herança e getters/setters (comparando com Java)
- [ ] 1.6 ✅ Tratamento de erros (`try/catch`, `throw`) e JSON (`JSON.parse`/`JSON.stringify`)
- [ ] 1.7 ✅ Módulos ES (`import`/`export`)

## Módulo 2: Como a web funciona + ferramentas do dia a dia
- [ ] 2.1 ✅ Como a internet funciona: HTTP/HTTPS, métodos e status codes, DNS, domínio, hospedagem
- [ ] 2.2 ✅ Como o navegador funciona: parsing, DOM, renderização; DevTools (Elements, Console, Network, Sources)
- [ ] 2.3 ✅ npm a fundo: `package.json`, `dependencies` x `devDependencies`, scripts, `npx`, versionamento semântico, `package-lock.json` (🔍 pnpm/yarn)
- [ ] 2.4 ✅ **Linters e formatadores:** ESLint e Prettier (o que são, diferença entre eles, instalar, configurar, integrar ao VS Code, formatar ao salvar)
- [ ] 2.5 ✅ Git e GitHub para front-end: `.gitignore`, branches, pull requests, conventional commits (🔍 Husky + lint-staged)
- [ ] 2.6 🔍 Bundlers e build: o que um bundler faz, Vite e esbuild (o Angular usa por baixo dos panos)
- [ ] 2.7 ✅ Estudando com IA: usar a IA como tutor, e não como atalho (o que pedir e o que **não** pedir enquanto aprende)

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
- [ ] 3.10 ✅ SCSS/Sass (o padrão nos projetos Angular)
- [ ] 3.11 🔍 Tailwind CSS (frameworks de CSS utilitário)
- [ ] 🛠️ Mini projeto: landing page responsiva e acessível

## Módulo 4: JavaScript no navegador
- [ ] 4.1 ✅ DOM: selecionar, criar, alterar e remover elementos
- [ ] 4.2 ✅ Eventos: listeners, propagação (bubbling) e delegação
- [ ] 4.3 ✅ Web APIs úteis: `localStorage`/`sessionStorage`, timers, URL e query params
- [ ] 4.4 ✅ Assincronismo: event loop, callbacks, Promises, `async/await`
- [ ] 4.5 ✅ `fetch` e consumo de API REST (GET/POST/PUT/DELETE, headers, tratamento de erros)
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
- [ ] 5.11 ✅ Decorators (base para entender o `@Component`) e módulos em TS
- [ ] 5.12 ✅ ESLint com TypeScript (typescript-eslint)
- [ ] 5.13 🔍 Tipos avançados: mapped, conditional e template literal types
- [ ] 5.14 ✅ Testes unitários com Vitest (`describe`, `it`, `expect`, mocks), o mesmo runner padrão do Angular

## Módulo 6: Segurança web e autenticação (visão de FullStack)
- [ ] 6.1 ✅ Autenticação no front: sessão x token, JWT (estrutura, onde guardar, expiração e refresh), 🔍 OAuth2/OIDC
- [ ] 6.2 ✅ Riscos principais: XSS, CSRF, HTTPS, CSP, 🔍 OWASP Top 10

## Módulo 7: Angular, fundamentos
- [ ] 7.1 ✅ O que é Angular, AngularJS x Angular, SPA e arquitetura geral
- [ ] 7.2 ✅ Angular CLI: instalar, `ng new`, `ng serve`, `ng generate`, `ng build`; estrutura do projeto; Angular DevTools e Language Service
- [ ] 7.3 ✅ Componentes: anatomia (`selector`, `template`, `styles`, `imports`), standalone, encapsulamento de estilos
- [ ] 7.4 ✅ Templates e data binding: interpolação, property, attribute, class/style, event binding
- [ ] 7.5 ✅ Controle de fluxo: `@if`, `@else`, `@for` (com `track`), `@switch`, `@let`
- [ ] 7.6 ✅ Signals: `signal`, `computed`, `effect`, `linkedSignal`
- [ ] 7.7 ✅ Comunicação entre componentes: `input()`, `output()`, `model()` (two-way binding)
- [ ] 7.8 ✅ Content projection (`ng-content`), `viewChild`/`contentChild` e template reference variables
- [ ] 7.9 ✅ Ciclo de vida dos componentes (`ngOnInit`, `ngOnDestroy`, `afterNextRender`...)
- [ ] 7.10 ✅ Pipes: pipes prontos (date, currency, async...), precedência e pipes customizados
- [ ] 7.11 ✅ Diretivas: de atributo, customizadas; host bindings
- [ ] 7.12 ✅ Lint e formatação no projeto Angular: `ng add angular-eslint`, `ng lint`, Prettier
- [ ] 🛠️ Mini projeto: catálogo de produtos (só front, dados locais)

## Módulo 8: Angular, aplicação real
- [ ] 8.1 ✅ Services e injeção de dependência: `inject()`, `providedIn: 'root'`, providers e hierarquia de injetores (comparando com o Spring)
- [ ] 8.2 ✅ Rotas: configuração, `router-outlet`, `routerLink`, parâmetros, rotas filhas, página 404
- [ ] 8.3 ✅ Lazy loading de rotas, guards (`canActivate`, `canMatch`) e resolvers
- [ ] 8.4 ✅ RxJS essencial: Observable, `subscribe`, Observable x Promise, `Subject`/`BehaviorSubject`
- [ ] 8.5 ✅ Operadores RxJS: `map`, `filter`, `tap`, `switchMap`, `debounceTime`, `catchError`, `combineLatest`; pipe `async`; evitar memory leaks (`takeUntilDestroyed`)
- [ ] 8.6 ✅ HttpClient: requisições, tipagem das respostas, tratamento de erros
- [ ] 8.7 ✅ Interceptors: enviar o JWT, tratar 401, loading global
- [ ] 8.8 ✅ Signals + HTTP: `resource`, `httpResource`, `toSignal`/`toObservable` (interop com RxJS)
- [ ] 8.9 ✅ Reactive Forms tipados: `FormGroup`, `FormControl`, `FormArray`, validadores prontos e customizados
- [ ] 8.10 ✅ Signal Forms (nova API estável do Angular 22)
- [ ] 8.11 🔍 Template-driven forms (`ngModel`) e `ControlValueAccessor`
- [ ] 8.12 ✅ Environments e configuração de build (URL da API em dev e prod); proxy para a API local
- [ ] 8.13 ✅ Biblioteca de componentes: Angular Material (🔍 PrimeNG)
- [ ] 🛠️ Mini projeto: CRUD consumindo uma API pública, com login

## Módulo 9: Angular avançado e produção
- [ ] 9.1 ✅ Change detection: como funciona, `OnPush` (padrão no v22), zoneless x Zone.js
- [ ] 9.2 ✅ Gerenciamento de estado com services + signals (🔍 NgRx SignalStore e NgRx Store)
- [ ] 9.3 ✅ Performance: `@defer`, `NgOptimizedImage`, lazy loading, análise de bundle
- [ ] 9.4 ✅ Segurança no Angular: sanitização, XSS, proteção XSRF do HttpClient
- [ ] 9.5 🔍 Acessibilidade no Angular (Angular Aria, CDK a11y)
- [ ] 9.6 ✅ Testes: componentes, services, pipes e HTTP com Vitest + TestBed; code coverage
- [ ] 9.7 🔍 Testes E2E com Playwright
- [ ] 9.8 ✅ **Angular legado:** NgModules, `*ngIf`/`*ngFor`, `@Input`/`@Output`, DI pelo construtor e Zone.js (muitas empresas ainda têm código assim)
- [ ] 9.9 🔍 SSR, SSG e hidratação
- [ ] 9.10 🔍 Internacionalização (i18n) e animações
- [ ] 9.11 ✅ Build de produção e deploy (Vercel/Netlify/Firebase; Docker + Nginx)

## Módulo 10: IA como ferramenta de desenvolvimento (back e front)
> 💡 Pode ser estudado **em paralelo a partir do Módulo 5**. As aulas 10.8 a 10.10 rendem mais depois do Módulo 8, quando você já consegue avaliar o código Angular que a IA gera.

- [ ] 10.1 ✅ Como LLMs funcionam: tokens, janela de contexto, temperatura, alucinações, modelos de raciocínio x padrão, custo e escolha do modelo
- [ ] 10.2 ✅ Engenharia de prompt: anatomia de um bom prompt (papel, contexto, tarefa, restrições, formato), exemplos (few-shot), pedir um plano antes do código, iterar; prompts para bugs, refatoração e testes
- [ ] 10.3 ✅ Engenharia de contexto: o que colocar no contexto e o que deixar de fora; arquivos de instruções (`CLAUDE.md`, `AGENTS.md`, regras do Copilot e do Cursor), `llms.txt`; gerenciar o contexto em sessões longas
- [ ] 10.4 ✅ Agentes de código: o que é um agente, o loop agêntico, ferramentas (Claude Code, GitHub Copilot, Cursor, Codex), modos de permissão e modo de planejamento
- [ ] 10.5 ✅ Fluxo de trabalho com agentes: explorar → planejar → implementar → testar → revisar; TDD com IA; tarefas pequenas e commits frequentes; git worktrees
- [ ] 10.6 ✅ **MCP na prática:** o que é (host, client, server), configurar servidores úteis (Angular CLI, GitHub, Playwright, banco de dados) e os riscos de cada um
- [ ] 10.7 ✅ Personalizando o agente: skills, subagentes, comandos customizados, hooks (ex.: rodar lint e testes após cada edição) e plugins
- [ ] 10.8 ✅ IA na sua stack: Angular (guia oficial de boas práticas, MCP do Angular CLI, evitar código gerado no padrão antigo) e Spring Boot (testes, migrations, revisão de JPA/N+1 e de segurança)
- [ ] 10.9 ✅ Revisando código gerado por IA: APIs e pacotes inventados, segredos expostos, vulnerabilidades, código desatualizado; nunca aceitar o que você não entende
- [ ] 10.10 🔍 Automação: agentes em modo headless, revisão de pull requests por IA e IA no CI (GitHub Actions)

## Módulo 11: IA dentro das suas aplicações (Spring AI + Angular)
- [ ] 11.1 ✅ APIs de LLM: mensagens e papéis (system/user/assistant), parâmetros, tokens, custo, rate limits e por que a chave de API **nunca** fica no front
- [ ] 11.2 ✅ Saídas estruturadas (JSON com schema) e streaming de respostas (SSE)
- [ ] 11.3 ✅ Spring AI: `ChatClient`, templates de prompt, advisors e memória de conversa
- [ ] 11.4 ✅ Tool calling: o modelo chamando métodos do seu back-end
- [ ] 11.5 ✅ Embeddings, busca semântica e banco vetorial (PostgreSQL + pgvector)
- [ ] 11.6 ✅ RAG: chunking, indexação, recuperação e geração ("converse com seus documentos")
- [ ] 11.7 ✅ Criando um servidor MCP: em Java (Spring AI MCP) e em TypeScript (SDK oficial)
- [ ] 11.8 ✅ Agentes: o loop agêntico do zero, padrões (ReAct, planejador-executor, multiagentes) e 🔍 frameworks (Claude Agent SDK, Spring AI, LangChain4j)
- [ ] 11.9 ✅ Front-end para IA no Angular: chat com streaming, renderizar markdown, estados de carregamento e erro, boas práticas de UX para IA
- [ ] 11.10 ✅ Segurança em apps com IA: prompt injection, dados pessoais (LGPD), permissões das ferramentas e guardrails
- [ ] 11.11 🔍 Avaliação e observabilidade: evals, testes de regressão de prompts, tracing, monitoramento de custo e latência
- [ ] 11.12 🔍 Modelos locais (Ollama) x modelos via API: quando usar cada um
- [ ] 🛠️ Mini projeto: assistente que responde perguntas sobre documentos (RAG) com Spring AI + Angular

## Módulo 12: 🏁 Projeto final FullStack
- [ ] 12.1 ✅ API Spring Boot: CORS, autenticação JWT, validação e respostas de erro padronizadas
- [ ] 12.2 ✅ Front Angular completo: rotas protegidas, interceptors, formulários, estado, testes
- [ ] 12.3 ✅ Uma funcionalidade com IA (ex.: busca semântica ou assistente) usando o que foi visto no Módulo 11
- [ ] 12.4 ✅ CI com GitHub Actions (lint + testes + build) e deploy das duas pontas

---

## ⏭️ Fora do escopo (de propósito)

Está nos roadmaps, mas não é necessário para o seu objetivo de FullStack Java + Angular:
React, Vue, Svelte, Solid · GraphQL · PWAs · apps mobile e desktop (Ionic, Electron...) · Web Components a fundo · NGXS · AnalogJS · criar bibliotecas, schematics e CLI builders do Angular · treinar ou fazer fine-tuning de modelos · machine learning/ciência de dados · IA multimodal (geração de imagem, áudio e vídeo) · ecossistema Python de IA.

Se algum dia precisar, a base que você vai construir aqui torna tudo isso fácil de aprender.
