# Exercícios da Aula 2.7: Bundlers e o Vite

⏱️ Cerca de 60 minutos. Responda **neste arquivo**, nos espaços marcados com `Resposta:` (cada parte de uma pergunta tem o seu). Confira no final se nenhum ficou vazio (**Ctrl+F**).

**Onde rodar os comandos:** no terminal do IntelliJ, dentro desta pasta (`exercicios`). Atalho: botão direito na pasta `exercicios` → **Open In → Terminal**. A partir do exercício 1b, os comandos rodam dentro da pasta do projeto, a `lojinha-vite`.

> ⚠️ Os exercícios dependem uns dos outros: faça-os **na ordem**.

---

### 1) Criando o projeto

a) Crie o projeto (se o npm perguntar `Ok to proceed? (y)`, responda `y`):

```bash
npm create vite@latest lojinha-vite -- --template vanilla --no-interactive
```

Abra a pasta `lojinha-vite` no IntelliJ. Onde fica o `index.html`: na raiz do projeto, dentro de `src` ou dentro de `public`?
Resposta:

Que tag o `index.html` usa para carregar o JavaScript, e com qual atributo `type`? O que esse atributo faz com o momento em que o script roda (aula 2.3)?
Resposta:

Quais são os três scripts do `package.json`? Em qual seção está o `vite`, e por quê (seção 4)?
Resposta:

b) **Troque o exemplo do modelo pela Lojinha.** Entre na pasta do projeto e rode, um comando por vez:

```bash
cd lojinha-vite
Remove-Item src\counter.js
Remove-Item -Recurse src\assets
Copy-Item ..\arquivos-base\index.html . -Force
Copy-Item ..\arquivos-base\src\* src -Force
npm install
```

Os dois primeiros comandos apagam o contador e as imagens do exemplo; os dois `Copy-Item` copiam os arquivos da Lojinha da pasta `arquivos-base` (o `-Force` substitui os que já existem). Confira se a pasta `src` ficou com 4 arquivos: `main.js`, `produtos.js`, `style.css` e `util.js`.

---

### 2) O servidor de desenvolvimento

a) Rode `npm run dev`. Qual endereço o Vite mostrou? Abra esse endereço no Chrome: o que aparece na página?
Resposta:

b) Abra o DevTools (**F12**) na aba **Network** e recarregue a página. Os seus arquivos `main.js`, `produtos.js` e `util.js` aparecem como requisições **separadas**? Por que o Vite não juntou tudo num arquivo só (seção 3.1)?
Resposta:

c) Com a página aberta ao lado do IntelliJ:
- No `src/style.css`, troque a cor do `h1` de `#1f6f5c` para `crimson` e salve.
- No `src/main.js`, troque o texto `produtos no carrinho` por `itens no carrinho` e salve.

A página mudou sem você apertar F5? Qual das duas mudanças foi aplicada **sem recarregar** a página, e qual fez o Vite **recarregar** a página sozinho (seção 3.1)?
Resposta:

---

### 3) Um pacote do npm no navegador

a) Pare o servidor (**Ctrl+C**), instale o `date-fns` (uma biblioteca de datas) e suba o servidor de novo:

```bash
npm install date-fns
npm run dev
```

No `src/main.js`, acrescente estes dois `import` logo abaixo do `import "./style.css";`:

```javascript
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
```

E, no fim do arquivo, esta linha, que mostra a data de hoje por extenso:

```javascript
document.querySelector("#data").textContent =
  "Hoje é " + format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });
```

O que apareceu na página?
Resposta:

b) Na aba **Network**, recarregue a página e procure a requisição do `date-fns`. De qual caminho ela veio?
Resposta:

Por que o navegador, sozinho, não conseguiria fazer o `import ... from "date-fns"` (seção 1.2)? E quem resolveu isso aqui?
Resposta:

---

### 4) O build de produção

a) Pare o servidor (**Ctrl+C**) e rode `npm run build`. Copie aqui as linhas que começam com `dist/` e a linha dos `modules transformed`:
Resposta:

Quantos módulos o Vite leu, e qual é o tamanho do arquivo `.js` final? Por que tantos módulos viraram um arquivo tão pequeno (seção 5)?
Resposta:

b) Abra o arquivo `.js` da pasta `dist/assets`. Como ele está escrito, comparado com o seu `main.js`?
Resposta:

Use o **Ctrl+F** nesse arquivo e procure o texto `Café Torrado`. Ele está lá?
Resposta:

Agora procure `Frete grátis`, que está na função `mensagemFrete` do `util.js`. Ele está lá? Por quê (seção 2)?
Resposta:

c) Rode `npm run preview` e abra o endereço que ele mostrar. Na aba **Network** (recarregue a página), quantos arquivos `.js` a página baixou agora, comparando com o exercício 2b?
Resposta:

d) Pare o preview (**Ctrl+C**). No `main.js`, troque `itens no carrinho` por `itens na sacola`, salve e rode `npm run build` de novo. Compare os nomes dos arquivos com os do item a: qual nome mudou, e qual continuou igual?
Resposta:

Por que isso é bom para o cache do navegador dos seus usuários (seção 2, passo 6)?
Resposta:

---

### 5) Variáveis de ambiente

a) Na raiz do projeto (a pasta `lojinha-vite`, ao lado do `package.json`), crie dois arquivos:

```text
# arquivo .env
VITE_NOME_LOJA=Lojinha do Dev (desenvolvimento)
SEGREDO=senha-super-secreta
```

```text
# arquivo .env.production
VITE_NOME_LOJA=Lojinha do Dev
```

No `src/main.js`, acrescente no fim do arquivo:

```javascript
document.querySelector("#titulo").textContent = import.meta.env.VITE_NOME_LOJA;
document.querySelector("#ambiente").textContent =
  `Modo: ${import.meta.env.MODE} | Segredo: ${import.meta.env.SEGREDO}`;
```

> 💡 O `.gitignore` da raiz do repositório do curso ignora todos os arquivos `.env`, por segurança: eles não vão para o GitHub.

Rode `npm run dev`. O que aparece no título e na última linha da página?
Resposta:

Por que o `SEGREDO` apareceu como `undefined` (seção 6)?
Resposta:

b) Pare o servidor e rode `npm run build` e `npm run preview`. O que aparece agora no título e na última linha? Por que o título mudou?
Resposta:

c) Abra o `.js` da `dist/assets` e procure (**Ctrl+F**) o texto `Lojinha do Dev`. Ele está lá? E o `senha-super-secreta`?
Resposta:

Com base nisso: se a Lojinha precisasse de uma chave de API de pagamento, você poderia colocá-la numa variável `VITE_`? Onde ela deveria ficar (seção 6)?
Resposta:

---

### 6) 🔍 Desafio opcional: o `vite.config.js` e o SketchUp

Crie o arquivo `vite.config.js` na raiz do projeto `lojinha-vite`:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    open: true,
  },
});
```

a) Rode `npm run dev`. O que aconteceu de diferente?
Resposta:

b) Pare o servidor e rode `npm run build`. Abra o `dist/index.html`: como ficou o `src` da tag `<script>` (compare com um build anterior, que usava `/assets/...`)?
Resposta:

Por que esse ajuste é necessário para a interface do seu renderizador, que o `HtmlDialog` do SketchUp abre direto do disco (seção 9)?
Resposta:
