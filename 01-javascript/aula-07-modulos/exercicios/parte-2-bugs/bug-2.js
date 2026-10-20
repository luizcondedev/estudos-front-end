// ============================================================
// Aula 1.7, Parte 2: BUG 2
// Rode com (de dentro da pasta exercicios): node parte-2-bugs/bug-2.js
// Esperado depois do conserto: bug-2: Olá, Ana!
// Causa: O erro está em colocar o nome de um export default dentro de chaves, pois um export default nao tem nome definido, definimos apenas como vai ser chamado no arquivo que ele é importado
// ============================================================

import saudar from "./utils.js";

console.log("bug-2:", saudar("Ana"));
