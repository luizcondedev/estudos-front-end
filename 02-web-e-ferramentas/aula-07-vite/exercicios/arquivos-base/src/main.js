// O ponto de partida do JavaScript da Lojinha (o index.html carrega este arquivo).
import "./style.css"; // o Vite coloca este CSS na página (seção 3 da aula)
import { produtos } from "./produtos.js";
import { calcularTotal, formatarPreco } from "./util.js";

const total = calcularTotal(produtos);

document.querySelector("#quantidade").textContent =
  `${produtos.length} produtos no carrinho`;
document.querySelector("#total").textContent = `Total: ${formatarPreco(total)}`;
