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
Resposta: name e version

b) Qual é o valor do campo `type`? Troque-o para `"module"` e salve. Por que essa troca é necessária para o código do exercício 2 (aula 1.7)?
Resposta: commonjs, precisamos do module para que o JS funcione de forma modular, e um código não atrapalhe o outro  

---

### 2) Instalando uma dependência

Instale o **chalk**, mas numa versão **antiga** (de propósito, para o exercício 3):

```bash
npm install chalk@4.1.0
```

a) A mensagem final diz `added N packages`. Quantos pacotes foram instalados? Por que mais de um, se você pediu só o chalk? Rode `npm ls --all` e cite uma dependência que o chalk trouxe.
Resposta: Adicionou 6 pacotes, ele adicionou mais de 1, pq ele também adiciona as dependências que ele precisa para funcionar, veio também o ansi-styles

b) Que linha nova apareceu no `package.json`? E qual arquivo novo apareceu na pasta, além da `node_modules`?
Resposta: dependencies, e surgiu o lock.

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

| Intervalo no `package.json` | Versões aceitas                            |
|---|--------------------------------------------|
| `"4.1.0"` | Resposta: Versão exata                     |
| `"~4.1.0"` | Resposta: Patchs, não aceita 4.2.0         |
| `"^4.1.0"` | Resposta: Patchs e Minor, não aceita 5.0.0 |

E o `"^0.3.2"`: aceita a `0.3.5`? E a `0.4.0`?
Resposta: Aceita 0.3.5, mas não aceita 0.4.0, por ser versões instáveis atualizações minors se tornam Majors 

b) Rode `npm outdated` e preencha:

| Coluna | Valor            |
|---|------------------|
| Current | Resposta: 4.1.0  |
| Wanted | Resposta:  4.1.2 |
| Latest | Resposta:  6.0.1 |

Por que a Wanted não é igual à Latest?
Resposta: Wanted é a última versão que a aplicação aceita, por conta do "^" 

c) Rode `npm update` e depois `npm ls`. Para qual versão o chalk foi? Por que ele não foi para a Latest?
Resposta: Foi para 4.1.2, pois o intervalo configurado no package.json garante que não vá entrar uma atualização Major que possa quebrar nossa aplicação

d) Agora suba de major: `npm install chalk@latest`. O que mudou no `package.json`? A mensagem diz `removed N packages`: quantos foram removidos, e por quê (rode `npm ls --all` de novo)? O `node index.js` continua funcionando?
Resposta: A versão foi para "^6.0.1", foram removidos 5 pacotes, pelo que parece o chalk não precisa mais dessas dependências e o Node index.hs continua funcionando sim!!

e) A versão 6.0.0 do chalk tem uma única mudança que quebra compatibilidade: "Require Node.js 22" (agora ela exige o Node 22 ou mais novo). Por que essa mudança obrigou o autor a subir o **major**, e não o minor? O que aconteceria com quem usa o Node 20 e tem `"chalk": "^5.6.2"` no `package.json`?
Resposta: Pois caso ele subisse a minor, quem atualizasse e não tivesse com o node 22, iria quebrar a aplicação. Não aconteceria nada, pois o NPM não deixaria atualizar para uma versão Major. 

---

### 4) Uma ferramenta de desenvolvimento e os scripts

a) Instale o Prettier como dependência de desenvolvimento: `npm install -D prettier`. Em qual seção do `package.json` ele entrou? Por que ele é uma dependência de desenvolvimento e o chalk não é (seção 4)?
Resposta: devDependencies, pois usamos o prettier para desenvolvimento, e o chalk precisamos importar ele para nosso código, então como regra sempre que precisarmos importar algo no JS a dependência deve ficar em dependencies

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
Resposta: Alinhou as linhas do código, colocou ponto e virgula no final e corrigiu os espaços desnecessários

c) Digite só `prettier --version` no terminal. O que acontece? Agora rode `npx prettier --version`. Por que um funciona e o outro não, e por que o script `formatar` funcionou (seções 7 e 8)?
Resposta: Porque os comandos precisam do npx, pois ele procura dentro da pasta, o script funciona pq quando o script roda, ele coloca a pasta no PATH.

---

### 5) O lock e a `node_modules`

a) Apague a pasta `node_modules` (no IntelliJ: botão direito na pasta → **Delete**). Rode `npm start`. Qual erro aparece?
Resposta: ERR_MODULE_NOT_FOUND

b) Rode `npm ci` e depois `npm start` de novo. Funcionou? De qual arquivo o `npm ci` tirou as versões exatas para instalar?
Resposta: Funcionou!! O npm ci pega as versões do package-lock.

c) Abra o `.gitignore` da raiz do repositório (`estudos-front-end`): é o arquivo que lista o que o Git **não** deve enviar para o GitHub. Destes três, quais vão para o GitHub quando você fizer o commit: `node_modules`, `package.json` e `package-lock.json`? Explique o porquê de cada um.
Resposta: package.json - pois é a configuração do nosso projeto e o package-lock, pois tem as versões exatas das nossas dependências, para que todo mundo que trabalhe na aplicação usem das mesmas versões. E a node_modules não vai pois ela é pesada e é recriada com apenas 1 comando. 

---

### 6) 🔍 Desafio opcional: `npx` e `npm audit`

a) Rode `npx cowsay "Aprendendo npm"` (o cowsay é um pacote de brincadeira, que desenha uma vaca falando). O npm perguntou alguma coisa antes de rodar? O quê? Depois, rode `npm ls`: o cowsay entrou no seu projeto? Por quê?
Resposta: O npm não perguntou nada, e o cowsay não entrou no meu projeto, isso acontece pq o npx serve para executar um script externo, muito usado para iniciadores de projetos, como o do next.js.  

b) Rode `npm audit`. Quantas vulnerabilidades ele encontrou? Para que serve esse comando (seção 9)?
Resposta: 0 vulnerabilidades, ele serve para listar as vulnerabilidades encontradas nas dependências e o npm audit fix, serve para o npm tentar atualizar para uma versão que essas vulnerabilidades tenham sido corrigias.  
