// ============================================================
// Aula 1.7, Parte 2: BUG 4
// Rode com (de dentro da pasta exercicios): node parte-2-bugs/bug-4.js
// Este código foi copiado de um tutorial antigo.
// Conserte usando import (módulos ES). A mensagem de erro sugere renomear o
// arquivo para .cjs: NÃO faça isso, porque o objetivo é usar a sintaxe atual.
// Esperado depois do conserto: bug-4: Olá, Bia! Seu saldo é R$ 250,00
// Causa:
// ============================================================

const { formatarMoeda } = require("./utils.js");
const saudar = require("./utils.js").default;

console.log("bug-4:", `${saudar("Bia")} Seu saldo é ${formatarMoeda(250)}`);
