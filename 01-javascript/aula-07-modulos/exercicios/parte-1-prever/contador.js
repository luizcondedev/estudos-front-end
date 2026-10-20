// Parte 1: não altere este arquivo.

console.log("contador.js foi carregado");

let total = 0;

export const versao = 1;

export const configuracao = { moeda: "BRL" };

export function incrementar() {
  total++;
}

export function valor() {
  return total;
}
