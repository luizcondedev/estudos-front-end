// ============================================================
// Aula 1.3: Exercícios
// Rode com: node exercicios.js
// Regra: nenhum exercício pode mutar `produtos` (verificação no final).
// ============================================================

const produtos = [
  { id: 1, nome: "Batata", preco: 8, categoria: "VERDURA", estoque: 0 },
  { id: 2, nome: "Coca Cola", preco: 13.99, categoria: "BEBIDA", estoque: 30 },
  { id: 3, nome: "Arroz", preco: 15.99, categoria: "GRAOS", estoque: 12 },
  { id: 4, nome: "Feijão", preco: 9.5, categoria: "GRAOS", estoque: null },
  {
    id: 5,
    nome: "Notebook",
    preco: 7689.98,
    categoria: "ELETRONICOS",
    estoque: 3,
    fornecedor: { nome: "Acer", endereco: null },
  },
  { id: 6, nome: "Água", preco: 3.5, categoria: "BEBIDA", estoque: 100 },
];

const produtosOriginais = structuredClone(produtos);

// ------------------------------------------------------------
// 1) TRUTHY/FALSY: responda nos comentários ANTES de rodar
// Para cada valor, diga se é truthy ou falsy:
// ------------------------------------------------------------
const valores = [0, "0", "", " ", [], {}, null, undefined, NaN, "false", -1];
// 0:          | "0":        | "":         | " ":
// []:         | {}:         | null:       | undefined:
// NaN:        | "false":    | -1:

console.log("1)", valores.map(v => [v, v ? "truthy" : "falsy"]));

// ------------------------------------------------------------
// 2) ?? x ||
// Para cada produto, gere a string "Nome: X unidades".
// Se o estoque for null/undefined, mostre "sem informação".
// ATENÇÃO: a Batata tem estoque 0, e 0 é um valor válido (deve aparecer "0 unidades").
// Faça primeiro com || e veja o bug, depois corrija com ??.
// Explique o bug:
// ------------------------------------------------------------
// TODO

// console.log("2)", estoques);

// ------------------------------------------------------------
// 3) OPTIONAL CHAINING
// Crie a função cidadeDoFornecedor(produto) que retorna a cidade do
// endereço do fornecedor, ou "Sem fornecedor" se não for possível.
// Deve funcionar para TODOS os produtos sem lançar erro.
// Dica: só o Notebook tem fornecedor, e o endereço dele é null.
// ------------------------------------------------------------
// TODO

// console.log("3)", produtos.map(cidadeDoFornecedor));

// ------------------------------------------------------------
// 4) FIND + ?. + ??
// Crie a função buscarPreco(nome) que retorna o preço do produto
// com aquele nome, ou a string "Produto não encontrado".
// Uma linha só no corpo da função!
// ------------------------------------------------------------
// TODO

// console.log("4)", buscarPreco("Arroz"), buscarPreco("Café"));

// ------------------------------------------------------------
// 5) SOME / EVERY / INCLUDES
// a) Existe algum produto com estoque zerado (exatamente 0)?
// b) Todos os produtos custam menos de 10.000?
// c) Monte o array de categorias (sem repetição: use Set, seção 4.11) e
//    verifique com includes se existe a categoria "CARNES".
// ------------------------------------------------------------
// TODO

// console.log("5)", temZerado, todosAbaixo10mil, categorias, temCarnes);

// ------------------------------------------------------------
// 6) INCLUDES COM OBJETOS
// Por que o resultado abaixo é false? Responda:
// Depois, reescreva a verificação de um jeito que dê true.
// ------------------------------------------------------------
const batataCopia = { ...produtos[0] };
console.log("6)", produtos.includes(batataCopia));
// TODO

// ------------------------------------------------------------
// 7) SLICE
// Pegue os 3 primeiros produtos e os 2 últimos (2 arrays), sem mutar.
// ------------------------------------------------------------
// TODO

// console.log("7)", tresPrimeiros.map(p => p.nome), doisUltimos.map(p => p.nome));

// ------------------------------------------------------------
// 8) ORDENAÇÃO
// a) Por preço, do MAIOR para o menor
// b) Por nome, A-Z (atenção ao "Água": ele deve ficar no começo, não no fim!)
// c) Por categoria A-Z e, em caso de empate, por preço crescente
// Use toSorted em todos.
// ------------------------------------------------------------
// TODO

// console.log("8a)", porPrecoDesc.map(p => p.nome));
// console.log("8b)", porNome.map(p => p.nome));
// console.log("8c)", porCategoriaEPreco.map(p => `${p.categoria} - ${p.nome}`));

// ------------------------------------------------------------
// 9) A ARMADILHA DO SORT
// Responda ANTES de rodar: qual será o resultado?
// Resposta:
// Depois, corrija para ordenar numericamente.
// ------------------------------------------------------------
const notas = [10, 9, 100, 1, 25];
console.log("9)", notas.toSorted());
// TODO

// ------------------------------------------------------------
// 10) GROUPBY + MAP
// Gere um objeto com o TOTAL EM ESTOQUE (soma do campo estoque) por categoria.
// Estoque null deve contar como 0.
// Esperado: { VERDURA: 0, BEBIDA: 130, GRAOS: 12, ELETRONICOS: 3 }
// Dica: Object.groupBy, depois Object.entries + map + Object.fromEntries
// (Object.fromEntries faz o caminho inverso do Object.entries).
// ------------------------------------------------------------
// TODO

// console.log("10)", estoquePorCategoria);

// ------------------------------------------------------------
// 11) DESAFIO: RELATÓRIO
// Gere a string abaixo usando os métodos da aula (filter, toSorted, map, join...):
// "Produtos em estoque (do mais barato ao mais caro): Água, Coca Cola, ..."
// Regras: só produtos com estoque > 0 (null NÃO conta como em estoque),
// ordenados por preço crescente, nomes separados por vírgula.
// ------------------------------------------------------------
// TODO

// console.log("11)", relatorio);

// ------------------------------------------------------------
// VERIFICAÇÃO FINAL (não altere)
// ------------------------------------------------------------
const naoMutou = JSON.stringify(produtos) === JSON.stringify(produtosOriginais);
console.log(naoMutou ? "✅ Nenhum dado original foi mutado!" : "❌ Algum exercício MUTOU o array original!");
