// ============================================================
// Aula 1.7, Parte 2: BUG 3
// Rode com (de dentro da pasta exercicios): node parte-2-bugs/bug-3.js
// Este NÃO dá erro: ele imprime um resultado errado. Esse é o pior tipo de bug.
// Esperado depois do conserto: bug-3: R$ 1.500,00
// O que foi impresso antes do conserto?
// Causa:
// ============================================================

import formatarMoeda from "./utils.js";

console.log("bug-3:", formatarMoeda(1500));
