# Exercícios da Aula 2.4: npm a fundo

⏱️ Cerca de 45 minutos. Você vai criar um projeto pequeno do zero e responder às perguntas **neste arquivo**, nos espaços marcados com `Resposta:`.

> ⚠️ **Antes de dizer que terminou**, procure por `Resposta:` vazio neste arquivo (no IntelliJ: **Ctrl+F**) e confira se respondeu **todas** as partes de cada pergunta.

**Onde rodar os comandos:** no terminal do IntelliJ, dentro desta pasta (`exercicios`). Atalho: clique com o botão direito na pasta `exercicios` → **Open In → Terminal**. Confira o caminho que aparece antes do `>` antes de cada `npm install` (seção 3 da aula).

---

### 1) Criando o projeto

Rode, um comando por vez:

```bash
mkdir meu-projeto
cd meu-projeto
npm init -y
```

O `mkdir` cria uma pasta, e o `cd` entra nela. A partir daqui, **todos os comandos rodam dentro de `meu-projeto`**.

a) Abra o `package.json` que o npm criou. Qual campo equivale ao `<artifactId>` do `pom.xml`, e qual equivale ao `<version>`?
Resposta:

b) Qual é o valor do campo `type`? Troque-o para `"module"` e salve. Por que essa troca é necessária para o código do exercício 2 (aula 1.7)?
Resposta:

---

### 2) Instalando uma dependência

Instale o **chalk**, mas numa versão **antiga** (de propósito, para o exercício 3):

```bash
npm install chalk@4.1.0
```

a) A mensagem final diz `added N packages`. Quantos pacotes foram instalados? Por que mais de um, se você pediu só o chalk? Rode `npm ls --all` e cite uma dependência que o chalk trouxe.
Resposta:

b) Que linha nova apareceu no `package.json`? E qual arquivo novo apareceu na pasta, além da `node_modules`?
Resposta:

c) Crie um arquivo `index.js` dentro de `meu-projeto` com este código, e rode com `node index.js`:

```javascript
import chalk from "chalk";

console.log(chalk.green("Olá, npm!"));
console.log(chalk.bold.blue("Texto azul e em negrito"));
```

O `chalk.green(texto)` devolve o texto com os códigos de cor que o terminal entende, e as cores podem ser encadeadas (`chalk.bold.blue`). **Acrescente uma linha** que mostre o seu nome em amarelo e negrito (a cor amarela é o `chalk.yellow`) e rode de novo.

---

### 3) Versões na prática

a) **Prever, sem rodar:** quais destas versões cada intervalo aceita: `4.1.0`, `4.1.2`, `4.2.0` e `5.0.0` (seção 5)?

| Intervalo no `package.json` | Versões aceitas |
|---|---|
| `"4.1.0"` | Resposta: |
| `"~4.1.0"` | Resposta: |
| `"^4.1.0"` | Resposta: |

E o `"^0.3.2"`: aceita a `0.3.5`? E a `0.4.0`?
Resposta:

b) Rode `npm outdated` e preencha:

| Coluna | Valor |
|---|---|
| Current | Resposta: |
| Wanted | Resposta: |
| Latest | Resposta: |

Por que a Wanted não é igual à Latest?
Resposta:

c) Rode `npm update` e depois `npm ls`. Para qual versão o chalk foi? Por que ele não foi para a Latest?
Resposta:

d) Agora suba de major: `npm install chalk@latest`. O que mudou no `package.json`? A mensagem diz `removed N packages`: quantos foram removidos, e por quê (rode `npm ls --all` de novo)? O `node index.js` continua funcionando?
Resposta:

e) A versão 6.0.0 do chalk tem uma única mudança que quebra compatibilidade: "Require Node.js 22" (agora ela exige o Node 22 ou mais novo). Por que essa mudança obrigou o autor a subir o **major**, e não o minor? O que aconteceria com quem usa o Node 20 e tem `"chalk": "^5.6.2"` no `package.json`?
Resposta:

---

### 4) Uma ferramenta de desenvolvimento e os scripts

a) Instale o Prettier como dependência de desenvolvimento: `npm install -D prettier`. Em qual seção do `package.json` ele entrou? Por que ele é uma dependência de desenvolvimento e o chalk não é (seção 4)?
Resposta:

b) Crie um arquivo `feio.js` dentro de `meu-projeto`, com este código **mal formatado de propósito**:

```javascript
import chalk from 'chalk'
const nome='Luiz'
    console.log( chalk.green(`Olá, ${nome}!`) )
```

Depois, troque a seção `scripts` do `package.json` por esta (cuidado com as vírgulas: é JSON):

```json
"scripts": {
  "start": "node index.js",
  "formatar": "prettier --write feio.js"
},
```

Rode `npm start` e depois `npm run formatar`. Abra o `feio.js`: cite **três** mudanças que o Prettier fez.
Resposta:

c) Digite só `prettier --version` no terminal. O que acontece? Agora rode `npx prettier --version`. Por que um funciona e o outro não, e por que o script `formatar` funcionou (seções 7 e 8)?
Resposta:

---

### 5) O lock e a `node_modules`

a) Apague a pasta `node_modules` (no IntelliJ: botão direito na pasta → **Delete**). Rode `npm start`. Qual erro aparece?
Resposta:

b) Rode `npm ci` e depois `npm start` de novo. Funcionou? De qual arquivo o `npm ci` tirou as versões exatas para instalar?
Resposta:

c) Abra o `.gitignore` da raiz do repositório (`estudos-front-end`): é o arquivo que lista o que o Git **não** deve enviar para o GitHub. Destes três, quais vão para o GitHub quando você fizer o commit: `node_modules`, `package.json` e `package-lock.json`? Explique o porquê de cada um.
Resposta:

---

### 6) 🔍 Desafio opcional: `npx` e `npm audit`

a) Rode `npx cowsay "Aprendendo npm"` (o cowsay é um pacote de brincadeira, que desenha uma vaca falando). O npm perguntou alguma coisa antes de rodar? O quê? Depois, rode `npm ls`: o cowsay entrou no seu projeto? Por quê?
Resposta:

b) Rode `npm audit`. Quantas vulnerabilidades ele encontrou? Para que serve esse comando (seção 9)?
Resposta:
