# CLAUDE.md: instruções para o Claude neste repositório

Este repositório é o **curso de front-end** que o Claude está dando ao Luiz, do JavaScript ao Angular. Leia este arquivo inteiro antes de criar, corrigir ou alterar qualquer aula.

## Sobre o aluno

- **Objetivo:** tornar-se dev **FullStack** (Java/Spring Boot no back + Angular no front). **Não** quer se especializar em front-end.
- **Linguagem mais forte: Java.** Usa Windows, VS Code e Node 24.
- **Idioma:** todo o conteúdo é em **português do Brasil**, com acentuação correta.
- O conhecimento de HTML/CSS está enferrujado: o Módulo 3 é uma revisão completa, não um resumo.

## Regras pedagógicas (obrigatórias)

1. **Nunca use um conceito sem antes explicá-lo.** Se um exemplo usa destructuring, spread, ternário, arrow function etc., esse conceito já precisa ter sido ensinado numa aula anterior ou ser explicado ali mesmo. O aluno reclamou explicitamente quando isso não aconteceu.
2. **Relacione tudo o que for possível com Java** (pedido explícito do aluno): o equivalente em Java, as diferenças e as armadilhas para quem vem do Java. Use blocos `> ☕` para essas comparações.
3. Para cada conceito, explique: **o que é → para que serve → como funciona, passo a passo → exemplo → armadilhas.**
4. Sempre que fizer sentido, diga **onde aquilo aparece no Angular**, para o aluno ver a utilidade.
5. Termine cada aula com um **resumo em tabela** (JavaScript/TypeScript x Java) e **regras de ouro**.
6. **Aulas de IA (2.7 e Módulos 10 e 11):** é a área que muda mais rápido. Pesquise o estado atual (versões do Spring AI, do MCP, das ferramentas) antes de escrever. Cubra o lado do back (Java/Spring AI) **e** o do front (Angular), e apresente as ferramentas de forma neutra (Claude Code, Copilot, Cursor...). O Módulo 10 pode ser feito em paralelo a partir do Módulo 5.
7. Nível de profundidade: seguir as marcações do README (✅ essencial = a fundo; 🔍 conhecer = visão geral, quando usar, onde consultar).

## Estrutura de arquivos

```
NN-nome-do-modulo/
  aula-NN-tema-curto/
    aula.md          ← conteúdo da aula
    exercicios.js    ← exercícios (ou .ts, .html etc., conforme o módulo)
```

- A numeração das aulas é **por módulo** (1.1, 1.2...). A pasta usa o número dentro do módulo: a aula 1.3 fica em `01-javascript/aula-03-...`.
- Pastas de módulo seguem o README: `01-javascript`, `02-web-e-ferramentas`, `03-html-css`, `04-js-navegador`, `05-typescript`, `06-seguranca`, `07-angular-fundamentos`, `08-angular-aplicacao`, `09-angular-avancado`, `10-ia-no-desenvolvimento`, `11-ia-nas-aplicacoes`, `12-projeto-fullstack`.
- A aula 1.1 não tem `aula.md`: foi dada pelo chat, e a pasta contém a solução do aluno.

## Como criar uma aula

1. Confira no `README.md` o tópico e o nível (✅/🔍) da aula. Pesquise a versão atual quando for algo que muda rápido (Angular, TypeScript, ferramentas). As versões-alvo estão no README.
2. Escreva o `aula.md` seguindo as regras pedagógicas acima. Modelo de referência: `01-javascript/aula-02-objetos-spread-destructuring/aula.md`.
3. Escreva os exercícios:
   - Comentário no topo dizendo como rodar (`node exercicios.js`).
   - Os exercícios variam entre **prever antes de rodar**, **implementar**, **consertar um bug** e um **desafio final**.
   - Deixe as chamadas de teste comentadas, com o resultado **esperado** ao lado.
   - Quando houver dados compartilhados, inclua no final uma verificação automática de mutação.
   - Só use conceitos já ensinados até aquela aula. **Antes de entregar, liste toda sintaxe, operador e método usado nos exercícios (inclusive nas dicas e nos testes prontos) e confira se cada um foi explicado.** Na aula 1.2, o desafio 12 exigia `??` e `reduce` com acumulador objeto sem ter ensinado, e o aluno não conseguiu resolver.
4. **Teste antes de entregar:** rode o arquivo de exercícios (precisa executar sem erro com os TODOs vazios) e confira os resultados esperados escrevendo uma solução de referência **fora do repositório** (no scratchpad). Nunca deixe soluções no repositório.
5. Não marque a aula como concluída no README: isso só acontece depois da correção.

## Como corrigir uma aula ("corrige a aula X.Y")

1. Leia o `exercicios.js` da aula e **rode-o**.
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

- **Concluídas:** 1.1, 1.2 (nota 9,5)
- **Prontas, aguardando o aluno:** 1.3, 1.4, 1.5
- **Próximas a criar:** 1.6 (erros e JSON), 1.7 (módulos ES)
