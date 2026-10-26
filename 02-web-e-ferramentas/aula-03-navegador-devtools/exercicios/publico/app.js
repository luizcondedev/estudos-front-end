// ============================================================
// Aula 2.3: o JavaScript da Lojinha
// Você vai aprender a escrever código assim no Módulo 4 (DOM, fetch e
// async/await). Por enquanto, só LEIA: os comentários explicam cada parte.
// Os exercícios 5 e 6 pedem consertos pequenos, de uma linha cada.
// ============================================================

// 1) Procura dois elementos na página pelo id (como um getElementById do DOM do Java)
const mensagem = document.querySelector("#status");
const lista = document.querySelector("#lista-produtos");

// 2) Troca o texto do <p id="status"> enquanto os produtos carregam
mensagem.textContent = "Carregando produtos...";

// 3) Guarda no navegador a data e a hora desta visita (exercício 9)
//    O Date é a classe de datas do JavaScript (como o LocalDateTime do Java).
localStorage.setItem("ultimaVisita", new Date().toLocaleString("pt-BR"));

// 4) Busca os produtos na API e cria um <li> para cada um
async function carregarProdutos() {
  const resposta = await fetch("/api/produtos"); // faz o GET (aula 2.2)
  const json = await resposta.json();            // converte o corpo com JSON.parse (aula 1.6)
  const produtos = json.dados;

  for (const produto of produtos) {
    const item = document.createElement("li");   // cria um elemento <li> novo
    item.className = "card";
    item.innerHTML = `
      <strong>${produto.nome}</strong> (${produto.categoria})<br>
      <span class="preco">${produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
    `;
    lista.append(item);                          // coloca o <li> dentro do <ul>
  }

  mensagem.textContent = `${produtos.length} produtos carregados.`;
}

carregarProdutos();
