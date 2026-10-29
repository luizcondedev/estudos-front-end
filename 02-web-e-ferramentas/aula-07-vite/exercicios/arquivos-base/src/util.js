export function calcularTotal(itens) {
  return itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}

// Formata um número como dinheiro brasileiro: 141.6 → "R$ 141,60"
export function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Atenção: esta função NÃO é usada pelo main.js (exercício 4).
export function mensagemFrete(total) {
  return total >= 200 ? "Frete grátis para você!" : "Frete fixo de R$ 15,00";
}
