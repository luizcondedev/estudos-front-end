# Exercícios da Aula 2.6: Git e GitHub

⏱️ Cerca de 50 minutos. Responda **neste arquivo**, nos espaços marcados com `Resposta:` (cada parte de uma pergunta tem o seu). Desta vez, **você entrega a aula por um pull request**: todas as respostas vão numa branch nova, e não na `main`.

**Onde rodar os comandos:** no terminal do IntelliJ. Uma aba nova do terminal abre na **raiz do repositório** (`estudos-front-end`), que é onde começam os exercícios 1, 2, 3 e 5. O exercício 4 diz quando mudar de pasta.

> ⚠️ Nos comandos com caminho, use a tecla **Tab** para completar os nomes das pastas, em vez de digitar tudo.

---

### 1) A branch de entrega

a) Na raiz do repositório, rode `git status`. Em qual branch você está?
Resposta: origin/main

Tem alguma mudança esperando commit? (Se tiver, me avise antes de continuar.)
Resposta: Não

b) Crie a branch da entrega e liste as branches:

```bash
git switch -c aula-2-6
git branch
```

Quais branches aparecem, e o que o `*` indica?
Resposta: aula-2-6 e main, o * significa qual branch que estou trabalhando agora

c) Olhe o canto superior esquerdo do IntelliJ. O que ele mostra agora?
Resposta: aula-2-6

---

### 2) Lendo o histórico

a) Rode `git log --oneline -8` e copie a saída aqui.
Resposta:
b1290ab (HEAD -> aula-2-6, origin/main, main) feat: aula 2.6 - Git e GitHub (aula enxuta)
1d2c622 feat: exercícios da aula 2.5 e correção (nota 9)
b97ffa4 docs: adiciona "Por que esta aula importa?" nas aulas enxutas
7c59f19 feat: aula 2.5 - ESLint e Prettier (aula enxuta)
1db2be7 feat: exercícios da aula 2.4 e correção (nota 8)
418801b chore: remove arquivo de teste da aula 2.3
0620f99 feat: exercícios da aula 2.3 e correção (nota 9)
05b0b2b docs: regra para calibrar o tamanho das aulas e progresso

b) Separe esses commits pelo **tipo** do Conventional Commits (seção 2): quais são `feat`, quais são `docs` e quais são `chore`?
Resposta: Feat: 1d2c622, 7c59f18, 1db2be7, 0620f99 | docs: b97ffa4, 05b0b2b | chore: 418801b

c) Se este repositório fosse um pacote do npm com a versão calculada pelos commits (seção 2), qual desses tipos subiria o **minor**?
Resposta: feat

E um commit `docs`, mudaria a versão?
Resposta: Não, pois é apenas documentação

---

### 3) O ciclo do commit pelo terminal

> ⚠️ Faça este exercício **depois** de escrever as respostas do 1 e do 2, e salve o arquivo (**Ctrl+S**).

a) Rode `git status`. Em qual seção da saída o `exercicios.md` aparece, e com qual palavra antes do nome dele?
Resposta:changes not staged for commit e aparece modified 

b) Coloque o arquivo no staging e confira de novo:

```bash
git add 02-web-e-ferramentas/aula-06-git-github/exercicios/exercicios.md
git status
```

Em qual seção ele aparece agora?
Resposta: Changes to be commited

Qual ação do IntelliJ equivale a esse `git add` (seção 1)?
Resposta: Selecionar os arquivos na aba commit

c) Faça o commit e veja o histórico:

```bash
git commit -m "docs: respostas dos exercícios 1 e 2 da aula 2.6"
git log --oneline -3
```

Qual é o hash do seu commit? (Esta resposta vai entrar no próximo commit, e está tudo bem.)
Resposta: f1b4d8d

---

### 4) Um conflito de merge, num repositório de treino

Para treinar sem risco, você vai criar um repositório **separado e pequeno**, dentro da pasta `exercicios`. O arquivo `exercicios/.gitignore` (que já vem pronto) faz o repositório do curso ignorar essa pasta.

a) Crie o repositório de treino:

```bash
cd 02-web-e-ferramentas/aula-06-git-github/exercicios
mkdir treino-git
cd treino-git
git init -b main
```

O `git init` cria um repositório novo (a pasta `.git`), e o `-b main` dá o nome `main` à primeira branch. Se o IntelliJ mostrar o aviso **"Unregistered VCS root detected"**, clique em **Add root**, para ele mostrar esse repositório também.

Dentro da pasta `treino-git`, crie o arquivo `precos.js` (no IntelliJ: botão direito na pasta → **New → File**) com este conteúdo:

```javascript
export const frete = 10;
export const desconto = 0.05;
```

E faça o primeiro commit:

```bash
git add precos.js
git commit -m "feat: valores iniciais de frete e desconto"
```

b) Volte uma pasta (`cd ..`), para a pasta `exercicios`, e rode `git status` e `git check-ignore -v treino-git`. A pasta `treino-git` aparece no `git status`? Qual arquivo e qual linha a ignoram?
Resposta: Não aparece, são ignorados pelo .gitignore na linha 3 

> 💡 Repare: o mesmo comando `git status` responde sobre **outro repositório** dependendo da pasta em que você está. Fora da `treino-git`, ele fala do repositório do curso; dentro dela, do repositório de treino.

Volte para o repositório de treino (`cd treino-git`). **Até o fim do exercício 4, todos os comandos rodam dentro da `treino-git`.**

c) Crie uma branch e mude o `precos.js` nela:

```bash
git switch -c feature/frete-gratis
```

Troque o conteúdo do `precos.js` por este, salve, e faça o commit:

```javascript
export const frete = 12;
export const freteGratisAcimaDe = 200;
export const desconto = 0.05;
```

```bash
git commit -am "feat: frete grátis acima de 200 reais"
```

O `-a` faz o `git add` sozinho de todos os arquivos que **já estão** no Git e foram alterados.

d) Volte para a `main` com `git switch main` e abra o `precos.js`. A linha do `freteGratisAcimaDe` está lá? Por quê?
Resposta: Nao, pois ainda não fizemos os merges das duas branchs e elas são areas de trabalho, completamente diferentes

Agora, na `main`, troque só a primeira linha para `export const frete = 15;`, salve, e faça o commit:

```bash
git commit -am "fix: corrige o valor do frete para 15 reais"
```

e) Junte a branch na `main`:

```bash
git merge feature/frete-gratis
```

Qual mensagem o Git mostrou?
Resposta: Auto-merging precos.js CONFLICT (content): Merge conflict in precos.js

Copie aqui o conteúdo do `precos.js`, com as marcações:
Resposta:
<<<<<<< HEAD
export const frete = 15;
=======
export const frete = 12;
export const freteGratisAcimaDe = 200;
>>>>>>> feature/frete-gratis
export const desconto = 0.05;

O que significa o trecho entre o `<<<<<<< HEAD` e o `=======`, e o trecho entre o `=======` e o `>>>>>>>`?
Resposta:O conteudo da main e da feature/frete-gratis, respectivamente 

f) **Resolva o conflito.** A decisão do time: o frete certo é **15** (o conserto da `main`), e o **frete grátis acima de 200** também deve entrar. Resolva pelo IntelliJ (**Git → Resolve Conflicts → Merge...**, seção 4) ou editando o arquivo à mão. Depois, termine o merge:

```bash
git add precos.js
git commit --no-edit
```

> ⚠️ Não esqueça o `--no-edit`: sem ele, o Git abre o editor Vim (seção 6).

Copie o `precos.js` final:
Resposta:
export const frete = 15;
export const freteGratisAcimaDe = 200;
export const desconto = 0.05;

g) Rode `git log --oneline --graph` e copie a saída:
Resposta:
*   8a1c462 (HEAD -> main) Merge branch 'feature/frete-gratis'
    |\  
    | * 98a6a8a (feature/frete-gratis) feat: frete grátis acima de 200 reais
* | c789e69 fix: corrige o valor do frete para 15 reais
  |/
* fc49615 feat: valores iniciais de frete e desconto

Qual commit tem **duas linhas chegando nele** (dois "pais")? Por quê?
Resposta:  Essa eu nao entendi muito bem, nao foi explicado no conteúdo, mas vou chutar, acredito que seja a 98a6a8a, pois recebe o valores da branch e da main 

h) 🔍 **Opcional:** desfaça um commit. Troque a primeira linha do `precos.js` para `export const frete = 0;` e faça o commit com `git commit -am "feat: frete zerado"`. Ops, foi um erro. Desfaça com `git revert --no-edit HEAD` e rode `git log --oneline`. O commit do "frete zerado" foi apagado do histórico? E o que tem no `precos.js` agora?
Resposta:

Por que o `revert` é o jeito seguro de desfazer um commit que **já foi enviado** para o GitHub (seção 6)?
Resposta: Pois, ele cria um novo commit com o conteudo antes de antes do commit que foi removido, assim nao apaga o trabalho de ninguém e mantém um histórico

---

### 5) A entrega por pull request

> ⚠️ **Volte para a raiz do repositório do curso:** abra uma aba nova no terminal do IntelliJ (ela abre em `estudos-front-end`). Rode `git branch` e confira se o `*` está na `aula-2-6`.

a) Faça o commit das respostas e envie a branch para o GitHub:

```bash
git add 02-web-e-ferramentas/aula-06-git-github/exercicios/exercicios.md
git commit -m "docs: respostas dos exercícios 3 e 4 da aula 2.6"
git push -u origin aula-2-6
```

Na saída do `push`, o GitHub mostra um link começando com `https://github.com/...`. O que esse link oferece?
Resposta:

b) Abra o link (ou a página do repositório, onde aparece o aviso amarelo **"Compare & pull request"**) e crie o pull request:
- **Título:** `docs: exercícios da aula 2.6`
- **Descrição:** duas linhas, dizendo o que o PR contém.

⚠️ **Não faça o merge.** A correção vai acontecer com o PR aberto, como numa revisão de código de verdade.

Cole aqui o endereço do seu PR:
Resposta:

c) Antes de enviar estas últimas respostas: o que você espera que aconteça com o PR quando você der `push` num commit novo da mesma branch (seção 5)?
Resposta:

Agora envie as respostas do exercício 5:

```bash
git add 02-web-e-ferramentas/aula-06-git-github/exercicios/exercicios.md
git commit -m "docs: respostas do exercício 5 da aula 2.6"
git push
```

Repare que, agora, é só `git push`, sem o `-u origin aula-2-6`. Abra a aba **Commits** do seu PR no GitHub e confira se a sua previsão estava certa. Depois, é só me pedir "corrige a 2.6".
