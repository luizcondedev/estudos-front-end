# Aula 1.3: Truthy/falsy, `null` x `undefined`, `?.` e `??`, métodos de array e ordenação

> **Ideia central da aula:** em Java, o compilador te protege de muita coisa (tipos, `boolean` obrigatório no `if`, `NullPointerException` explícita). Em JavaScript, a linguagem é bem mais "permissiva", e esta aula mostra as ferramentas para lidar com isso **sem bugs**.

**Como rodar os exemplos:** crie um `testes.js` nesta pasta e rode `node testes.js`.

---

## 1. Truthy e falsy

### 1.1 O que é?

Em **Java**, o `if` só aceita `boolean`:

```java
String nome = "";
if (nome) { }            // ❌ não compila: String não é boolean
if (!nome.isEmpty()) { } // ✅ você precisa ser explícito
```

Em **JavaScript**, o `if` aceita **qualquer valor**. O JS converte o valor para `true` ou `false` automaticamente. Valores que viram `false` são chamados de **falsy**; os que viram `true`, de **truthy**.

### 1.2 A lista de falsy (decore, são poucos!)

| Valor | Tipo |
|---|---|
| `false` | boolean |
| `0`, `-0` | number |
| `0n` | bigint |
| `""` (string vazia) | string |
| `null` | null |
| `undefined` | undefined |
| `NaN` | number ("not a number") |

**Todo o resto é truthy.** Inclusive estes, que pegam muita gente:

```javascript
if ("0")     console.log("truthy!");  // string NÃO vazia → truthy
if ("false") console.log("truthy!");  // string NÃO vazia → truthy
if ([])      console.log("truthy!");  // array vazio → truthy 😱
if ({})      console.log("truthy!");  // objeto vazio → truthy 😱
```

> ⚠️ **Armadilha para quem vem do Java:** para checar se um array está vazio, não use `if (lista)`. Use `if (lista.length === 0)`, que é o equivalente ao `lista.isEmpty()` do Java.

### 1.3 Para que serve?

Para escrever checagens curtas:

```javascript
const nome = "";

if (!nome) {
  console.log("Nome é obrigatório"); // entra: "" é falsy
}
```

Isso substitui, numa linha só, o que em Java seria `if (nome == null || nome.isEmpty())`.

**Convertendo explicitamente para boolean:**

```javascript
Boolean("texto"); // true
Boolean(0);       // false
!!"texto";        // true  (dupla negação: um atalho comum para Boolean())
```

### 1.4 Os operadores `&&` e `||` não retornam boolean!

Em Java, `a && b` sempre retorna `boolean`. Em JS, eles retornam **um dos valores**:

- `a || b`: retorna `a` se `a` for truthy; senão, retorna `b`.
- `a && b`: retorna `a` se `a` for falsy; senão, retorna `b`.

```javascript
console.log("Luiz" || "Anônimo");  // "Luiz"
console.log("" || "Anônimo");      // "Anônimo"
console.log("Luiz" && "Olá!");     // "Olá!"
console.log(null && "Olá!");       // null
```

Isso é muito usado para **valor padrão** e **execução condicional**:

```javascript
const nomeExibido = nomeDigitado || "Anônimo";   // valor padrão
usuarioLogado && console.log("Bem-vindo!");     // só executa se estiver logado
```

Mas o `||` tem um problema sério, que veremos na seção 3.

---

## 2. `null` x `undefined`

### 2.1 Por que existem dois "vazios"?

Em Java existe só o `null`. Em JS, existem dois:

| | `undefined` | `null` |
|---|---|---|
| Significado | "**ainda não** tem valor" | "**intencionalmente** vazio" |
| Quem coloca | Normalmente **o próprio JS** | Normalmente **o programador** |
| `typeof` | `"undefined"` | `"object"` (um bug histórico da linguagem, nunca corrigido) |

**Onde o `undefined` aparece sozinho:**

```javascript
let x;
console.log(x);                 // undefined: variável declarada sem valor

const produto = { nome: "Batata" };
console.log(produto.preco);     // undefined: propriedade que não existe

function semRetorno() {}
console.log(semRetorno());      // undefined: função sem return (como um void do Java)

function saudar(nome) { return nome; }
console.log(saudar());          // undefined: parâmetro não enviado

const lista = [1, 2, 3];
console.log(lista[10]);         // undefined: índice inexistente
```

> ☕ **Comparação com Java:** em Java, `lista.get(10)` lança `IndexOutOfBoundsException`, e chamar `saudar()` sem argumento nem compila. Em JS, ambos "funcionam" e devolvem `undefined`. Silenciosamente. É por isso que o **TypeScript** (Módulo 5) existe: trazer de volta as proteções do compilador que você tem em Java.

**Onde o `null` aparece:** quando alguém **escolhe** colocá-lo.

```javascript
let usuarioLogado = null;            // "ninguém logado" (decisão consciente)
document.querySelector(".naoExiste"); // null: a API do navegador decidiu retornar null
```

Na prática, as APIs JSON do seu back-end Spring vão mandar `null` (o Jackson serializa `null` do Java como `null` no JSON).

### 2.2 Comparando

```javascript
null === undefined;  // false (tipos diferentes)
null == undefined;   // true  (a ÚNICA exceção em que o == é aceitável)

// Checar "nem null nem undefined":
if (valor == null) { }                         // pega os dois (atalho conhecido)
if (valor === null || valor === undefined) { } // mesma coisa, explícito
```

> Regra do curso: continue usando **sempre `===`**. Se quiser checar os dois de uma vez, prefira o `??` e o `?.` das próximas seções.

---

## 3. Optional chaining (`?.`) e nullish coalescing (`??`)

### 3.1 O problema: o "NullPointerException" do JS

```javascript
const usuario = { nome: "Luiz", endereco: null };

console.log(usuario.endereco.cidade);
// 💥 TypeError: Cannot read properties of null (reading 'cidade')
```

É o mesmo `NullPointerException` do Java, com outro nome. Em Java você faria:

```java
String cidade = null;
if (usuario.getEndereco() != null) {
    cidade = usuario.getEndereco().getCidade();
}
```

### 3.2 `?.`: optional chaining

O `?.` diz: *"se o que está à esquerda for `null` ou `undefined`, pare aqui e devolva `undefined`; senão, continue normalmente"*.

```javascript
console.log(usuario.endereco?.cidade);  // undefined (sem erro!)
```

Funciona em vários formatos:

```javascript
obj?.propriedade         // propriedade
obj?.[variavel]          // propriedade com colchetes
obj.metodo?.()           // chama o método só se ele existir
lista?.[0]               // índice de um array que pode ser null
usuario?.endereco?.rua   // encadeado: para no primeiro null/undefined
```

> ☕ **Comparação com Java:** é parecido com o `Optional`:
> ```java
> Optional.ofNullable(usuario.getEndereco()).map(Endereco::getCidade)
> ```
> Mas no JS é nativo da linguagem e muito mais curto. (Kotlin e C# têm exatamente esse mesmo `?.`.)

### 3.3 `??`: nullish coalescing (valor padrão)

O `??` diz: *"se o que está à esquerda for `null` ou `undefined`, use o valor da direita"*.

```javascript
const cidade = usuario.endereco?.cidade ?? "Não informada";
console.log(cidade); // "Não informada"
```

> ☕ **Comparação com Java:** é o `Optional.orElse(...)` ou o `Objects.requireNonNullElse(valor, padrao)`.

### 3.4 `??` x `||`: a diferença que causa bugs

- `||` usa o padrão quando a esquerda é **falsy** (`0`, `""`, `false`, `null`, `undefined`, `NaN`).
- `??` usa o padrão **só** quando a esquerda é `null` ou `undefined`.

```javascript
const produto = { nome: "Batata", estoque: 0, desconto: 0, descricao: "" };

produto.estoque || 10;    // 10 ❌ BUG: o estoque é 0 de verdade!
produto.estoque ?? 10;    // 0  ✅

produto.descricao || "Sem descrição";  // "Sem descrição"
produto.descricao ?? "Sem descrição";  // ""
```

**Qual usar?**
- Quer um padrão só quando **não existe valor** → `??` (é o caso mais comum).
- Quer um padrão também quando o valor é **vazio/zero** → `||` (faça isso conscientemente).

### 3.5 Atribuição lógica: `??=`, `||=` e `&&=`

Atalhos para "atribua só se...":

```javascript
const config = { tema: null, idioma: "pt-BR" };

config.tema ??= "claro";      // tema é null → atribui "claro"
config.idioma ??= "en";       // idioma já tem valor → não muda

// É o mesmo que:
if (config.tema == null) config.tema = "claro";
```

> ☕ Lembra do `map.putIfAbsent(chave, valor)` ou `computeIfAbsent` do Java? A ideia é a mesma.

---

## 4. Mais métodos de array (e seus equivalentes na Stream API)

Você já conhece `map`, `filter` e `reduce`. Pense neles como a **Stream API** do Java, só que direto no array, sem `.stream()` e sem `.collect()`.

Vamos usar esta lista em todos os exemplos:

```javascript
const produtos = [
  { id: 1, nome: "Batata", preco: 8, categoria: "VERDURA" },
  { id: 2, nome: "Coca Cola", preco: 13.99, categoria: "BEBIDA" },
  { id: 3, nome: "Arroz", preco: 15.99, categoria: "GRAOS" },
  { id: 4, nome: "Feijão", preco: 9.5, categoria: "GRAOS" },
];
```

### 4.1 Tabela de equivalências com Java

| JavaScript | Java (Stream/List) | Retorna |
|---|---|---|
| `lista.map(fn)` | `stream().map(fn).toList()` | Novo array |
| `lista.filter(fn)` | `stream().filter(fn).toList()` | Novo array |
| `lista.reduce(fn, inicial)` | `stream().reduce(inicial, fn)` | Um valor |
| `lista.find(fn)` | `stream().filter(fn).findFirst()` | O item ou `undefined` |
| `lista.findIndex(fn)` | (não tem direto; `IntStream` + filtro) | Índice ou `-1` |
| `lista.findLast(fn)` | (não tem direto) | Último item que bate ou `undefined` |
| `lista.some(fn)` | `stream().anyMatch(fn)` | `boolean` |
| `lista.every(fn)` | `stream().allMatch(fn)` | `boolean` |
| `lista.includes(valor)` | `lista.contains(valor)` | `boolean` |
| `lista.indexOf(valor)` | `lista.indexOf(valor)` | Índice ou `-1` |
| `lista.forEach(fn)` | `lista.forEach(fn)` | `undefined` |
| `lista.join(", ")` | `String.join(", ", lista)` / `Collectors.joining` | String |
| `lista.flatMap(fn)` | `stream().flatMap(fn)` | Novo array |
| `Object.groupBy(lista, fn)` | `Collectors.groupingBy(fn)` | Objeto |

### 4.2 `find` e `findIndex`

```javascript
const arroz = produtos.find(p => p.nome === "Arroz");
console.log(arroz); // { id: 3, nome: "Arroz", ... }

const inexistente = produtos.find(p => p.nome === "Café");
console.log(inexistente); // undefined (não lança exceção!)

const indice = produtos.findIndex(p => p.id === 3); // 2
const naoAchou = produtos.findIndex(p => p.id === 99); // -1
```

**Combinando com o que aprendemos na seção 3:**

```javascript
const precoCafe = produtos.find(p => p.nome === "Café")?.preco ?? 0;
// find devolve undefined → ?. não quebra → ?? usa 0
```

> ☕ Em Java: `produtos.stream().filter(...).findFirst().map(Produto::getPreco).orElse(0.0)`. Mesma lógica, sintaxe bem menor.

> ⚠️ **`find` x `filter`:** `find` devolve **o primeiro item** (ou `undefined`); `filter` devolve **um array** (que pode ser vazio). Não confunda!

### 4.3 `some` e `every`

```javascript
produtos.some(p => p.preco > 15);   // true  → existe ALGUM acima de 15?
produtos.every(p => p.preco > 0);   // true  → TODOS têm preço positivo?
produtos.every(p => p.preco > 10);  // false → a Batata custa 8
```

Ambos **param assim que sabem a resposta** (como o `anyMatch`/`allMatch` do Java), então são mais eficientes do que um `filter(...).length > 0`.

### 4.4 `includes` e `indexOf`

Usados com **valores simples** (strings, números):

```javascript
const categorias = ["VERDURA", "BEBIDA", "GRAOS"];

categorias.includes("BEBIDA");  // true
categorias.indexOf("GRAOS");    // 2
categorias.indexOf("CARNE");    // -1
```

> ⚠️ **Com objetos, `includes` compara REFERÊNCIA** (lembra da aula 1.2?):
> ```javascript
> produtos.includes({ id: 1, nome: "Batata", preco: 8, categoria: "VERDURA" }); // false!
> ```
> Em Java, `contains` usa o `.equals()`, que você pode sobrescrever. **Em JS não existe `equals`**: para buscar objetos, use `some` ou `find` comparando um campo (como o `id`).

### 4.5 `forEach` x `for...of`

Os dois percorrem o array:

```javascript
produtos.forEach(p => console.log(p.nome));

for (const p of produtos) {
  console.log(p.nome);
}
```

> ☕ `for...of` é o **for-each do Java** (`for (Produto p : produtos)`).

**Diferenças importantes:**
- `forEach` **não pode ser interrompido**: `break` não funciona e `return` só pula para o próximo item (como um `continue`).
- `for...of` aceita `break` e `continue` normalmente, e funciona bem com `await` (veremos no Módulo 4).
- **Regra prática:** para **transformar**, use `map`/`filter`; para **executar algo** em cada item, prefira `for...of`.

> ⚠️ Não confunda com `for...in`, que percorre as **chaves** (índices como string, no caso de arrays). Use `for...in` só para objetos, e ainda assim prefira `Object.entries`.

### 4.6 `slice` x `splice` (nomes parecidos, comportamentos opostos!)

```javascript
const numeros = [10, 20, 30, 40, 50];

// slice(inicio, fim): COPIA um pedaço, não muta. O fim NÃO é incluído.
numeros.slice(1, 3);  // [20, 30]
numeros.slice(-2);    // [40, 50] (índices negativos contam do fim)
console.log(numeros); // [10, 20, 30, 40, 50] ✅ intacto

// splice(inicio, quantidade): REMOVE itens e MUTA o array original ❌
numeros.splice(1, 2);  // remove 2 itens a partir do índice 1
console.log(numeros);  // [10, 40, 50] 😱 o original mudou
```

> ☕ `slice` é como o `subList(inicio, fim)` do Java (o fim também não é incluído). Mas `subList` do Java é uma *view* da lista original, enquanto `slice` é uma **cópia de verdade**.

### 4.7 `at`: acessar pelo final

```javascript
const lista = ["a", "b", "c"];
lista.at(0);   // "a"
lista.at(-1);  // "c" (último), bem mais legível que lista[lista.length - 1]
```

### 4.8 `join`, `flat` e `flatMap`

```javascript
produtos.map(p => p.nome).join(", ");  // "Batata, Coca Cola, Arroz, Feijão"

[[1, 2], [3], [4, 5]].flat();          // [1, 2, 3, 4, 5]

const pedidos = [
  { cliente: "Ana", itens: ["Arroz", "Feijão"] },
  { cliente: "Bia", itens: ["Batata"] },
];
pedidos.flatMap(p => p.itens);         // ["Arroz", "Feijão", "Batata"]
```

> ☕ O `flatMap` é idêntico ao `flatMap` do Stream: transforma cada item em uma lista e "achata" tudo numa lista só.

### 4.9 `Object.groupBy`: agrupar

```javascript
const porCategoria = Object.groupBy(produtos, p => p.categoria);
// {
//   VERDURA: [{ Batata }],
//   BEBIDA:  [{ Coca Cola }],
//   GRAOS:   [{ Arroz }, { Feijão }]
// }
```

> ☕ É o `Collectors.groupingBy(Produto::getCategoria)` do Java. (O desafio 12 da aula 1.2 pede para você fazer isso **na mão** com `reduce`. Faça lá primeiro, para entender o que acontece por dentro!)

### 4.10 Criando arrays

```javascript
Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
Array.from("abc");                          // ["a", "b", "c"]
Array.of(7);                                // [7]
```

> ☕ `Array.from({ length: 5 }, ...)` faz o papel do `IntStream.rangeClosed(1, 5)`. O `_` é uma convenção para "parâmetro que eu não uso".

### 4.11 `Set`: coleção sem repetição

O `Set` guarda valores **sem duplicatas**. É o `HashSet` do Java.

```javascript
const categorias = new Set();
categorias.add("BEBIDA");
categorias.add("GRAOS");
categorias.add("BEBIDA");      // ignorado: já existe

categorias.size;               // 2 (no Java: size())
categorias.has("GRAOS");       // true (no Java: contains())
categorias.delete("GRAOS");    // remove
```

**O uso mais comum: remover duplicatas de um array.** Você cria um `Set` a partir do array e depois converte de volta para array com spread (aula 1.2):

```javascript
const repetidas = ["BEBIDA", "GRAOS", "BEBIDA", "VERDURA", "GRAOS"];
const unicas = [...new Set(repetidas)];
// ["BEBIDA", "GRAOS", "VERDURA"] (mantém a ordem da primeira aparição)
```

> ☕ Equivale a `new ArrayList<>(new LinkedHashSet<>(lista))` ou `lista.stream().distinct().toList()`.

> ⚠️ Assim como o `includes`, o `Set` compara **objetos por referência**: dois objetos com o mesmo conteúdo contam como diferentes, porque o JS não tem `equals`/`hashCode`. Use `Set` com valores simples (strings, números).

---

## 5. Ordenação

### 5.1 O comparator: igual ao do Java!

O `sort` recebe uma função que compara dois itens `a` e `b` e retorna:
- **negativo** → `a` vem antes de `b`
- **zero** → tanto faz
- **positivo** → `b` vem antes de `a`

É **exatamente** o contrato do `Comparator.compare(a, b)` do Java.

```javascript
// Crescente por preço
produtos.toSorted((a, b) => a.preco - b.preco);

// Decrescente por preço (inverte a e b)
produtos.toSorted((a, b) => b.preco - a.preco);
```

> ☕ Em Java: `produtos.sort(Comparator.comparingDouble(Produto::getPreco))` e `.reversed()` para decrescente.

### 5.2 ⚠️ Armadilha 1: `sort` sem comparator ordena como TEXTO

```javascript
[10, 1, 5, 100, 25].sort();
// [1, 10, 100, 25, 5] 😱 ordenou como string ("1" < "10" < "100" < "25" < "5")

[10, 1, 5, 100, 25].sort((a, b) => a - b);
// [1, 5, 10, 25, 100] ✅
```

Em Java, `Collections.sort` numa `List<Integer>` usa a ordem natural numérica. Em JS, **sempre passe o comparator para números**.

### 5.3 ⚠️ Armadilha 2: `sort` MUTA o array

```javascript
const ordenados = produtos.sort((a, b) => a.preco - b.preco);
// ❌ "produtos" também foi reordenado, e "ordenados === produtos" é true (mesma referência!)
```

**Soluções que não mutam:**

```javascript
const ordenados1 = [...produtos].sort((a, b) => a.preco - b.preco);  // copia antes (aula 1.2)
const ordenados2 = produtos.toSorted((a, b) => a.preco - b.preco);   // ✅ moderno e mais claro
```

> ☕ `toSorted` é como o `stream().sorted(...).toList()`: devolve uma lista nova e não mexe na original. Já o `sort` é como o `List.sort(...)`, que altera a própria lista.

**A família "to" (versões que não mutam):**

| Muta ❌ | Não muta ✅ |
|---|---|
| `sort()` | `toSorted()` |
| `reverse()` | `toReversed()` |
| `splice()` | `toSpliced()` |
| `lista[i] = x` | `lista.with(i, x)` |

```javascript
const letras = ["a", "b", "c"];
letras.with(1, "X");   // ["a", "X", "c"] (letras continua ["a", "b", "c"])
letras.toReversed();   // ["c", "b", "a"]
```

### 5.4 Ordenando textos

Não use `a.nome - b.nome` (subtração de strings dá `NaN`). Use `localeCompare`:

```javascript
produtos.toSorted((a, b) => a.nome.localeCompare(b.nome));
// Arroz, Batata, Coca Cola, Feijão
```

> ☕ Equivale ao `a.getNome().compareTo(b.getNome())`, com uma vantagem: o `localeCompare` entende acentos do português corretamente (ao estilo do `Collator` do Java).

```javascript
["ébano", "abacaxi", "Zebra"].toSorted((a, b) => a.localeCompare(b, "pt-BR"));
// ["abacaxi", "ébano", "Zebra"] ✅ (sem localeCompare, "Zebra" viria antes de "abacaxi")
```

### 5.5 Ordenando por mais de um critério

```javascript
// Por categoria (A-Z) e, em caso de empate, por preço (menor primeiro)
produtos.toSorted((a, b) =>
  a.categoria.localeCompare(b.categoria) || a.preco - b.preco
);
```

Como funciona? Se as categorias forem iguais, o `localeCompare` retorna `0`, que é **falsy**, então o `||` passa para o segundo critério. Truthy/falsy da seção 1 sendo útil de verdade!

> ☕ Em Java: `Comparator.comparing(Produto::getCategoria).thenComparingDouble(Produto::getPreco)`.

---

## 6. Bônus: comparação de strings

Uma diferença com Java que **sempre** confunde:

```java
// Java
String a = new String("oi");
String b = new String("oi");
a == b;       // false (compara referência)
a.equals(b);  // true
```

```javascript
// JavaScript
const a = "oi";
const b = "oi";
a === b;      // true ✅ (strings são primitivos: comparadas pelo VALOR)
```

Em JS, strings são **primitivos**, então `===` compara o conteúdo. Não existe `.equals()`. Já **objetos e arrays** são comparados por referência (aula 1.2).

---

## 7. 📋 Resumo (cola rápida)

| Conceito | JavaScript | Java equivalente |
|---|---|---|
| Falsy | `false 0 "" null undefined NaN` | (não existe; `if` exige `boolean`) |
| Vazio intencional | `null` | `null` |
| Não definido | `undefined` | (não existe; o compilador impede) |
| Navegação segura | `a?.b?.c` | `Optional.ofNullable(a).map(...)` |
| Valor padrão | `valor ?? padrao` | `Optional.orElse` / `requireNonNullElse` |
| Atribuir se vazio | `x ??= padrao` | `map.putIfAbsent` |
| Primeiro que bate | `find` | `filter().findFirst()` |
| Algum/todos | `some` / `every` | `anyMatch` / `allMatch` |
| Contém | `includes` (por referência em objetos) | `contains` (usa `equals`) |
| Ordenar sem mutar | `toSorted(cmp)` | `stream().sorted(cmp).toList()` |
| Comparar texto | `a.localeCompare(b)` | `a.compareTo(b)` / `Collator` |
| Desempate | `cmp1 \|\| cmp2` | `thenComparing` |
| Agrupar | `Object.groupBy` | `Collectors.groupingBy` |

**Regras de ouro:**
1. Array e objeto vazios são **truthy**: use `.length === 0`.
2. Para valor padrão, prefira `??` a `||` (a não ser que queira tratar `0` e `""` como vazios).
3. `find` devolve `undefined` quando não acha: combine com `?.` e `??`.
4. `includes` em objetos compara referência: use `some`/`find` com um campo.
5. **Sempre** passe um comparator no `sort` de números, e prefira `toSorted` (não muta).

---

## ✍️ Exercícios

Abra o [exercicios.js](./exercicios.js), resolva os TODOs e rode:

```bash
node exercicios.js
```
