# Exercícios da Aula 3.1: HTML semântico

⏱️ Cerca de 45 minutos. Responda **neste arquivo**, nos espaços marcados com `Resposta:` (cada parte de uma pergunta tem o seu). Quando a pergunta pedir uma fonte, diga a **aula e a seção**.

**A página:** o [antes.html](./antes.html) é a página de um produto da Lojinha, feita só com `<div>`, `<b>`, `<i>` e `<br>`. Na tela, ela parece certa. Você vai medir os problemas dela e criar uma versão semântica, o `depois.html`.

**Para abrir as páginas:** no terminal do IntelliJ, dentro desta pasta (`exercicios`), rode:

```bash
npx vite
```

(Se o npm perguntar `Ok to proceed? (y)`, responda `y`.) Você está usando o Vite (aula 2.7) só como um servidor simples para os arquivos desta pasta. Abra **http://localhost:5173/antes.html** no Chrome. Para parar: **Ctrl+C**.

---

### 1) Medindo a página "antes"

a) Olhe o menu e o texto da página. O que aconteceu com os acentos ("Início", "café")?
Resposta:

No **Console** do DevTools, digite `document.characterSet`. Qual valor aparece? Qual linha falta no `antes.html` para os acentos funcionarem (seção 1)?
Resposta:

b) Ainda no Console, digite `document.compatMode`. Qual valor aparece? (`"BackCompat"` é o modo de compatibilidade; `"CSS1Compat"`, o modo padrão.) Qual linha falta no `antes.html` para o navegador usar o modo padrão?
Resposta:

c) Na aba **Lighthouse**, marque **só** a categoria **Accessibility** e gere o relatório (modo **Navigation**). Qual foi a nota?
Resposta:

Cite **dois** problemas que o relatório listou.
Resposta:

d) Na aba **Elements**, selecione o `<div class="titulo">` ("Caneca do Dev") e abra a aba **Accessibility**, no painel da direita (ao lado de **Styles**; se não aparecer, clique em **»**). Qual é o **Role** (o papel) desse elemento?
Resposta:

Por que um leitor de tela não vai anunciar esse texto como o título da página?
Resposta:

---

### 2) O diagnóstico

Para cada trecho do `antes.html`, diga qual tag semântica deveria estar no lugar (seções 3 a 5):

| Trecho do `antes.html` | Tag semântica |
|---|---|
| `<div class="topo">` | Resposta: |
| `<div class="menu">` e os links dentro dele | Resposta: |
| `<div class="conteudo">` | Resposta: |
| `<div class="produto">` | Resposta: |
| `<div class="titulo">Caneca do Dev</div>` | Resposta: |
| `<div class="subtitulo">` (dentro do produto) | Resposta: |
| Os três `<div>` com "•" | Resposta: |
| `<div class="avaliacao">` | Resposta: |
| `<div class="autor">` | Resposta: |
| `<div class="lateral">` | Resposta: |
| `<div class="rodape">` | Resposta: |
| `<b>` e `<i>` | Resposta: |
| O texto separado por `<br><br>` | Resposta: |
| "Publicado em 06/11/2026" | Resposta: |

Por que cada avaliação é um `<article>`, e "Características" é uma `<section>` (seção 3)?
Resposta:

O nome da loja, "Lojinha do Dev", deve ser o `<h1>` desta página? Por quê (seção 4)?
Resposta:

---

### 3) Criando o `depois.html`, em etapas

Copie o `antes.html` para um arquivo novo, o `depois.html`, na mesma pasta (no IntelliJ: selecione o arquivo, **Ctrl+C** e **Ctrl+V**, e digite o nome novo). Faça as mudanças **no `depois.html`**, uma etapa por vez, e recarregue a página (**http://localhost:5173/depois.html**) depois de cada uma, para conferir se nada quebrou.

> ⚠️ **Mantenha os atributos `class`** de cada elemento: o CSS (dentro do `<style>`) depende deles. Ao trocar um `<div class="titulo">` por um `<h1>`, escreva `<h1 class="titulo">`.

**Etapa 1, o documento:** acrescente o `<!DOCTYPE html>`, o `lang` no `<html>`, e, no começo do `<head>`, a `<meta charset>`, a `<meta name="viewport">` e um `<title>` (seção 1). Sugestão de título: `Caneca do Dev | Lojinha do Dev`.

**Etapa 2, as regiões:** troque os `<div>` de fora por `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>` e `<footer>`. Dentro do `<nav>`, coloque os links numa `<ul>` com um `<li>` para cada link, e apague os `|` que separavam os links. (O `<style>` já tem uma regra que deixa essa lista em linha.)

**Etapa 3, os títulos:** um `<h1>` para o produto; `<h2>` para "Características", "Avaliações" e "Você também pode gostar"; `<h3>` para o nome de quem avaliou. Coloque "Características" e "Avaliações", cada uma com o seu conteúdo, dentro de uma `<section>`.

**Etapa 4, o conteúdo:** os parágrafos em `<p>` (sem os `<br>`), a lista de características numa `<ul>` (sem os "•"), o `<strong>` e o `<em>`, a data num `<time datetime="2026-11-06">`, o `alt` da imagem (seção 5), os links do `<aside>` numa `<ul>` e o texto do rodapé num `<small>`.

a) Em qual etapa a página mais mudou de **aparência**? Por que ela mudou, se você não mexeu no CSS (seção 6, "os estilos padrão do navegador")?
Resposta:

b) Qual texto você escreveu no `alt` da imagem?
Resposta:

---

### 4) Medindo a página "depois"

a) No Console, quais são agora os valores de `document.characterSet` e de `document.compatMode`? Os acentos apareceram certos?
Resposta:

b) Rode o **Lighthouse** de novo, só com **Accessibility**. Qual foi a nota, comparando com a do exercício 1c?
Resposta:

c) Cole todo o conteúdo do `depois.html` no validador do W3C ([validator.w3.org/nu](https://validator.w3.org/nu/#textarea)) e clique em **Check**. Quantos erros apareceram? Se apareceu algum, qual era, e como você corrigiu?
Resposta:

d) Na aba **Elements**, selecione o `<h1>` e veja a aba **Accessibility**. Qual é o **Role** agora? E o do `<nav>`?
Resposta:

---

### 5) 🔍 Desafio opcional: o navegador conserta o seu HTML

Crie um arquivo `teste-p.html` nesta pasta, com:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Teste</title></head>
<body>
  <p>Lista de compras: <ul><li>Café</li><li>Leite</li></ul></p>
</body>
</html>
```

Abra **http://localhost:5173/teste-p.html** e olhe a aba **Elements**. Como o navegador montou o DOM? Quantos `<p>` aparecem? Por quê (seção 6)?
Resposta:
