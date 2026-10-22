# Aula 2.4: npm a fundo

> ⏱️ **Aula enxuta:** cerca de 30 minutos de leitura e 45 de exercícios. O npm é uma ferramenta que se aprende usando, e você já conhece a ideia dele: ele é o **Maven do JavaScript**. Por isso, esta aula vai direto ao que você vai usar todo dia.

**Exercícios:** o [exercicios.md](./exercicios/exercicios.md) traz o passo a passo: você vai criar um projeto do zero, instalar pacotes, criar scripts e ver o versionamento funcionando.

---

## 1. O que é o npm

O **npm** (*Node Package Manager*) é o gerenciador de pacotes do JavaScript. São três coisas com o mesmo nome:

1. **O comando `npm`**, que já veio instalado junto com o Node.
2. **O registro** ([npmjs.com](https://www.npmjs.com)), o "repositório central" onde ficam os pacotes publicados.
3. **O formato de pacote:** um **pacote** é uma pasta de código com um arquivo `package.json` que a descreve.

**Para que serve:** baixar as bibliotecas que o seu projeto usa (as **dependências**), com as versões certas, e rodar as tarefas do projeto (iniciar, testar, gerar a versão de produção).

> ☕ **O mapa do Maven para o npm:**
>
> | Maven | npm |
> |---|---|
> | `pom.xml` | `package.json` |
> | Maven Central | O registro do npm (npmjs.com) |
> | `~/.m2/repository`: uma pasta só, para todos os projetos | `node_modules/`: uma pasta **dentro de cada projeto** |
> | `<dependency>` | `"dependencies"` |
> | `<scope>test</scope>` | `"devDependencies"` |
> | O Maven baixa as dependências sozinho no build | `npm install` |
> | `mvn test`, `mvn package`, `mvn spring-boot:run` | `npm test`, `npm run build`, `npm run dev` (os **scripts**) |
> | `mvn dependency:tree` | `npm ls --all` |
> | Spring Initializr / `mvn archetype:generate` | `npx` / `npm create` |

---

## 2. O `package.json`

**O que é:** o arquivo de configuração do projeto, em JSON (aula 1.6). Ele diz o nome e a versão do projeto, de quais pacotes ele depende e quais tarefas (scripts) ele tem.

**Como criar:** na pasta do projeto, rode `npm init -y`. O `-y` aceita todas as respostas padrão (sem ele, o npm faz perguntas uma a uma). Este é o arquivo que o npm 11 cria:

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

| Campo | Para quê | ☕ No `pom.xml` |
|---|---|---|
| `name` | O nome do projeto (minúsculas, sem espaços) | `<artifactId>` |
| `version` | A versão do projeto (seção 5) | `<version>` |
| `description`, `keywords`, `author`, `license` | Informações para quem for publicar o pacote no registro. Numa aplicação, não fazem diferença | `<description>`, `<licenses>` |
| `main` | O arquivo de entrada quando **outro** projeto importa este pacote. Numa aplicação, não faz diferença | — |
| `scripts` | As tarefas do projeto (seção 7) | Os plugins e as fases (`mvn test`) |
| `type` | O sistema de módulos: `"module"` (o `import`/`export`) ou `"commonjs"` (o `require` antigo) | — |

Quando você instala pacotes, o npm acrescenta as seções `dependencies` e `devDependencies` (seções 3 e 4).

**Armadilhas:**
- **O `npm init` cria o projeto com `"type": "commonjs"`.** Com esse valor, um arquivo que usa `import` dá o erro `Cannot use import statement outside a module`. A detecção automática que você viu na aula 1.7 só acontece quando o campo `type` **não existe**. Para usar `import`/`export`, troque para `"module"`. Projetos criados com o Vite e o Next.js já vêm configurados.
- **É JSON, e não JavaScript:** aspas duplas, nenhuma vírgula depois do último item e nada de comentários. Um erro de sintaxe no `package.json` faz **todos** os comandos do npm falharem.
- No dia a dia, você quase nunca vai rodar o `npm init`: o Vite e o Next.js criam o `package.json` para você (seção 8).

---

## 3. Instalando pacotes

```bash
npm install chalk      # ou a forma curta: npm i chalk
```

O **chalk** é um pacote que deixa o texto colorido no terminal. É o exemplo dos exercícios.

**Como funciona, passo a passo:**

1. O npm pergunta ao registro qual é a versão mais nova do `chalk`.
2. Ele baixa o pacote **e as dependências do pacote** (as dependências **transitivas**), e as dependências delas, até o fim da árvore.
3. Ele coloca tudo na pasta `node_modules/` do projeto.
4. Ele anota a dependência no `package.json`: `"chalk": "^6.0.1"` (o `^` está na seção 5).
5. Ele anota as versões **exatas** de tudo o que instalou no `package-lock.json` (seção 6).

Depois disso, é só importar pelo nome, sem `./`, como você viu na aula 1.7 (seção 9). O Node procura o pacote no `node_modules`:

```javascript
import chalk from "chalk";

console.log(chalk.green("Olá, npm!"));   // escreve o texto em verde no terminal
```

> ☕ As dependências transitivas funcionam como no Maven: você declara uma, e vêm as dependências dela junto. A diferença: quando dois pacotes precisam de versões **diferentes** de uma mesma biblioteca, o Maven escolhe **uma** (a mais próxima na árvore), e o npm pode instalar **as duas**, cada uma dentro da pasta do pacote que precisa dela.

**Os comandos que você vai usar:**

| Comando | O que faz |
|---|---|
| `npm install` (sem nome) | Instala tudo o que está no `package.json`. É o primeiro comando depois de baixar um projeto |
| `npm install pacote@4.1.0` | Instala uma versão específica |
| `npm install pacote@latest` | Instala a versão mais nova, mesmo que seja de outro major (seção 5) |
| `npm uninstall pacote` | Remove do `node_modules` e do `package.json` |
| `npm ls` / `npm ls --all` | Mostra as dependências diretas / a árvore inteira |
| `npm outdated` | Mostra os pacotes que têm versões novas (seção 5) |

**Armadilhas:**
- **Confira a pasta do terminal antes de instalar.** O npm usa o `package.json` da pasta atual (no PowerShell, ela aparece antes do `>`). Se não achar um ali, ele procura nas pastas de cima, e o pacote pode ir parar no projeto errado.
- **Evite o `npm install -g` (global).** Ele instala um comando para o computador inteiro, numa versão que não fica registrada em nenhum projeto. Para rodar ferramentas, prefira o `npx` (seção 8).

---

## 4. `dependencies` x `devDependencies`

**O que é:** as duas listas de pacotes do `package.json`.

- **`dependencies`:** o que a aplicação usa **enquanto roda**. Exemplos: o `react` e o `next`, e o `chalk` do exemplo.
- **`devDependencies`:** o que só serve para **desenvolver**: ferramentas que rodam na sua máquina ou durante o build. Exemplos: o `typescript` (o JavaScript com tipos, Módulo 5), o `eslint` (procura problemas no código, aula 2.5), o `prettier` (logo abaixo) e o `vite` (o servidor de desenvolvimento e o build, aula 2.7).

Para instalar como dependência de desenvolvimento, use o `-D` (de *dev*):

```bash
npm install -D prettier
```

O **Prettier** é um **formatador** de código: ele reescreve o arquivo com a indentação, as aspas e os pontos e vírgulas padronizados. É como o **Ctrl+Alt+L** do IntelliJ, mas configurado no projeto, para que todo mundo do time formate do mesmo jeito. Você vai configurá-lo na aula 2.5.

> ☕ É parecido com os escopos do Maven: o JUnit fica no `<scope>test</scope>` e o Lombok no `<scope>provided</scope>`, porque nenhum dos dois vai para a aplicação rodando. Ferramentas como o Prettier e o ESLint, no Java, seriam **plugins** do Maven (como o Spotless e o Checkstyle); no npm, elas são simplesmente `devDependencies`.

**Para que serve a separação:** num servidor de produção, o comando `npm install --omit=dev` instala só as `dependencies`, o que deixa a instalação menor e mais rápida.

**Armadilha:** se o código da aplicação importa um pacote que está nas `devDependencies`, tudo funciona na sua máquina (que instalou tudo), mas quebra no servidor que usou o `--omit=dev`. A regra prática: **se o seu código faz `import` do pacote, ele vai em `dependencies`.**

> 💡 Num projeto React com o Vite, o que vai para o navegador é decidido pelo **bundler** (aula 2.7), que junta só o que o código importa. Ali a separação serve mais para organizar. Mesmo assim, siga a regra: o time e as ferramentas contam com ela.

---

## 5. Versionamento semântico (semver)

**O que é:** a convenção que dá significado aos três números de uma versão: **MAJOR.MINOR.PATCH**.

| Sobe o... | Quando | Exemplo real (chalk) |
|---|---|---|
| **PATCH** | Correção de bug, sem nada novo | 4.1.0 → 4.1.2 |
| **MINOR** | Funcionalidade nova, **compatível** com o código antigo | 4.0.0 → 4.1.0 |
| **MAJOR** | Mudança que pode **quebrar** quem usa o pacote | 4.1.2 → 5.0.0: o pacote passou a funcionar só com `import` (e não mais com `require`)<br>5.6.2 → 6.0.0: passou a exigir o Node 22 ou mais novo |

**Para que serve:** pela versão, você sabe o risco de atualizar. Subir o patch ou o minor deveria ser seguro. Subir o major exige ler as **notas da versão** (o *changelog*, geralmente na página de *Releases* do GitHub do pacote).

> ☕ O Java usa a mesma convenção de números, mas o `pom.xml` costuma ter a versão **exata**. O npm, por padrão, anota um **intervalo** de versões aceitas. É a maior surpresa para quem vem do Maven.

**Os intervalos:**

| No `package.json` | Aceita | Não aceita | Na prática |
|---|---|---|---|
| `"4.1.0"` | Só a 4.1.0 | Qualquer outra | Exata, como no Maven |
| `"~4.1.0"` | 4.1.0 até 4.1.x | 4.2.0 | Só patches |
| `"^4.1.0"` | 4.1.0 até 4.x.x | 5.0.0 | Patches e minors. **É o padrão do `npm install`** |
| `"^4"` | Qualquer 4.x.x | 5.0.0 | O mesmo que `^4.0.0` |

**Caso especial: as versões `0.x`.** Antes da 1.0, o pacote ainda é considerado instável, e o `^` trata o **minor** como se fosse o major: `"^0.3.2"` aceita a 0.3.9, mas **não** aceita a 0.4.0.

**Vendo e aplicando as atualizações:**

```text
> npm outdated
Package  Current  Wanted  Latest  Location            Depended by
chalk      4.1.0   4.1.2   6.0.1  node_modules/chalk  meu-projeto
```

- **Current:** a versão instalada.
- **Wanted:** a mais nova que o intervalo do `package.json` aceita (aqui, `^4.1.0` → 4.1.2).
- **Latest:** a mais nova que existe no registro.

O `npm update` sobe cada pacote até a versão **Wanted**, nunca para outro major. Para trocar de major, é preciso pedir explicitamente: `npm install chalk@latest` (e ler o changelog antes).

**Armadilhas:**
- O semver é uma **promessa** do autor do pacote, e não uma garantia: às vezes um minor quebra algo sem querer. É por isso que existe o `package-lock.json`.
- Um pacote na versão `0.x` pode mudar tudo de uma versão para outra.

---

## 6. O `package-lock.json` e a pasta `node_modules`

**O que é o `package-lock.json`:** a lista com a versão **exata** de todos os pacotes instalados, inclusive os transitivos, com o endereço de onde cada um foi baixado e um *hash* que confirma que o arquivo não foi alterado:

```json
"node_modules/chalk": {
  "version": "6.0.1",
  "resolved": "https://registry.npmjs.org/chalk/-/chalk-6.0.1.tgz",
  "integrity": "sha512-/Ce6KNm3vIbWdMlNna6RVIZ/ICQx..."
}
```

**Para que serve:** o `package.json` diz `^6.0.1`, que aceita qualquer 6.x. Sem o lock, quem instalasse o projeto no mês que vem poderia receber uma versão diferente da sua. Com o lock, **todo mundo instala exatamente as mesmas versões**: você, o seu time, o servidor de testes e o de produção.

> ☕ O Maven não precisa de um lock porque o `pom.xml` já tem versões exatas. Quem gera essa necessidade no npm é o `^`. (O Gradle tem uma ideia parecida, o *dependency locking*.)

**O que vai para o Git:**

| Arquivo | Vai para o Git? | Por quê |
|---|---|---|
| `package.json` | ✅ Sim | É a configuração do projeto |
| `package-lock.json` | ✅ **Sim, sempre** | Garante as mesmas versões em todas as máquinas |
| `node_modules/` | ❌ **Nunca** | Pode ter centenas de MB e é recriada com um comando. Já está no `.gitignore` deste repositório (o arquivo que lista o que o Git **não** deve enviar; aula 2.6) |

**`npm install` x `npm ci`:**

| | `npm install` | `npm ci` |
|---|---|---|
| Lê | O `package.json` (e usa o lock quando ele é compatível) | **Só** o lock, à risca |
| Altera o lock? | Pode alterar | Nunca. Se o lock não bater com o `package.json`, dá erro |
| A pasta `node_modules` | Completa o que falta | Apaga e recria do zero |
| Quando usar | No dia a dia e ao adicionar pacotes | Em servidores de build e deploy, e para "instalar limpo" quando algo estranho acontecer |

**Armadilha:** apagar o `package-lock.json` para "resolver" um problema de instalação. Isso faz o npm escolher de novo a versão de **tudo**, e vários pacotes podem subir de versão ao mesmo tempo. Apague a `node_modules` e rode `npm ci`; o lock fica.

---

## 7. Scripts

**O que é:** a seção `scripts` do `package.json` guarda **atalhos de comandos** do projeto:

```json
"scripts": {
  "start": "node index.js",
  "formatar": "prettier --write feio.js"
}
```

**Como rodar:** `npm run nome-do-script`. Alguns nomes especiais, como `start` e `test`, também funcionam sem o `run` (`npm start`, `npm test`). Rodar só `npm run` lista os scripts do projeto.

**Como funciona por baixo:** enquanto um script roda, o npm acrescenta a pasta `node_modules/.bin` ao PATH (a lista de pastas onde o sistema procura os comandos). É lá que ficam os comandos dos pacotes instalados, como o `prettier`. Por isso, `npm run formatar` funciona, mas digitar `prettier` direto no terminal dá o erro "O termo 'prettier' não é reconhecido".

**Os scripts que você vai ver em todo projeto:**

| Script | O que faz | ☕ No Spring |
|---|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento, que recarrega sozinho quando você salva | `mvn spring-boot:run` com o DevTools |
| `npm run build` | Gera a versão de produção | `mvn package` |
| `npm start` | Roda a versão de produção gerada pelo build (no Next.js) | `java -jar app.jar` |
| `npm test` | Roda os testes | `mvn test` |
| `npm run lint` | Procura problemas no código (aula 2.5) | Checkstyle / SpotBugs |

**No IntelliJ:** abra o `package.json`, e um ▶ verde aparece ao lado de cada script. Clique nele para rodar, ou para **depurar** (como na aula 2.1).

**Armadilha:** fora os nomes especiais, o `run` é obrigatório: `npm build` dá o erro `Unknown command: "build"`. O certo é `npm run build`.

---

## 8. `npx` e `npm create`

**O que é:** o `npx` **executa o comando de um pacote**.

**Como funciona:**
1. Ele procura o comando no `node_modules/.bin` do projeto. Por isso, `npx prettier --version` funciona no terminal, ao contrário do `prettier --version` sozinho.
2. Se não achar, ele pergunta se pode baixar o pacote (`Need to install the following packages... Ok to proceed? (y)`), baixa num cache temporário, executa e **não altera** o seu projeto.

**Para que serve:** principalmente para rodar **geradores de projeto** e ferramentas que você usa uma vez só. O `@latest` garante a versão mais nova, e não uma antiga que esteja no cache. O `npm create X` é um atalho para o `npx create-X`. Você vai ver estes comandos ao longo do curso:

```bash
npm create vite@latest              # cria um projeto com o Vite (aula 2.7)
npx create-next-app@latest          # cria um projeto Next.js (aula 9.1)
npx shadcn@latest add button        # copia um botão pronto do shadcn/ui, uma coleção de componentes de interface (aula 8.7)
```

> ☕ O `npx create-next-app@latest` é o **Spring Initializr** do Next.js: ele gera a estrutura do projeto, o `package.json` e as configurações.

**Armadilha:** o `npx` baixa e **executa** código. Um erro de digitação no nome pode rodar um pacote malicioso com um nome parecido (seção 9).

---

## 9. Segurança: um pacote é código de outra pessoa

Instalar um pacote é colocar código de outra pessoa no seu projeto, rodando na sua máquina e no navegador dos seus usuários. Alguns pacotes rodam código **já durante a instalação** (os chamados scripts de instalação).

**Um caso real, com o pacote do exercício:** em setembro de 2025, a conta de um mantenedor do `chalk` e de outros pacotes populares foi invadida com um e-mail falso. Versões com código malicioso, que tentava roubar criptomoedas, ficaram no ar por cerca de duas horas. Dias depois, um ataque chamado **Shai-Hulud** roubou credenciais de desenvolvedores e publicou versões infectadas de centenas de pacotes.

**Cuidados que resolvem a maior parte dos problemas:**
- **Antes de instalar um pacote que você não conhece, abra a página dele no npmjs.com:** veja os downloads por semana, a data da última versão e o repositório no GitHub.
- **Confira o nome com cuidado.** Golpistas publicam pacotes com nomes parecidos com os famosos. A IA às vezes sugere pacotes que **não existem**, e golpistas também registram esses nomes (aula 10.9).
- **Faça commit do `package-lock.json`:** uma versão maliciosa publicada amanhã não entra no seu projeto sem você atualizar.
- **`npm audit`** lista as vulnerabilidades conhecidas nas suas dependências, e o `npm audit fix` tenta atualizar para versões corrigidas. ☕ É o equivalente ao OWASP Dependency-Check do Maven.
- 🔍 O npm 11 tem a configuração `min-release-age`, desligada por padrão, que faz o npm ignorar as versões publicadas há menos de N dias. A maioria dos ataques é descoberta em horas, então esperar alguns dias evita boa parte deles.

Você vai estudar segurança a fundo no Módulo 6.

---

## 10. 🔍 Para conhecer: pnpm, Yarn e Bun

São **alternativas ao npm**, com o mesmo trabalho e o mesmo `package.json`. Mudam a velocidade, o arquivo de lock e os comandos:

| | npm | pnpm | Yarn | Bun |
|---|---|---|---|---|
| Arquivo de lock | `package-lock.json` | `pnpm-lock.yaml` | `yarn.lock` | `bun.lock` |
| Instalar tudo | `npm install` | `pnpm install` | `yarn` | `bun install` |
| Adicionar | `npm install x` | `pnpm add x` | `yarn add x` | `bun add x` |
| Adicionar (dev) | `npm install -D x` | `pnpm add -D x` | `yarn add -D x` | `bun add -d x` |
| Rodar um script | `npm run dev` | `pnpm dev` | `yarn dev` | `bun run dev` |
| Rodar sem instalar | `npx x` | `pnpm dlx x` | `yarn dlx x` | `bunx x` |

- **pnpm:** guarda cada versão de cada pacote **uma vez só** no computador e liga os projetos a ela (parecido com o `~/.m2` do Maven). É mais rápido, ocupa menos disco e, desde a versão 10, não roda os scripts de instalação das dependências sem a sua permissão. É muito usado em projetos grandes.
- **Yarn:** foi criado pelo Facebook quando o npm era lento; hoje está bem menos presente em projetos novos.
- **Bun:** além de gerenciador de pacotes, é um **substituto do Node** inteiro, focado em velocidade.

**Regra:** use o gerenciador que o projeto já usa (olhe qual arquivo de lock existe na pasta) e não misture dois no mesmo projeto. Neste curso, usaremos o **npm**: ele vem com o Node, e o que você aprender aqui vale para os outros.

---

## 11. E no React e no Next.js?

Este é o `package.json` que o `create-next-app` gera hoje, simplificado (o original tem mais alguns pacotes de ferramentas, que você vai conhecer nos Módulos 5 e 9):

```json
{
  "name": "painel",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.4.2",
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "devDependencies": {
    "eslint": "^9",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

- **`"private": true`** impede que o projeto seja publicado no registro por engano.
- **Os scripts** são os da seção 7: `npm run dev` no dia a dia, e `npm run build` + `npm start` em produção.
- **`next`, `react` e `react-dom` ficam em `dependencies`**, com versões **exatas**: a aplicação precisa deles rodando, e cada versão do Next.js é testada com uma versão específica do React. O `react-dom` é a parte do React que desenha a interface no DOM do navegador (aula 2.3).
- **TypeScript, ESLint e Tailwind ficam em `devDependencies`:** são ferramentas que trabalham durante o desenvolvimento e o build. (O Tailwind é um jeito de estilizar a página com classes de CSS prontas, que você vai estudar na aula 3.10.)
- **Repare no `"typescript": "^5"`:** ele aceita qualquer 5.x, mas nunca a 6 ou a 7, mesmo que elas já existam. O `^` nunca troca de major.

> ☕ É a mesma ideia do `spring-boot-starter-parent`: ele fixa versões das bibliotecas do Spring que foram testadas juntas. No Next.js, a versão do `next` define a do React, e você atualiza os dois juntos.

---

## 12. 📋 Resumo (cola rápida)

| npm | O que faz | ☕ No Java/Maven |
|---|---|---|
| `package.json` | A configuração do projeto e a lista de dependências | `pom.xml` |
| `npm init -y` | Cria o `package.json` (troque o `type` para `"module"`) | Spring Initializr (bem mais simples) |
| `npm install x` | Instala em `dependencies` | `<dependency>` |
| `npm install -D x` | Instala em `devDependencies` | `<scope>test</scope>` / plugins |
| `npm install` | Instala tudo o que está no `package.json` | O Maven baixa no build |
| `npm ci` | Instala limpo, à risca pelo lock | — |
| `^4.1.0` / `~4.1.0` | Aceita minors e patches / só patches | Versões exatas no `pom.xml` |
| `npm outdated` / `npm update` | Mostra as versões novas / sobe até a Wanted | `mvn versions:display-dependency-updates` |
| `package-lock.json` | As versões exatas de toda a árvore | O *dependency locking* do Gradle |
| `npm run x` | Roda um script | `mvn <fase>` |
| `npx x` | Roda o comando de um pacote, sem instalá-lo no projeto | `mvn archetype:generate` |
| `npm audit` | Vulnerabilidades conhecidas nas dependências | OWASP Dependency-Check |

**Regras de ouro:**
1. **`package-lock.json` sempre no Git; `node_modules` nunca.**
2. Se o código faz `import` do pacote, ele vai em `dependencies`. Se é ferramenta, vai em `devDependencies` (`-D`).
3. O `^` aceita patches e minors, **nunca** um major novo. Para subir de major, leia o changelog e use `pacote@latest`.
4. Problema estranho na instalação? Apague a `node_modules` e rode `npm ci`. Não apague o lock.
5. Confira a pasta do terminal antes de rodar `npm install`.
6. Antes de instalar um pacote desconhecido, olhe a página dele no npmjs.com e confira o nome.

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga o passo a passo.
