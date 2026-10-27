# Exercícios da Aula 2.5: ESLint e Prettier

⏱️ Cerca de 45 minutos. Responda **neste arquivo**, nos espaços marcados com `Resposta:`. Desta vez, **cada parte de uma pergunta tem o seu próprio `Resposta:`**: confira se nenhum ficou vazio (no IntelliJ: **Ctrl+F**).

**Onde rodar os comandos:** no terminal do IntelliJ, dentro desta pasta (`exercicios`), que já tem um `package.json`. Atalho: botão direito na pasta `exercicios` → **Open In → Terminal**.

**O projeto:** o `src/carrinho.js` tem funções de um carrinho de compras, e o `src/index.js` usa essas funções. O `carrinho.js` está **mal formatado** e tem **4 bugs**. **Não conserte nada à mão** antes do exercício 2c: a ideia é ver o que cada ferramenta encontra.

---

### 1) Prettier: a aparência

a) Instale o Prettier (`npm install -D prettier`) e crie, nesta pasta, um arquivo `.prettierrc` com o conteúdo `{}`. Depois, rode `npx prettier --check .`. Quais arquivos ele acusou?
Resposta: src/carrinho.js, src/index.js 

> 💡 Se o `.prettierrc` que você acabou de criar aparecer na lista, releia a armadilha do **fim de linha no Windows**, na seção 2 da aula.

b) O `exercicios.md` tem formatação "fora do padrão" (as tabelas, por exemplo), mas não apareceu na lista. Por quê? (Dica: tem um arquivo nesta pasta que começa com ponto.)
Resposta: Pois, o arquivo está listado dentro do .prettierignore, fazendo com que o prettier não leia aquele arquivo

c) Rode `npx prettier --write .` e abra o `src/carrinho.js`. Cite **três** mudanças que o Prettier fez.
Resposta: Ajustou a indentação, colocou ponto e virgula no final das linhas, quebrou algumas linhas que estavam muito grandes, colocou aspas duplas, 

d) Abra o `src/index.js`. O que aconteceu com a linha do `import`?
Resposta: Colocou cada importação uma em baixo da outra

E por que o Prettier fez isso? (Seção 2: qual opção controla o tamanho da linha, e qual é o padrão dela?)
Resposta: Para quebrar uma linha grande demais, printWidth e o padrão é 80

e) O código ficou bonito, mas será que está certo? Rode `npm start` e copie as **três primeiras linhas** da saída.
Resposta:
Camiseta: { nome: 'Camiseta JavaScript', preco: 49.9, quantidade: 1 }
Um preço NaN é: válido
file:///.../src/carrinho.js:16
totl += item.preco * item.quantidade

Das três funções chamadas pelo `index.js`, quais **pareceram funcionar**, e qual **quebrou**?
Resposta: buscarProduto e validarPreco, calcularTotal quebrou o programa 

---

### 2) ESLint: os bugs

a) Instale o ESLint (`npm install -D eslint @eslint/js globals`) e crie, nesta pasta, o arquivo `eslint.config.js` com o código da **seção 3** da aula (pode deixar a seção `rules` vazia). Rode `npx eslint .` e preencha a tabela:

| Linha        | Nome da regra            | O problema, com as suas palavras                                                                      |
|--------------|--------------------------|-------------------------------------------------------------------------------------------------------|
| Resposta: 7  | Resposta: no-dupe-keys   | Resposta: Valor duplicado de chave                                                                    |
| Resposta: 16 | Resposta: no-unused-vars | Resposta: Variavel criada, mas nunca usada                                                            |
| Resposta: 18 | Resposta: no-undef       | Resposta: Variavel digitada errada, acusou que ela nunca foi criada                                   |
| Resposta: 24 | Resposta: use-isnan      | Resposta: Usando === para comprar um numero com nam, que sempre retorna false, o certo é usar o isNan |

b) O `npm start` do exercício 1e mostrou só **um** desses quatro problemas como erro. Quais dos outros três deram um **resultado errado em silêncio**? Olhe a saída do 1e: o preço da Camiseta e a validação do `NaN` estão certos?
Resposta: no-dupe-keys e use-isnan

E qual deles não muda nada na saída, mas mostra que alguém esqueceu de fazer alguma coisa?
Resposta: no-unused-vars

c) Agora **conserte os 4 problemas** no `src/carrinho.js`:
- A Camiseta está em promoção: o preço certo é **49.9**.
- O desconto ainda não vai ser aplicado: **remova** a variável.
- Para o `NaN`, use o que a seção 3 da aula ensina.

Rode `npx eslint .` (não deve aparecer nada) e `npm start`. Copie a saída do `npm start`:
Resposta: Camiseta: { nome: 'Camiseta JavaScript', quantidade: 1, preco: 49.9 }
Um preço NaN é: inválido
Total: 141.6

---

### 3) Scripts e regras novas

a) Acrescente os scripts `lint` e `format` da **seção 4** ao `package.json` (sem apagar o `start`, e cuidado com as vírgulas). Rode `npm run lint` e `npm run format`. Os dois rodaram sem erro?
Resposta: Sim, rodaram sem erros 

b) No `eslint.config.js`, dentro de `rules`, ligue duas regras que **não** fazem parte das recomendadas:

```javascript
rules: {
  eqeqeq: "error",
  "prefer-const": "error",
},
```

Rode `npm run lint`. Quais são os dois problemas novos, e em qual função eles estão?
Resposta: eqeqeq e prefer-const, estão na buscarProduto

c) Rode `npx eslint . --fix`. Qual dos dois problemas foi corrigido sozinho?
Resposta: o prefer-const

E por que o `--fix` não troca o `==` por `===` automaticamente? (Dica: pense no que `"1" == 1` dá, e no que `"1" === 1` dá. A troca pode mudar o resultado do programa?)
Resposta: Pois pode alterar o resultado do programa, por exemplo na dica um retorna true e o outro false, se ele alterasse automático e tivesse alguma validação que fosse realmente necessário o uso do "==", iria causar um problema de código depois. 

Depois, conserte o que sobrou à mão e rode `npm run lint` de novo.

---

### 4) No IntelliJ: tudo ao salvar

a) Ligue as quatro opções da **seção 5** da aula (Automatic ESLint configuration, Run eslint --fix on save, Automatic Prettier configuration e Run on save). Depois, no `src/carrinho.js`, bagunce a formatação de propósito: troque umas aspas duplas por simples, apague uns `;` e desalinhe uma linha. Aperte **Ctrl+S**. O que aconteceu?
Resposta: Ele formatou tudo de novo

b) Dentro da função `listarProdutos`, antes do `return`, escreva a linha `const teste = 1;`. **Sem rodar nenhum comando**, o que o IntelliJ mostrou nessa linha?
Resposta: Aparece um erro do ESlint. 

Passe o mouse em cima: qual é a mensagem, e qual é o nome da regra?
Resposta: ESlint: teste is assigned a value but never used (no-unused-vars)

Depois, apague a linha.

---

### 5) 🔍 Desafio opcional: mudando o estilo

Troque o conteúdo do `.prettierrc` por `{ "singleQuote": true, "semi": false }` e rode `npm run format`. O que mudou no `carrinho.js`?
Resposta: As aspas duplas viraram simples e tirou os ponto e virgula no final das linhas. 

No final, **volte o `.prettierrc` para `{}`** e rode `npm run format` de novo.
