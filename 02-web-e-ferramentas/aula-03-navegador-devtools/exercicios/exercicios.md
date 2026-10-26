# Exercícios da Aula 2.3: Como o navegador funciona + DevTools

Escreva as respostas **neste arquivo**, nos espaços marcados com `Resposta:`.

> ⏱️ **Obrigatórios: 2, 5, 6, 7 e 9** (cerca de 1 hora). Os marcados com 🔍 são opcionais: faça se tiver tempo ou curiosidade.

> ⚠️ **Antes de dizer que terminou**, procure por `Resposta:` vazio neste arquivo (no IntelliJ: **Ctrl+F**). Várias perguntas têm **mais de uma parte** (o quê, qual e por quê): responda todas. Respostas em branco foram o que mais tirou nota nas últimas aulas.

---

## Parte 1: conceitos

### 1) 🔍 Opcional: o caminho da renderização

Coloque as etapas na ordem em que o navegador as executa (seção 2 da aula), e diga em uma frase o que cada uma faz:

`Paint` · `Construir o CSSOM` · `Layout` · `Composite` · `Construir o DOM` · `Render tree`

Resposta:

### 2) Prever: onde está o `<script>`?

Nos quatro casos abaixo, o `app.js` tem só esta linha:

```javascript
document.querySelector("#titulo").textContent = "Olá!";
```

Para cada caso, diga se o texto do `<h1>` muda para "Olá!" ou se dá erro. Se der erro, diga qual e por quê (seções 0.3, 3.1 e 3.2 da aula).

```html
<!-- Caso A -->
<head><script src="app.js"></script></head>
<body><h1 id="titulo">Título</h1></body>

<!-- Caso B -->
<head><script src="app.js" defer></script></head>
<body><h1 id="titulo">Título</h1></body>

<!-- Caso C -->
<head></head>
<body><h1 id="titulo">Título</h1><script src="app.js"></script></body>

<!-- Caso D -->
<head><script src="app.js" type="module"></script></head>
<body><h1 id="titulo">Título</h1></body>
```

Resposta A: Vai dar erro, pois estamos lendo o Script antes de gerar a DOM, então #titulo vai dar Null

Resposta B: O texto muda, pois usamos o defer então ele espera todo o HTML ser lido antes de ler o Script

Resposta C: O texto muda, pois estamos passando o script no final do HTML, então ele reconhece tudo que foi lido antes dele 

Resposta D: O texto muda também, pois usamos o type="module" 

### 3) 🔍 Opcional: o custo de mudar a página

a) Para cada alteração feita pelo JavaScript, diga se ela causa **reflow** (layout + paint + composite), só **repaint** (paint + composite) ou só **composite** (seção 4 da aula):

| Alteração | O que o navegador refaz |
|---|---|
| Trocar a cor de um texto | Resposta: |
| Adicionar 10 itens novos numa lista | Resposta: |
| Aumentar a largura de uma caixa | Resposta: |
| Mover um elemento com `transform` numa animação | Resposta: |

b) Um botão da página executa um `for` que demora 5 segundos para terminar. O que acontece com a página durante esses 5 segundos? Qual é o equivalente disso numa aplicação Swing, e qual é a solução em cada linguagem (seção 3.3)?
Resposta:

### 4) 🔍 Opcional: o HTML que chegou x o DOM de agora

a) Você abre uma SPA feita com React e Vite e aperta **Ctrl+U**. Quase não tem nada no código-fonte: só um `<div id="root"></div>` e um `<script>`. Mas a tela está cheia de produtos. Como isso é possível?
Resposta:

b) O que muda se essa mesma loja for feita com **Next.js**? E por que isso importa para o Google encontrar os produtos (seção 5)?
Resposta:

---

## Parte 2: investigando a Lojinha com o DevTools

A pasta `publico` tem um site pequeno, a **Lojinha do Dev**, que deveria mostrar uma lista de produtos vindos de uma API. Ela tem **dois bugs**. Você vai encontrá-los e consertá-los usando o DevTools, como faria num projeto real.

**Para rodar:** no terminal do IntelliJ, de dentro desta pasta (`exercicios`):

```bash
node servidor.js
```

Depois, abra **http://localhost:3001** no Chrome (ou no Edge). Para parar o servidor: **Ctrl+C**.

> ⚠️ Abra o DevTools (**F12**) **antes** de recarregar a página, senão a aba Network não registra as requisições. E deixe marcado o **Disable cache** na aba Network, para o navegador sempre baixar a versão mais nova dos arquivos que você alterar.

### 5) Bug 1: o Console

Abra a Lojinha com o DevTools aberto na aba **Console**.

a) O que aparece na página? O texto "Esta mensagem deveria mudar quando o JavaScript rodar." mudou?
Resposta: Uma imagem que nao carregou e o texto "Esta mensagem deveria mudar quando o javascript rodar"

b) Copie aqui a mensagem de erro **em vermelho** que fala do `app.js`, com o arquivo e a linha que aparecem à direita dela. Depois, clique nesse link e veja qual linha do código ele abre.
Resposta: Uncaught TypeError: Cannot set properties of null (setting 'textContent')
at app.js:13:22 e clicando no link abre o app.js na linha 13 (inclusive com um x em vermelho, que passando o mouse encima indica qual o erro)

c) Explique a causa do erro com as suas palavras, usando a seção 3.1 da aula. Dica: olhe **onde** está a tag `<script>` no `index.html`.
Resposta: A causa do bug é que o Script está dentro do Head da página, sem usar o defer ou o type="module", entao ele não está esperando o HTML carregar antes de executar o Script, resultando na variável mensagem como null

d) Vá na aba **Network** e recarregue a página. A requisição para `api/produtos` aparece na lista? Por quê? (Dica: o que acontece com o resto de um script quando uma linha lança um erro? Aula 1.6.)
Resposta: Não, pois como o erro não foi tratado, todo o Script para de rodar

e) **Conserte** o bug acrescentando **uma palavra** na tag `<script>` do `index.html` (seção 3.2). Recarregue a página e veja a mensagem mudar para "Carregando produtos...".

### 6) Bug 2: a Network

Depois do conserto, a página fica parada em "Carregando produtos...", e aparece **outro** erro no Console.

a) Copie a mensagem do novo erro, com o arquivo e a linha. (A mensagem começa com "Uncaught (in promise)": o "in promise" aparece porque o erro aconteceu dentro de uma função assíncrona, um assunto da aula 4.4. Para este exercício, o que importa é o resto da mensagem.)
Resposta: ncaught (in promise) TypeError: produtos is not iterable
at carregarProdutos (app.js:25:25)

b) Na aba **Network**, clique no filtro **Fetch/XHR** e depois na requisição `produtos`. Preencha com o que você encontrar nas abas **Headers** e **Timing**:

| Informação | Valor            |
|---|------------------|
| Método | Resposta: GET    |
| Status | Resposta: 200    |
| `Content-Type` da resposta | Resposta: application/json |
| Quanto tempo levou (aproximadamente) | Resposta: 1.51s  |

c) Agora abra a aba **Preview** dessa requisição. Quais campos o JSON da resposta tem? E qual campo o `app.js` está tentando ler, na linha 23?
Resposta: O JSON tem dados é um array de objetos e o total,  e o JS está tentando ler produtos

d) Explique por que isso gera o erro do item a. (Lembre da aula 1.3: o que dá ler uma propriedade que não existe? E o `for...of` consegue percorrer esse valor?)
Resposta: Pq o código atual está retornando undefined, e não tem como iterar um undefined

e) **Conserte** o bug mudando **uma linha** do `app.js`. Recarregue: os 4 produtos devem aparecer, e a mensagem deve virar "4 produtos carregados.".

f) Ainda na Network (sem o filtro Fetch/XHR, clique em **All**), existe uma requisição **em vermelho**. Qual é o arquivo, qual é o status, e quem pediu esse arquivo (coluna **Initiator**)? Por que a página funciona mesmo com esse erro?
Resposta: logo.png, com status 404 (Not Found) e foi pedido pelo index.html, a página funciona porque mesmo com Erros o HTML é lido e a DOM é gerada

g) Clique nas requisições do `estilos.css` e do `app.js` e veja o cabeçalho `Content-Type` de cada resposta. Quais são? Por que o servidor precisa mandar o tipo certo (aula 2.2, seção 4.4)?
Resposta: text/css e text/javascript, é importante para que o navegador (cliente) consiga saber com que tipo de arquivo ele está lidando, por exemplo enviar um json como texto simples, pode fazer o navegador renderizar o json como texto, ao invés de lidar como uma estrutura de dados. 

### 7) Elements e o código-fonte

a) Aperte **Ctrl+U** para ver o código-fonte da Lojinha. Quantos `<li>` existem dentro do `<ul id="lista-produtos">`? Agora vá na aba **Elements** e expanda o `<ul>`: quantos `<li>` existem ali? Por que os números são diferentes?
Resposta: No codigo fonte tem nenhum e no Elements tem 4, isso se dá porque a DOM foi manipulada pelo Javascript, e o codigo-fonte, mostra o código antes da manipulação da DOM> 

b) Use o seletor (**Ctrl+Shift+C**) e clique no card do Café. No painel **Styles**, procure a regra `.card` (o seletor de classe da seção 0.2): qual é o valor do `padding`? Confira no desenho do box model.
Resposta: 16 em todos os lados

c) Ainda com o card selecionado, vá na aba **Console** e digite `$0`. O que aparece? Depois digite `document.querySelectorAll("li").length`. Qual é o resultado?
Resposta: li.card e depois aparece o numero 4, que e o total de li que tem na pagina. 

d) De volta ao **Elements**, dê dois cliques no nome "Café Torrado 500 g" e troque por outro texto. Depois, no **Styles**, mude a cor da regra `.card .preco` para `red`. A página mudou? Agora recarregue a página (F5): o que aconteceu com as suas mudanças, e por quê?
Resposta: Sim, e depois que atualiza a página tudo some, pois no element as mudanças ficam apenas no navegador e não vão para o código. 

### 8) 🔍 Opcional: Sources, o debugger do navegador

a) Na aba **Sources**, abra o `app.js` (atalho **Ctrl+P**, digite `app.js`). Coloque um breakpoint na linha 23 (clicando no número da linha) e recarregue a página. A execução para ali. No painel **Scope**, expanda a variável `json`: quais são os valores de `total` e de `dados.length`?
Resposta:

b) Antes de continuar, procure a variável `produtos` no Scope: qual é o valor dela agora? Aperte **F10** (step over) uma vez: qual é o valor dela depois? Por que ela mudou?
Resposta:

c) No painel **Call Stack**, qual é o nome da função em que a execução está parada?
Resposta:

d) Aperte **F8** para continuar. No IntelliJ, quais seriam os atalhos para o "continuar" e para o "step over" (seção 6.4)?
Resposta:

### 9) Application: o que a Lojinha guarda no navegador

Antes de começar, leia a seção 6.5 da aula inteira: ela explica os cookies e o `localStorage`.

a) Na aba **Application**, abra **Local storage → http://localhost:3001**. Qual chave e qual valor estão guardados? Qual linha do `app.js` guarda esse valor?
Resposta: ultimaVisita: 26/10/2026, 16:57:33, isso e guardado na linha 17 do app.js

b) Dê dois cliques no valor e troque por `ontem`. Recarregue a página. O valor continuou `ontem`? Por quê?
Resposta: Não, pois o JS está sobrescrevendo esse valor sempre que é executado 

c) Abra **Cookies → http://localhost:3001**. Quais são os nomes dos dois cookies? Qual deles tem a coluna **HttpOnly** marcada?
Resposta: Sessao e Visitante, o que tem a coluna marcada é o sessao. 

d) Vá no **Console** e digite `document.cookie`. Qual cookie aparece? Por que o outro não aparece, e por que isso protege um token de login (seção 6.5)?
Resposta: aparece o visitante, pois como o outro é HTTPonly, o JS não consegue interagir com ele, fazendo com que um invasor não consiga fazer um ataque XSS e se passe pelo usuário.  

e) Na aba **Network**, clique na primeira requisição da lista (a do documento, `localhost`), e procure nos **Response Headers** o cabeçalho que fez o navegador guardar esses cookies. Qual é o nome desse cabeçalho?
Resposta: Set-Cookie

### 10) 🔍 Desafio opcional: internet lenta, Lighthouse e celular

a) Na aba **Network**, troque o "No throttling" por **Slow 4G** e recarregue. Quanto tempo leva, mais ou menos, até os produtos aparecerem? Volte para "No throttling" no final.
Resposta: 1.52s 

b) Na aba **Lighthouse**, gere um relatório da página (modo **Navigation**). Qual nota apareceu em **Performance** e em **Accessibility**? Cite uma sugestão que o relatório deu.
Resposta: Deu 100 e 100, ele recomendou usar um tempo de cache mais eficiente. 

c) Ative o **Device toolbar** (**Ctrl+Shift+M**) e escolha um celular na lista de cima. A Lojinha fica boa numa tela de celular?
Resposta: Teste em um iPhone 16, eu apenas melhoraria o cabeçalho da página, mas a lista ficou bem formatada, então no geral ficou boa sim!! 
