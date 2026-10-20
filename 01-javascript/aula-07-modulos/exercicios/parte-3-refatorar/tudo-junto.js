// ============================================================
// Aula 1.7, Parte 3: o sistema INTEIRO num arquivo só.
// NÃO altere este arquivo: ele é a referência da saída esperada.
// Rode com (de dentro da pasta exercicios): node parte-3-refatorar/tudo-junto.js
// ============================================================

// ---------- FORMATAÇÃO ----------
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ---------- PRODUTO ----------
// Função auxiliar INTERNA: só a classe Produto usa.
function validarPreco(preco) {
  if (!Number.isFinite(preco) || preco <= 0) {
    throw new RangeError("Preço deve ser um número maior que zero");
  }
}

class Produto {
  static #contador = 0;
  #preco;

  constructor({ nome, preco }) {
    this.preco = preco; // passa pelo setter, que valida
    Produto.#contador++;
    this.id = Produto.#contador;
    this.nome = nome;
  }

  get preco() {
    return this.#preco;
  }

  set preco(valor) {
    validarPreco(valor);
    this.#preco = valor;
  }

  get precoFormatado() {
    return formatarMoeda(this.#preco);
  }

  toString() {
    return `${this.nome} (${this.precoFormatado})`;
  }

  static total() {
    return Produto.#contador;
  }
}

// ---------- CARRINHO ----------
class Carrinho {
  #itens = [];

  adicionar(produto, quantidade = 1) {
    if (quantidade <= 0) throw new RangeError("Quantidade deve ser maior que zero");

    const existente = this.#itens.find(item => item.produto.id === produto.id);
    if (existente) {
      existente.quantidade += quantidade;
    } else {
      this.#itens.push({ produto, quantidade });
    }
  }

  get total() {
    return this.#itens.reduce((soma, item) => soma + item.produto.preco * item.quantidade, 0);
  }

  get totalFormatado() {
    return formatarMoeda(this.total);
  }

  get itens() {
    return this.#itens.map(item => ({ ...item }));
  }
}

// ---------- DADOS ----------
const produtosIniciais = [
  new Produto({ nome: "Arroz", preco: 15.99 }),
  new Produto({ nome: "Feijão", preco: 9.5 }),
  new Produto({ nome: "Café", preco: 22.9 }),
];

// ---------- PROGRAMA PRINCIPAL ----------
const [arroz, feijao, cafe] = produtosIniciais;

const carrinho = new Carrinho();
carrinho.adicionar(arroz, 2);
carrinho.adicionar(feijao);
carrinho.adicionar(arroz);
carrinho.adicionar(cafe, 2);

console.log("Produtos cadastrados:", Produto.total());
carrinho.itens.forEach(item => console.log(`- ${item.quantidade}x ${item.produto}`));
console.log("Total:", carrinho.totalFormatado);

try {
  new Produto({ nome: "Inválido", preco: -1 });
} catch (e) {
  console.log("Erro esperado:", e.message);
}
