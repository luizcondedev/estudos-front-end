# Aula 1.5: Classes, herança, getters/setters e campos privados

> **Boa notícia:** esta é a aula em que o seu Java mais ajuda. A sintaxe de classes do JavaScript foi claramente inspirada em linguagens como Java. Mas existem **diferenças importantes**, e é nelas que esta aula vai focar.
>
> **Por que importa para o Angular?** Todo componente, service, pipe, diretiva e guard do Angular é uma **classe**.

**Como rodar os exemplos:** crie um `testes.js` nesta pasta e rode `node testes.js`.

---

## 1. Sua primeira classe, lado a lado com Java

**Java:**

```java
public class Produto {
    private String nome;
    private double preco;

    public Produto(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
    }

    public String descrever() {
        return nome + " custa R$ " + preco;
    }
}

Produto p = new Produto("Batata", 8.0);
System.out.println(p.descrever());
```

**JavaScript:**

```javascript
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  descrever() {
    return `${this.nome} custa R$ ${this.preco}`;
  }
}

const p = new Produto("Batata", 8);
console.log(p.descrever()); // "Batata custa R$ 8"
```

**Diferenças que você já pode notar:**

| | Java | JavaScript |
|---|---|---|
| Construtor | método com o nome da classe | sempre se chama `constructor` |
| Declarar atributos | obrigatório | opcional (o `this.nome = ...` já cria o campo) |
| Tipos | obrigatórios | não existem (o TypeScript vai trazer de volta) |
| Modificador de acesso | `public`/`private`/`protected` | tudo é público por padrão; privado com `#` |
| Usar atributos dentro da classe | `nome` ou `this.nome` | **sempre `this.nome`** |
| Palavra `function` nos métodos | não existe | também não se usa: `descrever() { }` |

> ⚠️ **Armadilha para quem vem do Java:** dentro de um método, escrever só `nome` (sem `this.`) **não** acessa o atributo. O JS vai procurar uma **variável** chamada `nome` no escopo (aula 1.4) e dar `ReferenceError`. Em JS, o `this.` é **sempre obrigatório**.

---

## 2. Campos (atributos) declarados na classe

Você pode declarar campos fora do construtor, como em Java, inclusive com valor inicial:

```javascript
class Carrinho {
  itens = [];          // campo com valor inicial (cada instância ganha o seu array)
  desconto = 0;

  adicionar(produto) {
    this.itens.push(produto);
  }
}

const c = new Carrinho();
c.adicionar({ nome: "Batata", preco: 8 });
console.log(c.itens.length); // 1
```

> ☕ Equivale a `private List<Produto> itens = new ArrayList<>();` no Java. E, assim como no Java, cada `new Carrinho()` recebe uma lista nova.

**Esse é o estilo que você vai ver no Angular:**

```typescript
export class ProdutosComponent {
  produtos = signal([]);        // campo
  carregando = signal(false);   // campo
}
```

---

## 3. Só existe UM construtor (sem sobrecarga)

Em Java, você pode ter vários construtores:

```java
public Produto(String nome) { this(nome, 0.0); }
public Produto(String nome, double preco) { ... }
```

**Em JavaScript, não existe sobrecarga** (nem de construtor, nem de método). Se você declarar dois métodos com o mesmo nome, o segundo **substitui** o primeiro, sem erro.

**Solução: parâmetros com valor padrão**

```javascript
class Produto {
  constructor(nome, preco = 0, categoria = "GERAL") {
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
  }
}

new Produto("Batata");               // preco 0, categoria "GERAL"
new Produto("Arroz", 15.99);          // categoria "GERAL"
new Produto("Coca", 13.99, "BEBIDA");
```

**Solução 2: receber um objeto (destructuring da aula 1.2)**

Quando são muitos parâmetros, é comum receber um objeto, o que funciona como um "Builder" do Java, só que bem mais simples:

```javascript
class Produto {
  constructor({ nome, preco = 0, categoria = "GERAL", estoque = 0 }) {
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
    this.estoque = estoque;
  }
}

new Produto({ nome: "Batata", estoque: 50 }); // a ordem não importa, e os nomes deixam claro o que é cada valor
```

> ☕ Isso substitui tanto a sobrecarga de construtores quanto o padrão Builder. E é o mesmo padrão de "parâmetros nomeados" que você viu na seção 6.4 da aula 1.2.

---

## 4. Encapsulamento: campos privados com `#`

### 4.1 Tudo é público por padrão

```javascript
class Conta {
  constructor(saldo) {
    this.saldo = saldo;
  }
}

const conta = new Conta(100);
conta.saldo = 1_000_000; // 😱 qualquer um pode alterar
```

> O `_` em `1_000_000` é só um separador visual de milhares, e funciona igual em Java: `1_000_000`.

### 4.2 Campos privados: prefixo `#`

```javascript
class Conta {
  #saldo = 0;                     // privado: só acessível DENTRO da classe

  constructor(saldoInicial) {
    this.#saldo = saldoInicial;
  }

  depositar(valor) {
    if (valor <= 0) throw new Error("Valor deve ser positivo");
    this.#saldo += valor;
  }

  consultarSaldo() {
    return this.#saldo;
  }

  #registrarLog(msg) {            // método privado também funciona
    console.log(`[LOG] ${msg}`);
  }
}

const conta = new Conta(100);
conta.depositar(50);
console.log(conta.consultarSaldo()); // 150
console.log(conta.saldo);            // undefined (#saldo e saldo são campos DIFERENTES)
// conta.#saldo;                     // ❌ SyntaxError: nem compila fora da classe
```

> ☕ `#saldo` é o `private double saldo` do Java. A diferença é que o `#` faz **parte do nome** do campo: você sempre escreve `this.#saldo`.

> 💡 **Spoiler do TypeScript:** no TS (e portanto no Angular), você também vai ter `private`, `protected`, `public` e `readonly`, iguais aos do Java. Mas o `#` é o privado "de verdade" do JavaScript: ele continua privado até em tempo de execução.

### 4.3 Prévia: lançando e capturando erros

O método `depositar` acima usa `throw` para recusar um valor inválido. Os exercícios desta aula também usam `try/catch`, então aqui vai o básico (o assunto completo é a aula 1.6). A boa notícia: é **quase igual ao Java**.

```javascript
try {
  conta.depositar(-10);                  // lança o erro...
  console.log("esta linha não executa");
} catch (e) {                            // ...e cai aqui
  console.log("Erro:", e.message);       // "Erro: Valor deve ser positivo"
}
```

| Java | JavaScript |
|---|---|
| `throw new IllegalArgumentException("msg");` | `throw new Error("msg");` |
| `catch (IllegalArgumentException e)` | `catch (e)`, sem tipo: captura **qualquer** erro |
| `e.getMessage()` | `e.message` |
| Checked exceptions (`throws` obrigatório) | Não existem: nenhum erro obriga você a tratar |

---

## 5. Getters e setters

### 5.1 Em Java: métodos comuns

```java
public double getPreco() { return preco; }
public void setPreco(double preco) {
    if (preco < 0) throw new IllegalArgumentException("Preço inválido");
    this.preco = preco;
}

produto.setPreco(10);
produto.getPreco();
```

### 5.2 Em JS: `get` e `set` (acessados como se fossem propriedades!)

```javascript
class Produto {
  #preco = 0;

  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;          // ← isto CHAMA o setter abaixo (já valida na criação!)
  }

  get preco() {
    return this.#preco;
  }

  set preco(valor) {
    if (valor < 0) throw new Error("Preço inválido");
    this.#preco = valor;
  }

  get precoFormatado() {         // getter "calculado": não tem campo correspondente
    return this.#preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}

const p = new Produto("Batata", 8);
p.preco = 10;                    // chama o SETTER (sem parênteses!)
console.log(p.preco);            // chama o GETTER → 10
console.log(p.precoFormatado);   // "R$ 10,00"
p.preco = -5;                    // ❌ Error: Preço inválido
```

**A diferença principal:** quem usa a classe escreve `p.preco` e `p.preco = 10`, **como se fosse uma propriedade comum**, mas por baixo um método é executado.

> ☕ **Comparação com Java:** você ganha a validação do setter sem obrigar todo mundo a escrever `getX()`/`setX()`. Por isso, em JS, é comum começar com campos públicos simples e só criar `get`/`set` quando precisar de alguma lógica. Nada de "gerar getters e setters" para tudo, como na IDE do Java.

> ⚠️ O nome do getter não pode ser igual ao de um campo comum (`this.preco`), senão o getter chamaria a si mesmo infinitamente. Por isso o campo real é `#preco`.

---

## 6. Membros estáticos (`static`)

Funciona **igual ao Java**: pertencem à classe, não à instância.

```javascript
class Produto {
  static #contador = 0;               // estático e privado
  static CATEGORIA_PADRAO = "GERAL";  // como uma constante "public static final"

  constructor(nome) {
    Produto.#contador++;
    this.id = Produto.#contador;
    this.nome = nome;
  }

  static total() {
    return Produto.#contador;
  }

  static criarBrinde() {              // "factory method", como em Java
    return new Produto("Brinde");
  }
}

new Produto("Batata");
new Produto("Arroz");
console.log(Produto.total());            // 2
console.log(Produto.CATEGORIA_PADRAO);   // "GERAL"
```

> ☕ Diferença: em Java, `static final` garante que a constante não muda. Em JS, `static CATEGORIA_PADRAO` **pode ser alterado** (`Produto.CATEGORIA_PADRAO = "X"` funciona). No TypeScript, você vai poder usar `static readonly`.

---

## 7. Herança: `extends` e `super`

### 7.1 Sintaxe: quase idêntica ao Java

```javascript
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  calcularFrete() {
    return 10;
  }

  descrever() {
    return `${this.nome}: R$ ${this.preco} (frete R$ ${this.calcularFrete()})`;
  }
}

class ProdutoDigital extends Produto {
  constructor(nome, preco, urlDownload) {
    super(nome, preco);               // chama o construtor da classe pai (OBRIGATÓRIO antes de usar this)
    this.urlDownload = urlDownload;
  }

  calcularFrete() {                   // sobrescrita (override)
    return 0;
  }

  descrever() {
    return `${super.descrever()} [digital]`;  // chama o método do pai
  }
}

const ebook = new ProdutoDigital("E-book JS", 29.9, "https://...");
console.log(ebook.descrever());          // "E-book JS: R$ 29.9 (frete R$ 0) [digital]"
console.log(ebook instanceof ProdutoDigital); // true
console.log(ebook instanceof Produto);        // true
```

> ☕ Tudo igual ao Java: `extends`, `super(...)` no construtor, `super.metodo()`, polimorfismo (o `descrever()` do pai chamou o `calcularFrete()` do filho) e `instanceof`.

**Diferenças:**
- Não existe `@Override`. Se você errar o nome do método, nada avisa (o TypeScript tem a palavra-chave `override` para isso).
- Em JS, chamar `super(...)` antes de usar `this` no construtor é **obrigatório**. Se esquecer: `ReferenceError`.
- Herança **simples**, como no Java (uma classe só pode estender uma outra).

### 7.2 E as interfaces e classes abstratas?

**O JavaScript não tem `interface` nem `abstract`.** Essas são ferramentas de verificação em tempo de compilação, e o JS não tem compilação com tipos.

Você vai ter **as duas no TypeScript** (Módulo 5), funcionando de forma muito parecida com o Java. Por enquanto, se precisar simular um método abstrato:

```javascript
class Forma {
  area() {
    throw new Error("Método area() deve ser implementado pela subclasse");
  }
}
```

> 💡 **Prefira composição a herança.** Isso vale no Java e vale ainda mais no Angular: em vez de hierarquias de classes, o Angular usa **injeção de dependência** (services injetados nos componentes). Herança aparece pouco no dia a dia.

---

## 8. Diferenças importantes em relação ao Java

### 8.1 Não existe `equals`, `hashCode` nem `toString` automático

```javascript
const a = new Produto("Batata", 8);
const b = new Produto("Batata", 8);

a === b; // false (referências diferentes, como o == do Java)
```

Não existe um `equals()` que o `===` ou o `includes` usem. Se precisar comparar, crie seu próprio método:

```javascript
class Produto {
  // ...
  equals(outro) {
    return outro instanceof Produto && this.nome === outro.nome && this.preco === outro.preco;
  }
}
```

Mas é um método comum: **ninguém chama ele automaticamente** (nem `includes`, nem `Set`, nem `Map`).

O `toString()` existe e você pode sobrescrever, e ele é usado quando o objeto vira texto:

```javascript
class Produto {
  // ...
  toString() {
    return `Produto(${this.nome})`;
  }
}

`${new Produto("Batata", 8)}`; // "Produto(Batata)"
```

> ⚠️ O `console.log(objeto)` **não** usa o `toString()` (ele mostra a estrutura do objeto).

### 8.2 Classes são "açúcar sintático" sobre protótipos

Por baixo dos panos, o JS não tem classes como o Java. Ele tem **protótipos**: cada objeto tem um link para outro objeto (seu "protótipo"), de onde herda métodos. A sintaxe `class` (de 2015) é só uma forma mais legível de escrever isso.

```javascript
typeof Produto; // "function" (uma classe é, tecnicamente, uma função especial)
```

Você **não precisa** dominar protótipos para trabalhar com Angular, mas vai ouvir o termo em entrevistas. Basta saber:
- Métodos de classe ficam no **protótipo** (compartilhados entre instâncias, como os métodos em Java).
- Campos ficam em **cada instância**.

### 8.3 O `this` pode se perder (aula 1.4!)

Em Java, o `this` dentro de um método sempre é a instância. Em JS, **depende de como o método foi chamado**:

```javascript
class Contador {
  valor = 0;
  incrementar() {
    this.valor++;
  }
}

const c = new Contador();
const inc = c.incrementar;
inc(); // ❌ TypeError: Cannot read properties of undefined (o this se perdeu)

setTimeout(c.incrementar, 100); // ❌ mesmo problema
setTimeout(() => c.incrementar(), 100); // ✅ arrow function preserva a chamada c.incrementar()
```

### 8.4 Quando usar classe e quando usar objeto literal?

Em Java, **tudo** precisa de uma classe. Em JS, não:

| Situação | Use |
|---|---|
| Dados simples (ex.: um produto vindo da API) | **Objeto literal** `{ nome, preco }` |
| Algo com comportamento + estado encapsulado | **Classe** |
| No Angular: componentes, services, pipes, diretivas | **Classe** (obrigatório) |
| No Angular: modelos de dados (Produto, Usuario...) | **Objeto literal** tipado com `interface` do TypeScript |

> ☕ **Isso é muito diferente do Java!** No Java, o `Produto` que vem da API vira uma classe/DTO/record. No Angular, o padrão é usar **objetos simples** descritos por uma `interface` do TS (que nem existe em tempo de execução). Você vai ver isso no Módulo 5.

---

## 9. 📋 Resumo (cola rápida)

| Java | JavaScript |
|---|---|
| `public Produto(...) { }` | `constructor(...) { }` |
| vários construtores (sobrecarga) | um só: use valores padrão ou um objeto de parâmetros |
| `private double preco;` | `#preco;` |
| `getPreco()` / `setPreco(v)` | `get preco()` / `set preco(v)` → usados como `p.preco` |
| `static` | `static` (igual) |
| `public static final X = ...` | `static X = ...` (pode ser alterado; `readonly` no TS) |
| `extends`, `super(...)`, `super.m()` | igual |
| `@Override` | não existe (`override` no TS) |
| `interface`, `abstract` | não existem (existem no TS) |
| `equals`/`hashCode` usados por coleções | não existem; `===` compara referência |
| `toString()` | existe, mas `console.log` não usa |
| `this` sempre é a instância | depende de como o método foi chamado |
| `nome` dentro do método acessa o atributo | precisa ser `this.nome` |

---

## ✍️ Exercícios

Abra o [exercicios.js](./exercicios.js), resolva os TODOs e rode:

```bash
node exercicios.js
```
