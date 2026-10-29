// ============================================================
// Aula 2.8, exercício 2: resolva usando a IA só para pedir DICAS.
// Regras: nada de pedir o código pronto (veja o exercicios.md).
// Como rodar (de dentro da pasta exercicios): node desafio.js
// ============================================================

const produtos = [
  { nome: "Café Torrado 500 g", categoria: "bebidas", preco: 26, quantidade: 2 },
  { nome: "Chá Mate", categoria: "bebidas", preco: 12.5, quantidade: 3 },
  { nome: "Caneca do Dev", categoria: "utensílios", preco: 40, quantidade: 1 },
  { nome: "Camiseta JavaScript", categoria: "roupas", preco: 50, quantidade: 1 },
  { nome: "Moletom TypeScript", categoria: "roupas", preco: 130, quantidade: 1 },
];

// TODO: devolva um objeto com uma chave para cada categoria. O valor de cada
// chave é um objeto com:
//   - itens: a soma das quantidades dos produtos daquela categoria
//   - total: a soma de preço x quantidade dos produtos daquela categoria
// Não altere o array produtos.
function resumoPorCategoria(lista) {
  // seu código aqui
}

// ------------------------------------------------------------
// Testes (não altere daqui para baixo)
// ------------------------------------------------------------
const antes = JSON.stringify(produtos);
const resultado = resumoPorCategoria(produtos);
console.log(resultado);
// Esperado:
// {
//   bebidas: { itens: 5, total: 89.5 },
//   'utensílios': { itens: 1, total: 40 },
//   roupas: { itens: 2, total: 180 }
// }

const esperado = {
  bebidas: { itens: 5, total: 89.5 },
  utensílios: { itens: 1, total: 40 },
  roupas: { itens: 2, total: 180 },
};
const categorias = Object.keys(esperado);
const certo =
  Object.keys(resultado ?? {}).length === categorias.length &&
  categorias.every(
    (c) =>
      resultado[c]?.itens === esperado[c].itens &&
      resultado[c]?.total === esperado[c].total,
  );
console.log(certo ? "✅ Resultado certo" : "❌ Resultado diferente do esperado");
console.log(
  JSON.stringify(produtos) === antes
    ? "✅ O array original não foi alterado"
    : "❌ O array original foi alterado",
);
