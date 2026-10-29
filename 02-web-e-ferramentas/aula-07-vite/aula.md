# Aula 2.7: Bundlers e o Vite

> **Por que esta aula importa?** Todo projeto React que você criar vai começar com o Vite, inclusive a interface do seu renderizador para o SketchUp. E o Next.js faz o mesmo trabalho com outra ferramenta, o Turbopack. Entender o que acontece entre o código que você escreve e o que chega ao navegador explica coisas que, sem esta aula, parecem mágica: por que o `npm run dev` atualiza a tela sozinho, o que é a pasta `dist`, por que os arquivos têm nomes como `index-D9Pqc0o_.js`, e por que **uma chave de API nunca pode ficar numa variável `VITE_`**.
>
> ⏱️ **Aula completa, mas curta:** cerca de 35 minutos de leitura e 60 de exercícios.

**Exercícios:** o [exercicios.md](./exercicios/exercicios.md) traz o passo a passo. Você vai criar um projeto com o Vite e acompanhar, pelo DevTools, a diferença entre o modo de desenvolvimento e o de produção.

---

## 1. O problema: o navegador sozinho não dá conta

Na aula 1.7, você dividiu o código em módulos com `import` e `export`. No Node, isso funciona direto. No navegador, aparecem quatro problemas.

### 1.1 Cada `import` é uma requisição

O navegador baixa cada módulo com uma requisição HTTP separada (aula 2.2), e só descobre o próximo `import` depois de baixar e ler o arquivo atual. Num projeto real, com centenas de módulos, isso vira uma fila longa de requisições, uma esperando a outra. Você viu essas requisições na aba Network da aula 2.3.

### 1.2 O navegador não conhece a `node_modules`

```javascript
import { format } from "date-fns";
```

No Node, um nome sem `./` é procurado na `node_modules` (aula 2.4). O navegador **não tem** essa regra: ele não sabe onde fica a `node_modules`, e dá este erro:

```text
Uncaught TypeError: Failed to resolve module specifier "date-fns".
Relative references must start with either "/", "./", or "../".
```

### 1.3 Código que o navegador não entende

O navegador só executa JavaScript. O **TypeScript** (Módulo 5) e o **JSX**, o "HTML dentro do JavaScript" do React (Módulo 7), precisam ser **transformados** em JavaScript antes.

### 1.4 Produção pede outras coisas

- **Tamanho:** os comentários, os espaços e os nomes longos de variáveis ajudam quem lê o código, mas são bytes inúteis para o navegador.
- **Cache:** o navegador guarda os arquivos para não baixá-los de novo (aula 2.3). Ótimo, até você publicar uma versão nova: como o navegador sabe que o `app.js` de hoje não é o de ontem?

---

## 2. O que um bundler faz

**O que é:** um **bundler** (empacotador) é a ferramenta que resolve esses problemas. Ele lê o seu projeto e gera **poucos arquivos otimizados**, prontos para o navegador.

**Como funciona, passo a passo:**

1. **Ponto de entrada:** começa por um arquivo (no Vite, o `index.html`) e segue cada `import`, montando o **grafo de dependências**, o mapa de quem importa quem. Os pacotes da `node_modules` entram nesse mapa também.
2. **Transformação:** converte o TypeScript, o JSX e as sintaxes muito novas em JavaScript que os navegadores entendem.
3. **Empacotamento:** junta os módulos em poucos arquivos (os *bundles*).
4. **Tree-shaking:** **remove o código que ninguém importa**. Se um pacote exporta 300 funções e você usa 2, só as 2 vão para o arquivo final.
5. **Minificação:** tira os espaços, os comentários e encurta os nomes das variáveis.
6. **Hash no nome:** coloca no nome do arquivo um código calculado a partir do conteúdo (`index-D9Pqc0o_.js`). Se o conteúdo mudar, o nome muda, e o navegador baixa a versão nova. Se não mudar, ele usa a do cache.

> 💡 **Por que o tree-shaking funciona:** os `import` e `export` dos módulos ES (aula 1.7) são **estáticos**: ficam no topo do arquivo e não dependem de nenhuma condição. Por isso o bundler consegue saber, **sem executar o código**, o que é usado. Com o `require` do CommonJS, que pode estar dentro de um `if`, isso é bem mais difícil.

> ☕ **No Java:** o `mvn package` compila o código e empacota tudo num `.jar`. Um *fat jar* (o do Spring Boot, ou o do plugin Shade) junta as suas classes com as das dependências num arquivo só. Um bundler faz o mesmo para o navegador, com uma diferença: como o código vai **pela rede** para cada usuário, cada byte economizado conta, e por isso existem o tree-shaking e a minificação.

---

## 3. O Vite

**O que é:** uma ferramenta que junta um **servidor de desenvolvimento** e um **bundler**. É o padrão atual para criar projetos React fora do Next.js. O nome é "rápido" em francês.

O Vite trabalha de **dois jeitos diferentes**, e essa é a ideia principal da aula:

### 3.1 No desenvolvimento (`npm run dev`): sem empacotar o seu código

- O Vite **não junta** os seus arquivos. Ele serve cada módulo separado, e o navegador os carrega com o `<script type="module">` (aula 2.3). Cada arquivo só é transformado quando o navegador pede. Por isso o servidor sobe em milissegundos, mesmo em projetos grandes.
- Os pacotes da `node_modules` são a exceção: o Vite os **pré-empacota** uma vez e guarda o resultado em `node_modules/.vite/deps`. É isso que resolve o problema da seção 1.2. Na aba Network, você vê o `date-fns` vindo desse caminho.
- **HMR** (*Hot Module Replacement*): quando você salva um arquivo, o Vite troca **só aquele módulo** na página aberta, sem recarregar. A tela atualiza quase na hora, e, no React, sem perder o que estava digitado num formulário. Num projeto de JavaScript puro, como o dos exercícios, o CSS é trocado assim, sem recarregar; quando um `.js` muda, o Vite **recarrega a página sozinho**. Nos dois casos, você não precisa apertar F5.

> ☕ É o que o **Spring Boot DevTools** tenta fazer, reiniciando a aplicação a cada mudança, só que mais rápido: o Vite não reinicia nada, ele troca só a peça alterada. Lembra também o **HotSwap** do debugger do IntelliJ.

**Importar CSS no JavaScript:** num projeto Vite, você pode escrever `import "./style.css"` dentro do JavaScript. O Vite entende e coloca os estilos na página: no desenvolvimento, com uma tag `<style>`; no build, num arquivo `.css` separado.

### 3.2 No build (`npm run build`): empacotado e otimizado

Para produção, o Vite faz tudo o que a seção 2 descreve e grava o resultado na pasta **`dist`**. Desde a versão 8, o empacotamento é feito pelo **Rolldown**, um bundler escrito em Rust, que usa o **Oxc** para ler, transformar e minificar o código.

> ☕ **O mapa do Spring para o Vite:**
>
> | Vite | Spring Boot |
> |---|---|
> | `npm run dev` | `mvn spring-boot:run` com o DevTools |
> | `npm run build` | `mvn package` |
> | A pasta `dist/` | O `.jar` na pasta `target/` |
> | `npm run preview` | `java -jar target/app.jar` |

---

## 4. Criando um projeto

```bash
npm create vite@latest
```

O assistente pergunta o nome do projeto, o **framework** (Vanilla, que é JavaScript puro, React, Vue...) e a **variante** (JavaScript ou TypeScript). Também dá para responder tudo na linha de comando:

```bash
npm create vite@latest lojinha-vite -- --template vanilla --no-interactive
```

O `--` separa as opções do npm das opções que vão para o gerador do Vite (`--template vanilla` escolhe o modelo; `--no-interactive` não faz perguntas). Depois: `cd lojinha-vite`, `npm install` e `npm run dev`.

**A estrutura criada:**

| Arquivo ou pasta | Para quê |
|---|---|
| `index.html` | **O ponto de entrada**, na raiz do projeto, e não dentro de `src` nem de `public`. Ele carrega o JavaScript com `<script type="module" src="/src/main.js">` |
| `src/` | O seu código: JavaScript, CSS e imagens que o código importa |
| `public/` | Arquivos copiados **sem nenhuma mudança** para o build, e acessados pela raiz: o `public/favicon.svg` vira `/favicon.svg` |
| `package.json` | Os scripts `dev`, `build` e `preview`, e o `vite` nas `devDependencies` (ele é uma ferramenta: no navegador, só chega o resultado do build) |
| `.gitignore` | Já ignora a `node_modules`, a `dist` e os arquivos `*.local` |

**Armadilha:** o modelo vem com uma página de exemplo (um contador, logos, links). O primeiro passo de todo projeto é **apagar o exemplo** e começar o seu código.

---

## 5. O build e o deploy

```text
> npm run build
✓ 833 modules transformed.
dist/index.html                  0.72 kB │ gzip: 0.42 kB
dist/assets/index-n90LglXa.css   0.28 kB │ gzip: 0.21 kB
dist/assets/index-D9Pqc0o_.js   26.37 kB │ gzip: 7.41 kB
```

- **`833 modules transformed`:** quantos módulos o Vite leu, contando os da `node_modules`. Graças ao tree-shaking, centenas de módulos viram um arquivo de 26 kB.
- **O tamanho com `gzip`:** os servidores comprimem os arquivos antes de enviar, e esse é o tamanho que viaja de verdade pela rede.
- **A pasta `dist`** tem só arquivos estáticos: um HTML, um CSS e um JS. Qualquer hospedagem de arquivos estáticos (aula 2.2) serve: Vercel, Netlify, GitHub Pages, ou até o próprio Spring, na pasta `static`. Você vai fazer o deploy de uma SPA na aula 8.11.
- **`npm run preview`** sobe um servidor local (porta 4173) com a pasta `dist`, para você conferir o build antes de publicar. Ele não é um servidor de produção: é só para teste.

**Armadilhas:**
- **Não abra o `dist/index.html` com dois cliques.** Ele usa caminhos como `/assets/...`, que só funcionam num servidor, e o navegador bloqueia módulos abertos direto do disco. Use o `npm run preview`.
- **A `dist` é gerada:** nunca edite nada dentro dela, e ela não vai para o Git. Mudou o código? Rode o build de novo.

---

## 6. Variáveis de ambiente

**O que é:** valores que mudam conforme o **ambiente** (desenvolvimento ou produção), como a URL da API: `http://localhost:8080` no seu computador, `https://api.minhaloja.com.br` em produção.

**Como funciona no Vite:**

1. Você cria arquivos `.env` na raiz do projeto, no formato `NOME=valor`:
   ```text
   # .env (vale sempre)
   VITE_API_URL=http://localhost:8080

   # .env.production (vale só no build, e tem prioridade sobre o .env)
   VITE_API_URL=https://api.minhaloja.com.br
   ```
2. No código, você lê o valor com o **`import.meta.env`**:
   ```javascript
   const url = import.meta.env.VITE_API_URL;
   ```
   O `import.meta` é um objeto que todo módulo ES tem, com informações sobre ele mesmo. O Vite acrescenta a propriedade `env`, e **escreve os valores direto no código** durante o build.
3. **Só as variáveis que começam com `VITE_` chegam ao código.** Uma `SENHA_DO_BANCO` no `.env` fica de fora (o resultado é `undefined`).

**Os arquivos e o modo:** o `npm run dev` roda no modo `development`, e o `npm run build`, no modo `production`. O Vite carrega o `.env` sempre, e o `.env.[modo]` (`.env.development` ou `.env.production`) só no modo correspondente, com prioridade. As versões `.local` (`.env.local`, `.env.production.local`) são para valores **da sua máquina** e já estão no `.gitignore`.

O Vite também oferece algumas variáveis prontas: `import.meta.env.MODE` (`"development"` ou `"production"`), e `DEV` e `PROD` (`true` ou `false`).

> ☕ É a ideia dos **profiles** do Spring: o `.env` faz o papel do `application.properties`, o `.env.production` o do `application-prod.properties`, e o `import.meta.env.VITE_API_URL` o do `@Value("${api.url}")`. **A diferença que importa:** no Spring, os valores ficam no servidor. No Vite, eles são **copiados para o JavaScript que vai para o navegador**.

**Armadilhas:**
- 🔒 **Nunca coloque um segredo numa variável `VITE_`.** Tudo o que começa com `VITE_` vai parar no arquivo `.js` do build, e qualquer pessoa vê no DevTools (aba Sources). Uma chave de API de verdade (de pagamento, de IA) fica **no back-end**: no seu Spring, ou no servidor do Next.js (Módulo 9). O prefixo `VITE_` existe justamente para você decidir, de propósito, o que pode ser público.
- **Reinicie o servidor de desenvolvimento** depois de mudar um `.env` (**Ctrl+C** e `npm run dev`).
- **Os valores são sempre texto.** `VITE_MOSTRAR_PRECOS=false` vira a string `"false"`, que é **truthy** (aula 1.3): `if (import.meta.env.VITE_MOSTRAR_PRECOS)` dá verdadeiro. Compare com a string: `=== "true"`.

---

## 7. O `vite.config.js`

O Vite funciona sem configuração nenhuma. Quando precisa ajustar algo, você cria um `vite.config.js` na raiz do projeto:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],           // ex.: o plugin do React (aula 7.2) e o do Tailwind (aula 3.10)
  base: "/",             // o caminho onde o site vai ficar (seção 9: o SketchUp precisa de "./")
  server: {
    port: 5173,          // a porta do npm run dev (o padrão é 5173)
    open: true,          // abre o navegador sozinho
  },
});
```

Como no `eslint.config.js` da aula 2.5, o `defineConfig` só ajuda o IntelliJ a sugerir as opções. Você vai usar também o `server.proxy`, para o front conversar com o Spring sem problemas de CORS, na aula 8.11.

---

## 8. 🔍 Para conhecer: os outros bundlers

Você vai ler esses nomes em tutoriais e em vagas:

| Ferramenta | O que é |
|---|---|
| **Webpack** | O padrão por muitos anos. Ainda aparece em projetos antigos (o Create React App e as versões antigas do Next.js) |
| **Rollup** | O bundler do build do Vite até a versão 7 |
| **esbuild** | Um bundler muito rápido, escrito em Go, usado no desenvolvimento do Vite até a versão 7 |
| **Rolldown** | O bundler do Vite 8, escrito em Rust, que substituiu o Rollup e o esbuild |
| **Oxc** | Um conjunto de ferramentas em Rust: leitura, transformação e minificação de código, além do **Oxlint**, um linter. O modelo de React do Vite já vem com o Oxlint no lugar do ESLint (você vai ver isso na aula 7.12) |
| **Turbopack** | O bundler do **Next.js**, também em Rust. É o padrão desde o Next.js 16 |

A tendência é clara: as ferramentas de build do JavaScript estão sendo reescritas em linguagens mais rápidas, como o Rust. Para você, o que muda é só a velocidade: os conceitos desta aula valem para todas.

---

## 9. E no React e no Next.js?

- **Um projeto React começa assim:** `npm create vite@latest meu-app -- --template react-ts` (aula 7.2). O plugin do React no `vite.config.js` é quem transforma o JSX.
- **O Next.js não usa o Vite:** ele tem o próprio bundler, o Turbopack, e os scripts `next dev` e `next build` fazem o papel do `vite` e do `vite build`. A ideia das variáveis é a mesma, mas com o prefixo **`NEXT_PUBLIC_`**: só as variáveis com esse prefixo chegam ao navegador. As outras ficam no servidor do Next, onde uma chave secreta pode ficar com segurança (aula 9.11).
- **No seu renderizador para o SketchUp:** a interface feita com React + Vite é um build como o desta aula. A pasta `dist` vai junto com o plugin, e o `HtmlDialog` a abre **direto do disco**, sem servidor. Por isso o build precisa usar caminhos relativos (`base: "./"`), entre outros ajustes que você vai ver na aula 12.5.

---

## 10. 📋 Resumo (cola rápida)

| Conceito | O que é | ☕ No Java |
|---|---|---|
| Bundler | Lê o grafo de imports e gera poucos arquivos otimizados | `mvn package` e o *fat jar* |
| Tree-shaking | Remove o código que ninguém importa | O ProGuard, no Android |
| Minificação | Tira espaços e comentários e encurta os nomes | — |
| Hash no nome | O nome muda quando o conteúdo muda: cache sem risco | — |
| `npm run dev` | Servidor com módulos separados e HMR | `spring-boot:run` + DevTools |
| `npm run build` | Gera a pasta `dist` | `mvn package` |
| `npm run preview` | Serve a `dist` para teste | `java -jar` |
| `index.html` | O ponto de entrada do Vite | A classe com o `main` |
| `public/` | Copiado como está para o build | `src/main/resources/static` |
| `.env` + `VITE_` | Valores por ambiente, **visíveis no navegador** | Profiles do Spring (que ficam no servidor) |

**Regras de ouro:**
1. Desenvolva com `npm run dev`, e confira o build com `npm run build` + `npm run preview` antes de publicar.
2. A `dist` é gerada: não edite e não suba para o Git.
3. **Nada secreto em variáveis `VITE_`** (nem em `NEXT_PUBLIC_`): segredo fica no back-end.
4. Mudou um `.env`? Reinicie o servidor.
5. Os valores do `.env` são texto: `"false"` é truthy.

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga o passo a passo.
