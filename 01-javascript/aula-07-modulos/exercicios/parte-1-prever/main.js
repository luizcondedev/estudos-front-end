// ============================================================
// Aula 1.7, Parte 1: PREVER
// Rode com (de dentro da pasta exercicios): node parte-1-prever/main.js
// Leia contador.js, a.js e b.js. Responda tudo ANTES de rodar.
// ============================================================

import "./a.js";
import "./b.js";
import { valor, versao, configuracao } from "./contador.js";

// 1.1) Escreva, na ordem, as três primeiras linhas que serão impressas
//      (antes do "1.2)"). Quantas vezes "contador.js foi carregado" aparece? Por quê?
// Resposta:contador.js foi carregado, b.js executando, contador.js foi executado uma vez, pq depois que ele é carregado todos que usam ele usam a mesma "instância"

// 1.2) Qual número será impresso? Por quê?
// Resposta: 2, pq todos utilizam do mesmo contador.js
console.log("1.2)", valor());

// 1.3) O que acontece nesta tentativa de reatribuir o versao? Por quê?
// Resposta: Nao podemos reatribuir algo importado
try {
  versao = 2;
} catch (e) {
  console.log("1.3)", e.name, "-", e.message);
}

// 1.4) Quem alterou a moeda? Qual valor será impresso? Por que isso é
//      permitido, se a 1.3 não foi?
// Resposta: Podemos reatribuir algo de um objeto importado
console.log("1.4)", configuracao.moeda);

// 1.5) O que será impresso? (lembre da aula 1.4 e da seção 8.2 desta aula)
// Resposta: Undefined, pois módulos sempre estão em modo estrito
console.log("1.5)", this);

// 1.6) O contador.js tem uma variável "total", mas ela não foi exportada.
//      a) O que acontece se você descomentar o import abaixo e rodar?
//      b) Alguma linha deste arquivo chega a ser impressa? Por quê?
//      Responda, teste e depois comente a linha de novo.
// Resposta a: Vai dar erro, pois não exportamos o total
// Resposta b: Não, pois o JS checa todos os imports antes de rodar o código
// import { total } from "./contador.js";
