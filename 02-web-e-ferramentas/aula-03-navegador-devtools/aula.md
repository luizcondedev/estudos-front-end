# Aula 2.3: Como o navegador funciona + DevTools

> **Por que esta aula importa?** Na aula 2.2 você viu a viagem da requisição até o servidor. Esta aula mostra o que o navegador faz **quando a resposta chega**: como um texto HTML vira uma página na tela, onde o JavaScript entra nessa história, e como investigar tudo isso com o **DevTools**, a ferramenta que você vai abrir todos os dias como dev front-end.
>
> É também a aula que explica **por que o React existe**: mexer na página é caro, e o React foi criado para fazer isso do jeito mais eficiente possível.

**Exercícios:** a pasta [exercicios](./exercicios/) tem um site pequeno de uma loja, **com dois bugs**, que você vai encontrar e consertar usando o DevTools. As instruções estão no [exercicios.md](./exercicios/exercicios.md).

---

## 0. Antes de começar: o mínimo de HTML e CSS para esta aula

> Você vai revisar HTML e CSS a fundo no Módulo 3. Esta seção traz só o necessário para entender os exemplos desta aula e o site dos exercícios.

### 0.1 HTML: tags, elementos e atributos

O HTML descreve **o conteúdo** de uma página usando **tags**, escritas entre `< >`. A maioria vem em pares: uma tag de abertura e uma de fechamento, com uma `/`:

```html
<h1>Lojinha do Dev</h1>
<!-- ↑ abre    ↑ conteúdo   ↑ fecha -->
```

A tag, junto com o seu conteúdo, forma um **elemento**. Elementos podem ficar uns dentro dos outros, e algumas tags não têm fechamento, como a `<img>`.

As tags podem ter **atributos**, que são informações extras, escritas na tag de abertura no formato `nome="valor"`:

```html
<img src="imagens/logo.png" alt="Logo da Lojinha">
<!--  ↑ atributo src: qual imagem    ↑ atributo alt: o texto alternativo, para quem não enxerga a imagem -->
```

> ☕ Se você já mexeu com XML no Java (um `pom.xml`, por exemplo), é a mesma ideia: tags, elementos um dentro do outro e atributos.

**A estrutura de toda página:**

```html
<!DOCTYPE html>               <!-- avisa ao navegador que é uma página HTML moderna -->
<html lang="pt-BR">           <!-- o atributo lang diz o idioma da página -->
  <head>
    <!-- informações SOBRE a página, que não aparecem nela: título da aba, CSS, scripts -->
  </head>
  <body>
    <!-- o que aparece na tela -->
  </body>
</html>
```

**As tags que aparecem nesta aula:**

| Tag | Para quê |
|---|---|
| `<head>` / `<body>` | A parte invisível (informações e arquivos) / a parte visível da página |
| `<meta>` | Informações técnicas sobre a página, como a codificação dos caracteres (`charset="UTF-8"`, para os acentos aparecerem certo) |
| `<title>` | O título que aparece na aba do navegador |
| `<link rel="stylesheet" href="estilos.css">` | Liga um arquivo CSS à página |
| `<script src="app.js"></script>` | Liga (e executa) um arquivo JavaScript |
| `<h1>` | Um título |
| `<p>` | Um parágrafo |
| `<ul>` e `<li>` | Uma lista e os itens dela |
| `<img>` | Uma imagem |
| `<header>` / `<main>` | O topo da página / o conteúdo principal |
| `<div>` | Uma "caixa" genérica, sem significado próprio |
| `<strong>` / `<span>` | Um texto em destaque (negrito) / um trecho de texto genérico |

**Dois atributos muito importantes: `id` e `class`.**
- O **`id`** dá um nome **único** a um elemento: só pode existir um `id="status"` na página inteira. É como a chave primária de uma tabela.
- O **`class`** dá um "rótulo" que **vários** elementos podem compartilhar: todos os cards da Lojinha têm `class="card"`. É como uma categoria. Um elemento pode ter várias classes, separadas por espaço: `class="card destaque"`.

### 0.2 CSS: seletores e regras

O CSS descreve **a aparência** da página. Ele é formado por **regras**, e cada regra diz **quais elementos** (o **seletor**) recebem **quais estilos** (as **propriedades**):

```css
.card {               /* seletor: os elementos com class="card" */
  padding: 16px;      /* propriedade: valor */
  background: white;
}
```

**Os seletores que aparecem nesta aula:**

| Seletor | Seleciona |
|---|---|
| `h1` | Todos os elementos `<h1>` |
| `#status` | O elemento com `id="status"` (o `#` indica um **id**) |
| `.card` | Todos os elementos com `class="card"` (o `.` indica uma **classe**) |
| `.card .preco` | Os elementos com a classe `preco` que estão **dentro** de um elemento com a classe `card` (o espaço significa "dentro de") |

> ☕ Um seletor de CSS faz o mesmo papel de uma expressão **XPath** no XML: diz **quais nós da árvore** você quer. O `.card .preco` seria algo como `//*[@class='card']//*[@class='preco']`.

**As propriedades de CSS citadas nesta aula** (você vai estudar todas no Módulo 3):

| Propriedade | O que faz |
|---|---|
| `color` / `background` | A cor do texto / a cor do fundo |
| `padding` / `margin` | O espaço interno / o espaço externo de um elemento (seção 6.1) |
| `display: none` | **Esconde** o elemento: ele nem ocupa espaço na página |
| `transform` | Move, gira ou aumenta um elemento **sem** empurrar os vizinhos (muito usado em animações) |
| `opacity` | A transparência (de 0, invisível, até 1, opaco) |

### 0.3 E o JavaScript, como acha os elementos?

Os **mesmos seletores do CSS** são usados no JavaScript para encontrar elementos no DOM (você vai estudar isso a fundo na aula 4.1):

```javascript
document.querySelector("#status");        // o PRIMEIRO elemento que bate com o seletor (ou null, se nenhum bater)
document.querySelectorAll("li");          // TODOS os elementos que batem (uma lista, com .length)
document.querySelector("#status").textContent = "Olá!";  // textContent: o texto dentro do elemento
```

> ☕ O `querySelector` é parecido com o `getElementById` do DOM do Java (que também existe no JavaScript), só que aceita qualquer seletor de CSS. E, como o `find` da aula 1.3 devolve `undefined` quando não acha, o `querySelector` devolve **`null`**. Guarde isso: é a causa de um dos bugs dos exercícios.

---

## 1. O navegador por dentro

### 1.1 As duas peças principais

Todo navegador tem dois "motores":

| Motor | O que faz | Chrome, Edge, Brave, Opera | Firefox | Safari |
|---|---|---|---|---|
| **De renderização** | Lê o HTML e o CSS e desenha a página | Blink | Gecko | WebKit |
| **De JavaScript** | Executa o JavaScript | V8 | SpiderMonkey | JavaScriptCore |

O Edge, o Brave e o Opera são baseados no **Chromium**, o projeto de código aberto por trás do Chrome. Por isso, eles usam os mesmos motores e têm **o mesmo DevTools**. Nesta aula, os exemplos são no Chrome, mas valem igualzinho para o Edge.

> ☕ O **V8** é para o JavaScript o que a **JVM** é para o Java. Ele também tem um compilador JIT (que transforma o código mais usado em código de máquina enquanto o programa roda, como o HotSpot) e um **garbage collector** (que libera a memória dos objetos que ninguém mais referencia). O Node.js, que você usa desde a aula 1.1, é justamente o V8 rodando fora do navegador.

### 1.2 Cada aba é um processo separado

O Chrome roda cada aba (na prática, cada site) num **processo separado** do sistema operacional, numa "caixa de areia" (*sandbox*) com acesso limitado ao computador. Se um site travar ou tentar algo malicioso, ele não derruba nem enxerga as outras abas.

> ☕ É como rodar cada aplicação numa **JVM separada**: se uma der `OutOfMemoryError`, as outras continuam de pé.

---

## 2. Do HTML até a tela: o caminho da renderização

Quando a resposta da aula 2.2 chega (`200 OK`, com um `index.html` no corpo), o navegador transforma esse **texto** numa **página** em seis etapas. Esse caminho tem o nome de *critical rendering path*:

```
  index.html ──▶ 1. DOM ───┐
                           ├──▶ 3. Render tree ──▶ 4. Layout ──▶ 5. Paint ──▶ 6. Composite ──▶ 🖥️
  estilos.css ─▶ 2. CSSOM ─┘     (o que aparece)    (onde e qual    (pintar os    (juntar as
                                                     tamanho)        pixels)       camadas)
```

### 2.1 Etapa 1: o HTML vira o DOM

O navegador lê o HTML do começo ao fim (isso se chama *parsing*) e monta uma **árvore de objetos**, o **DOM** (*Document Object Model*):

```html
<html>
  <body>
    <h1>Loja</h1>
    <ul>
      <li>Arroz</li>
      <li>Feijão</li>
    </ul>
  </body>
</html>
```

```
document
 └── html
      └── body
           ├── h1 ── "Loja"
           └── ul
                ├── li ── "Arroz"
                └── li ── "Feijão"
```

Cada "tag" vira um **objeto** (um *nó* da árvore), com propriedades e métodos. É com esses objetos que o JavaScript conversa para ler e alterar a página (aula 4.1).

> ☕ **Você já conhece isso do Java!** Ler um XML com o `DocumentBuilder` (do pacote `org.w3c.dom`) gera exatamente o mesmo tipo de árvore, um `Document` com `Element`s dentro. Não é coincidência: o DOM é uma especificação do W3C que vale para HTML e para XML, e por isso até os nomes dos métodos se parecem (`getElementById`, `getElementsByTagName`...).

**Uma diferença importante para o XML:** o parser de HTML é **tolerante a erros**. Se você esquecer de fechar uma tag, ele não lança exceção: ele "adivinha" e corrige sozinho. É por isso que um HTML quebrado quase sempre aparece na tela, só que às vezes de um jeito estranho. (Um parser de XML, no Java, lançaria uma `SAXParseException`.)

### 2.2 Etapa 2: o CSS vira o CSSOM

Em paralelo, o navegador lê o CSS e monta outra estrutura, o **CSSOM** (*CSS Object Model*): para cada elemento, quais regras de estilo se aplicam a ele (cor, tamanho da fonte, margens...). Você vai entender como o navegador decide entre regras que brigam entre si na aula 3.5 (cascata e especificidade).

### 2.3 Etapa 3: a render tree

O navegador junta o DOM e o CSSOM numa terceira árvore, a **render tree**, que tem **só o que vai aparecer** na tela:
- O `<head>` e tudo dentro dele fica de fora (ele não é visível).
- Elementos com `display: none` (a propriedade de CSS que esconde um elemento, seção 0.2) também ficam de fora.

### 2.4 Etapa 4: layout

Agora o navegador calcula a **geometria**: a posição exata e o tamanho de cada elemento, em pixels, de acordo com o tamanho da janela. Essa etapa também é chamada de *reflow*.

### 2.5 Etapas 5 e 6: paint e composite

- **Paint:** o navegador "pinta" os pixels de cada elemento: textos, cores, bordas, sombras, imagens.
- **Composite:** algumas partes da página são pintadas em **camadas** separadas (como camadas de um editor de imagens), e a placa de vídeo (GPU) junta essas camadas na ordem certa para formar a imagem final.

> 💡 Você não precisa decorar o nome de cada etapa. O que importa é a ideia: **HTML e CSS viram árvores de objetos, o navegador calcula onde cada coisa fica e depois pinta**. Isso explica tudo o que vem a seguir.

---

## 3. Onde o JavaScript entra

### 3.1 Um `<script>` para o parsing

Quando o parser encontra uma tag `<script>`, o comportamento padrão é **parar tudo**: ele baixa o arquivo, **executa o JavaScript** e só depois continua lendo o HTML.

```html
<head>
  <script src="app.js"></script>   <!-- o parsing PARA aqui até o app.js baixar e rodar -->
</head>
<body>
  <ul id="lista"></ul>             <!-- esta parte ainda nem foi lida quando o app.js roda -->
</body>
```

Isso causa dois problemas:
1. **A página demora mais para aparecer**, porque o resto do HTML espera o script.
2. **O script não enxerga o que vem depois dele.** Se o `app.js` procurar o `<ul id="lista">`, ele **não vai encontrar** (o resultado é `null`), porque esse elemento ainda não existe no DOM. E aí vem o erro clássico da aula 1.3: `TypeError: Cannot set properties of null`.

Por que o navegador faz isso? Porque um script pode **alterar o HTML** enquanto ele está sendo lido, então o parser espera para não montar uma árvore que vai mudar.

### 3.2 As soluções: `defer`, `async` e `type="module"`

| Como você escreve | Quando baixa | Quando executa | A ordem entre scripts |
|---|---|---|---|
| `<script src="a.js">` | Para o parsing para baixar | Na hora, parando o parsing | Na ordem do HTML |
| `<script src="a.js" defer>` | Em paralelo, sem parar o parsing | **Depois** que o HTML inteiro foi lido | Na ordem do HTML |
| `<script src="a.js" async>` | Em paralelo, sem parar o parsing | **Assim que terminar de baixar** (pode ser antes do fim do HTML) | **Sem garantia** de ordem |
| `<script src="a.js" type="module">` | Em paralelo | Como o `defer`: depois do HTML inteiro | Na ordem do HTML |

**Regra prática:**
- Use `defer` (ou `type="module"`, que já se comporta como `defer`) para os scripts da sua aplicação.
- Use `async` só para scripts independentes, que não mexem na página nem dependem de outros, como os de *analytics* (scripts que contam as visitas do site, como o Google Analytics).
- A solução antiga era colocar o `<script>` **no fim do `<body>`**: funciona, mas o download só começa quando o parser chega lá.

> 💡 Os módulos ES da aula 1.7 (`type="module"`) já resolvem esse problema sozinhos. É por isso que, nos projetos criados com o **Vite** (a ferramenta que cria e roda projetos React, aula 2.7), a tag é `<script type="module" src="/src/main.tsx">`. O `.tsx` é um arquivo TypeScript com o "HTML do React" dentro, que você vai conhecer no Módulo 7.

### 3.3 O JavaScript roda numa thread só

O JavaScript da página, a resposta aos cliques e boa parte da renderização acontecem na **mesma thread**, a *main thread*. Se um código JavaScript demorar 3 segundos, a página fica **3 segundos congelada**: não rola, não responde a cliques, não atualiza.

> ☕ É **exatamente** a regra da **Event Dispatch Thread (EDT)** do Swing ou da thread de UI do JavaFX: tudo o que mexe na tela roda numa thread só, e uma tarefa demorada nessa thread congela a interface. No Java, a solução é mover o trabalho pesado para outra thread (`SwingWorker`). No JavaScript, a solução para esperar coisas demoradas, como uma requisição, é o **código assíncrono** (Promises e `async/await`, aula 4.4), que espera sem travar a thread.

---

## 4. Mudar a página tem um custo: reflow e repaint

Depois que a página aparece, o JavaScript pode alterá-la a qualquer momento, e cada alteração pode obrigar o navegador a **refazer etapas** do caminho da seção 2:

| O que você muda | O que o navegador precisa refazer | Custo |
|---|---|---|
| Tamanho, posição, texto, adicionar ou remover elementos | **Layout** + paint + composite (o *reflow*) | 💰💰💰 Alto |
| Só a aparência: cor, fundo, sombra | Paint + composite (o *repaint*) | 💰💰 Médio |
| `transform` e `opacity` (mover ou deixar transparente, seção 0.2; muito usados em animações) | Só o composite | 💰 Baixo |

Um reflow pode afetar a página **inteira**: se um elemento lá no topo aumenta de altura, tudo abaixo dele muda de posição. Por isso, um código que altera a página centenas de vezes seguidas, misturando leituras e escritas de tamanho, deixa tudo lento.

> 💡 **É aqui que o React entra.** Atualizar o DOM "na mão" (aula 4.1) é trabalhoso e fácil de fazer de um jeito ineficiente. No React, você descreve **como a tela deve ficar** para um estado, e ele calcula sozinho a **menor quantidade de mudanças** necessárias no DOM real, agrupando as alterações. Você vai ver isso no Módulo 7.

---

## 5. O HTML que chegou x o DOM de agora

Como o JavaScript pode alterar o DOM, depois que a página carrega **o DOM pode ser bem diferente do HTML original** que veio do servidor. O navegador mostra os dois:

| Onde ver | O que mostra | Como abrir |
|---|---|---|
| **Exibir código-fonte** | O HTML **exatamente como chegou** do servidor (o corpo da resposta) | **Ctrl+U** |
| **DevTools → Elements** | O **DOM atual**, com tudo o que o JavaScript já criou, alterou ou removeu | **F12** |

Essa diferença explica uma das decisões mais importantes do front-end moderno:

- **Uma SPA com React (Vite):** SPA (*Single Page Application*, ou "aplicação de página única") é um site em que o servidor entrega **uma única** página HTML, e o JavaScript troca o conteúdo da tela conforme o usuário navega, sem recarregar a página. Numa SPA, o código-fonte que chega do servidor é praticamente **vazio**, só um `<div id="root"></div>` e o `<script>`. **Tudo** o que você vê na tela é criado pelo JavaScript **no navegador**. Antes de o JavaScript baixar e rodar, a tela fica em branco.
- **Uma página com Next.js:** o servidor já manda o HTML **com o conteúdo pronto** (aula 2.2, seção 11). A página aparece antes de o JavaScript terminar de carregar, e os mecanismos de busca (como o Google) leem o conteúdo direto do código-fonte. Você vai estudar isso no Módulo 9.

---

## 6. O DevTools

O **DevTools** (*Developer Tools*) é o conjunto de ferramentas de desenvolvedor que vem dentro do navegador.

| Atalho | Abre |
|---|---|
| **F12** ou **Ctrl+Shift+I** | O DevTools, na última aba usada |
| **Ctrl+Shift+J** | Direto no Console |
| **Ctrl+Shift+C** | O "seletor": clique em qualquer coisa da página para inspecioná-la |
| Botão direito → **Inspecionar** | O DevTools, já com o elemento clicado selecionado |

> 💡 O DevTools pode ficar à direita, embaixo ou numa janela separada: use o menu de três pontinhos (⋮) no canto superior direito dele. E ele está em inglês mesmo que o navegador esteja em português; nesta aula, os nomes das abas aparecem como no DevTools.

### 6.1 Elements: o DOM e o CSS ao vivo

Mostra a **árvore do DOM atual** (seção 5) e os **estilos** de cada elemento.

- **Inspecionar:** use o seletor (**Ctrl+Shift+C**) e clique num elemento da página. Ele fica selecionado na árvore.
- **Editar ao vivo:** dê **dois cliques** num texto ou num atributo para alterá-lo. A página muda na hora.
- **Painel Styles** (à direita): mostra todas as regras de CSS que se aplicam ao elemento. Você pode **desmarcar** uma propriedade (a caixinha ao lado dela), mudar um valor ou adicionar uma propriedade nova. Uma propriedade **riscada** é uma que foi sobrescrita por outra regra (você vai entender o porquê na aula 3.5).
- **Box model:** no fim do painel Styles (ou na aba **Computed**), um desenho mostra as "camadas" de espaço de cada elemento, de dentro para fora: o **conteúdo**, o **`padding`** (o espaço interno, entre o conteúdo e a borda), a **`border`** (a borda) e a **`margin`** (o espaço externo, que afasta o elemento dos vizinhos). Você vai estudar o box model a fundo na aula 3.5.

> ⚠️ **Tudo o que você altera no Elements é temporário.** Você está mexendo no DOM que está na memória do navegador, e **não no arquivo**. Ao recarregar a página (F5), tudo volta a ser como o servidor mandou. Use o Elements para **experimentar**; quando gostar do resultado, leve a mudança para o código.

### 6.2 Console: os erros e um terminal de JavaScript

O Console tem duas funções:

**1) Mostrar mensagens da página:** os `console.log` do seu código, os avisos e, principalmente, **os erros**. Cada mensagem tem, à direita, o **arquivo e a linha** de onde ela veio (ex.: `app.js:12`), e clicar ali abre o código exatamente nessa linha.

```javascript
console.log("Valor:", valor);     // mensagem comum
console.warn("Cuidado!");         // aviso, em amarelo
console.error("Deu ruim!");       // erro, em vermelho
console.table(produtos);          // mostra um array de objetos como uma TABELA (ótimo para listas)
```

**2) Executar JavaScript na página:** digite qualquer expressão e aperte Enter. Ela roda **dentro da página aberta**, com acesso ao DOM dela:

```javascript
document.title                            // o título da página
document.querySelectorAll("li").length    // quantos <li> existem no DOM agora
$0                                        // o elemento selecionado no Elements (atalho do DevTools)
```

> ☕ É como o **JShell** do Java, só que conectado à página que está aberta. E a lista de mensagens com "arquivo:linha" clicável é o equivalente ao **console do IntelliJ** mostrando um stack trace.

> 💡 Por padrão, o Console é limpo a cada recarga da página. Se quiser manter as mensagens antigas, marque **Preserve log** nas configurações do Console (o ícone de engrenagem ⚙️).

### 6.3 Network: tudo o que a página baixa e envia

É a aba que mostra, na prática, tudo o que você aprendeu na aula 2.2. Ela lista **cada requisição** que a página faz: o HTML, o CSS, o JavaScript, as imagens e as chamadas à API.

> ⚠️ A aba Network só registra as requisições feitas **enquanto ela está aberta**. Abra o DevTools e **depois** recarregue a página (F5).

**As colunas principais:**

| Coluna | O que mostra |
|---|---|
| **Name** | O arquivo ou endereço pedido |
| **Status** | O status code (aula 2.2). Requisições com erro aparecem **em vermelho** |
| **Type** | O tipo: `document` (o HTML), `stylesheet`, `script`, `fetch` (chamadas feitas pelo JavaScript), `png`... |
| **Initiator** | **Quem** pediu: o HTML, um script, um arquivo CSS... |
| **Size** e **Time** | O tamanho e quanto tempo levou |
| **Waterfall** | Uma linha do tempo mostrando quando cada requisição começou e terminou |

**Os filtros** (os botões acima da lista): **Fetch/XHR** mostra só as chamadas à API, que é o filtro que você mais vai usar. **JS**, **CSS**, **Img** e **Doc** filtram por tipo.

**Clicando numa requisição**, aparecem os detalhes:

| Aba | O que mostra | Ligação com a aula 2.2 |
|---|---|---|
| **Headers** | URL, método, status e todos os cabeçalhos da requisição e da resposta | Seções 4.4 e 6 |
| **Payload** | O corpo enviado (num POST, PUT ou PATCH) e os parâmetros da query string | Seção 3 |
| **Preview** | A resposta "formatada" (um JSON vira uma árvore que você pode expandir) | — |
| **Response** | A resposta crua, como texto | Seção 4.1 |
| **Timing** | Quanto tempo foi gasto em cada etapa: DNS, conexão, espera pelo servidor, download | Seção 10 |

**Opções úteis** (na barra de cima da aba):
- **Disable cache:** o *cache* é a cópia dos arquivos que o navegador guarda para não baixá-los de novo a cada visita (o cabeçalho `Cache-Control` da aula 2.2 controla isso). Com essa opção marcada, o navegador ignora o cache e baixa tudo de novo a cada recarga, enquanto o DevTools estiver aberto. Deixe marcada durante o desenvolvimento, senão você pode alterar um arquivo e continuar vendo a versão antiga.
- **Preserve log:** mantém a lista quando a página recarrega ou navega para outra.
- **Throttling** (o menu "No throttling"): simula uma internet lenta, como "Slow 4G", para você ver como a página se comporta no celular de um usuário com sinal ruim.

> ☕ É o equivalente ao **log de acesso** do Tomcat, só que do lado do cliente, e com os cabeçalhos e os corpos de cada requisição. Quando o seu front React "não mostra os dados", a primeira pergunta é sempre: **a requisição saiu? Qual status voltou? O que veio no corpo?** A resposta está aqui.

### 6.4 Sources: o debugger do navegador

Mostra os arquivos da página e permite **depurar o JavaScript que roda no navegador**, como o debugger do IntelliJ (aula 2.1).

- **Breakpoint:** abra o arquivo na árvore da esquerda (ou pelo atalho **Ctrl+P**, que busca arquivos) e clique no número da linha. Recarregue a página: a execução para ali.
- **No código:** a instrução `debugger;` funciona como um breakpoint escrito no próprio código (só tem efeito com o DevTools aberto). Lembre de tirá-la depois.
- **Painel à direita:**
  - **Scope**: as variáveis **Local**, **Closure** (a closure da aula 1.4!) e **Global**.
  - **Watch**: expressões que você quer acompanhar.
  - **Call Stack**: a pilha de chamadas (aula 1.5, o erro de recursão infinita).

**⚠️ Os atalhos são diferentes dos do IntelliJ:**

| Ação | Chrome DevTools | IntelliJ |
|---|---|---|
| Continuar até o próximo breakpoint | **F8** | F9 |
| Executar a linha e ir para a próxima (*step over*) | **F10** | F8 |
| Entrar na função (*step into*) | **F11** | F7 |
| Sair da função (*step out*) | **Shift+F11** | Shift+F8 |

> 💡 Se preferir, dá para depurar o JavaScript da página **direto no IntelliJ**, com os atalhos de sempre, usando uma *run configuration* do tipo **JavaScript Debug** (aula 2.1). Vale conhecer os dois: o do navegador está sempre à mão, em qualquer computador e em qualquer site.

### 6.5 Application: o que a página guarda no navegador

Às vezes um site precisa guardar dados **no computador do usuário**: quem está logado, o tema escolhido (claro ou escuro), os itens do carrinho de quem ainda não fez login. Existem duas formas principais de fazer isso: os **cookies** e o **Web Storage** (`localStorage` e `sessionStorage`). A aba **Application** do DevTools mostra os dois.

#### Cookies

**O que é:** um cookie é um **pequeno texto**, no formato `nome=valor`, que o **servidor** pede para o navegador guardar, e que o navegador **devolve automaticamente em toda requisição** seguinte para o mesmo site.

**Para que serve:** para o servidor **reconhecer** o navegador de uma requisição para a outra. Lembra que o HTTP não tem memória (aula 2.2, seção 4.5)? O cookie é a "etiqueta" que o navegador mostra a cada requisição, dizendo "sou aquele mesmo de antes". O uso mais comum é manter o usuário **logado**.

**Como funciona, passo a passo:**

```
1. Navegador → Servidor:   GET /
2. Servidor  → Navegador:  200 OK
                           Set-Cookie: visitante=dev-carioca; Path=/; SameSite=Lax   ← "guarde isto"
3. O navegador guarda o cookie.
4. Navegador → Servidor:   GET /api/produtos
                           Cookie: visitante=dev-carioca                             ← enviado sozinho!
5. ... e o mesmo acontece em TODAS as requisições seguintes para esse site.
```

Repare que, no passo 4, **ninguém escreveu código** para mandar o cookie: o navegador faz isso sozinho.

**As opções de um cookie** (os pedaços depois do `;` no `Set-Cookie`):

| Opção | O que faz |
|---|---|
| `Path=/` | Para quais caminhos do site o cookie é enviado (`/` = o site inteiro) |
| `Expires` ou `Max-Age` | Até quando o cookie vale. **Sem** essas opções, ele é um *cookie de sessão*: é apagado quando o navegador fecha |
| `HttpOnly` | O **JavaScript da página não consegue ler** o cookie. Ele continua sendo enviado ao servidor normalmente |
| `Secure` | O cookie só é enviado em conexões **HTTPS** (aula 2.2, seção 7) |
| `SameSite` | Controla se o cookie vai junto quando a requisição parte de **outro site**. O valor `Lax` (o padrão dos navegadores) já bloqueia boa parte dos ataques; você vai entender o porquê no Módulo 6 |

**Por que o `HttpOnly` é tão importante?** O JavaScript da página consegue ler os cookies comuns:

```javascript
document.cookie   // "visitante=dev-carioca"  (só os cookies SEM HttpOnly, todos juntos num texto)
```

Se um invasor conseguir rodar um script na sua página (um ataque chamado **XSS**, que você vai estudar no Módulo 6), ele poderia ler um cookie de login e "virar" o usuário. Com o `HttpOnly`, o cookie de login **não aparece** no `document.cookie`, e o script do invasor não consegue roubá-lo.

> ☕ **Você já usou cookies no Java, talvez sem perceber:** quando você usa a `HttpSession` num projeto Spring ou Servlet, o Tomcat cria um cookie chamado **`JSESSIONID`**, `HttpOnly`, com o id da sessão. É ele que faz o servidor saber que a requisição é sua. Para criar um cookie no Java, você usa `response.addCookie(new Cookie("visitante", "dev-carioca"))`, e o `cookie.setHttpOnly(true)` liga a proteção.

**Armadilhas:**
- Cookies são **pequenos** (cerca de 4 KB cada) e vão em **toda** requisição: guardar muita coisa neles deixa o site mais lento.
- Um cookie **sem** `HttpOnly` pode ser lido por qualquer script da página: nunca guarde algo sensível nele.

#### `localStorage` e `sessionStorage`

**O que é:** um "mapa" de **chave → valor**, só de **texto**, que o **JavaScript da página** guarda no navegador. Ao contrário do cookie, ele **não** é enviado ao servidor: o servidor nem fica sabendo que ele existe.

**Para que serve:** guardar coisas que só o front-end precisa: o tema escolhido, um rascunho de formulário, o carrinho de quem ainda não fez login, uma preferência de idioma.

**Como funciona:**

```javascript
localStorage.setItem("tema", "escuro");   // guarda (cria ou substitui)
localStorage.getItem("tema");             // lê → "escuro" (ou null, se a chave não existir)
localStorage.removeItem("tema");          // apaga uma chave
```

- **Só guarda texto.** Para guardar um objeto, converta com `JSON.stringify` ao salvar e com `JSON.parse` ao ler (aula 1.6).
- **Cada site tem o seu.** O `localStorage` é separado por **origem** (o conjunto protocolo + domínio + porta, aula 2.2): o de `localhost:3001` é diferente do de `localhost:3000`, e um site não enxerga o de outro.
- **`localStorage` x `sessionStorage`:** os dois funcionam do mesmo jeito (`setItem`, `getItem`...). A diferença é quanto tempo duram: o `localStorage` fica guardado **até alguém apagar**, mesmo fechando o navegador; o `sessionStorage` é apagado quando a **aba** fecha.

> ☕ Pense num `Map<String, String>` que sobrevive ao fechamento do programa, salvo no disco. No Java, a coisa mais parecida é a classe `java.util.prefs.Preferences`, que guarda preferências do usuário em pares chave → valor.

**Armadilhas:**
- **Qualquer** script da página consegue ler o `localStorage`, inclusive o de um invasor (o mesmo XSS). Por isso, guardar o token de login ali é uma decisão de segurança que você vai discutir na aula 6.1.
- Como só guarda texto, esquecer o `JSON.stringify` ao salvar um objeto grava a string `"[object Object]"`.

#### Comparando os três

| | Cookie | `localStorage` | `sessionStorage` |
|---|---|---|---|
| Quem cria | Normalmente o **servidor** (`Set-Cookie`) | O **JavaScript** da página | O **JavaScript** da página |
| Vai para o servidor? | **Sim**, automaticamente, em toda requisição | Não | Não |
| O JavaScript consegue ler? | Sim, **exceto** os `HttpOnly` | Sim | Sim |
| Até quando dura | Até a validade (ou até fechar o navegador) | Até alguém apagar | Até a aba fechar |
| Tamanho | ~4 KB por cookie | ~5 MB por site | ~5 MB por site |

#### Na aba Application

- **Storage → Local storage** e **Session storage:** mostram as chaves e os valores guardados por cada site. Dá para editar um valor com dois cliques ou apagá-lo.
- **Storage → Cookies:** mostra os cookies de cada site, com o nome, o valor e as colunas das opções (`HttpOnly`, `Secure`, `SameSite`, a validade...).
- **Storage → Clear site data:** apaga tudo o que o site guardou. É útil para testar a página "como um visitante novo".

Você vai usar o `localStorage` na prática na aula 4.3, e vai decidir onde guardar o token de login (cookie `HttpOnly` ou `localStorage`) na aula 6.1.

### 6.6 🔍 Para conhecer: as outras abas e ferramentas

- **Device toolbar** (o ícone de celular, ou **Ctrl+Shift+M** com o DevTools aberto): simula telas de celulares e tablets. Você vai usá-lo muito na aula 3.9 (responsividade).
- **Lighthouse:** faz uma auditoria da página e dá notas de desempenho, acessibilidade, boas práticas e SEO (o quanto a página é fácil de ser encontrada e entendida pelo Google), com sugestões do que melhorar.
- **Performance:** grava tudo o que o navegador fez durante alguns segundos (JavaScript, layout, paint) e mostra onde o tempo foi gasto. Ele também mostra as **Core Web Vitals**, as três métricas que o Google usa para avaliar a experiência de uma página: **LCP** (quanto tempo o maior conteúdo leva para aparecer), **INP** (quanto tempo a página demora para responder a um clique) e **CLS** (quanto o conteúdo "pula" de lugar enquanto carrega). Você vai voltar a elas na aula 9.12.
- **React DevTools:** uma extensão para o Chrome que mostra a árvore de **componentes** React, e não só a do DOM. Você vai instalá-la no Módulo 7.
- **IA no DevTools:** o Chrome tem um assistente de IA opcional, que precisa ser ativado, para explicar erros, estilos e requisições. Também existe um servidor **MCP** do DevTools (o MCP é um padrão para conectar ferramentas a agentes de IA, que você vai estudar na aula 10.6), que permite que um agente de IA abra a página e investigue o que você está vendo. Uma boa regra, que a aula 2.8 vai detalhar: entenda o problema primeiro, e use a IA para confirmar.

---

## 7. E no React e no Next.js?

- **Você quase nunca vai mexer no DOM diretamente.** No React, você descreve a tela, e ele atualiza o DOM por você, da forma mais econômica possível (seção 4). Mas o **resultado** continua sendo o DOM normal, então tudo desta aula continua valendo: o Elements mostra o que o React criou, e o Console mostra os erros dos seus componentes.
- **A aba Network é a sua melhor amiga ao integrar com o Spring:** quando um componente não mostrar os dados, confira a requisição antes de qualquer outra coisa.
- **Uma SPA com o Vite x uma página com o Next.js** (seção 5): olhe o código-fonte (Ctrl+U) das duas, e você vai ver na prática a diferença entre renderizar no navegador e renderizar no servidor.
- **O `<script type="module">`** do Vite, e os scripts que o Next.js gera, já usam as técnicas da seção 3.2 para não travar o carregamento da página.

---

## 8. 📋 Resumo (cola rápida)

| Conceito | O que é | Paralelo no Java |
|---|---|---|
| V8 | O motor de JavaScript do Chrome (e do Node) | A JVM (JIT + garbage collector) |
| DOM | A árvore de objetos criada a partir do HTML | O `Document` do `org.w3c.dom` (XML) |
| CSSOM | A estrutura com os estilos de cada elemento | — |
| Layout / paint / composite | Calcular posições, pintar pixels, juntar camadas | — |
| `<script>` sem `defer` | Para o parsing e não enxerga o HTML que vem depois | — |
| `defer` / `type="module"` | Baixa em paralelo e roda depois do HTML inteiro | — |
| Main thread | Uma thread só para o JS e a tela | A EDT do Swing |
| Reflow | Recalcular o layout: a alteração mais cara | — |
| Ctrl+U x Elements | O HTML que chegou x o DOM de agora | — |
| Network | Todas as requisições, com status, cabeçalhos e corpos | O log de acesso do Tomcat |
| Sources | O debugger do navegador (F8, F10, F11) | O debugger do IntelliJ (F9, F8, F7) |
| Application | `localStorage`, `sessionStorage` e cookies | — |

**Regras de ouro:**
1. Use `defer` (ou `type="module"`) nos seus scripts.
2. Alterações feitas no Elements são **temporárias**: leve para o código o que funcionar.
3. Com erro na tela, **o Console primeiro**: a mensagem e a linha geralmente já dizem tudo.
4. Com dados que não aparecem, **a Network primeiro**: a requisição saiu? Qual status voltou? O que veio no corpo?
5. Abra o DevTools **antes** de recarregar, senão a Network não registra nada.
6. Não bloqueie a main thread: o que é demorado tem de ser assíncrono (aula 4.4).

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga as instruções. Você vai precisar do [servidor.js](./exercicios/servidor.js) rodando.
