// Parte 2: não altere este arquivo.

export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function saudar(nome) {
  return `Olá, ${nome}!`;
}
