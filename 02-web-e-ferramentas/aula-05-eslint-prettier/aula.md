# Aula 2.5: Linters e formatadores (ESLint e Prettier)

> ⏱️ **Aula enxuta:** cerca de 25 minutos de leitura e 45 de exercícios. São duas ferramentas que você configura uma vez por projeto e depois esquece que existem: elas trabalham sozinhas, toda vez que você salva um arquivo.

**Exercícios:** a pasta [exercicios](./exercicios/) tem um projeto pequeno com código mal formatado **e** com bugs. O [exercicios.md](./exercicios/exercicios.md) traz o passo a passo.

---

## 1. Por que o JavaScript precisa dessas ferramentas

No Java, o **compilador** barra muitos erros antes de o programa rodar: uma variável com o nome digitado errado, um campo declarado duas vezes, um tipo incompatível. O JavaScript **não tem compilador**: esses erros só aparecem quando a linha é executada, às vezes em produção, na tela do usuário.

Duas ferramentas cobrem parte desse buraco:

| | **ESLint** (linter) | **Prettier** (formatador) |
|---|---|---|
| O que faz | Procura **problemas no código**: bugs prováveis e más práticas | Padroniza a **aparência** do código: indentação, aspas, `;`, quebras de linha |
| Muda o significado do código? | Às vezes, ao corrigir (e só nas correções seguras) | **Nunca** |
| Exemplo do que pega | Uma variável que não existe, um `if (x === NaN)` que nunca é verdadeiro | Aspas simples misturadas com duplas, um `}` desalinhado |
| ☕ No Java | As **inspeções** do IntelliJ (o código amarelo), o SonarLint, o SpotBugs | O **Ctrl+Alt+L** do IntelliJ, o google-java-format, o Spotless |

> ☕ A grande diferença para o Java: lá, o **compilador** pega o erro de digitação no nome de uma variável. No JavaScript, quem pega é o **ESLint** (e, a partir do Módulo 5, o TypeScript). Sem ele, você só descobre quando a linha roda.

**Por que usar as duas, e não só uma:** cada uma faz bem uma coisa. O Prettier não entende se o código está certo, e o ESLint, nas versões atuais, nem tenta cuidar da aparência. Juntas, elas cobrem as duas partes.

---

## 2. Prettier: o formatador

**O que é:** uma ferramenta que **reescreve** os seus arquivos com uma formatação padrão. Ela suporta JavaScript, TypeScript, JSX, CSS, HTML, JSON e Markdown.

**Para que serve:** acabar com as discussões sobre estilo no time ("tab ou espaço?", "aspas simples ou duplas?") e com os diffs cheios de mudanças de espaço. Com o Prettier, todo mundo formata igual, sem pensar nisso.

**Como funciona:** o Prettier lê o código, monta a estrutura dele (como o navegador monta o DOM a partir do HTML, aula 2.3), **descarta toda a formatação original** e imprime o código de novo, do jeito dele. Por isso o resultado é sempre o mesmo, não importa como o código estava escrito.

**Instalar e rodar:**

```bash
npm install -D prettier         # dependência de desenvolvimento (aula 2.4)
npx prettier --check .          # só confere: lista os arquivos fora do padrão
npx prettier --write .          # formata e salva os arquivos
```

O `.` quer dizer "a pasta atual e tudo dentro dela". A pasta `node_modules` e o que está no `.gitignore` ficam de fora automaticamente.

**Configurar:** o arquivo **`.prettierrc`**, em JSON, na raiz do projeto. O Prettier tem **poucas opções de propósito**: a ideia é aceitar o padrão. As mais usadas:

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

| Opção | O que controla | Padrão |
|---|---|---|
| `semi` | Coloca `;` no fim das linhas | `true` |
| `singleQuote` | Aspas simples em vez de duplas | `false` (duplas) |
| `printWidth` | O tamanho máximo da linha antes de quebrar | `80` |
| `tabWidth` | Quantos espaços por nível de indentação | `2` |

Um `.prettierrc` com só `{}` usa todos os padrões, e é o que a maioria dos projetos faz. Mesmo vazio, vale criar o arquivo: ele avisa às ferramentas, como o IntelliJ, que o projeto usa o Prettier.

**Ignorar arquivos:** o **`.prettierignore`** lista o que o Prettier não deve tocar, com a mesma sintaxe do `.gitignore`.

**Armadilhas:**
- **O `--write` altera os arquivos na hora, sem perguntar.** Rode-o com o código salvo no Git, para poder ver e desfazer as mudanças.
- **Fim de linha no Windows:** o Prettier usa o fim de linha do Linux e do Mac (`LF`), e o IntelliJ no Windows cria arquivos novos com o do Windows (`CRLF`). Se o `--check` acusar um arquivo que você acabou de criar e que parece certo, é isso: o `--write` resolve.
- **Não brigue com o padrão.** Se uma formatação do Prettier te incomodar, a resposta quase sempre é se acostumar. A ferramenta existe justamente para ninguém precisar decidir.

---

## 3. ESLint: o linter

**O que é:** uma ferramenta que **analisa o código sem executá-lo** e aponta problemas, com base numa lista de **regras**. Cada regra procura um tipo de problema e tem um nome, como `no-undef` (uso de uma variável que não existe) ou `no-unused-vars` (variável criada e nunca usada).

**Para que serve:** pegar bugs antes de o código rodar. Exemplos de regras do conjunto recomendado:

| Regra | O que pega | Por que é bug |
|---|---|---|
| `no-undef` | `totl += 1`, quando a variável se chama `total` | Erro de digitação: só quebraria quando a linha rodasse |
| `no-unused-vars` | `const desconto = 0.1` que ninguém usa | Geralmente é um esquecimento: o desconto nunca foi aplicado |
| `no-dupe-keys` | `{ preco: 59.9, preco: 49.9 }` | O JavaScript aceita em silêncio e fica com o último valor |
| `use-isnan` | `if (preco === NaN)` | Sempre dá `false` (explicação logo abaixo) |

> 💡 **Por que `preco === NaN` nunca funciona:** o `NaN` (aula 1.3) é o único valor do JavaScript que **não é igual a si mesmo**: `NaN === NaN` dá `false`. Para testar se um valor é `NaN`, use o **`Number.isNaN(preco)`**, que devolve `true` ou `false`. (O `Number.isFinite`, da aula 1.6, também resolve, porque devolve `false` para o `NaN`.)

**Instalar:**

```bash
npm install -D eslint @eslint/js globals
```

- **`eslint`:** a ferramenta.
- **`@eslint/js`:** o conjunto de regras **recomendadas** do próprio ESLint.
- **`globals`:** a lista das variáveis globais de cada ambiente, como o `console` e o `process` do Node, ou o `document` e o `window` do navegador. Sem ela, o ESLint acha que o `console` não existe.

**Configurar:** o arquivo **`eslint.config.js`**, na raiz do projeto. Ao contrário do `.prettierrc`, ele é um **módulo JavaScript** (aula 1.7) que exporta a configuração:

```javascript
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  js.configs.recommended,          // 1) liga as regras recomendadas
  {
    languageOptions: {
      globals: globals.node,       // 2) o código roda no Node: console, process... existem
    },
    rules: {
      // 3) aqui você liga, desliga ou muda a gravidade de regras
    },
  },
]);
```

**Como funciona:** a configuração é um **array de objetos**, e o ESLint aplica um por cima do outro, na ordem. Se dois objetos configuram a mesma regra, o **último vence**. O `defineConfig` não muda nada no funcionamento: ele só ajuda o IntelliJ a sugerir as opções enquanto você digita.

**A gravidade de cada regra** é definida na seção `rules`:

```javascript
rules: {
  "no-unused-vars": "warn",         // vira aviso (amarelo): não quebra o comando
  eqeqeq: "error",                  // obriga o uso de === e !== (aula 1.1)
  "no-console": "off",              // desliga a regra
},
```

| Valor | Efeito |
|---|---|
| `"off"` | A regra não roda |
| `"warn"` | Mostra um aviso, mas o comando termina com sucesso |
| `"error"` | Mostra um erro, e o comando **falha**. É isso que barra um código ruim num servidor de build (aula 12.4) |

**Rodar:**

```bash
npx eslint .          # lista os problemas: arquivo, linha:coluna, mensagem e o nome da regra
npx eslint . --fix    # corrige sozinho o que for seguro e lista o resto
```

A saída tem este formato:

```text
src/carrinho.js
  14:9  error  'desconto' is assigned a value but never used  no-unused-vars
```

O nome da regra, no fim da linha, é o que você pesquisa para entender o problema: toda regra tem uma página em [eslint.org/docs/latest/rules](https://eslint.org/docs/latest/rules), com exemplos de código certo e errado.

**Armadilhas:**
- **O `--fix` não conserta tudo.** Ele só aplica as correções que não mudam o que o código faz, como trocar um `let` por `const`. Um erro de digitação ou uma chave duplicada, só você pode decidir como consertar.
- **`'console' is not defined`:** faltou o `globals` na configuração. Para código de navegador, use o `globals.browser`.
- **Não desligue uma regra só para o erro sumir.** Primeiro entenda o que ela está apontando. Quando for mesmo necessário ignorar uma linha, existe o comentário `// eslint-disable-next-line nome-da-regra`, mas use-o com moderação, e sempre com o nome da regra.
- **Configurações antigas:** em tutoriais anteriores a 2024, você vai ver um arquivo `.eslintrc` (ou `.eslintrc.json`). É o formato antigo, que o ESLint 10 nem lê mais. Use sempre o `eslint.config.js`.

> 🔍 O ESLint tem um assistente que faz perguntas e gera a configuração: `npm init @eslint/config@latest`. Ele é útil para projetos novos, mas, nesta aula, montar à mão ensina mais.

---

## 4. Os dois juntos

**Os scripts** (aula 2.4) deixam os comandos com o nome que todo projeto usa:

```json
"scripts": {
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

**ESLint e Prettier brigam?** Com as regras recomendadas, não: o ESLint atual não tem regras de formatação ligadas. Em projetos que usam configurações antigas ou plugins que ainda trazem regras de estilo, as duas ferramentas podem discordar, e a solução é o pacote **`eslint-config-prettier`** (🔍), que desliga no ESLint tudo o que é trabalho do Prettier.

**A ordem no dia a dia:** escreve → salva (o IntelliJ roda o Prettier e o `eslint --fix`) → olha o que o ESLint ainda sublinhou → conserta.

---

## 5. No IntelliJ: tudo automático ao salvar

O IntelliJ Ultimate já tem a integração com as duas ferramentas. Ele usa as versões instaladas no `node_modules` do projeto e lê o `.prettierrc` e o `eslint.config.js`.

**ESLint:** **Ctrl+Alt+S** → **Languages & Frameworks → JavaScript → Code Quality Tools → ESLint**:
- Marque **Automatic ESLint configuration**.
- Marque **Run eslint --fix on save**.

Com isso, os problemas aparecem **sublinhados no próprio editor** enquanto você digita, sem rodar comando nenhum. Passe o mouse em cima para ver a mensagem e o nome da regra, ou aperte **Alt+Enter** para ver as correções sugeridas.

**Prettier:** **Ctrl+Alt+S** → **Languages & Frameworks → JavaScript → Prettier**:
- Marque **Automatic Prettier configuration**.
- Marque **Run on save**.

As duas opções "on save" também aparecem juntas em **Tools → Actions on Save**, uma página que lista tudo o que o IntelliJ faz quando você salva.

> ☕ Se o IntelliJ estiver configurado para salvar sozinho (o padrão), o "on save" roda quando você troca de arquivo ou de janela. Para forçar, aperte **Ctrl+S**.

**Armadilha:** o "automatic" só funciona quando o pacote está instalado no projeto. Se nada acontecer ao salvar, confira se você rodou o `npm install` na pasta certa (a do `package.json`).

---

## 6. E no React e no Next.js?

- **O `create-next-app` já pergunta qual linter você quer:** ESLint (o padrão), **Biome** ou nenhum. O projeto já vem com o `eslint.config.mjs` (o `.mjs` é um `.js` que é sempre tratado como módulo) e o script `npm run lint`. As regras do Next incluem as do React, como as **regras dos hooks** (aula 7.11), que pegam erros que quebrariam a tela.
- **O Prettier não vem instalado:** você adiciona com o `npm install -D prettier` e um `.prettierrc`, exatamente como nesta aula.
- **O template de React do Vite** também vem com o ESLint configurado. Você vai voltar a esse assunto na aula 7.12, com as regras específicas do React, e na 5.12, com o TypeScript.
- 🔍 **Biome:** uma ferramenta única que faz o papel do ESLint **e** do Prettier, escrita em Rust e muito mais rápida. Está crescendo, mas o ESLint + Prettier ainda é o padrão na maioria dos projetos e das vagas.

---

## 7. 📋 Resumo (cola rápida)

| | ESLint | Prettier |
|---|---|---|
| Função | Achar **problemas** no código | Padronizar a **aparência** |
| ☕ No Java | Inspeções do IntelliJ, SonarLint, SpotBugs | Ctrl+Alt+L, google-java-format, Spotless |
| Instalar | `npm i -D eslint @eslint/js globals` | `npm i -D prettier` |
| Configuração | `eslint.config.js` (módulo JS) | `.prettierrc` (JSON) e `.prettierignore` |
| Conferir | `npx eslint .` | `npx prettier --check .` |
| Corrigir | `npx eslint . --fix` (só o que é seguro) | `npx prettier --write .` (tudo) |
| Script | `npm run lint` | `npm run format` |
| No IntelliJ | Automatic ESLint configuration + Run eslint --fix on save | Automatic Prettier configuration + Run on save |

**Regras de ouro:**
1. Configure as duas ferramentas no **início** do projeto, e ligue o "on save" no IntelliJ.
2. O Prettier cuida da aparência; o ESLint cuida dos bugs. Não use um para o trabalho do outro.
3. Leia o **nome da regra** antes de consertar ou desligar: ele diz exatamente qual é o problema.
4. Não desligue uma regra só para o erro sumir.
5. Rode o `--write` e o `--fix` com o código salvo no Git, para poder conferir o que mudou.

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga o passo a passo.
