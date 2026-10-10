"use strict"; // ativa o modo estrito (o padrão em módulos e classes, ou seja, em projetos modernos)

// ============================================================
// Aula 1.4: Exercícios
// Rode com: node exercicios.js
// Nos exercícios de "prever", responda nos comentários ANTES de rodar.
// ============================================================

// ------------------------------------------------------------
// 1) ESCOPO: prever
// O que cada console.log imprime? Algum dá erro? (descomente um por vez)
// ------------------------------------------------------------
const a = "global";

function testeEscopo() {
  const a = "função";
  if (true) {
    const a = "bloco";
    let b = "só no bloco";
    console.log("1.1)", a);   // Resposta:
  }
  console.log("1.2)", a);     // Resposta:
  // console.log("1.3)", b);  // Resposta:
}

testeEscopo();
console.log("1.4)", a);       // Resposta:

// ------------------------------------------------------------
// 2) HOISTING: prever
// Para cada linha comentada, diga o que acontece se você descomentar:
// funciona, imprime undefined ou dá ReferenceError? Depois teste.
// ------------------------------------------------------------
// console.log("2.1)", quadrado(4));   // Resposta:
// console.log("2.2)", antiga);        // Resposta:
// console.log("2.3)", moderna);       // Resposta:
// console.log("2.4)", cubo(2));       // Resposta:

function quadrado(n) { return n * n; }
var antiga = "var";
const moderna = "const";
const cubo = n => n ** 3;

// ------------------------------------------------------------
// 3) VAR NO LOOP
// Explique com suas palavras por que o primeiro loop imprime 3, 3, 3
// e o segundo imprime 0, 1, 2:
// Resposta:
// ------------------------------------------------------------
for (var i = 0; i < 3; i++) setTimeout(() => console.log("3) var:", i), 0);
for (let j = 0; j < 3; j++) setTimeout(() => console.log("3) let:", j), 0);

// ------------------------------------------------------------
// 4) CLOSURE: CONTADOR
// Crie criarContador(inicio = 0, passo = 1) que retorna um OBJETO com:
//   incrementar() → soma "passo" e retorna o valor atual
//   decrementar() → subtrai "passo" e retorna o valor atual
//   resetar()     → volta para "inicio"
//   valor()       → retorna o valor atual
// O valor NÃO pode ser acessível diretamente (contador.atual deve dar undefined).
// Dica: `inicio = 0` é um PARÂMETRO COM VALOR PADRÃO, igual ao padrão do destructuring
// da aula 1.2: se quem chamar não passar o argumento, ele vale 0. (Java não tem;
// lá você usaria sobrecarga: criarContador() chamando criarContador(0, 1).)
// ------------------------------------------------------------
// TODO

// const c1 = criarContador();
// const c2 = criarContador(100, 10);
// c1.incrementar(); c1.incrementar(); c2.decrementar();
// console.log("4)", c1.valor(), c2.valor(), c1.atual); // esperado: 2 90 undefined

// ------------------------------------------------------------
// 5) CLOSURE: FÁBRICA DE FILTROS
// Crie precoEntre(min, max) que RETORNA uma função de filtro para usar
// em produtos.filter(...).
// ------------------------------------------------------------
const produtos = [
  { nome: "Batata", preco: 8 },
  { nome: "Coca Cola", preco: 13.99 },
  { nome: "Arroz", preco: 15.99 },
  { nome: "Notebook", preco: 7689.98 },
];
// TODO

// console.log("5)", produtos.filter(precoEntre(10, 20)).map(p => p.nome)); // esperado: ["Coca Cola", "Arroz"]

// ------------------------------------------------------------
// 6) CLOSURE: GERADOR DE IDs
// Crie criarGeradorId(prefixo) que retorna uma função. Cada chamada dessa
// função retorna o próximo id: "PROD-1", "PROD-2"... Geradores diferentes
// têm contagens independentes.
// ------------------------------------------------------------
// TODO

// const gerarProd = criarGeradorId("PROD");
// const gerarPed = criarGeradorId("PED");
// console.log("6)", gerarProd(), gerarProd(), gerarPed()); // esperado: PROD-1 PROD-2 PED-1

// ------------------------------------------------------------
// 7) THIS: prever
// O que cada linha imprime ou qual erro lança? Explique o porquê.
// ------------------------------------------------------------
const loja = {
  nome: "Mercadinho",
  metodoNormal() { return this?.nome; },
  metodoArrow: () => this?.nome,
};

console.log("7.1)", loja.metodoNormal());  // Resposta:            Por quê:
console.log("7.2)", loja.metodoArrow());   // Resposta:            Por quê:
const solta = loja.metodoNormal;
console.log("7.3)", solta());              // Resposta:            Por quê:
// (o ?. foi usado só para evitar erro e você conseguir ver o resultado)

// ------------------------------------------------------------
// 8) THIS: CONSERTE O BUG
// O método listar() deveria imprimir "Mercadinho vende: Batata",
// "Mercadinho vende: Arroz", mas está quebrado. Conserte trocando o
// MÍNIMO possível e explique a causa:
// Causa:
// ------------------------------------------------------------
const mercado = {
  nome: "Mercadinho",
  itens: ["Batata", "Arroz"],
  listar() {
    this.itens.forEach(function (item) {
      console.log("8)", `${this?.nome} vende: ${item}`);
    });
  },
};
mercado.listar();

// ------------------------------------------------------------
// 9) BIND
// Sem alterar o objeto "mercado", crie uma variável "listarMercado"
// que possa ser chamada sozinha, listarMercado(), sem perder o this.
// (Faça depois de consertar o exercício 8.)
// ------------------------------------------------------------
// TODO

// listarMercado();
