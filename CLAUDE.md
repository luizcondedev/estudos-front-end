# CLAUDE.md: instruções para o Claude neste repositório

Este repositório é o **curso de front-end** que o Claude está dando ao Luiz, do JavaScript ao **React e Next.js**. Leia este arquivo inteiro antes de criar, corrigir ou alterar qualquer aula.

## Sobre o aluno

- **Objetivo:** tornar-se dev **FullStack** (Java/Spring Boot no back + **React/Next.js** no front). **Não** quer se especializar em front-end. Também quer fazer **freelas** e criar **produtos próprios**.
- **Produto em desenvolvimento:** um **renderizador com IA para o SketchUp**. A interface de um plugin do SketchUp é um `UI::HtmlDialog` (um Chromium embutido, que conversa com o Ruby): ali cabe **React + Vite**, e não Next.js. O site, o painel do cliente e a cobrança do produto são o lugar do **Next.js**. Sempre que fizer sentido, use o renderizador como exemplo ou projeto.
- **Linguagem mais forte: Java.** Usa Windows, **IntelliJ IDEA Ultimate 2026** (pago; trocou o VS Code pelo IntelliJ na aula 1.7) e Node 24. O Ultimate inclui todo o suporte a JS/TS/React/Next.js, o debugger de JavaScript, o HTTP Client e os test runners: não é preciso usar o WebStorm. Nas aulas, dê as instruções de IDE para o IntelliJ primeiro (os tutoriais de React costumam usar o VS Code; quando citar algo do VS Code, mostre o equivalente no IntelliJ).
- **Mora no Rio de Janeiro.** Quer vagas Java (presenciais/híbridas no Rio ou remotas).
- **Idioma:** todo o conteúdo é em **português do Brasil**, com acentuação correta.
- O conhecimento de HTML/CSS está enferrujado: o Módulo 3 é uma revisão completa, não um resumo.

## Decisão: React + Next.js no lugar do Angular (22/10/2026)

Até a aula 2.2, o curso era voltado ao Angular. O aluno pediu para trocar, e a decisão foi tomada com dados: numa análise de 1.131 vagas de desenvolvimento da Gupy (22/10/2026), as vagas que citam **Java** mencionam React e Angular quase na mesma proporção (87 x 97; em 53% das vagas com "Java" no título, nenhum framework de front é citado), mas o **React lidera** nas vagas de front-end (22 x 12), nas remotas (99 x 76) e no ecossistema para freelas e produtos (shadcn/ui, Vercel, ferramentas de IA). O Angular ficou como uma aula para conhecer (9.13). Não reabra essa decisão, a menos que o aluno peça.

- As aulas 1.2 a 2.2 já foram **convertidas**: as seções "E no Angular?" viraram "E no React?". Se encontrar alguma menção antiga ao Angular que não seja uma comparação proposital, atualize-a.

## Regras pedagógicas (obrigatórias)

1. **Nunca use um conceito sem antes explicá-lo.** Se um exemplo usa destructuring, spread, ternário, arrow function etc., esse conceito já precisa ter sido ensinado numa aula anterior ou ser explicado ali mesmo. O aluno reclamou explicitamente quando isso não aconteceu.
2. **Relacione tudo o que for possível com Java** (pedido explícito do aluno): o equivalente em Java, as diferenças e as armadilhas para quem vem do Java. Use blocos `> ☕` para essas comparações. No React e no Next.js, compare também com o **Spring** (ex.: Server Actions e Route Handlers x `@RestController`, Zod x Bean Validation, Context x injeção de dependência, BFF x API Gateway).
3. Para cada conceito, explique: **o que é → para que serve → como funciona, passo a passo → exemplo → armadilhas.**
4. Sempre que fizer sentido, diga **onde aquilo aparece no React e no Next.js**, para o aluno ver a utilidade.
5. Termine cada aula com um **resumo em tabela** (JavaScript/TypeScript x Java) e **regras de ouro**.
6. **Aulas de IA (2.8 e Módulos 10 e 11):** é a área que muda mais rápido. Pesquise o estado atual (versões do Spring AI, do MCP, do AI SDK da Vercel, das ferramentas) antes de escrever. Cubra o lado do back (Java/Spring AI) **e** o do front (React/Next.js, AI SDK, MCP do shadcn/ui), e apresente as ferramentas de forma neutra (Claude Code, Copilot, Cursor...). O Módulo 10 pode ser feito em paralelo a partir do Módulo 5.
7. **React e Next.js mudam rápido.** Antes de criar uma aula dos Módulos 7 a 9, confira na documentação oficial ([react.dev](https://react.dev), [nextjs.org/docs](https://nextjs.org/docs), [ui.shadcn.com](https://ui.shadcn.com)) se as APIs ainda são as mesmas. Ensine só o padrão atual (componentes de função, App Router, Cache Components) e mostre o padrão antigo apenas para o aluno reconhecer em código legado (componentes de classe, Pages Router, Create React App).
8. Nível de profundidade: seguir as marcações do README (✅ essencial = a fundo; 🔍 conhecer = visão geral, quando usar, onde consultar).

## Estrutura de arquivos

```
NN-nome-do-modulo/
  aula-NN-tema-curto/
    aula.md          ← conteúdo da aula
    exercicios.js    ← exercícios (ou .ts, .tsx, .md, ou uma pasta exercicios/, conforme o módulo)
```

- A numeração das aulas é **por módulo** (1.1, 1.2...). A pasta usa o número dentro do módulo: a aula 1.3 fica em `01-javascript/aula-03-...`.
- Pastas de módulo seguem o README: `01-javascript`, `02-web-e-ferramentas`, `03-html-css`, `04-js-navegador`, `05-typescript`, `06-seguranca`, `07-react-fundamentos`, `08-react-aplicacao`, `09-nextjs`, `10-ia-no-desenvolvimento`, `11-ia-nas-aplicacoes`, `12-projeto-fullstack`.
- A aula 1.1 não tem `aula.md`: foi dada pelo chat, e a pasta contém a solução do aluno.
- Aulas com exercícios em vários arquivos (a partir da 1.7) usam uma pasta `exercicios/` com um `README.md` (ou `exercicios.md`) de instruções e um `package.json` com `"type": "module"`. Para corrigir, rode cada parte conforme as instruções da pasta.
- **A partir do Módulo 7**, os exercícios são **projetos React/Next de verdade** (criados com o Vite ou o `create-next-app`). Nunca suba a pasta `node_modules/` (já está no `.gitignore`); o aluno roda `npm install` antes de começar.

## Como criar uma aula

1. Confira no `README.md` o tópico e o nível (✅/🔍) da aula. Pesquise a versão atual quando for algo que muda rápido (React, Next.js, shadcn/ui, TypeScript, ferramentas). As versões-alvo estão no README.
2. Escreva o `aula.md` seguindo as regras pedagógicas acima. Modelo de referência: `01-javascript/aula-02-objetos-spread-destructuring/aula.md`.
3. Escreva os exercícios:
   - Comentário no topo (ou instruções no README da pasta) dizendo como rodar.
   - Os exercícios variam entre **prever antes de rodar**, **implementar**, **consertar um bug** e um **desafio final**.
   - Deixe as chamadas de teste comentadas, com o resultado **esperado** ao lado.
   - Quando houver dados compartilhados, inclua no final uma verificação automática de mutação.
   - Só use conceitos já ensinados até aquela aula. **Antes de entregar, liste toda sintaxe, operador e método usado nos exercícios (inclusive nas dicas e nos testes prontos) e confira se cada um foi explicado.** Na aula 1.2, o desafio 12 exigia `??` e `reduce` com acumulador objeto sem ter ensinado, e o aluno não conseguiu resolver.
4. **Teste antes de entregar:** rode os exercícios (precisam executar sem erro com os TODOs vazios) e confira os resultados esperados escrevendo uma solução de referência **fora do repositório** (no scratchpad). Nunca deixe soluções no repositório. Em projetos React/Next, rode também o `npm run build` e o lint da solução de referência.
5. Não marque a aula como concluída no README: isso só acontece depois da correção.

## Como corrigir uma aula ("corrige a aula X.Y")

1. Leia os exercícios da aula e **rode-os**.
2. Para cada exercício: diga o que está certo, aponte erros e melhorias com o **porquê**, e mostre a versão melhorada quando ajudar. Confira também as respostas escritas nos comentários ("Resposta:").
3. Seja encorajador, mas honesto. Dê uma nota de 0 a 10.
4. Depois da correção, marque a aula como `[x]` no `README.md`.
5. Não reescreva o código do aluno no arquivo; a correção acontece no chat.

## Git

- Repositório: https://github.com/luizcondedev/estudos-front-end (público).
- Commits em português, no padrão Conventional Commits: `feat: aula 1.6 - erros e JSON`, `docs: atualiza progresso`.
- Só faça commit/push quando o aluno pedir.
- Nunca suba `node_modules/`, `.env` ou segredos.

## Estado atual

Atualize esta seção sempre que criar ou corrigir aulas.

- **Concluídas:** 1.1, 1.2 (nota 9,5), 1.3 (nota 8,5), 1.4 (nota 9), 1.5 (nota 9,5), 1.6 (nota 9,5), 1.7 (nota 9). **Módulo 1 completo.** 2.1 (só leitura, marcada pelo próprio aluno), 2.2 (nota 7,5: o PATCH tinha um bug de sombreamento de variável e várias respostas ficaram em branco).
- **Prontas, aguardando o aluno:** nenhuma
- **Próximas a criar:** 2.3 (como o navegador funciona + DevTools)
- **Aula 2.2:** as respostas ficam no `exercicios/exercicios.md`, e o código no `exercicios/servidor.js` (DELETE e PATCH). Para corrigir: suba o servidor em segundo plano, teste as rotas com `curl.exe` (corpos com acento via arquivo `--data-binary @arquivo.json`, porque o terminal corrompe o UTF-8) e pare o processo na porta 3000 no final.
- **Roadmap reorganizado em 22/10/2026** para React + Next.js. Mudanças além dos Módulos 7 a 9: 2.7 (Vite) virou ✅; 3.10 virou Tailwind ✅ (base do shadcn/ui) e o Sass foi para 🔍 (3.11); 5.13 (Zod) é nova, e as aulas 5.14 e 5.15 foram renumeradas; o Módulo 11 ganhou a 11.10 (onde chamar a IA: Spring ou Next.js); o projeto final é em Next.js, com o bônus 12.5 (interface do plugin do SketchUp).

### Pontos de atenção do aluno (reforçar nas próximas aulas e correções)

- **Conferir a saída contra o enunciado**, e não só se o código roda (errou a ordem decrescente e o formato da saída na 1.3; na 1.6, a mensagem de erro do desafio saiu sem acento e com maiúscula diferente do enunciado).
- **Cópia rasa:** volta a aparecer (getter `itens` da 1.5 copiava só o array). Reforçar sempre que houver objetos aninhados, **principalmente no estado do React** (aula 7.6), onde mutar um objeto aninhado faz a tela não atualizar.
- **Hábitos do Java que não se aplicam ao JS:** getters para campos públicos (`getNome()`), construtores que só repassam para o `super`. No React, o hábito a vigiar é querer usar classes e herança onde o React usa funções e composição.
- **`this`:** entendeu bem depois da explicação "olhe a linha em que a função é executada e veja o que está antes do ponto", mostrando um `forEach` simplificado que chama `callback(item)`. Reusar essa abordagem quando o tema voltar (classes no TS e componentes de classe do React legado).
- **Closures:** são a base dos hooks. Na aula 7.6, ligar o "estado como foto de cada renderização" com as closures da aula 1.4 (o bug da *stale closure*).
- **Validação:** lembrar que comparações com `undefined` dão `false` (buraco de validação) e que valores padrão não servem para dados obrigatórios.
- **Responder o "por quê"** nos exercícios de explicação, e responder **todas** as partes das perguntas (deixou campos em branco na 1.4, na 1.7 e na 2.2, onde ficaram em branco uma tabela inteira, a coluna "status real" e a pergunta do 204; também responde só metade de perguntas com várias partes). **É o ponto que mais tem tirado nota**: reforçar no início de cada lista de exercícios.
- **Sombreamento de variáveis (aula 1.4, seção 1.3):** na 2.2, um `const { id, ...resto } = corpo` dentro do PATCH escondeu o `id` da rota, e a atualização não era salva. Quando aparecer destructuring dentro de funções, lembrar de nomes diferentes (`id: _id`).
- Aprende melhor quando o raciocínio é montado em etapas (ex.: `for...of` → `reduce` mutável → `reduce` imutável) e com tabelas "volta a volta".
