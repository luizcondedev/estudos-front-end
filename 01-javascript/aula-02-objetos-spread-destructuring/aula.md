# Aula 02: Objetos, valor x referência, imutabilidade, spread, rest e destructuring

> **Por que esta aula é tão importante?** Quase todo código Angular moderno faz isto aqui:
> ```javascript
> this.produtos.update(lista => lista.map(p => p.id === id ? { ...p, preco: novoPreco } : p));
> ```
> Ao final desta aula você vai entender **cada caractere** dessa linha.

**Como rodar os exemplos:** crie um arquivo `testes.js` nesta pasta, cole/digite o exemplo e rode `node testes.js` no terminal do VS Code.

---

## 1. Objetos

### 1.1 O que é um objeto?

Um objeto é um **conjunto de pares chave → valor**. Cada par é chamado de **propriedade**.

```javascript
const produto = {
  nome: "Batata",     // chave: nome      | valor: "Batata"
  preco: 8,           // chave: preco     | valor: 8
  categoria: "VERDURA"
};
```

**Comparando com Java:** em Java, para ter um "produto" você precisaria criar uma `class Produto` com atributos, construtor, getters... Em JavaScript você cria o objeto **direto**, sem classe. Essa sintaxe com `{ }` se chama **objeto literal**.

Se você já viu um JSON (por exemplo, a resposta de uma API Spring Boot), reparou que é praticamente igual. Não é coincidência: JSON significa *JavaScript Object Notation*.

### 1.2 Lendo propriedades

Há duas formas:

```javascript
// 1) Notação de ponto (a mais comum)
console.log(produto.nome);       // "Batata"

// 2) Notação de colchetes (a chave vai como string)
console.log(produto["nome"]);    // "Batata"
```

**Para que serve a de colchetes?** Para quando o nome da propriedade está **numa variável**:

```javascript
const campo = "preco";
console.log(produto[campo]);     // 8
console.log(produto.campo);      // undefined ❌ (procura uma propriedade chamada literalmente "campo")
```

Se você ler uma propriedade que não existe, o JS **não dá erro**: devolve `undefined`.

```javascript
console.log(produto.estoque);    // undefined
```

### 1.3 Adicionando, alterando e removendo

```javascript
const produto = { nome: "Batata", preco: 8 };

produto.preco = 9;           // altera
produto.estoque = 100;       // ADICIONA (não precisa estar declarada antes!)
delete produto.estoque;      // remove

console.log(produto);        // { nome: "Batata", preco: 9 }
```

> 🤔 "Mas `produto` é `const`! Como consegui alterar?"
> Ótima pergunta, e a resposta está na seção 2. Guarde essa dúvida.

### 1.4 Atalho: shorthand property

Quando a variável tem **o mesmo nome** da propriedade, você pode escrever uma vez só:

```javascript
const nome = "Arroz";
const preco = 15.99;

const produtoLongo = { nome: nome, preco: preco };
const produtoCurto = { nome, preco };   // exatamente a mesma coisa

console.log(produtoCurto); // { nome: "Arroz", preco: 15.99 }
```

Você vai ver isso **o tempo todo**.

### 1.5 Objetos dentro de objetos e métodos

Um valor pode ser qualquer coisa: outro objeto, um array ou até uma função.

```javascript
const produto = {
  nome: "Notebook",
  preco: 4000,
  tags: ["eletrônico", "informática"],     // array
  fornecedor: {                            // objeto aninhado
    nome: "Acer",
    cidade: "São Paulo"
  },
  descrever() {                            // método (função dentro do objeto)
    return `${this.nome} custa ${this.preco}`;
  }
};

console.log(produto.fornecedor.cidade);  // "São Paulo"
console.log(produto.tags[0]);            // "eletrônico"
console.log(produto.descrever());        // "Notebook custa 4000"
```

### 1.6 Percorrendo um objeto

```javascript
const produto = { nome: "Batata", preco: 8 };

Object.keys(produto);    // ["nome", "preco"]                  → só as chaves
Object.values(produto);  // ["Batata", 8]                      → só os valores
Object.entries(produto); // [["nome", "Batata"], ["preco", 8]] → pares [chave, valor]

for (const chave in produto) {
  console.log(chave, produto[chave]); // usa colchetes porque a chave está numa variável
}
```

---

## 2. Valor x referência (o conceito mais importante da aula)

### 2.1 Primitivos são copiados pelo VALOR

Tipos primitivos (`string`, `number`, `boolean`, `null`, `undefined`) são **copiados**:

```javascript
let a = 10;
let b = a;   // b recebe uma CÓPIA do valor 10

b = 20;

console.log(a); // 10 ✅ (a não mudou)
console.log(b); // 20
```

### 2.2 Objetos e arrays são copiados pela REFERÊNCIA

Quando você cria um objeto, ele é guardado num lugar da memória. A variável **não guarda o objeto**: ela guarda o **endereço** dele (a referência).

```javascript
const produtoA = { nome: "Batata", preco: 8 };
const produtoB = produtoA;   // copia o ENDEREÇO, não o objeto!

produtoB.preco = 999;

console.log(produtoA.preco); // 999 😱
```

Visualizando a memória:

```
 VARIÁVEIS                      MEMÓRIA
┌──────────┐
│ produtoA │ ──────┐
└──────────┘       │         ┌─────────────────────────┐
                   ├───────▶ │ { nome: "Batata",       │
┌──────────┐       │         │   preco: 999 }          │
│ produtoB │ ──────┘         └─────────────────────────┘
└──────────┘
   As duas variáveis apontam para O MESMO objeto.
```

**Isso é idêntico ao Java!** Em Java, `Produto b = a;` também não cria um produto novo: as duas variáveis apontam para a mesma instância. Então você já conhece esse comportamento, só não estava ligando o nome.

### 2.3 Agora a resposta do mistério do `const`

`const` significa: **"esta variável não pode apontar para outra coisa"**. Não significa "o objeto não pode mudar".

```javascript
const produto = { nome: "Batata" };

produto.nome = "Cenoura";        // ✅ permitido: mudei o CONTEÚDO do objeto
produto = { nome: "Cenoura" };   // ❌ TypeError: tentei apontar a variável para OUTRO objeto
```

É igual ao `final` do Java: `final Produto p = new Produto();` impede `p = outro`, mas permite `p.setNome(...)`.

### 2.4 Comparação com `===` compara referência

```javascript
const a = { nome: "Batata" };
const b = { nome: "Batata" };
const c = a;

console.log(a === b); // false → objetos DIFERENTES na memória (mesmo com conteúdo igual)
console.log(a === c); // true  → mesma referência
```

Mesma coisa que `==` com objetos em Java (que compara referência, enquanto `.equals()` compara conteúdo). **Guarde isto**, porque é a chave para entender a seção 3.

---

## 3. Mutação x imutabilidade

### 3.1 O que é "mutar"?

**Mutar** = alterar um objeto/array que já existe.

```javascript
produto.preco = 10;   // mutação
lista.push(item);     // mutação
lista.sort();         // mutação
delete produto.nome;  // mutação
```

**Imutabilidade** = nunca alterar o original. Quando precisar de uma mudança, você **cria um objeto novo** com a mudança.

### 3.2 Por que mutar pode ser um problema?

Veja este bug:

```javascript
function aplicarDesconto(produto, percentual) {
  produto.preco = produto.preco * (1 - percentual / 100); // MUTA o objeto recebido
  return produto;
}

const batata = { nome: "Batata", preco: 10 };
const batataPromocao = aplicarDesconto(batata, 50);

console.log(batataPromocao.preco); // 5
console.log(batata.preco);         // 5 😱 o original também mudou!
```

Como a função recebeu a **referência**, ela alterou o objeto de quem chamou. Em um sistema grande, você passa horas procurando "quem mudou esse valor?".

### 3.3 Por que o Angular se importa tanto com isso?

O Angular precisa saber **quando algo mudou** para atualizar a tela. A forma mais rápida de checar é com `===`:

```javascript
listaAntiga === listaNova
```

- Se você **mutou** a lista (`push`), ela continua sendo **o mesmo objeto**, então `===` dá `true` e o Angular pode concluir que **nada mudou** e não atualizar a tela. 🐛
- Se você **criou uma lista nova**, `===` dá `false` e o Angular sabe que precisa atualizar. ✅

Por isso, em Angular (principalmente com **Signals** e `OnPush`, que vamos ver), a regra é: **não mute, crie um novo**.

### 3.4 Como criar um objeto novo? (passo a passo)

Imagine que queremos um produto igual ao original, mas com outro preço.

**Jeito 1, manual:** copiar propriedade por propriedade.

```javascript
const original = { nome: "Batata", preco: 10, categoria: "VERDURA" };

const novo = {
  nome: original.nome,
  preco: 5,                        // ← só esse muda
  categoria: original.categoria
};
```

Funciona, mas imagine um objeto com 20 propriedades... e se alguém adicionar uma nova, você precisa lembrar de copiar.

**Jeito 2, com spread (`...`):** faz exatamente a mesma coisa, automaticamente.

```javascript
const novo = { ...original, preco: 5 };

console.log(novo);      // { nome: "Batata", preco: 5, categoria: "VERDURA" }
console.log(original);  // { nome: "Batata", preco: 10, categoria: "VERDURA" } ✅ intacto
console.log(novo === original); // false → são objetos diferentes
```

Vamos entender o `...` a fundo agora.

---

## 4. Spread (`...`): "espalhar"

### 4.1 O que é?

O operador **spread** (`...`) pega um array ou objeto e **espalha o conteúdo dele** dentro de outro lugar. É como se você tirasse os itens de dentro da caixa.

### 4.2 Spread em objetos

```javascript
const original = { nome: "Batata", preco: 10 };

const copia = { ...original };
```

Leia `{ ...original }` assim: *"crie um objeto novo `{ }` e, dentro dele, espalhe todas as propriedades de `original`"*. Na prática o JS faz isto:

```javascript
const copia = { nome: original.nome, preco: original.preco };
```

**Sobrescrevendo propriedades: a ORDEM importa!** Se uma chave aparece duas vezes, **a última vence**:

```javascript
const original = { nome: "Batata", preco: 10 };

const a = { ...original, preco: 5 };   // espalha (preco: 10), depois preco: 5 sobrescreve
console.log(a.preco); // 5 ✅

const b = { preco: 5, ...original };   // preco: 5, depois o spread traz preco: 10 e sobrescreve
console.log(b.preco); // 10 ❌ (provavelmente não era isso que você queria)
```

Por isso a regra prática é: **spread primeiro, alterações depois**.

**Adicionando propriedades novas:**

```javascript
const comEstoque = { ...original, estoque: 50 };
// { nome: "Batata", preco: 10, estoque: 50 }
```

**Juntando (merge) dois objetos:**

```javascript
const dadosBasicos = { nome: "Batata", preco: 10 };
const dadosExtras  = { categoria: "VERDURA", estoque: 50 };

const completo = { ...dadosBasicos, ...dadosExtras };
// { nome: "Batata", preco: 10, categoria: "VERDURA", estoque: 50 }
```

### 4.3 Spread em arrays

Funciona igual, mas com `[ ]`:

```javascript
const numeros = [1, 2, 3];

const copia = [...numeros];              // [1, 2, 3] (array NOVO)
const comFinal = [...numeros, 4];        // [1, 2, 3, 4]
const comInicio = [0, ...numeros];       // [0, 1, 2, 3]
const juntos = [...numeros, ...[7, 8]];  // [1, 2, 3, 7, 8]

console.log(numeros); // [1, 2, 3] ✅ original intacto
```

**Comparando com mutação:**

```javascript
const lista = [1, 2, 3];

lista.push(4);                  // ❌ MUTA: lista agora é [1, 2, 3, 4]
const novaLista = [...lista, 4]; // ✅ NÃO muta: cria um array novo
```

**Espalhando argumentos de uma função:**

```javascript
const precos = [8, 13.99, 15.99];

Math.max(precos);     // NaN ❌ (Math.max espera números separados, não um array)
Math.max(...precos);  // 15.99 ✅ (vira Math.max(8, 13.99, 15.99))
```

### 4.4 As operações imutáveis mais usadas com listas

Decore estas quatro: elas aparecem em todo projeto Angular.

```javascript
const produtos = [
  { id: 1, nome: "Batata", preco: 8 },
  { id: 2, nome: "Arroz",  preco: 15 }
];

// ➕ ADICIONAR
const comNovo = [...produtos, { id: 3, nome: "Feijão", preco: 9 }];

// ➖ REMOVER (filter já devolve um array novo)
const semArroz = produtos.filter(p => p.id !== 2);

// ✏️ ATUALIZAR um item
const atualizados = produtos.map(p =>
  p.id === 1 ? { ...p, preco: 10 } : p
);

// 🔀 ORDENAR sem mutar (copia antes de ordenar, pois sort() muta)
const ordenados = [...produtos].sort((a, b) => a.preco - b.preco);
```

Vamos destrinchar o **atualizar**, que é o mais complexo:

```javascript
produtos.map(p => p.id === 1 ? { ...p, preco: 10 } : p)
```

1. `produtos.map(...)`: percorre cada produto e monta um **array novo** com o que a função retornar.
2. `p => ...`: para cada produto `p`...
3. `p.id === 1 ? A : B`: operador ternário, ou seja, "se o id for 1, retorne A, senão retorne B".
4. `A = { ...p, preco: 10 }`: um produto **novo**, cópia de `p` com o preço trocado.
5. `B = p`: os outros produtos voltam **como estão** (não precisam ser copiados, pois não mudaram).

Resultado: um array novo, em que só o item alterado é um objeto novo. 🎯

### 4.5 ⚠️ Cuidado: o spread faz cópia RASA (shallow copy)

O spread copia só o **primeiro nível**. Se uma propriedade for um objeto, o que é copiado é a **referência** dele (lembra da seção 2?).

```javascript
const original = {
  nome: "Notebook",
  fornecedor: { nome: "Acer", cidade: "São Paulo" }
};

const copia = { ...original };
copia.fornecedor.cidade = "Recife";

console.log(original.fornecedor.cidade); // "Recife" 😱
```

```
original ──▶ { nome: "Notebook", fornecedor: ─┐ }
                                              ├──▶ { nome: "Acer", cidade: "Recife" }
copia    ──▶ { nome: "Notebook", fornecedor: ─┘ }
             (objeto novo)                     (o MESMO objeto interno!)
```

**Solução 1:** espalhar também o nível de dentro.

```javascript
const copia = {
  ...original,
  fornecedor: { ...original.fornecedor, cidade: "Recife" }
};
```

**Solução 2:** cópia profunda (deep copy) com `structuredClone`, que copia **todos** os níveis.

```javascript
const copia = structuredClone(original);
copia.fornecedor.cidade = "Recife";   // agora pode mudar à vontade
console.log(original.fornecedor.cidade); // "São Paulo" ✅
```

Use `structuredClone` quando realmente precisar de uma cópia total. Para atualizar um campo, a solução 1 é a mais comum.

---

## 5. Rest (`...`): "juntar o resto"

É **a mesma sintaxe** `...`, mas com a função **oposta**:

| | Spread | Rest |
|---|---|---|
| Faz o quê | **Espalha** itens | **Junta** itens |
| Onde aparece | Do lado direito do `=`, ou ao **chamar** uma função | Do lado esquerdo do `=`, ou ao **declarar** os parâmetros de uma função |

### 5.1 Rest em parâmetros de função

Permite receber **quantos argumentos quiser**, que chegam como um array:

```javascript
function somar(...numeros) {
  console.log(numeros); // é um array!
  return numeros.reduce((total, n) => total + n, 0);
}

somar(1, 2);          // numeros = [1, 2]          → 3
somar(1, 2, 3, 4, 5); // numeros = [1, 2, 3, 4, 5] → 15
```

**Em Java é o varargs:** `int somar(int... numeros)`. Igualzinho, inclusive na regra de que o rest **tem que ser o último** parâmetro:

```javascript
function registrar(nivel, ...mensagens) { }   // ✅
function registrar(...mensagens, nivel) { }   // ❌ SyntaxError
```

O rest em destructuring você vai ver na próxima seção.

---

## 6. Destructuring (desestruturação)

### 6.1 O que é e para que serve?

Destructuring é uma sintaxe para **extrair valores de objetos ou arrays e colocá-los em variáveis**, de uma vez só.

**Sem destructuring:**

```javascript
const produto = { nome: "Batata", preco: 8, categoria: "VERDURA" };

const nome = produto.nome;
const preco = produto.preco;
const categoria = produto.categoria;
```

**Com destructuring:**

```javascript
const { nome, preco, categoria } = produto;

console.log(nome);  // "Batata"
console.log(preco); // 8
```

Leia assim: *"de dentro de `produto`, pegue as propriedades `nome`, `preco` e `categoria` e crie variáveis com esses nomes"*.

**Para que serve?** Menos repetição, código mais limpo e deixa claro quais campos você está usando. Não é "mágica": é só um atalho para as três linhas de cima.

> ⚠️ Repare que `{ }` do **lado esquerdo** do `=` é destructuring (extrair).
> `{ }` do **lado direito** é criar um objeto. Mesma chave, funções opostas.

### 6.2 Destructuring de objetos: todas as variações

**Pegar só algumas propriedades** (você não precisa pegar todas):

```javascript
const { preco } = produto; // só o preco
```

**Propriedade que não existe vira `undefined`:**

```javascript
const { estoque } = produto;
console.log(estoque); // undefined
```

**Valor padrão** (usado se a propriedade não existir ou for `undefined`):

```javascript
const { estoque = 0 } = produto;
console.log(estoque); // 0
```

**Renomear** (quando o nome da propriedade não é bom para a variável, ou já existe uma variável com esse nome):

```javascript
const { nome: nomeProduto } = produto;
console.log(nomeProduto); // "Batata"
console.log(nome);        // ❌ ReferenceError: a variável criada foi nomeProduto
```

Leia `nome: nomeProduto` como *"pegue `nome` e guarde em `nomeProduto`"*.

**Renomear + valor padrão juntos:**

```javascript
const { estoque: qtd = 0 } = produto; // qtd = 0
```

**Objetos aninhados:**

```javascript
const notebook = {
  nome: "Notebook",
  fornecedor: { nome: "Acer", cidade: "São Paulo" }
};

const { fornecedor: { cidade } } = notebook;
console.log(cidade); // "São Paulo"
```

**Com rest: pegar algumas propriedades e juntar o resto num objeto novo:**

```javascript
const produto = { id: 1, nome: "Batata", preco: 8, categoria: "VERDURA" };

const { id, ...dadosSemId } = produto;

console.log(id);         // 1
console.log(dadosSemId); // { nome: "Batata", preco: 8, categoria: "VERDURA" }
```

👉 Este é o jeito **imutável de remover uma propriedade** (em vez do `delete`, que muta). Muito útil, por exemplo, para enviar dados para a API sem o `id`.

### 6.3 Destructuring de arrays

Em arrays, a extração é pela **posição** (não pelo nome), e usa `[ ]`:

```javascript
const cores = ["vermelho", "verde", "azul"];

const [primeira, segunda] = cores;
console.log(primeira); // "vermelho"
console.log(segunda);  // "verde"

// Pular posições com vírgula vazia
const [, , terceira] = cores;
console.log(terceira); // "azul"

// Com rest
const [cabeca, ...cauda] = cores;
console.log(cabeca); // "vermelho"
console.log(cauda);  // ["verde", "azul"]
```

**Truque clássico: trocar o valor de duas variáveis**

```javascript
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

**Muito usado com `Object.entries`:**

```javascript
const produto = { nome: "Batata", preco: 8 };

for (const [chave, valor] of Object.entries(produto)) {
  console.log(`${chave}: ${valor}`);
}
// nome: Batata
// preco: 8
```

`Object.entries` devolve `[["nome", "Batata"], ["preco", 8]]`. A cada volta do loop, o par `["nome", "Batata"]` é desestruturado em `chave` e `valor`.

### 6.4 Destructuring nos parâmetros de função (muito usado!)

Você pode desestruturar **direto no parâmetro**:

```javascript
// Sem destructuring
function descrever(produto) {
  return `${produto.nome} custa R$ ${produto.preco}`;
}

// Com destructuring
function descrever({ nome, preco }) {
  return `${nome} custa R$ ${preco}`;
}

descrever({ nome: "Batata", preco: 8, categoria: "VERDURA" }); // "Batata custa R$ 8"
```

E com arrow functions dentro de `map`/`filter`:

```javascript
const nomes = produtos.map(({ nome }) => nome);
const baratos = produtos.filter(({ preco }) => preco < 10);
```

> ⚠️ Repare nos **parênteses** em `({ nome }) => ...`. Quando a arrow function desestrutura o parâmetro, os parênteses são obrigatórios.

**Parâmetros "nomeados" com valores padrão:** um padrão muito comum para funções com várias opções.

```javascript
function buscarProdutos({ pagina = 1, tamanho = 10, ordem = "nome" } = {}) {
  console.log(pagina, tamanho, ordem);
}

buscarProdutos();                          // 1 10 "nome"
buscarProdutos({ tamanho: 50 });           // 1 50 "nome"
buscarProdutos({ ordem: "preco", pagina: 3 }); // 3 10 "preco"
```

Vantagem: quem chama não precisa lembrar a **ordem** dos parâmetros, e o `= {}` no final permite chamar sem passar nada.

---

## 7. Revisitando o seu exercício da Aula 01

Agora você consegue ler cada parte do que escreveu:

```javascript
const aplicarDesconto = (produto, desconto) => {
  const precoComDesconto = produto.preco - ((produto.preco * desconto) / 100);
  return { ...produto, preco: precoComDesconto };
  //     │  │           └─ depois sobrescreve o preco (a última chave vence)
  //     │  └─ espalha todas as propriedades do produto original
  //     └─ cria um objeto NOVO (o original não é mutado)
};
```

E a versão com destructuring nos parâmetros (opcional, só para praticar):

```javascript
const aplicarDesconto = (produto, desconto) => {
  const { preco } = produto;
  return { ...produto, preco: preco - (preco * desconto) / 100 };
};
```

E a linha do começo da aula:

```javascript
this.produtos.update(lista => lista.map(p => p.id === id ? { ...p, preco: novoPreco } : p));
//            │        │         │       │                  │                          └─ senão, mantém o mesmo
//            │        │         │       │                  └─ se for, cria uma cópia com o preço novo
//            │        │         │       └─ para cada produto, verifica se é o que queremos alterar
//            │        │         └─ map: monta um array NOVO
//            │        └─ recebe a lista atual
//            └─ (Angular Signals, aula 21) troca a lista pela nova → a tela atualiza
```

---

## 8. 📋 Resumo (cola rápida)

| Sintaxe | Nome | O que faz |
|---|---|---|
| `{ nome: "x" }` | Objeto literal | Cria um objeto |
| `{ nome }` | Shorthand | Mesmo que `{ nome: nome }` |
| `obj.prop` / `obj["prop"]` | Acesso | Lê uma propriedade |
| `const b = a` (objeto) | Cópia de referência | `a` e `b` apontam para o **mesmo** objeto |
| `{ ...obj }` | Spread de objeto | Cópia **rasa** de um objeto |
| `{ ...obj, x: 1 }` | Spread + sobrescrita | Cópia com alteração (última chave vence) |
| `[...arr, item]` | Spread de array | Novo array com item adicionado |
| `fn(...arr)` | Spread em chamada | Passa os itens como argumentos separados |
| `function f(...args)` | Rest em parâmetro | Junta os argumentos num array (varargs) |
| `const { a, b } = obj` | Destructuring de objeto | Extrai propriedades para variáveis |
| `const { a: x = 0 } = obj` | Renomear + padrão | Extrai `a` como `x`, padrão 0 |
| `const { id, ...resto } = obj` | Destructuring + rest | Remove `id` sem mutar |
| `const [x, y] = arr` | Destructuring de array | Extrai por posição |
| `structuredClone(obj)` | Deep copy | Cópia completa, todos os níveis |

**Regras de ouro:**
1. Objetos e arrays são passados por **referência**, como em Java.
2. `const` impede **reatribuir** a variável, não impede **mudar o conteúdo** do objeto.
3. No Angular, **não mute**: crie objetos e arrays novos.
4. Spread primeiro, sobrescritas depois.
5. Spread é **raso**: objetos aninhados precisam de spread próprio (ou `structuredClone`).

---

## ✍️ Exercícios

Abra o arquivo [exercicios.js](./exercicios.js) desta pasta, resolva os TODOs e rode:

```bash
node exercicios.js
```
