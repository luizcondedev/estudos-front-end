// O ponto de partida do JavaScript da Lojinha (o index.html carrega este arquivo).
import "./style.css"; // o Vite coloca este CSS na página (seção 3 da aula)
import { produtos } from "./produtos.js";
import { calcularTotal, formatarPreco } from "./util.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

const total = calcularTotal(produtos);

document.querySelector("#quantidade").textContent =
  `${produtos.length} itens na sacola`;
document.querySelector("#total").textContent = `Total: ${formatarPreco(total)}`;
document.querySelector("#data").textContent =
    "Hoje é " + format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });
document.querySelector("#titulo").textContent = import.meta.env.VITE_NOME_LOJA;
document.querySelector("#ambiente").textContent =
    `Modo: ${import.meta.env.MODE} | Segredo: ${import.meta.env.SEGREDO}`;
