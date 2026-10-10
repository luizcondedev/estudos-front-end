// ============================================================
// Aula 02: Exercícios
// Rode com: node exercicios.js
// Regra geral: NENHUM exercício pode alterar (mutar) o array `produtos`
// nem os objetos dentro dele. O exercício 11 confere isso no final.
// ============================================================

const produtos = [
  { id: 1, nome: "Batata", preco: 8, categoria: "VERDURA" },
  { id: 2, nome: "Coca Cola", preco: 13.99, categoria: "BEBIDA" },
  { id: 3, nome: "Arroz 2KG", preco: 15.99, categoria: "GRAOS" },
  { id: 4, nome: "Lasanha Congelada", preco: 20.99, categoria: "CONGELADOS" },
  {
    id: 5,
    nome: "Notebook Gamer Acer",
    preco: 7689.98,
    categoria: "ELETRONICOS",
    fornecedor: { nome: "Acer", cidade: "São Paulo" },
  },
];

// Guarda uma cópia profunda do original para conferir no final
const produtosOriginais = structuredClone(produtos);

// ------------------------------------------------------------
// 1) VALOR x REFERÊNCIA (responda nos comentários ANTES de rodar)
// ------------------------------------------------------------
let x = 5;
let y = x;
y = 10;

const p1 = { nome: "Feijão" };
const p2 = p1;
p2.nome = "Lentilha";

const p3 = { nome: "Lentilha" };

// Qual será o valor de x?           Resposta: 5
// Qual será o valor de p1.nome?     Resposta: Lentilha
// p1 === p2 dá true ou false?       Resposta: True
// p1 === p3 dá true ou false?       Resposta: False
// POR QUE p1 === p3 dá esse resultado, se o conteúdo é igual?
// Resposta: Porque o === compara a referência de memória, e não se um objeto é igual ao outro

console.log("1)", x, p1.nome, p1 === p2, p1 === p3);

// ------------------------------------------------------------
// 2) SPREAD EM OBJETO
// Crie `batataCara`: uma cópia do produtos[0] com preço 12.
// ------------------------------------------------------------
const batataCara = {...produtos[0], preco: 12};

 console.log("2)", batataCara, produtos[0]);

// ------------------------------------------------------------
// 3) ADICIONAR PROPRIEDADE
// Crie `batataComEstoque`: cópia de produtos[0] com uma nova
// propriedade `estoque: 100`.
// ------------------------------------------------------------
const batataComEstoque = {...produtos[0], estoque: 100};

 console.log("3)", batataComEstoque);

// ------------------------------------------------------------
// 4) ADICIONAR NA LISTA (imutável)
// Crie a função adicionarProduto(lista, produto) que retorna
// um NOVO array com o produto no final. Não use push!
// ------------------------------------------------------------
function adicionarProduto(lista, produto){
  return [...lista, produto];
}

 const listaComFeijao = adicionarProduto(produtos, { id: 6, nome: "Feijão", preco: 9.5, categoria: "GRAOS" });
 console.log("4)", listaComFeijao.length, produtos.length); // esperado: 6 5

// ------------------------------------------------------------
// 5) REMOVER DA LISTA (imutável)
// Crie a função removerProduto(lista, id) que retorna um NOVO
// array sem o produto daquele id.
// ------------------------------------------------------------
function removerProduto(lista, id){
  const listaSemItem = lista.filter(p => p.id !== id);
  
  return listaSemItem;
}

 console.log("5)", removerProduto(produtos, 2).map(p => p.nome));

// ------------------------------------------------------------
// 6) ATUALIZAR NA LISTA (imutável): o mais importante!
// Crie a função atualizarPreco(lista, id, novoPreco) que retorna
// um NOVO array em que só o produto daquele id tem o preço alterado.
// Dica: map + ternário + spread (seção 4.4 da aula).
// ------------------------------------------------------------
function atualizarPreco(lista, id, novoPreco){
  const listaComProdutoAtualizado = lista.map(p => p.id === id ? {...p, preco: novoPreco} : p);

  return listaComProdutoAtualizado;
}

 const atualizada = atualizarPreco(produtos, 3, 19.9);
 console.log("6)", atualizada[2].preco, produtos[2].preco); // esperado: 19.9 15.99
 console.log("6) mesmo objeto nos não alterados?", atualizada[0] === produtos[0]); // esperado: true

// ------------------------------------------------------------
// 7) DESTRUCTURING DE OBJETO
// Do produtos[1], extraia com UMA linha de destructuring:
//   - nome, guardando numa variável chamada `nomeBebida`
//   - preco
//   - estoque, com valor padrão 0
// ------------------------------------------------------------
const {nome: nomeBebida, preco, estoque = 0} = produtos[1];

 console.log("7)", nomeBebida, preco, estoque);

// ------------------------------------------------------------
// 8) DESTRUCTURING NO PARÂMETRO
// Usando map com destructuring no parâmetro ({ nome, preco }) => ...
// gere um array de strings no formato: "Batata custa R$ 8"
// ------------------------------------------------------------
const descricoes = produtos.map(({nome, preco}) => `${nome} custa R$ ${preco}`);

 console.log("8)", descricoes);

// ------------------------------------------------------------
// 9) REMOVER PROPRIEDADE SEM MUTAR (destructuring + rest)
// Gere `produtoParaApi`: o produtos[0] SEM o campo `id`.
// Não use delete!
// ------------------------------------------------------------
const {_id, ...produtoParaApi} = produtos[0];

 console.log("9)", produtoParaApi, produtos[0]);

// ------------------------------------------------------------
// 10) REST EM PARÂMETRO + SPREAD EM CHAMADA
// a) Crie somarPrecos(...precos) que soma quantos números receber.
// b) Crie o array `precos` com map, e chame somarPrecos espalhando
//    esse array com spread.
// c) Use Math.max com spread para achar o maior preço.
// ------------------------------------------------------------
function somarPrecos(...precos){
  return precos.reduce((total, p) => total + p, 0);
}

const precos = produtos.map(p => p.preco);
const maiorPreco = Math.max(...precos);

 console.log("10)", somarPrecos(1, 2, 3), somarPrecos(...precos), maiorPreco);

// ------------------------------------------------------------
// 11) DESAFIO: CÓPIA RASA
// Crie `notebookRecife`: cópia do produtos[4] em que a cidade do
// fornecedor seja "Recife", SEM alterar o produto original.
// Atenção: { ...produtos[4] } sozinho NÃO resolve. Por quê?
// Resposta: Porque o Spread faz uma cópia simples, como o fornecedor é um objeto dentro de um objeto, ele copia a referencia de memoria de fornecedor, alterando assim tambem o valor do objeto original
// ------------------------------------------------------------
const notebookRecife = {...produtos[4], fornecedor: {
  ...produtos[4].fornecedor, cidade: "Recife"
}};

 console.log("11)", notebookRecife.fornecedor.cidade, produtos[4].fornecedor.cidade); // esperado: Recife São Paulo

// ------------------------------------------------------------
// 12) DESAFIO: AGRUPAR POR CATEGORIA (reduce + spread)
// Gere um objeto assim, SEM mutar o acumulador (crie um novo a cada volta):
// { VERDURA: ["Batata"], BEBIDA: ["Coca Cola"], GRAOS: ["Arroz 2KG"], ... }
// Dica: [categoria] entre colchetes cria uma chave a partir de uma variável:
//   const campo = "cor"; const obj = { [campo]: "azul" }; // { cor: "azul" }
// ------------------------------------------------------------
const porCategoria = produtos.reduce((acumulador, produto) => ({
  ...acumulador, 
  [produto.categoria]: [...acumulador[produto.categoria] ?? [], produto.nome]
}), {}) // O Reduce tem um acumulador, esse acumulador é um Objeto vazio, a cada produto eu crio um novo objeto passando o acumulador

console.log("12)", porCategoria);

// ------------------------------------------------------------
// VERIFICAÇÃO FINAL (não altere): confere se você mutou algo
// ------------------------------------------------------------
const naoMutou = JSON.stringify(produtos) === JSON.stringify(produtosOriginais);
console.log(naoMutou ? "✅ Nenhum dado original foi mutado!" : "❌ Algum exercício MUTOU o array original!");
