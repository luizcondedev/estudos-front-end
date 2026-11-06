# Aula 3.1: HTML semântico e a estrutura de um documento

> **Por que esta aula importa?** No React, você vai escrever HTML o tempo todo (o JSX é HTML dentro do JavaScript). Escolher a tag certa não é perfumaria: é o que faz o leitor de tela de uma pessoa cega entender a página (aula 3.3), o que ajuda o Google a encontrar o seu site (aula 3.4) e o que deixa o código fácil de ler para o próximo dev. Uma página feita só de `<div>` funciona na tela, mas é como um código Java em que todas as variáveis se chamam `obj`: roda, mas ninguém entende.
>
> ⏱️ **Aula enxuta:** cerca de 25 minutos de leitura e 45 de exercícios. Você já viu o básico de tags e atributos na seção 0 da aula 2.3; aqui, o foco é **qual tag usar para cada coisa**.

**Exercícios:** a pasta [exercicios](./exercicios/) tem uma página da Lojinha feita só com `<div>`. Você vai transformá-la numa página semântica e medir a diferença com o DevTools.

---

## 1. A estrutura de todo documento HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Caneca do Dev | Lojinha do Dev</title>
  <link rel="stylesheet" href="estilos.css">
  <script src="app.js" defer></script>
</head>
<body>
  <!-- o conteúdo visível -->
</body>
</html>
```

Cada linha tem um motivo, e esquecer uma delas tem consequências que você vai ver nos exercícios:

| Linha | O que faz | Se faltar... |
|---|---|---|
| `<!DOCTYPE html>` | Diz ao navegador que é HTML moderno | O navegador entra no **modo de compatibilidade** (*quirks mode*), que imita bugs de navegadores dos anos 90, e o CSS se comporta de um jeito estranho |
| `<html lang="pt-BR">` | O idioma da página | O leitor de tela pode ler o texto com a pronúncia de outro idioma, e o tradutor do navegador se confunde |
| `<meta charset="UTF-8">` | A **codificação** dos caracteres: como os bytes do arquivo viram letras | Os acentos podem quebrar: "Início" vira "InÃ­cio". Ela precisa estar entre as primeiras linhas do `<head>` |
| `<meta name="viewport" ...>` | Diz ao celular para usar a largura real da tela | O celular mostra a página "de longe", minúscula, como se fosse um computador (aula 3.9) |
| `<title>` | O texto da aba e do resultado do Google | A aba mostra o endereço do arquivo, e o Google não tem um título para mostrar |

> ☕ A codificação é a mesma ideia do `StandardCharsets.UTF_8` do Java: se quem grava o arquivo usa UTF-8 e quem lê acha que é outra codificação (como a antiga `windows-1252`), os acentos viram lixo. A `<meta charset>` é o jeito de o arquivo **avisar** qual codificação usou.

---

## 2. O que é HTML semântico

**O que é:** usar cada tag pelo **significado** do conteúdo, e não pela aparência. Um título é um `<h1>`, e não um `<div>` com letra grande; uma lista é um `<ul>`, e não vários `<div>` com "•" na frente.

**Para que serve:**
- **Acessibilidade:** um leitor de tela (o programa que lê a página em voz alta para pessoas cegas) anuncia "título nível 1", "lista com 3 itens", "navegação". Com tudo em `<div>`, ele só lê um texto corrido, sem estrutura. Esses usuários também pulam de título em título com o teclado, como você usa o índice de um livro.
- **SEO:** o Google entende melhor o que é o assunto principal da página (aula 3.4).
- **Código legível:** `<nav>` diz o que é; `<div class="menu">` depende de você ler a classe.
- **Comportamento de graça:** um `<button>` já funciona com o teclado, e um `<a>` já abre em outra aba com o botão do meio do mouse. Imitar isso com `<div>` dá trabalho, e quase sempre fica incompleto.

> ☕ **Pense em nomes no Java:** `Map<String, List<Pedido>> pedidosPorCliente` diz muito mais que `Object dados`. As tags semânticas são os "nomes bons" do HTML. E o `<div>` continua existindo, para o que **não** tem significado: uma caixa só para o layout. Ele é o `Object` do HTML: use quando nada mais específico servir.

**A aparência é trabalho do CSS.** Toda tag pode ficar com qualquer aparência: um `<h1>` pode ter letra pequena, e uma lista pode ficar sem bolinhas. Por isso, **escolha a tag pelo significado** e ajuste a aparência no CSS.

---

## 3. As tags da estrutura da página

Estas tags dividem a página em **regiões** (também chamadas de *landmarks*, os "marcos" que o leitor de tela lista para o usuário navegar):

```html
<body>
  <header>                     <!-- o topo: a marca e o menu -->
    <nav>...</nav>             <!-- os links principais de navegação -->
  </header>

  <main>                       <!-- o conteúdo principal: UM por página -->
    <article>                  <!-- um conteúdo completo em si mesmo -->
      <section>...</section>   <!-- uma parte do artigo, com um título -->
    </article>
    <aside>...</aside>         <!-- um conteúdo relacionado, mas secundário -->
  </main>

  <footer>...</footer>         <!-- o rodapé -->
</body>
```

| Tag | Use para | Exemplos |
|---|---|---|
| `<header>` | O cabeçalho da página (ou de um `<article>`) | A marca e o menu; o título e a data de um post |
| `<nav>` | Um bloco de **links de navegação** | O menu principal, o "você está em: Início > Canecas" |
| `<main>` | O conteúdo principal, o que é único desta página. **Só um** por página | Tudo o que não é topo, menu nem rodapé |
| `<article>` | Um conteúdo **completo em si mesmo**, que faria sentido sozinho, fora da página | Um post, um produto, um comentário, um card de notícia |
| `<section>` | Uma **parte** de um conteúdo, que tem um título próprio | "Características", "Avaliações" |
| `<aside>` | Um conteúdo **relacionado, mas secundário** | "Você também pode gostar", uma barra lateral |
| `<footer>` | O rodapé da página (ou de um `<article>`) | Direitos autorais, links de contato |
| `<div>` | Nada disso: uma caixa **só para o layout** | Um grupo de elementos que o CSS precisa alinhar |

**Article ou section?** Faça o teste: "isso faria sentido sozinho, copiado para outro site?". Um produto ou uma avaliação, sim: `<article>`. "Características", sozinha, não faz sentido: é uma `<section>` do produto.

**Armadilhas:**
- **Nem todo grupo de links é um `<nav>`:** os links de um texto comum ficam no `<p>`. O `<nav>` é para os blocos de **navegação** principais.
- **Toda `<section>` deve ter um título** (`<h2>`, `<h3>`...). Se não tem um título, provavelmente é só um `<div>`.

---

## 4. Títulos: `<h1>` a `<h6>`

Os títulos formam o **sumário** da página, como os capítulos de um livro:

```html
<h1>Caneca do Dev</h1>              <!-- o assunto da página: UM por página -->
  <h2>Características</h2>
  <h2>Avaliações</h2>
    <h3>Ana</h3>                    <!-- um subtítulo dentro de "Avaliações" -->
    <h3>Bruno</h3>
```

**As regras:**
1. **Um `<h1>` por página**, com o assunto principal. Numa página de produto, é o nome do produto, e não o nome da loja.
2. **Não pule níveis:** depois de um `<h2>`, o próximo nível é o `<h3>`, e não o `<h4>`. Os leitores de tela usam esses níveis para montar o sumário.
3. **Não escolha o nível pelo tamanho da letra.** Se o `<h2>` ficou grande demais, diminua com o CSS.

---

## 5. As tags de conteúdo

| Tag | Use para | Em vez de |
|---|---|---|
| `<p>` | Um parágrafo | Texto solto com `<br><br>` para dar espaço |
| `<ul>` + `<li>` | Uma lista **sem** ordem | `<div>`s com "•" |
| `<ol>` + `<li>` | Uma lista **com** ordem (passo a passo, ranking) | `<div>`s com "1.", "2." |
| `<strong>` | Um texto **importante** (o leitor de tela pode dar ênfase) | `<b>`, que só deixa em negrito |
| `<em>` | Uma **ênfase** que muda o sentido da frase ("eu *não* disse isso") | `<i>`, que só deixa em itálico |
| `<a href="...">` | Um link: leva a outro lugar | Um `<span>` ou um `<div>` com JavaScript para navegar |
| `<button>` | Uma **ação** na mesma página (abrir, enviar, adicionar ao carrinho) | Um `<a>` ou um `<div>` clicável |
| `<img src alt>` | Uma imagem | — |
| `<figure>` + `<figcaption>` | Uma imagem (ou um código, um gráfico) com uma **legenda** | Um `<div>` com um texto embaixo |
| `<time datetime="2026-11-06">` | Uma data ou hora, com a versão "para máquinas" no `datetime` | Um texto solto |
| `<small>` | Letras miúdas: avisos legais, direitos autorais | — |
| `<br>` | Uma quebra de linha **dentro** do texto (um endereço, um poema) | — |

**A regra do `<a>` x `<button>`:** se leva a **outro endereço**, é um `<a>`. Se faz algo **nesta página**, é um `<button>`. Você vai usar muito essa regra no React.

**O texto alternativo (`alt`) das imagens:**
- **Descreva o que a imagem mostra**, como se estivesse contando para alguém ao telefone: `alt="Caneca verde com o símbolo </> estampado em branco"`.
- **Não comece com "imagem de"** ou "foto de": o leitor de tela já avisa que é uma imagem.
- **Imagem só decorativa** (um enfeite, um ícone repetido ao lado de um texto que já diz tudo): use o `alt=""` **vazio**, para o leitor de tela pular. Vazio é diferente de ausente: **sem** o `alt`, o leitor de tela lê o nome do arquivo ("caneca ponto svg").

**Os caracteres especiais (entidades):** alguns caracteres têm significado no HTML e precisam de um "código" para aparecer como texto: `&lt;` para `<`, `&gt;` para `>` e `&amp;` para `&`. Os outros, como acentos e o `©`, podem ser digitados direto, desde que o arquivo esteja em UTF-8.

---

## 6. Bloco x em linha

Cada tag tem um comportamento padrão na tela, que você vai mudar com o CSS no Módulo 3:

- **Blocos** começam numa linha nova e ocupam a largura toda: `<div>`, `<p>`, `<h1>`, `<ul>`, `<section>`, `<header>`...
- **Elementos em linha** ficam no meio do texto, ocupando só o espaço do conteúdo: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`, `<time>`...

**Os estilos padrão do navegador:** cada tag também vem com uma aparência de fábrica. O `<h1>` tem letra grande e margens em cima e embaixo, o `<p>` tem margens, e a `<ul>` tem as bolinhas e um recuo à esquerda. Por isso, ao trocar um `<div>` por um `<h2>` ou por um `<p>`, a página muda de aparência mesmo sem você mexer no CSS. No DevTools, esses estilos aparecem no painel **Styles** com a etiqueta **user agent stylesheet** (a "folha de estilos do navegador"), e o seu CSS pode mudar todos eles.

**Armadilha:** um `<p>` **não pode** ter blocos dentro, como um `<div>` ou um `<ul>`. Se você escrever `<p>texto <ul>...</ul></p>`, o navegador **fecha o `<p>` sozinho** antes da lista, e o DOM fica diferente do que você escreveu. Você só descobre isso olhando a aba Elements (aula 2.3).

---

## 7. Conferindo o seu HTML

- **Validador do W3C** ([validator.w3.org/nu](https://validator.w3.org/nu/#textarea)): cole o HTML e ele lista os erros (tags não fechadas, atributos obrigatórios faltando, tags no lugar errado).
- **DevTools → Elements → a aba Accessibility** (no painel da direita, ao lado de Styles): mostra como o leitor de tela "enxerga" o elemento selecionado: o papel (*role*), como `heading` ou `navigation`, e o nome que ele vai ler.
- **Lighthouse → Accessibility** (aula 2.3): dá uma nota e lista os problemas, como as imagens sem `alt` e a página sem `lang`.

---

## 8. E no React e no Next.js?

- **O JSX usa as mesmas tags**, com poucas diferenças: `class` vira `className`, o `for` do `<label>` vira `htmlFor` (aula 3.2), e toda tag precisa ser fechada, inclusive as vazias (`<img />`, `<br />`). Você vai ver isso na aula 7.3.
- **Os componentes não substituem a semântica:** um componente `<Cabecalho>` do React vira, na tela, o HTML que você escreveu dentro dele. Se dentro dele tiver só `<div>`, a página continua sem semântica.
- **No Next.js, o `<html lang>` fica no `layout.tsx`**, e o `<title>` e as `<meta>` são gerados pela *Metadata API* (aula 9.9), em vez de escritos à mão.
- **O shadcn/ui** (aula 8.7) já gera componentes com as tags e os atributos de acessibilidade corretos. Mesmo assim, entender o que ele gera é o que te permite conferir e ajustar.

---

## 9. 📋 Resumo (cola rápida)

| Pergunta | Tag |
|---|---|
| O topo da página? | `<header>` |
| O menu principal? | `<nav>` (com uma `<ul>` de links) |
| O conteúdo principal? | `<main>` (um por página) |
| Faz sentido sozinho (produto, post, comentário)? | `<article>` |
| É uma parte com título? | `<section>` |
| É secundário, relacionado? | `<aside>` |
| O rodapé? | `<footer>` |
| O assunto da página? | `<h1>` (um só) |
| Leva a outro endereço? | `<a>` |
| Faz uma ação nesta página? | `<button>` |
| É importante? | `<strong>` |
| Nada disso, só layout? | `<div>` (ou `<span>`, dentro de um texto) |

**Regras de ouro:**
1. Escolha a tag pelo **significado**; a aparência é trabalho do CSS.
2. Todo documento tem `<!DOCTYPE html>`, `lang`, `charset`, `viewport` e `<title>`.
3. Um `<h1>` por página, e sem pular níveis de título.
4. Toda imagem tem `alt`: descritivo, ou vazio se for decorativa.
5. Link leva a outro lugar (`<a>`); botão faz uma ação (`<button>`).
6. O `<div>` é a última opção, e não a primeira.

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga o passo a passo.
