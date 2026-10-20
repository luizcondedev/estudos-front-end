// ============================================================
// Aula 1.7, Parte 2: BUG 1
// Rode com (de dentro da pasta exercicios): node parte-2-bugs/bug-1.js
// Esperado depois do conserto: bug-1: R$ 1.500,00
// Causa: Nao colocamos a extensao .js, ela deve ser colocada em todas os arquivos que rodamos com JS puro, para o Node conseguir encontrar o arquivo
// ============================================================

import { formatarMoeda } from "./utils.js";

console.log("bug-1:", formatarMoeda(1500));
