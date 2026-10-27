import { buscarProduto, calcularTotal, listarProdutos, validarPreco } from "./carrinho.js";

console.log("Camiseta:", buscarProduto("Camiseta JavaScript"));
console.log("Um preço NaN é:", validarPreco(NaN));
console.log("Total:", calcularTotal(listarProdutos()));
