// ============================================================
// Aula 1.7, Parte 3: REFATORAR EM MÓDULOS
// Rode com (de dentro da pasta exercicios): node parte-3-refatorar/main.js
//
// Objetivo: separar o tudo-junto.js nesta estrutura (crie as pastas e os arquivos):
//
//   parte-3-refatorar/
//   ├── tudo-junto.js         ← NÃO altere (é a referência)
//   ├── main.js               ← este arquivo: fica só com o PROGRAMA PRINCIPAL
//   ├── utils/
//   │   └── formatacao.js     ← export NOMEADO de formatarMoeda
//   ├── modelos/
//   │   ├── produto.js        ← export NOMEADO de Produto (o validarPreco fica INTERNO)
//   │   ├── carrinho.js       ← export NOMEADO de Carrinho
//   │   └── index.js          ← barrel: reexporta Produto e Carrinho
//   └── dados/
//       └── produtos.js       ← export DEFAULT do array produtosIniciais
//
// Regras:
//   1. Cada arquivo importa SÓ o que usa. Pense: o carrinho.js precisa
//      importar o Produto? E o formatarMoeda?
//   2. Use os caminhos relativos certos (./ e ../, seção 4.3 da aula),
//      sempre com a extensão .js.
//   3. O main.js importa o Produto e o Carrinho pelo barrel
//      (modelos/index.js), e não direto dos arquivos produto.js e carrinho.js.
//   4. A saída precisa ser IDÊNTICA à do tudo-junto.js. Rode os dois e compare.
//
// Perguntas (responda depois de terminar):
// P1) Por que o validarPreco NÃO deve ser exportado? Qual é o equivalente em Java?
// Resposta: Porque o método vai ser usado apenas pela classe Produto, o equivalente em Java é o private
// P2) O produto.js e o carrinho.js importam o formatarMoeda. Quantas vezes
//     o formatacao.js é executado? Por quê? (Para conferir, coloque um
//     console.log temporário no topo do formatacao.js e rode o main.js.)
// Resposta: 1 vez só, todos recebem o mesmo modulo guardado em Cache
// P3) Qual é a vantagem de o main.js importar do barrel (modelos/index.js)?
// Resposta: Organização e Código mais limpo, nao ter que usar varias vezes o import para importar arquivos de dentro da mesma pasta
// ============================================================

import {Produto, Carrinho} from "./modelos/index.js";
import produtosIniciais from "./dados/produtos.js";

// ---------- PROGRAMA PRINCIPAL ----------
// Descomente quando os imports estiverem prontos. Não altere este trecho.

 const [arroz, feijao, cafe] = produtosIniciais;

 const carrinho = new Carrinho();
 carrinho.adicionar(arroz, 2);
 carrinho.adicionar(feijao);
 carrinho.adicionar(arroz);
 carrinho.adicionar(cafe, 2);

 console.log("Produtos cadastrados:", Produto.total());
 carrinho.itens.forEach(item => console.log(`- ${item.quantidade}x ${item.produto}`));
 console.log("Total:", carrinho.totalFormatado);

 try {
   new Produto({ nome: "Inválido", preco: -1 });
 } catch (e) {
   console.log("Erro esperado:", e.message);
 }
