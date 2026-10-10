# Aula 1.4: Escopo, hoisting, closures e `this`

> **Por que esta aula importa?** Esses quatro conceitos explicam a maioria dos bugs "misteriosos" de JavaScript e aparecem em **toda entrevista** de front-end. E no Angular, o `this` está em todo componente: entender quando ele "se perde" evita horas de depuração.

**Como rodar os exemplos:** crie um `testes.js` nesta pasta e rode `node testes.js`.

---

## 1. Escopo

### 1.1 O que é?

**Escopo** é a região do código em que uma variável **existe e pode ser acessada**. Você já conhece o conceito do Java:

```java
public void exemplo() {
    int x = 1;
    if (true) {
        int y = 2;
        System.out.println(x); // ✅ x é visível aqui dentro
    }
    System.out.println(y); // ❌ não compila: y só existe dentro do if
}
```

Com `let` e `const`, o JavaScript funciona **igualzinho**.

### 1.2 Os três tipos de escopo

```javascript
const global = "sou global";        // 1) ESCOPO GLOBAL: visível no arquivo inteiro

function minhaFuncao() {
  const local = "sou da função";    // 2) ESCOPO DE FUNÇÃO: só existe dentro da função

  if (true) {
    const bloco = "sou do bloco";   // 3) ESCOPO DE BLOCO: só existe dentro das { }
    console.log(global, local, bloco); // ✅ enxerga todos
  }

  console.log(bloco); // ❌ ReferenceError: bloco is not defined
}
```

**Regra de busca (scope chain):** quando você usa uma variável, o JS procura **no escopo atual**; se não achar, procura **no escopo de fora**, e assim por diante até o global. Se não achar em lugar nenhum: `ReferenceError`.

```
┌─ Global ─────────────────────────────┐
│  global                              │
│  ┌─ minhaFuncao ──────────────────┐  │
│  │  local                         │  │
│  │  ┌─ if ─────────────────────┐  │  │
│  │  │  bloco                   │  │  │
│  │  │  (procura aqui → sobe ↑) │  │  │
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
  De dentro, você enxerga para fora. De fora, NÃO enxerga para dentro.
```

### 1.3 Sombreamento (shadowing)

Uma variável interna pode ter o **mesmo nome** de uma externa e "escondê-la":

```javascript
const nome = "Global";

function saudar() {
  const nome = "Local";   // esconde a variável de fora
  console.log(nome);      // "Local"
}

saudar();
console.log(nome);        // "Global" (a de fora não foi alterada)
```

> ☕ **Diferença com Java:** em Java, declarar uma variável local com o mesmo nome de outra variável local de um escopo externo **não compila**. Em JS é permitido (o ESLint pode avisar, com a regra `no-shadow`). Evite: confunde quem lê.

### 1.4 O problema do `var`

O `var` é a forma **antiga** de declarar variáveis. Ele **ignora o escopo de bloco**, só respeita o de função:

```javascript
if (true) {
  var vazou = "eu escapei do if!";
  let preso = "eu fico no if";
}

console.log(vazou); // "eu escapei do if!" 😱
console.log(preso); // ❌ ReferenceError
```

O bug clássico com `var` em loops:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}
// var: 3, var: 3, var: 3 😱 (só existe UM "i", compartilhado, que terminou valendo 3)

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 100);
}
// let: 0, let: 1, let: 2 ✅ (o let cria um "j" novo a cada volta)
```

> `setTimeout(funcao, ms)` agenda a função para rodar depois de `ms` milissegundos. Quando ela roda, o loop já terminou. Vamos estudar isso a fundo no Módulo 4 (assincronismo).

**Regra do curso:** **nunca use `var`.** Use `const` por padrão e `let` quando precisar reatribuir. Você só precisa entender o `var` para ler código antigo.

---

## 2. Hoisting ("içamento")

### 2.1 O que é?

Antes de executar o código, o JS faz uma "varredura" e registra todas as declarações do escopo. Na prática, é como se as declarações fossem **"içadas" (hoisted) para o topo**. Mas cada tipo de declaração se comporta de um jeito:

### 2.2 Declarações de função: içadas por completo

```javascript
console.log(somar(2, 3)); // 5 ✅ funciona ANTES da declaração!

function somar(a, b) {
  return a + b;
}
```

> ☕ Em Java isso é natural: você chama um método declarado mais abaixo na classe sem problema. Com `function` em JS, também.

### 2.3 `var`: içada, mas vale `undefined`

```javascript
console.log(x); // undefined (não dá erro, mas também não tem o valor!)
var x = 10;
```

É como se o JS tivesse transformado em:

```javascript
var x;          // declaração içada
console.log(x); // undefined
x = 10;         // atribuição fica no lugar
```

### 2.4 `let` e `const`: içadas, mas inacessíveis (TDZ)

```javascript
console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

O trecho entre o início do escopo e a linha da declaração se chama **TDZ** (*Temporal Dead Zone*, "zona morta temporal"). Esse erro é **bom**: é o comportamento que você espera vindo do Java.

### 2.5 Arrow functions e function expressions seguem a regra da variável

```javascript
dobrar(2);  // ❌ ReferenceError (está na TDZ do const)

const dobrar = n => n * 2;
```

**Resumo:**

| Declaração | Usar antes da linha? |
|---|---|
| `function nome() {}` | ✅ funciona |
| `var x = ...` | ⚠️ funciona, mas vale `undefined` |
| `let` / `const` | ❌ `ReferenceError` (TDZ) |
| `const fn = () => {}` | ❌ `ReferenceError` (TDZ) |

---

## 3. Closures

### 3.1 Funções são valores

Antes de closures, uma revisão rápida: em JS, **funções são valores** como qualquer outro. Podem ser guardadas em variáveis, passadas como argumento e **retornadas por outras funções**.

```javascript
function criarSaudacao() {
  return function (nome) {      // retorna uma FUNÇÃO
    return `Olá, ${nome}!`;
  };
}

const saudar = criarSaudacao(); // saudar agora É uma função
console.log(saudar("Luiz"));    // "Olá, Luiz!"
```

> ☕ Em Java, isso seria um método que retorna uma `Function<String, String>` (uma lambda). A ideia é a mesma, mas em JS não é preciso escolher uma interface funcional: a função é o próprio tipo.

### 3.2 O que é uma closure?

**Closure** é quando uma função **lembra as variáveis do escopo onde foi criada**, mesmo depois que esse escopo terminou de executar.

```javascript
function criarContador() {
  let contagem = 0;             // variável local de criarContador

  return function () {
    contagem++;                 // usa a variável do escopo de fora
    return contagem;
  };
}

const contador = criarContador(); // criarContador já TERMINOU de executar...
console.log(contador()); // 1     // ...mas a função retornada ainda lembra de "contagem"!
console.log(contador()); // 2
console.log(contador()); // 3
```

**Por que isso é estranho?** Normalmente, quando uma função termina, suas variáveis locais "morrem". Mas aqui, a função interna ainda **referencia** `contagem`, então o JS a mantém viva. A função interna + as variáveis que ela "carrega" formam a **closure**.

**Cada chamada cria uma closure independente:**

```javascript
const contadorA = criarContador();
const contadorB = criarContador();

contadorA(); // 1
contadorA(); // 2
contadorB(); // 1  ← tem a sua própria "contagem"
```

### 3.3 Comparando com as lambdas do Java

Lambdas do Java **também** capturam variáveis do escopo de fora, mas com uma restrição:

```java
int contagem = 0;
Runnable r = () -> contagem++;  // ❌ não compila!
// "Variable used in lambda expression should be final or effectively final"
```

Em Java, a lambda só pode capturar variáveis **effectively final** (que nunca são reatribuídas). Em JS **não existe essa restrição**: a closure captura a **própria variável** (não uma cópia do valor), então pode ler **e alterar**.

> ☕ O truque que devs Java usam para contornar isso (`int[] contagem = {0};` ou `AtomicInteger`) é justamente simular o que a closure do JS faz nativamente.

### 3.4 Para que servem closures na prática?

**1) Estado privado (encapsulamento sem classe)**

```javascript
function criarConta(saldoInicial) {
  let saldo = saldoInicial;  // "privado": não há como acessar de fora

  return {
    depositar(valor) {
      if (valor <= 0) throw new Error("Valor inválido");
      saldo += valor;
    },
    consultar() {
      return saldo;
    },
  };
}

const conta = criarConta(100);
conta.depositar(50);
console.log(conta.consultar()); // 150
console.log(conta.saldo);       // undefined: não existe acesso direto!
```

> ☕ O `throw new Error("Valor inválido")` funciona como o `throw new IllegalArgumentException("Valor inválido")` do Java: interrompe a função e lança um erro. Se ninguém tratar, o programa para e mostra a mensagem. A forma de capturar (`try/catch`) é igual à do Java e aparece na aula 1.5; o assunto completo fica para a aula 1.6.

> ☕ É o efeito de um atributo `private` com métodos públicos, só que usando closure em vez de classe. (Na aula 1.5 veremos que as classes do JS também têm campos privados, com `#`.)

**2) "Fábricas" de funções configuradas**

```javascript
function criarMultiplicador(fator) {
  return n => n * fator;   // lembra do "fator"
}

const dobrar = criarMultiplicador(2);
const triplicar = criarMultiplicador(3);

[1, 2, 3].map(dobrar);     // [2, 4, 6]
[1, 2, 3].map(triplicar);  // [3, 6, 9]
```

```javascript
function filtrarPorCategoria(categoria) {
  return produto => produto.categoria === categoria;
}

produtos.filter(filtrarPorCategoria("BEBIDA"));
```

**3) Você já usa closures sem perceber!**

```javascript
function produtosAcimaDe(lista, valorMinimo) {
  return lista.filter(p => p.preco > valorMinimo);
  //                 └─ esta arrow function "lembra" de valorMinimo: é uma closure!
}
```

No Angular, closures aparecem o tempo todo: em callbacks, em `computed(() => ...)`, em funções de guard de rota, em interceptors...

---

## 4. `this`

### 4.1 O `this` do Java (simples)

Em Java, `this` **sempre** é a instância atual da classe. Sempre. Não há surpresas.

### 4.2 O `this` do JavaScript (depende de COMO a função é chamada)

Em JS, o valor do `this` **não depende de onde a função foi escrita**, e sim de **como ela foi chamada**. Essa é a maior diferença em relação ao Java.

**Regra 1: chamada como método (`objeto.metodo()`) → `this` é o objeto antes do ponto**

```javascript
const produto = {
  nome: "Batata",
  descrever() {
    return `Produto: ${this.nome}`;
  },
};

produto.descrever(); // "Produto: Batata" ✅ (this = produto)
```

**Regra 2: chamada "solta" (`funcao()`) → `this` é `undefined`**

```javascript
const descrever = produto.descrever;  // guardei a FUNÇÃO numa variável
descrever();
// ❌ TypeError: Cannot read properties of undefined (reading 'nome')
```

O que aconteceu? A função é a mesma, mas foi chamada **sem objeto antes do ponto**. Então `this` é `undefined`.

> Em modo estrito (*strict mode*, o padrão dentro de módulos e classes, ou seja, em todo projeto moderno), o `this` solto é `undefined`. Em scripts antigos sem strict mode, ele seria o objeto global (`window`), o que é ainda pior.

### 4.3 O bug clássico: "perder o `this`" em callbacks

```javascript
const timer = {
  segundos: 0,
  iniciar() {
    setInterval(function () {
      this.segundos++;          // ❌ "this" aqui NÃO é o timer!
      console.log(this.segundos);
    }, 1000);
  },
};

timer.iniciar(); // NaN, NaN, NaN... (ou erro)
```

Por quê? Quem chama a `function` de dentro é o `setInterval`, **sem objeto antes do ponto**. Então o `this` dentro dela não é o `timer`.

### 4.4 A solução: arrow functions NÃO têm `this` próprio

Arrow functions **não criam seu próprio `this`**: elas usam o `this` do escopo **onde foram escritas** (chamado de *this léxico*).

```javascript
const timer = {
  segundos: 0,
  iniciar() {
    setInterval(() => {
      this.segundos++;          // ✅ "this" é o mesmo do iniciar(), ou seja, o timer
      console.log(this.segundos);
    }, 1000);
  },
};

timer.iniciar(); // 1, 2, 3...
```

> ☕ **Boa notícia para quem vem do Java:** as lambdas do Java se comportam **igual às arrow functions**: o `this` dentro de uma lambda é o `this` da classe onde ela foi escrita. Então, se você usar arrow functions em callbacks, o `this` funciona do jeito que você está acostumado.

**Quando NÃO usar arrow function:** como **método de objeto**, porque aí ela pega o `this` de fora (que não é o objeto):

```javascript
const produto = {
  nome: "Batata",
  descrever: () => `Produto: ${this.nome}`,  // ❌ this NÃO é o produto
};
produto.descrever(); // "Produto: undefined"
```

**Regra prática:**
- **Métodos** de objeto/classe → sintaxe de método: `descrever() { ... }`
- **Callbacks** (map, filter, setTimeout, eventos, subscribe...) → arrow function `() => { ... }`

### 4.5 `bind`: fixar o `this` manualmente

`bind` cria uma **cópia da função com o `this` fixo**:

```javascript
const descrever = produto.descrever.bind(produto);
descrever(); // "Produto: Batata" ✅
```

Também existem `call` e `apply`, que chamam a função na hora com um `this` específico. Raramente você vai precisar deles no código moderno, mas vai vê-los em código antigo:

```javascript
produto.descrever.call({ nome: "Cenoura" }); // "Produto: Cenoura"
```

### 4.6 E no Angular?

Componentes e services do Angular são **classes**, e você vai usar `this` o tempo todo:

```typescript
export class ProdutosComponent {
  produtos = signal<Produto[]>([]);

  carregar() {
    this.api.listar().subscribe(lista => {
      this.produtos.set(lista);   // ✅ arrow function: o this é o componente
    });
  }
}
```

Se você trocasse a arrow function por `function (lista) { ... }`, o `this` se perderia e o código quebraria. Agora você sabe por quê. 🎯

---

## 5. 📋 Resumo (cola rápida)

| Conceito | JavaScript | Java |
|---|---|---|
| Escopo de bloco | `let`/`const` ✅ | igual |
| `var` | ignora blocos ❌ (não use) | não existe |
| Shadowing de local | permitido (evite) | não compila |
| Usar função antes de declarar | ✅ com `function` | ✅ (métodos) |
| Usar variável antes de declarar | ❌ TDZ (`let`/`const`) | não compila |
| Closure captura | a **variável** (pode alterar) | só *effectively final* |
| `this` em método | objeto antes do ponto | sempre a instância |
| `this` em função solta | `undefined` | não existe função solta |
| `this` em arrow function | o de fora (léxico) | igual à lambda ✅ |

**Regras de ouro:**
1. `const` por padrão, `let` se precisar reatribuir, **nunca `var`**.
2. Closure = função + as variáveis que ela lembra do lugar onde foi criada.
3. O `this` depende de **como** a função é chamada, não de onde foi escrita.
4. Callbacks → arrow function. Métodos → sintaxe de método.

---

## ✍️ Exercícios

Abra o [exercicios.js](./exercicios.js), resolva os TODOs e rode:

```bash
node exercicios.js
```
