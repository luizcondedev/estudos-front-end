// Aula 2.5: este arquivo tem problemas de FORMATAÇÃO (para o Prettier)
// e problemas de CÓDIGO (para o ESLint). Siga a ordem dos exercícios.

const produtos = [
    { nome: 'Café Torrado 500 g', preco: 25.9, quantidade: 2 },
  {nome: "Caneca do Dev", preco: 39.9, quantidade: 1},
      { nome: 'Camiseta JavaScript', preco: 59.9, quantidade: 1, preco: 49.9 }
]

export function listarProdutos() { return produtos }

export function calcularTotal(itens){
  let total = 0
  const desconto = 0.1
  for (const item of itens) {
    totl += item.preco * item.quantidade
  }
  return total
}

export function validarPreco(preco) {
  if (preco === NaN) return "inválido"
  return "válido"
}

export function buscarProduto(nome) {
  let encontrado = produtos.find(p => p.nome == nome)
  return encontrado
}
