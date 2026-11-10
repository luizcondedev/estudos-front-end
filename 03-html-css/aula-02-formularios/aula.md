# Aula 3.2: Formulários HTML e validação nativa

> **Por que esta aula importa?** Login, cadastro, busca, checkout: quase toda tela que **recebe** dados do usuário é um formulário, e são eles que alimentam a sua API Spring. No React, você vai usar bibliotecas para formulários (aula 8.4), e no Next.js as Server Actions recebem os dados direto de um `<form>` (aula 9.6). Tudo isso é construído em cima do que esta aula ensina: o atributo `name`, o `<label>`, os tipos de campo e a validação do navegador. E há uma lição de segurança que vale para a carreira inteira: **a validação do navegador é uma ajuda para o usuário, e nunca uma proteção para o servidor**.
>
> ⏱️ **Aula completa, mas curta:** cerca de 30 minutos de leitura e 50 de exercícios.

**Exercícios:** a pasta [exercicios](./exercicios/) tem um servidor que **mostra o que cada formulário enviou**. Você vai observar um envio, consertar um formulário de login com 5 bugs e criar um cadastro com validação. O passo a passo está no [exercicios.md](./exercicios/exercicios.md).

---

## 1. O `<form>`: como os dados saem da página

**O que é:** a tag `<form>` agrupa campos e sabe **enviar os valores deles para um servidor**, sem nenhuma linha de JavaScript.

```html
<form action="/busca" method="get">
  <label for="termo">O que você procura?</label>
  <input type="search" id="termo" name="q">
  <button type="submit">Buscar</button>
</form>
```

| Atributo | O que define |
|---|---|
| `action` | **Para onde** enviar: o caminho no servidor (aula 2.2) |
| `method` | **Como** enviar: `get` (o padrão) ou `post` |

**Como funciona, passo a passo**, quando o usuário clica no botão (ou aperta **Enter** num campo):

1. O navegador **valida** os campos (seção 6). Se algum estiver inválido, ele para aqui.
2. Ele junta os campos **que têm o atributo `name`** em pares `nome=valor`, separados por `&`: `q=caneca&categoria=canecas`.
3. Ele envia os pares para o endereço do `action`:
   - **com `get`:** na URL, depois de um `?` (a *query string* da aula 2.2): `/busca?q=caneca&categoria=canecas`;
   - **com `post`:** no **corpo** da requisição, com o cabeçalho `Content-Type: application/x-www-form-urlencoded`.
4. O navegador **troca a página** pela resposta do servidor.

**GET ou POST?**

| | `get` | `post` |
|---|---|---|
| Onde vão os dados | Na URL | No corpo da requisição |
| Use para | **Buscar e filtrar**: nada muda no servidor. A URL pode ser salva e compartilhada | **Criar ou alterar** algo: login, cadastro, compra |
| Nunca use para | Senhas e dados pessoais: a URL fica no histórico do navegador e nos logs do servidor | — |

> ☕ **No Spring MVC:** o `name` de cada campo é o nome do parâmetro que chega ao servidor: um `name="q"` é lido com `@RequestParam String q`, e um formulário inteiro pode preencher um objeto com `@ModelAttribute`. E repare no formato: **um formulário HTML não envia JSON**. Ele envia `nome=valor&nome=valor`. Quem envia JSON é o JavaScript, com o `fetch` (aula 4.5), e é esse o caso do `@RequestBody` das suas APIs REST.

**Armadilhas:**
- **Campo sem `name` não é enviado.** O `id` serve para o `<label>` e para o CSS; quem identifica o campo para o servidor é o `name`.
- **Sem o `method`, o formulário usa `get`.** Num login, a senha aparece na barra de endereço.

---

## 2. O `<label>`: o rótulo de cada campo

**O que é:** o texto que diz o que o campo é, **ligado ao campo** pelo par `for` + `id`:

```html
<label for="email">E-mail</label>
<input type="email" id="email" name="email">
```

**Para que serve a ligação:**
- **Clicar no rótulo coloca o cursor no campo** (ou marca o checkbox). Isso ajuda muito no celular, onde o alvo do toque fica maior.
- **O leitor de tela anuncia o rótulo** quando o usuário chega ao campo: "E-mail, campo de edição". Sem a ligação, ele só diz "campo de edição".

Existe outra forma de ligar: colocar o campo **dentro** do `<label>`. Ela é a mais prática para checkboxes e radios:

```html
<label><input type="checkbox" name="novidades"> Quero receber novidades</label>
```

**Armadilhas:**
- **O valor do `for` é o `id` do campo**, e não o `name`. (Eles podem ser iguais, e muitas vezes são.)
- **O `placeholder` não substitui o `<label>`.** O `placeholder` é o texto cinza de exemplo dentro do campo (`placeholder="12345-678"`): ele some quando o usuário começa a digitar, e nem todo leitor de tela o anuncia.

---

## 3. O `<input>` e os seus tipos

O atributo `type` muda o comportamento do campo: o que ele aceita, como é validado e qual teclado o celular mostra.

| `type` | Para quê | O que o navegador faz por você |
|---|---|---|
| `text` (o padrão) | Texto livre de uma linha | — |
| `email` | E-mail | Valida o formato; no celular, mostra o teclado com `@` |
| `password` | Senha | Esconde os caracteres |
| `number` | Um número | Só aceita números; tem `min`, `max` e `step` |
| `tel` | Telefone | No celular, mostra o teclado numérico (não valida o formato) |
| `date` | Uma data | Mostra um calendário; envia no formato `2026-11-06` |
| `search` | Uma busca | Como o `text`, com um "x" para limpar |
| `checkbox` | Uma opção de marcar e desmarcar | — |
| `radio` | **Uma** escolha entre várias | Só deixa marcar uma do grupo |
| `hidden` | Um valor que o usuário não vê, mas que é enviado | — |
| `file` 🔍 | Enviar um arquivo | Abre o seletor de arquivos (o `<form>` precisa de `enctype="multipart/form-data"`) |

**Outros atributos úteis:**
- **`value`:** o valor inicial do campo. Nos checkboxes e radios, é o valor **enviado** quando a opção está marcada.
- **`autocomplete`:** diz ao navegador e ao gerenciador de senhas o que o campo guarda, para eles preencherem sozinhos: `autocomplete="email"`, `"name"`, `"current-password"` (login) e `"new-password"` (cadastro).

**Armadilha:** o `type="number"` é para **quantidades** (idade, quantidade de itens). CEP, CPF, telefone e número de cartão **não são quantidades**: use `type="text"`, senão o navegador pode apagar os zeros da frente e mostrar as setinhas de aumentar e diminuir.

---

## 4. Os outros campos

**Checkbox e radio:**

```html
<label><input type="checkbox" name="termos"> Li e aceito os termos</label>

<fieldset>
  <legend>Plano</legend>
  <label><input type="radio" name="plano" value="gratis" checked> Grátis</label>
  <label><input type="radio" name="plano" value="pro"> Pro</label>
</fieldset>
```

- **Os radios de um grupo têm o mesmo `name`** e `value` diferentes. É o `name` igual que faz o navegador deixar só um marcado.
- O atributo **`checked`** deixa a opção marcada desde o início.
- O **`<fieldset>`** agrupa campos relacionados, e a **`<legend>`** é o título do grupo. O leitor de tela lê a legenda junto com cada opção: "Plano, Grátis".

> ⚠️ **Um checkbox desmarcado não é enviado.** O servidor não recebe `termos=false`: o campo simplesmente **não aparece** na requisição. Marcado e sem um `value`, ele chega como `termos=on`. ☕ No Spring, um `@RequestParam boolean termos` sem valor padrão daria erro 400 quando o checkbox viesse desmarcado.

**Lista de opções e texto longo:**

```html
<label for="interesse">O que mais te interessa?</label>
<select id="interesse" name="interesse">
  <option value="canecas">Canecas</option>
  <option value="camisetas">Camisetas</option>
</select>

<label for="mensagem">Mensagem</label>
<textarea id="mensagem" name="mensagem" rows="3"></textarea>
```

- No **`<select>`**, o servidor recebe o **`value`** da opção escolhida (`canecas`), e não o texto que o usuário vê ("Canecas").
- O **`<textarea>`** é o campo de texto com várias linhas. Ele precisa da tag de fechamento, e o valor inicial fica **entre** as tags, e não num atributo `value`.

---

## 5. Os botões

| Botão | O que faz |
|---|---|
| `<button type="submit">` | **Envia** o formulário |
| `<button type="reset">` | Volta todos os campos para o valor inicial |
| `<button type="button">` | **Nada**, sozinho: é o botão para ações com JavaScript (aula 4.2) |

> ⚠️ **A armadilha mais comum dos formulários:** dentro de um `<form>`, um `<button>` **sem** o `type` é um botão de **enviar**. Um botão "Cancelar" ou "Mostrar a senha" sem o `type="button"` envia o formulário quando é clicado. Esse bug aparece muito no React. **Escreva sempre o `type`.**

---

## 6. A validação nativa

**O que é:** atributos que descrevem as regras de cada campo. O navegador confere as regras **antes de enviar** e, se alguma falhar, **bloqueia o envio**, coloca o cursor no primeiro campo com problema e mostra um balão com a mensagem, no idioma do navegador.

```html
<input type="text" name="nome" required minlength="3">
<input type="number" name="idade" required min="18" max="120">
<input type="text" name="cep" pattern="\d{5}-\d{3}" title="Formato: 12345-678">
```

| Atributo | A regra | ☕ No Bean Validation |
|---|---|---|
| `required` | O campo não pode ficar vazio (num checkbox: precisa estar marcado) | `@NotBlank` / `@NotNull` |
| `minlength` / `maxlength` | O tamanho mínimo e o máximo do texto | `@Size(min = 3, max = 50)` |
| `min` / `max` | O menor e o maior valor (números e datas) | `@Min(18)` / `@Max(120)` |
| `type="email"` | O formato de e-mail | `@Email` |
| `pattern` | Uma **expressão regular** (regex: um padrão que descreve o formato de um texto) que o valor **inteiro** precisa seguir | `@Pattern(regexp = "\\d{5}-\\d{3}")` |

**Detalhes que importam:**
- **A regex do `pattern` é escrita quase como no Java**, mas sem as barras duplas, porque aqui ela não está dentro de uma string do Java: `\d{5}-\d{3}` quer dizer cinco dígitos, um hífen e três dígitos. O texto do atributo **`title`** aparece junto com a mensagem de erro: use-o para explicar o formato.
- **Um campo vazio e sem `required` é válido**, mesmo que tenha um `pattern` ou um `minlength`. Essas regras só valem quando o usuário preenche algo. É assim que se faz um campo **opcional com formato**.
- O atributo **`novalidate`** no `<form>` desliga a validação do navegador. As bibliotecas de formulário do React costumam usá-lo, para mostrar as mensagens do jeito delas.

### A regra de ouro: valide sempre no servidor

A validação do navegador melhora a experiência do usuário: ele descobre o erro na hora, sem esperar o servidor. Mas ela **não protege nada**. Qualquer pessoa consegue passar por cima:
- apagando o `required` na aba Elements do DevTools (aula 2.3);
- ou enviando a requisição direto, com o `curl` (aula 2.2), sem nem abrir o navegador.

> ☕ É por isso que o `@Valid` e as anotações do Bean Validation continuam obrigatórios na sua API Spring, **mesmo que o front já valide tudo**. As duas validações não competem: a do front é para o **usuário**, e a do back é para a **segurança dos dados**.

---

## 7. Conferindo no DevTools

Na aba **Network** (com o **Preserve log** marcado, para a lista não ser apagada quando a página troca), clique na requisição do formulário:
- **Aba Payload:** mostra os campos enviados. Num GET, eles aparecem como **Query String Parameters**; num POST, como **Form Data**.
- **Aba Headers:** mostra o método, o status e, num POST, o `Content-Type: application/x-www-form-urlencoded`.

Quando um dado "não chega" ao back-end, esse é o primeiro lugar para olhar: o campo está no Payload? Com o nome certo?

---

## 8. E no React e no Next.js?

- **As mesmas tags, com dois nomes diferentes no JSX:** o `for` do `<label>` vira **`htmlFor`**, e o `class` vira `className` (aula 7.3).
- **No React, o formulário normalmente não troca de página:** o JavaScript intercepta o envio, lê os campos e chama a API com o `fetch`, enviando JSON (aulas 7.7 e 8.2). Os campos, os rótulos e os tipos são os mesmos desta aula.
- **React Hook Form + Zod (aula 8.4):** a biblioteca cuida dos valores e dos erros, e o Zod descreve as regras num lugar só, como as anotações do Bean Validation. As mensagens passam a ser suas, em vez dos balões do navegador.
- **Server Actions do Next.js (aula 9.6):** você escreve `<form action={criarConta}>`, e a função `criarConta` roda **no servidor** e recebe os campos pelo `name`, como nesta aula. É o formulário HTML de volta, com superpoderes.
- **A regra de ouro continua valendo:** a validação no navegador (com o Zod) não dispensa a validação no servidor (o Zod de novo, no Next.js, ou o Bean Validation, no Spring).

---

## 9. 📋 Resumo (cola rápida)

| HTML | O que faz | ☕ No Spring |
|---|---|---|
| `<form action method>` | Envia os campos para o servidor | `@GetMapping` / `@PostMapping` |
| `name="q"` | O nome do campo na requisição | `@RequestParam String q` |
| `method="get"` | Dados na URL: buscas e filtros | `@GetMapping` |
| `method="post"` | Dados no corpo: criar e alterar | `@PostMapping` + `@ModelAttribute` |
| `<label for="id">` | O rótulo ligado ao campo | — |
| `required`, `minlength`, `min`, `pattern` | A validação do navegador | `@NotBlank`, `@Size`, `@Min`, `@Pattern` |
| `<button type="submit">` | Envia o formulário | — |
| `<button type="button">` | Não envia: é para ações com JavaScript | — |

**Regras de ouro:**
1. Todo campo tem um `name` (para o servidor) e um `<label>` ligado (para as pessoas).
2. `get` para buscar, `post` para criar e alterar. Senha nunca vai num `get`.
3. Todo `<button>` dentro de um `<form>` tem o `type` escrito.
4. Radios do mesmo grupo têm o mesmo `name`.
5. Escolha o `type` certo do `<input>`: o navegador valida e ajuda o usuário de graça.
6. **A validação do navegador é para o usuário; a do servidor é para a segurança. Faça sempre as duas.**

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga o passo a passo. Você vai precisar do [servidor.js](./exercicios/servidor.js) rodando.
