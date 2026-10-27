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

1. **Nunca use um conceito sem antes explicá-lo.** Se um exemplo usa destructuring, spread, ternário, arrow function etc., esse conceito já precisa ter sido ensinado numa aula anterior ou ser explicado ali mesmo. O aluno reclamou explicitamente quando isso não aconteceu (na 1.2, e de novo na 2.3, com cookies e `localStorage`). A regra vale para **tudo**: o texto da aula, os exemplos, os exercícios, as dicas e os arquivos de apoio (como o site dos exercícios). Uma citação de passagem ("o cookie da aula 2.2") **não conta** como explicação: o conceito precisa ser explicado no formato da regra 3.
   - **HTML e CSS antes do Módulo 3:** o aluno ainda não revisou HTML e CSS. Toda aula anterior ao Módulo 3 que usar tags, atributos, seletores ou propriedades de CSS precisa explicar o mínimo necessário (modelo: a seção 0 da aula 2.3).
2. **Relacione tudo o que for possível com Java** (pedido explícito do aluno): o equivalente em Java, as diferenças e as armadilhas para quem vem do Java. Use blocos `> ☕` para essas comparações. No React e no Next.js, compare também com o **Spring** (ex.: Server Actions e Route Handlers x `@RestController`, Zod x Bean Validation, Context x injeção de dependência, BFF x API Gateway).
3. Para cada conceito, explique: **o que é → para que serve → como funciona, passo a passo → exemplo → armadilhas.**
4. Sempre que fizer sentido, diga **onde aquilo aparece no React e no Next.js**, para o aluno ver a utilidade.
5. Termine cada aula com um **resumo em tabela** (JavaScript/TypeScript x Java) e **regras de ouro**.
6. **Aulas de IA (2.8 e Módulos 10 e 11):** é a área que muda mais rápido. Pesquise o estado atual (versões do Spring AI, do MCP, do AI SDK da Vercel, das ferramentas) antes de escrever. Cubra o lado do back (Java/Spring AI) **e** o do front (React/Next.js, AI SDK, MCP do shadcn/ui), e apresente as ferramentas de forma neutra (Claude Code, Copilot, Cursor...). O Módulo 10 pode ser feito em paralelo a partir do Módulo 5.
7. **React e Next.js mudam rápido.** Antes de criar uma aula dos Módulos 7 a 9, confira na documentação oficial ([react.dev](https://react.dev), [nextjs.org/docs](https://nextjs.org/docs), [ui.shadcn.com](https://ui.shadcn.com)) se as APIs ainda são as mesmas. Ensine só o padrão atual (componentes de função, App Router, Cache Components) e mostre o padrão antigo apenas para o aluno reconhecer em código legado (componentes de classe, Pages Router, Create React App).
8. Nível de profundidade: seguir as marcações do README (✅ essencial = a fundo; 🔍 conhecer = visão geral, quando usar, onde consultar).
9. **Calibre o tamanho da aula pela importância do assunto.** Em 22/10/2026, o aluno avisou que estava demorando demais para terminar as aulas e os exercícios, por causa de conceitos densos demais. Antes de escrever, classifique a aula e indique a classificação no topo dela, com o tempo estimado (modelo: o aviso ⏱️ da aula 2.4).
   - **Completa** (o formato das aulas 1.2 a 2.3): só para os conceitos que são a base do que vem depois, que o aluno vai usar escrevendo código todo dia, e que têm armadilhas ou não têm equivalente direto no Java. Exemplos: closures e `this`, assincronismo (4.4), DOM e eventos, os tipos do TypeScript, estado e efeitos do React, Server x Client Components, o cache do Next.js e autenticação. Mesmo nelas, corte o que o curso não vai usar e limite a lista a cerca de 8 exercícios (o resto vira 🔍 opcional).
   - **Enxuta** (modelo: a aula 2.4): para ferramentas que se aprendem usando, assuntos com equivalente direto no Java (npm ≈ Maven) e as aulas 🔍. Limites: cerca de 30 minutos de leitura e de 4 a 6 exercícios práticos e curtos (cerca de 45 minutos), com perguntas de resposta curta. Cada conceito em poucos parágrafos, com o ☕ e a armadilha principal. Ensine só o que o aluno vai usar de verdade, e deixe o resto de fora ou numa linha 🔍. A aula enxuta **mantém** o bloco "**Por que esta aula importa?**" no topo (pedido do aluno), antes do aviso ⏱️.
   - Uma aula enxuta tem **menos conceitos**, e não conceitos mal explicados: a regra 1 continua valendo.
   - Na dúvida, prefira a enxuta: o aprofundamento pode vir quando o assunto voltar num projeto.
   - Sugestão para o resto do Módulo 2 (reavalie na hora): 2.5 (ESLint e Prettier), 2.6 (Git; pergunte quanto o aluno já usa no Java) e 2.8 enxutas; 2.7 (Vite) completa, mas curta.

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

1. Confira no `README.md` o tópico e o nível (✅/🔍) da aula, e **classifique-a como completa ou enxuta** (regra 9). Pesquise a versão atual quando for algo que muda rápido (React, Next.js, shadcn/ui, TypeScript, ferramentas). As versões-alvo estão no README.
2. Escreva o `aula.md` seguindo as regras pedagógicas acima. Modelo de referência: `01-javascript/aula-02-objetos-spread-destructuring/aula.md`.
3. Escreva os exercícios:
   - Comentário no topo (ou instruções no README da pasta) dizendo como rodar.
   - Os exercícios variam entre **prever antes de rodar**, **implementar**, **consertar um bug** e um **desafio final**.
   - Deixe as chamadas de teste comentadas, com o resultado **esperado** ao lado.
   - Quando houver dados compartilhados, inclua no final uma verificação automática de mutação.
   - Só use conceitos já ensinados até aquela aula. **Antes de entregar, liste toda sintaxe, operador e método usado nos exercícios (inclusive nas dicas e nos testes prontos) e confira se cada um foi explicado.** Na aula 1.2, o desafio 12 exigia `??` e `reduce` com acumulador objeto sem ter ensinado, e o aluno não conseguiu resolver.
4. **Teste antes de entregar:** rode os exercícios (precisam executar sem erro com os TODOs vazios) e confira os resultados esperados escrevendo uma solução de referência **fora do repositório** (no scratchpad). Nunca deixe soluções no repositório. Em projetos React/Next, rode também o `npm run build` e o lint da solução de referência.
   - O `npm` e o `npx` falham no caminho longo do scratchpad (erro "O nome do diretório é inválido"). Use uma pasta curta, como `$env:TEMP\claude-aulas\aula-X.Y`, e rode o npm pelo PowerShell (no Git Bash, ele dá "Could not determine Node.js install directory").
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

- **Concluídas:** 1.1, 1.2 (nota 9,5), 1.3 (nota 8,5), 1.4 (nota 9), 1.5 (nota 9,5), 1.6 (nota 9,5), 1.7 (nota 9). **Módulo 1 completo.** 2.1 (só leitura, marcada pelo próprio aluno), 2.2 (nota 7,5: o PATCH tinha um bug de sombreamento de variável e várias respostas ficaram em branco; o aluno consertou o PATCH logo depois da correção, e os testes E7.1 a E7.4 passaram), 2.3 (nota 9: todos os obrigatórios respondidos e os dois bugs consertados; faltaram partes de "por quê" no 2D e no 6c), 2.4 (nota 8: a parte prática ficou perfeita; a resposta do 4b foi escrita no campo do 4c, e ficaram metades sem resposta no 3e e no 5c, além do motivo do `"type": "module"` no 1b), 2.5 (nota 9: nenhum campo em branco; o projeto passa no lint, no Prettier e no `npm start`; a 1ª parte do 2b contradiz a 2ª, e o script `lint` ficou com `npx` e `--fix`, diferente do enunciado).
- **Prontas, aguardando o aluno:** 2.6 (enxuta)
- **Próximas a criar:** 2.7 (Vite: completa, mas curta)
- **Aula 2.6 (entrega por pull request):** antes da aula, o aluno só usava o Git pelo IntelliJ (commit e push). Nesta aula, ele responde numa branch `aula-2-6` e abre um PR no GitHub, **sem fazer o merge**. O conflito de merge é treinado num repositório separado, em `exercicios/treino-git/` (ignorado pelo `exercicios/.gitignore`, então não vai para o GitHub). Para corrigir:
  - Leia o `exercicios.md` da branch `aula-2-6` (`git show aula-2-6:caminho` se a pasta local estiver em outra branch) e confira o repositório de treino com `git -C .../exercicios/treino-git log --oneline --graph --all` e o `precos.js` final (esperado: `frete = 15`, `freteGratisAcimaDe = 200`, `desconto = 0.05`, e um commit de merge com dois pais). O `gh` não está instalado: veja o PR pelo navegador ou pelo `WebFetch` (o repositório é público).
  - **Enquanto o PR estiver aberto, não faça commits na `main`.** Depois da correção, faça o commit do README e do CLAUDE.md **na própria branch `aula-2-6`** (com a permissão do aluno) e dê push: o PR é atualizado. O último passo é do aluno: fazer o merge do PR no GitHub (de preferência com *Squash and merge*), voltar para a `main` e atualizar (`git switch main` + `git pull`, ou Ctrl+T). Guie-o nisso na correção.
  - O Git do aluno não tem `core.editor` configurado (o padrão do Git para Windows é o Vim): nos comandos que você passar para ele, use sempre `-m` ou `--no-edit`.
- **Aula 2.5:** as respostas ficam no `exercicios/exercicios.md` (a partir desta aula, cada parte de uma pergunta tem o seu próprio `Resposta:`). O aluno cria o `.prettierrc` e o `eslint.config.js` na pasta `exercicios`, e o `.prettierignore` (que já vem pronto) protege o `exercicios.md` do `prettier --write`. Valores esperados: o `--check` acusa `src/carrinho.js` e `src/index.js` (e talvez o `.prettierrc`, se o IntelliJ o criou com CRLF); depois do `--write`, o ESLint acusa 4 erros no `carrinho.js`: `no-dupe-keys` (linha 7), `no-unused-vars` (16), `no-undef` (18) e `use-isnan` (24). Antes do conserto, o `npm start` mostra a Camiseta com `preco: 49.9`, o "Um preço NaN é: válido" e quebra com `ReferenceError: totl is not defined`. Depois do conserto, a saída termina com "Um preço NaN é: inválido" e "Total: 141.6". Com `eqeqeq` e `prefer-const`, o `--fix` corrige só o `let encontrado` (vira `const`); o `==` fica para o aluno. Para corrigir: copie a pasta (sem a `node_modules`) para `$env:TEMP\claude-aulas\`, rode `npm ci`, `npm run lint`, `npx prettier --check .` e `npm start`.
- **Aula 2.4:** as respostas ficam no `exercicios/exercicios.md`, e o aluno cria o projeto em `exercicios/meu-projeto/` (a `node_modules` fica de fora do Git). Para corrigir, confira no `meu-projeto/package.json`: `"type": "module"`, o chalk `^6.x` em `dependencies`, o prettier em `devDependencies` e os scripts `start` e `formatar`. Confira também o `feio.js` formatado e a linha do nome em amarelo e negrito no `index.js`. Para rodar, copie a pasta (sem a `node_modules`) para `$env:TEMP\claude-aulas\`, e rode `npm ci` e `npm start` lá. Valores esperados (em 22/10/2026): o `chalk@4.1.0` instala 6 pacotes; o `npm outdated` mostra 4.1.0 / 4.1.2 / 6.0.1; subir para a 6 remove 5 pacotes, porque o chalk 5+ não tem dependências. A Latest pode ter mudado desde então.
- **Versões:** em 22/10/2026, o npm já tem o **TypeScript 7.0** (o README diz TS 6, e o `create-next-app` 16.4 ainda usa `"typescript": "^5"`). Revise as versões-alvo antes do Módulo 5.
- **Aula 2.3:** as respostas ficam no `exercicios/exercicios.md`. Depois da regra 9, os exercícios 1, 3, 4, 8 e 10 viraram opcionais (🔍); os obrigatórios são 2, 5, 6, 7 e 9. Não tire nota pelos opcionais em branco. O site da Lojinha tem dois bugs de propósito: (1) o `<script>` no `<head>` sem `defer` (erro `Cannot set properties of null` no `app.js:13`) e (2) o `app.js` lê `json.produtos`, mas a API devolve `{ dados, total }` (erro `produtos is not iterable` no `app.js:25`). Os consertos esperados são `defer` no `index.html` e `json.dados` no `app.js`. Para corrigir: suba o `servidor.js` (porta 3001) em segundo plano, abra `http://localhost:3001` no navegador embutido, leia o Console e confira se os 4 produtos aparecem e se o `document.cookie` mostra só o `visitante`; pare o processo na porta 3001 no final.
- **Aula 2.2:** as respostas ficam no `exercicios/exercicios.md`, e o código no `exercicios/servidor.js` (DELETE e PATCH). Para corrigir: suba o servidor em segundo plano, teste as rotas com `curl.exe` (corpos com acento via arquivo `--data-binary @arquivo.json`, porque o terminal corrompe o UTF-8) e pare o processo na porta 3000 no final.
- **Roadmap reorganizado em 22/10/2026** para React + Next.js. Mudanças além dos Módulos 7 a 9: 2.7 (Vite) virou ✅; 3.10 virou Tailwind ✅ (base do shadcn/ui) e o Sass foi para 🔍 (3.11); 5.13 (Zod) é nova, e as aulas 5.14 e 5.15 foram renumeradas; o Módulo 11 ganhou a 11.10 (onde chamar a IA: Spring ou Next.js); o projeto final é em Next.js, com o bônus 12.5 (interface do plugin do SketchUp).

### Pontos de atenção do aluno (reforçar nas próximas aulas e correções)

- **Conferir a saída contra o enunciado**, e não só se o código roda (errou a ordem decrescente e o formato da saída na 1.3; na 1.6, a mensagem de erro do desafio saiu sem acento e com maiúscula diferente do enunciado).
- **Cópia rasa:** volta a aparecer (getter `itens` da 1.5 copiava só o array). Reforçar sempre que houver objetos aninhados, **principalmente no estado do React** (aula 7.6), onde mutar um objeto aninhado faz a tela não atualizar.
- **Hábitos do Java que não se aplicam ao JS:** getters para campos públicos (`getNome()`), construtores que só repassam para o `super`. No React, o hábito a vigiar é querer usar classes e herança onde o React usa funções e composição.
- **`this`:** entendeu bem depois da explicação "olhe a linha em que a função é executada e veja o que está antes do ponto", mostrando um `forEach` simplificado que chama `callback(item)`. Reusar essa abordagem quando o tema voltar (classes no TS e componentes de classe do React legado).
- **Closures:** são a base dos hooks. Na aula 7.6, ligar o "estado como foto de cada renderização" com as closures da aula 1.4 (o bug da *stale closure*).
- **Validação:** lembrar que comparações com `undefined` dão `false` (buraco de validação) e que valores padrão não servem para dados obrigatórios.
- **Responder o "por quê"** nos exercícios de explicação, e responder **todas** as partes das perguntas (deixou campos em branco na 1.4, na 1.7 e na 2.2, onde ficaram em branco uma tabela inteira, a coluna "status real" e a pergunta do 204; também responde só metade de perguntas com várias partes). **É o ponto que mais tem tirado nota**: reforçar no início de cada lista de exercícios. Na 2.3, com menos exercícios obrigatórios, não deixou nenhum em branco: listas mais curtas funcionam melhor. Na 2.4, voltou a responder só a primeira parte de perguntas duplas (3e, 5c) e escreveu uma resposta no campo errado (4b no 4c). Em perguntas com várias partes, use um `Resposta:` separado para cada parte: na 2.5, com esse formato, ele respondeu tudo.
- **Ordem dos exercícios:** na 2.5, consertou os bugs antes do exercício que pedia para rodar o código original, e ficou travado no 1e. Quando um exercício depender de rodar o código **antes** de um conserto, deixe isso bem visível no próprio item, e não só no topo.
- **Sombreamento de variáveis (aula 1.4, seção 1.3):** na 2.2, um `const { id, ...resto } = corpo` dentro do PATCH escondeu o `id` da rota, e a atualização não era salva. Quando aparecer destructuring dentro de funções, lembrar de nomes diferentes (`id: _id`).
- Aprende melhor quando o raciocínio é montado em etapas (ex.: `for...of` → `reduce` mutável → `reduce` imutável) e com tabelas "volta a volta".
