# Aula 1.6: Tratamento de erros e JSON

> **Por que esta aula importa?** Num sistema FullStack, o front e o back conversam o tempo todo, e essa conversa **pode falhar**: a API cai, o usuário digita algo inválido, a resposta vem num formato inesperado. Esta aula ensina as duas ferramentas para lidar com isso:
> 1. **Tratamento de erros**: como lançar, capturar e organizar erros sem esconder bugs.
> 2. **JSON**: o formato de texto em que o seu back-end Spring e o seu front Angular trocam dados.

**Como rodar os exemplos:** crie um `testes.js` nesta pasta e rode `node testes.js`.

---

# Parte 1: Tratamento de erros

## 1. Revisão rápida: `throw` e `try/catch`

Na aula 1.5 (seção 4.3) você viu o básico, que é quase igual ao Java:

```javascript
function sacar(saldo, valor) {
  if (valor > saldo) throw new Error("Saldo insuficiente");
  return saldo - valor;
}

try {
  sacar(100, 500);
  console.log("esta linha não executa");
} catch (e) {
  console.log("Erro:", e.message); // "Erro: Saldo insuficiente"
}
```

- `throw` **interrompe** a função na hora e "lança" o erro para cima.
- O erro vai subindo pelas funções que chamaram, até encontrar um `try/catch`.
- Se ninguém capturar, o programa **para** e mostra o erro no terminal.

> ☕ Exatamente como no Java: a exceção sobe pela pilha de chamadas até achar um `catch`. Se não achar, a thread morre com o stack trace.

Agora vamos a fundo.

---

## 2. O objeto `Error`

### 2.1 O que tem dentro de um erro

`new Error("mensagem")` cria um **objeto** com três propriedades principais:

```javascript
const erro = new Error("Saldo insuficiente");

console.log(erro.name);    // "Error"              → o tipo do erro
console.log(erro.message); // "Saldo insuficiente" → a mensagem que você passou
console.log(erro.stack);   // o "stack trace": onde o erro foi criado e por quais funções passou
```

O `stack` é um texto parecido com este:

```
Error: Saldo insuficiente
    at sacar (C:\...\testes.js:2:27)
    at Object.<anonymous> (C:\...\testes.js:7:3)
```

> ☕ Comparação com o `Throwable` do Java:
>
> | Java | JavaScript |
> |---|---|
> | `e.getMessage()` | `e.message` |
> | `e.getClass().getSimpleName()` | `e.name` |
> | `e.printStackTrace()` | `console.log(e.stack)` (ou só `console.log(e)`) |

### 2.2 Os tipos de erro que o próprio JS lança

Além do `Error` genérico, o JavaScript tem **subclasses** de erro, que ele mesmo lança quando algo dá errado. Você já esbarrou em quase todos:

| Tipo | Quando acontece | Exemplo | Parecido em Java |
|---|---|---|---|
| `TypeError` | Operação com o **tipo** errado: ler propriedade de `null`/`undefined`, chamar algo que não é função | `null.nome`, `const f = 5; f()` | `NullPointerException`, `ClassCastException` |
| `ReferenceError` | Usar uma variável que **não existe** (ou na TDZ, aula 1.4) | `console.log(naoExiste)` | Erro de compilação ("cannot find symbol") |
| `RangeError` | Valor **fora do intervalo** permitido | `"abc".repeat(-1)` (o `repeat(n)` repete o texto n vezes, e -1 vezes não existe), recursão infinita (aula 1.5) | `IllegalArgumentException`, `StackOverflowError` |
| `SyntaxError` | Código ou texto com **sintaxe inválida** | `JSON.parse("{nome: 'Ana'}")` | Erro de compilação |

Todos são subclasses de `Error`, então todos têm `name`, `message` e `stack`.

> ☕ Repare que, em Java, `ReferenceError` e `SyntaxError` seriam **erros de compilação**: o programa nem rodaria. Em JS, eles só aparecem quando aquela linha é executada (com uma exceção importante que você vai ver na aula 1.7, nos imports). É mais um motivo pelo qual o TypeScript existe.

Você também pode lançar esses tipos quando fizer sentido:

```javascript
function definirIdade(idade) {
  if (typeof idade !== "number") throw new TypeError("Idade deve ser um número");
  if (idade < 0 || idade > 150) throw new RangeError("Idade fora do intervalo válido");
  return idade;
}
```

---

## 3. `try`, `catch` e `finally`

### 3.1 O fluxo de execução, passo a passo

```javascript
try {
  // 1. tenta executar este bloco
} catch (e) {
  // 2. só executa SE der erro no try
} finally {
  // 3. SEMPRE executa, dando erro ou não
}
```

Veja os dois caminhos possíveis:

```javascript
function testar(valor) {
  try {
    console.log("A: início do try");
    if (valor < 0) throw new Error("negativo");
    console.log("B: fim do try");
  } catch (e) {
    console.log("C: catch", e.message);
  } finally {
    console.log("D: finally");
  }
  console.log("E: depois de tudo");
}

testar(5);   // A, B, D, E      → sem erro: o catch é pulado
testar(-5);  // A, C, D, E      → com erro: o resto do try (B) é pulado
```

| Situação | O que executa |
|---|---|
| Sem erro | `try` inteiro → `finally` → o que vem depois |
| Com erro capturado | `try` até o erro → `catch` → `finally` → o que vem depois |
| Com erro **não** capturado (sem `catch`, ou o `catch` lança de novo) | `try` até o erro → `finally` → o erro continua subindo |

### 3.2 Para que serve o `finally`?

Para código de **limpeza** que precisa rodar de qualquer jeito: fechar uma conexão, esconder um indicador de "carregando...", liberar um recurso.

```javascript
function carregarDados() {
  console.log("Mostrando 'Carregando...'");
  try {
    // buscar dados (pode dar erro)
  } finally {
    console.log("Escondendo 'Carregando...'"); // roda mesmo se a busca falhar
  }
}
```

O `finally` roda **até se o `try` tiver um `return`**:

```javascript
function exemplo() {
  try {
    return "valor do try";
  } finally {
    console.log("finally roda antes de a função realmente retornar");
  }
}

console.log(exemplo());
// "finally roda antes de a função realmente retornar"
// "valor do try"
```

> ☕ **Idêntico ao Java**, inclusive o `try/finally` sem `catch`. A única coisa que o JS não tem é o *try-with-resources* (`try (var x = ...)`); no JS, a limpeza é feita manualmente no `finally`.

> ⚠️ **Nunca coloque `return` dentro do `finally`.** Ele substitui o `return` do `try` e **engole** qualquer erro que estivesse subindo. Em Java é a mesma armadilha (e o compilador até avisa).

---

## 4. Um único `catch`, sem tipo: como tratar erros diferentes

### 4.1 A diferença para o Java

Em Java, você escolhe **quais** exceções capturar pelo tipo:

```java
try {
    processar();
} catch (IllegalArgumentException e) {
    // trata só este tipo
} catch (IOException | SQLException e) {
    // multi-catch
}
// qualquer outro tipo continua subindo sozinho
```

Em JS, **só existe um `catch`, e ele captura qualquer erro**. Não dá para escrever `catch (TypeError e)`.

### 4.2 A solução: `instanceof` + relançar

Você captura tudo, verifica o tipo com `instanceof` (aula 1.5) e **relança** (`throw e`) o que não souber tratar:

```javascript
try {
  processar();
} catch (e) {
  if (e instanceof RangeError) {
    console.log("Valor fora do intervalo:", e.message); // trato este
  } else {
    throw e; // não sei tratar: deixo continuar subindo
  }
}
```

> ☕ O `throw e` dentro do `if/else` reproduz o que o Java faz automaticamente: as exceções que você não declarou no `catch` continuam subindo.

### 4.3 ⚠️ O pior erro: "engolir" erros

```javascript
try {
  processar();
} catch (e) {
  // vazio, ou só um console.log("deu ruim")
}
```

Isso esconde **todos** os erros, inclusive os bugs de programação (um `TypeError` por erro de digitação, por exemplo). O programa continua rodando com dados errados, e você não descobre onde está o problema.

> ☕ É o mesmo *anti-pattern* do `catch (Exception e) {}` em Java. A regra é a mesma nas duas linguagens: **capture só o que você sabe tratar; o resto, deixe subir.**

### 4.4 `catch` sem variável

Quando você realmente não precisa do objeto do erro, pode omitir o `(e)`:

```javascript
function ehJsonValido(texto) {
  try {
    JSON.parse(texto);
    return true;
  } catch {
    return false; // aqui não importa QUAL foi o erro, só que deu erro
  }
}
```

Use isso só quando a resposta "deu erro ou não" for tudo o que importa, como neste caso.

---

## 5. Erros customizados

### 5.1 Para que servem?

Para **diferenciar** os erros do seu domínio ("o usuário digitou um preço inválido") dos erros de programação ("leu uma propriedade de `null`"), e para **carregar dados extras** junto com o erro.

### 5.2 Como criar: uma classe que estende `Error`

Com o que você aprendeu na aula 1.5:

```javascript
class ValidacaoError extends Error {
  constructor(mensagem, campo) {
    super(mensagem);              // o construtor de Error guarda a mensagem
    this.name = "ValidacaoError"; // senão o name continuaria "Error"
    this.campo = campo;           // dado extra: qual campo está inválido
  }
}

function validarIdade(idade) {
  if (typeof idade !== "number") {
    throw new ValidacaoError("Idade deve ser um número", "idade");
  }
}

try {
  validarIdade("vinte");
} catch (e) {
  if (e instanceof ValidacaoError) {
    console.log(`Campo "${e.campo}": ${e.message}`); // Campo "idade": Idade deve ser um número
  } else {
    throw e;
  }
}
```

> ☕ É o seu `class ValidacaoException extends RuntimeException` do Java. A diferença: em JS, você precisa definir o `this.name` manualmente; em Java, o nome da classe já aparece sozinho no stack trace.

### 5.3 Encadeando erros com `cause`

Às vezes você captura um erro técnico e quer lançar um erro mais claro, **sem perder o original**:

```javascript
function lerConfiguracao(texto) {
  try {
    return JSON.parse(texto);
  } catch (e) {
    throw new Error("Arquivo de configuração inválido", { cause: e });
  }
}

try {
  lerConfiguracao("isso não é JSON");
} catch (e) {
  console.log(e.message);        // "Arquivo de configuração inválido"
  console.log(e.cause.name);     // "SyntaxError" → o erro original continua acessível
}
```

> ☕ É o `throw new RuntimeException("Arquivo de configuração inválido", e)` do Java, com o `getCause()` virando `e.cause`.

---

## 6. Diferenças importantes em relação ao Java

### 6.1 Não existem *checked exceptions*

Em Java, um método que lança `IOException` precisa declarar `throws IOException`, e quem chama é **obrigado** a tratar. Em JS (e também em TypeScript), **nada obriga ninguém a tratar erro nenhum**. Toda exceção do JS se comporta como uma `RuntimeException`.

Consequência: é sua responsabilidade saber quais funções podem lançar erros. Por isso, vale deixar isso claro no nome ou num comentário (ex.: `validarProduto` deixa claro que pode recusar o produto).

### 6.2 Dá para lançar qualquer coisa (mas não faça isso)

Em Java, você só pode lançar um `Throwable`. Em JS, o `throw` aceita **qualquer valor**:

```javascript
throw "Saldo insuficiente";     // uma string 😱
throw 42;                       // um número 😱
```

Isso "funciona", mas o que chega no `catch` é a string pura: sem `message`, sem `name` e sem `stack`.

```javascript
try {
  throw "Saldo insuficiente";
} catch (e) {
  console.log(e.message); // undefined (uma string não tem a propriedade message)
}
```

**Regra:** sempre lance um `Error` (ou uma subclasse dele): `throw new Error("...")`.

### 6.3 Erro não capturado: o que acontece?

- **No Node:** o programa para e mostra o stack trace no terminal.
- **No navegador:** o erro aparece no Console do DevTools e **aquela ação** para (a página continua aberta, mas o botão que você clicou, por exemplo, não completa o que devia).

---

## 7. Quando lançar um erro e quando não

Nem toda "falha" precisa ser uma exceção:

| Situação | O que fazer | Exemplo |
|---|---|---|
| Algo **normal** pode não existir | Retornar `undefined`/`null` (e o chamador usa `?.` e `??`) | `find` não achou o produto: é um resultado esperado |
| Dado **inválido** que não deveria chegar ali | Lançar um erro | Preço negativo no setter, quantidade zero no carrinho |
| Você precisa **juntar vários problemas** para mostrar ao usuário | Retornar um objeto de resultado | Validar um formulário inteiro e listar todos os campos com erro |

> ☕ É a mesma discussão do Java: `Optional` para "pode não ter", exceção para "isto não deveria acontecer". O `find` do JS devolvendo `undefined` faz o papel do `Optional.empty()`.

---

## 8. Validando números de verdade: `Number.isFinite`

Na aula 1.5, você viu que esta validação tem um buraco:

```javascript
if (valor <= 0) throw new Error("Preço inválido");
// undefined <= 0 → false, então undefined PASSA
```

A solução com `typeof` tem **outro** buraco, porque o `NaN` ("not a number", aula 1.3) é, ironicamente, do tipo `number`:

```javascript
typeof NaN;      // "number" 😱
NaN <= 0;        // false → passaria pela validação
```

A forma mais segura é o **`Number.isFinite`**, que só retorna `true` para números "de verdade": não aceita texto, `undefined`, `null`, `NaN` nem `Infinity`.

```javascript
Number.isFinite(10);         // true
Number.isFinite(-3.5);       // true
Number.isFinite("10");       // false (é texto)
Number.isFinite(undefined);  // false
Number.isFinite(NaN);        // false
Number.isFinite(Infinity);   // false

function validarPreco(preco) {
  if (!Number.isFinite(preco) || preco <= 0) {
    throw new RangeError("Preço deve ser um número maior que zero");
  }
}
```

> ☕ É o `Double.isFinite(valor)` do Java. A diferença é que, em Java, o compilador já garante que é um `double`; em JS, o `Number.isFinite` também faz esse papel de checar o tipo.

> ⚠️ Existe também um `isFinite` global (sem o `Number.` na frente), mas ele **converte** o valor antes: `isFinite("10")` dá `true`. Use sempre o `Number.isFinite`.

---

## 9. E no Angular?

Você vai tratar erros principalmente na comunicação com a API:

- O `HttpClient` do Angular transforma respostas de erro do servidor (404, 500...) num objeto de erro próprio, o `HttpErrorResponse`, que você captura e trata (aula 8.6).
- **Interceptors** (aula 8.7) centralizam o tratamento: por exemplo, redirecionar para o login sempre que a API responder 401.
- Com `async/await` (Módulo 4), o tratamento de erros assíncronos usa exatamente o `try/catch` desta aula.

---

# Parte 2: JSON

## 10. O que é JSON?

**JSON** (*JavaScript Object Notation*) é um **formato de texto** para representar dados. É o formato padrão de troca de dados entre front-end e back-end: quando o seu Spring Boot retorna um objeto num `@RestController`, o Jackson o transforma em JSON, e o Angular recebe esse texto.

A sintaxe vem dos objetos literais do JS, mas é **mais restrita**:

```json
{
  "nome": "Batata",
  "preco": 8.5,
  "disponivel": true,
  "fornecedor": null,
  "tags": ["verdura", "orgânico"]
}
```

### 10.1 Objeto JS x JSON: as diferenças

| | Objeto JS | JSON |
|---|---|---|
| O que é | Um **valor** na memória | Um **texto** (uma string) |
| Chaves | Com ou sem aspas | **Sempre** com aspas duplas: `"nome"` |
| Strings | `'simples'`, `"duplas"` ou `` `crase` `` | **Só aspas duplas** |
| Valores permitidos | Qualquer coisa | Só string, number, boolean, `null`, objeto e array |
| `undefined`, funções, `NaN` | Permitidos | **Não existem** |
| Vírgula sobrando no final | Permitida | **Proibida** |
| Comentários | Permitidos | **Proibidos** |

> ☕ No Java, você nunca manipula o texto JSON na mão: o **Jackson** (o `ObjectMapper` que o Spring usa) faz a conversão entre objetos e texto. No JS, essa conversão é feita por duas funções nativas: `JSON.stringify` e `JSON.parse`.

---

## 11. `JSON.stringify`: de valor para texto

### 11.1 O básico

```javascript
const produto = { nome: "Batata", preco: 8.5, tags: ["verdura"] };

const texto = JSON.stringify(produto);
console.log(texto);        // '{"nome":"Batata","preco":8.5,"tags":["verdura"]}'
console.log(typeof texto); // "string"
```

> ☕ É o `objectMapper.writeValueAsString(produto)`.

**Formatado, para leitura humana** (o terceiro argumento é o número de espaços da indentação; o segundo você vai ver na seção 11.4, e `null` significa "nenhum"):

```javascript
console.log(JSON.stringify(produto, null, 2));
// {
//   "nome": "Batata",
//   "preco": 8.5,
//   "tags": [
//     "verdura"
//   ]
// }
```

### 11.2 ⚠️ O que se perde na conversão

Como o JSON só aceita alguns tipos de valor, o `stringify` **descarta ou transforma** o resto, **sem avisar**:

| Valor | Num objeto | Num array |
|---|---|---|
| `undefined` | A propriedade **some** | Vira `null` |
| Função (método) | A propriedade **some** | Vira `null` |
| `NaN`, `Infinity` | Vira `null` | Vira `null` |
| `Map`, `Set` | Vira `{}` (vazio!) | Vira `{}` |

```javascript
const exemplo = {
  nome: "Batata",
  desconto: undefined,
  calcular() { return 1; },
  preco: NaN,
  lista: [1, undefined],
};

JSON.stringify(exemplo);
// '{"nome":"Batata","preco":null,"lista":[1,null]}'
```

E alguns valores **lançam erro**:
- Um objeto que referencia a si mesmo (referência circular) → `TypeError: Converting circular structure to JSON`.
- Um `BigInt` → `TypeError`.

### 11.3 ⚠️ Instâncias de classe: só os campos públicos

O `stringify` só inclui as propriedades **públicas guardadas no próprio objeto**. Ficam de fora:
- campos privados (`#preco`);
- getters (eles ficam na classe, e não em cada objeto, lembra da seção 8.2 da aula 1.5?);
- métodos.

```javascript
class Produto {
  #preco;
  constructor(nome, preco) {
    this.nome = nome;
    this.#preco = preco;
  }
  get preco() {
    return this.#preco;
  }
}

JSON.stringify(new Produto("Arroz", 15.99)); // '{"nome":"Arroz"}' 😱 o preço sumiu!
```

Isso também acontece com os **erros**: a `message` de um `Error` fica de fora do `stringify`. Se precisar enviar um erro como JSON, monte o objeto manualmente: `{ nome: e.name, mensagem: e.message }`.

### 11.4 Controlando o que sai: `toJSON` e a lista de campos

**`toJSON()`:** se o objeto tiver um método com esse nome, o `stringify` usa **o que ele retornar** no lugar do objeto.

```javascript
class Produto {
  #preco;
  constructor(nome, preco) {
    this.nome = nome;
    this.#preco = preco;
  }
  get preco() {
    return this.#preco;
  }
  toJSON() {
    return { nome: this.nome, preco: this.#preco };
  }
}

JSON.stringify(new Produto("Arroz", 15.99)); // '{"nome":"Arroz","preco":15.99}' ✅
```

> ☕ Cumpre o papel do `@JsonValue` ou de um serializer customizado do Jackson.

**Lista de campos permitidos (o segundo argumento):** um array com os nomes das propriedades que podem sair. Todo o resto é descartado.

```javascript
const usuario = { nome: "Ana", email: "ana@email.com", senha: "123456" };

JSON.stringify(usuario, ["nome", "email"]); // '{"nome":"Ana","email":"ana@email.com"}'
```

> ☕ É a ideia oposta do `@JsonIgnore`: em vez de marcar o que **não** sai, você lista o que **sai**. Útil para não vazar dados sensíveis, como a senha.

---

## 12. `JSON.parse`: de texto para valor

### 12.1 O básico

```javascript
const texto = '{"nome":"Batata","preco":8.5}';

const produto = JSON.parse(texto);
console.log(produto.nome);     // "Batata"
console.log(typeof produto);   // "object"
```

> ☕ É o `objectMapper.readValue(texto, ...)`.

### 12.2 ⚠️ Texto inválido lança `SyntaxError`

```javascript
JSON.parse("{nome: 'Batata'}"); // ❌ SyntaxError: chave sem aspas e string com aspas simples
JSON.parse('{"a": 1,}');        // ❌ SyntaxError: vírgula sobrando
JSON.parse("");                 // ❌ SyntaxError: Unexpected end of JSON input
```

Por isso, **sempre que o texto vier de fora** (de uma API, de um arquivo, de algo que o usuário digitou), envolva o `JSON.parse` num `try/catch`:

```javascript
function lerJsonOuNull(texto) {
  try {
    return JSON.parse(texto);
  } catch (e) {
    if (e instanceof SyntaxError) return null; // JSON inválido: um caso esperado aqui
    throw e;
  }
}
```

### 12.3 ⚠️ O resultado é um objeto simples, e não uma instância da classe

```javascript
class Cliente {
  constructor(nome) {
    this.nome = nome;
  }
  saudacao() {
    return `Olá, ${this.nome}!`;
  }
}

const texto = JSON.stringify(new Cliente("Ana")); // '{"nome":"Ana"}'
const dados = JSON.parse(texto);

dados.nome;                 // "Ana"
dados instanceof Cliente;   // false 😱
dados.saudacao;             // undefined: o método não existe, porque o JSON não guarda métodos
```

O `JSON.parse` não sabe nada sobre a sua classe: ele só cria objetos `{ }` e arrays `[ ]`. Se você precisar da instância, **reconstrua** com o `new`:

```javascript
const cliente = new Cliente(dados.nome);
cliente.saudacao(); // "Olá, Ana!" ✅
```

> ☕ **Diferença importante:** no Java, você **informa a classe** para o Jackson (`readValue(texto, Cliente.class)`), e ele cria a instância. No JS, o `JSON.parse` não tem como receber a classe. É por isso que, no Angular, os dados que chegam da API normalmente **ficam como objetos simples**, descritos por uma `interface` do TypeScript (aula 1.5, seção 8.4), em vez de virar instâncias de classe.

> 🔍 **Para conhecer:** o `JSON.parse` aceita um segundo argumento, o *reviver*, uma função que transforma cada valor durante a leitura. É usado, por exemplo, para converter textos de data de volta em objetos de data. Você raramente vai precisar dele no Angular.

---

## 13. Cópia profunda: o truque antigo

Você vai encontrar este código em projetos mais antigos:

```javascript
const copia = JSON.parse(JSON.stringify(original)); // cópia profunda "na gambiarra"
```

Ele funciona para dados simples, mas carrega **todas as perdas da seção 11.2**: some com `undefined`, com métodos e com campos privados, transforma `NaN` em `null` etc. Hoje, use o **`structuredClone`** (aula 1.2, seção 4.5), que foi criado justamente para isso.

---

## 14. E no Angular?

- O `HttpClient` faz o `JSON.stringify` do que você **envia** e o `JSON.parse` do que você **recebe**, automaticamente. Você trabalha direto com objetos.
- O `localStorage` do navegador (aula 4.3) só guarda **texto**, então para guardar objetos você vai usar `JSON.stringify` para salvar e `JSON.parse` para ler.
- As **interfaces** do TypeScript (Módulo 5) servem para descrever o formato do JSON que chega da sua API.

---

## 15. 📋 Resumo (cola rápida)

| Conceito | JavaScript | Java |
|---|---|---|
| Lançar | `throw new Error("msg")` | `throw new RuntimeException("msg")` |
| Mensagem / tipo / stack | `e.message` / `e.name` / `e.stack` | `getMessage()` / `getClass()` / `printStackTrace()` |
| Capturar por tipo | um `catch` + `instanceof` + `throw e` | vários `catch (Tipo e)` |
| Sempre executar | `finally` | `finally` (igual) |
| Erro customizado | `class X extends Error` + `this.name` | `class X extends RuntimeException` |
| Encadear | `new Error("msg", { cause: e })` | `new RuntimeException("msg", e)` |
| Checked exceptions | não existem | `throws` obrigatório |
| Validar número | `Number.isFinite(x)` | `Double.isFinite(x)` |
| Objeto → JSON | `JSON.stringify(obj)` | `mapper.writeValueAsString(obj)` |
| JSON → objeto | `JSON.parse(texto)` (objeto simples) | `mapper.readValue(texto, X.class)` (instância) |
| Personalizar a saída | `toJSON()`, lista de campos | `@JsonValue`, `@JsonIgnore` |

**Regras de ouro:**
1. Sempre lance um `Error` (ou subclasse), nunca uma string.
2. Capture só o que você sabe tratar; **relance** o resto com `throw e`. Nunca deixe um `catch` vazio.
3. Use erros customizados para separar erros do seu domínio dos bugs de programação.
4. Para validar números, use `Number.isFinite`.
5. O `JSON.stringify` descarta `undefined`, métodos, getters e campos `#privados` **sem avisar**.
6. `JSON.parse` de texto que vem de fora vai **sempre** dentro de `try/catch`, e o resultado é um objeto simples, e não uma instância da sua classe.

---

## ✍️ Exercícios

Abra o [exercicios.js](./exercicios.js), resolva os TODOs e rode:

```bash
node exercicios.js
```
