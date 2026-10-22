// ============================================================
// Aula 2.2: um servidor HTTP de verdade, feito com o Node
// Rode com (de dentro da pasta exercicios): node servidor.js
// Para parar o servidor: Ctrl+C no terminal.
// Depois de alterar este arquivo, pare e rode de novo para valer a mudança.
//
// ☕ Ele faz o papel de uma API Spring Boot bem pequena: uma "tabela" de
// produtos em memória e um CRUD em /produtos.
// ============================================================

import { createServer } from "node:http";

const PORTA = 3000;

// ============================================================
// PARTE 1: OS DADOS E AS ROTAS (é aqui que você vai trabalhar)
// ============================================================

let produtos = [
  { id: 1, nome: "Arroz", preco: 15.99 },
  { id: 2, nome: "Feijão", preco: 9.5 },
  { id: 3, nome: "Café", preco: 22.9 },
];
let proximoId = 4;

// Cada requisição chega aqui já "traduzida" num objeto simples:
//   metodo: "GET", "POST", "DELETE"...
//   partes: o caminho quebrado em pedaços. "/produtos/2" vira ["produtos", "2"]
//   query:  os parâmetros da query string. "?ordem=preco" vira { ordem: "preco" }
//   corpo:  o JSON do corpo da requisição, já convertido com JSON.parse
//           (ou undefined, se a requisição não tiver corpo)
//
// A função precisa RETORNAR um objeto de resposta: { status, corpo, cabecalhos }
// (o corpo e os cabeçalhos são opcionais).
// ☕ É como um método de um @RestController que devolve um ResponseEntity.
function tratarRequisicao({ metodo, partes, query, corpo }) {
  const [recurso, idTexto] = partes;

  if (recurso !== "produtos") {
    return { status: 404, corpo: { erro: "Rota não encontrada" } };
  }

  // ---------- /produtos ----------
  if (idTexto === undefined) {
    if (metodo === "GET") {
      const lista = query.ordem === "preco" ? produtos.toSorted((a, b) => a.preco - b.preco) : produtos;
      return { status: 200, corpo: lista };
    }

    if (metodo === "POST") {
      const erro = validarProduto(corpo);
      if (erro) return { status: 400, corpo: { erro } };

      const novo = { id: proximoId, nome: corpo.nome, preco: corpo.preco };
      proximoId++;
      produtos = [...produtos, novo];
      return { status: 201, corpo: novo, cabecalhos: { Location: `/produtos/${novo.id}` } };
    }

    return {
      status: 405,
      corpo: { erro: `Método ${metodo} não permitido em /produtos` },
      cabecalhos: { Allow: "GET, POST" },
    };
  }

  // ---------- /produtos/:id ----------
  const id = Number(idTexto); // Number("2") converte o texto "2" no número 2
  const produto = produtos.find(p => p.id === id);

  if (metodo === "GET") {
    if (!produto) return { status: 404, corpo: { erro: `Produto ${idTexto} não encontrado` } };
    return { status: 200, corpo: produto };
  }

  if(metodo === "DELETE"){
    if(!produto) return {status: 404, corpo: {erro: `Produto ${idTexto} não encontrado`}};
    produtos = produtos.filter(p => p.id !== id);
    return {status: 204};
  }

  if(metodo === "PATCH"){
    if(!produto) return {status: 404, corpo: {erro: `Produto ${idTexto} não encontrado`}};
    const {id: _id, ...camposPermitidos} = corpo ?? {};

    const produtoAtualizado = {
      ...produto,
      ...camposPermitidos
    };

    const erro = validarProduto(produtoAtualizado);
    if(erro) return {status: 400, corpo: { erro }};

    produtos = produtos.map(p => p.id === id ? produtoAtualizado : p );

    return {status: 200, corpo: produtoAtualizado};
  }

  return {
    status: 405,
    corpo: { erro: `Método ${metodo} não permitido em /produtos/${idTexto}` },
    cabecalhos: { Allow: "GET, DELETE, PATCH"},
  };
}

// Devolve a mensagem de erro, ou null se o produto for válido.
function validarProduto(dados) {
  if (!dados?.nome) return "O campo nome é obrigatório";
  if (!Number.isFinite(dados.preco) || dados.preco <= 0) {
    return "O campo preco deve ser um número maior que zero";
  }
  return null;
}

// ============================================================
// PARTE 2: O "MOTOR" DO SERVIDOR (você NÃO precisa entender agora)
// Este trecho usa async/await e streams, que você vai estudar no Módulo 4.
// Ele faz o papel que o Tomcat faz no Spring Boot: recebe o texto da
// requisição HTTP, entrega um objeto pronto para a tratarRequisicao e
// transforma a resposta dela de volta em texto HTTP.
// ============================================================

function enviar(req, res, resposta) {
  const { status, corpo, cabecalhos = {} } = resposta;
  const temCorpo = corpo !== undefined && status !== 204;
  const tipo = temCorpo ? { "Content-Type": "application/json; charset=utf-8" } : {};

  res.writeHead(status, { ...tipo, ...cabecalhos });
  res.end(temCorpo ? JSON.stringify(corpo, null, 2) : undefined);
  console.log(`${req.method} ${req.url} → ${status}`);
}

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const partes = url.pathname.split("/").filter(parte => parte !== "");
  const query = Object.fromEntries(url.searchParams);

  let texto = "";
  for await (const pedaco of req) texto += pedaco;

  if (texto !== "" && !req.headers["content-type"]?.includes("application/json")) {
    return enviar(req, res, {
      status: 415,
      corpo: { erro: "Envie o corpo com o cabeçalho Content-Type: application/json" },
    });
  }

  let corpo;
  try {
    corpo = texto === "" ? undefined : JSON.parse(texto);
  } catch {
    return enviar(req, res, { status: 400, corpo: { erro: "JSON inválido no corpo da requisição" } });
  }

  let resposta;
  try {
    resposta = tratarRequisicao({ metodo: req.method, partes, query, corpo });
    if (resposta === undefined) throw new Error("A tratarRequisicao não retornou uma resposta (faltou um return?)");
  } catch (e) {
    console.error(e);
    resposta = { status: 500, corpo: { erro: "Erro interno do servidor" } };
  }

  enviar(req, res, resposta);
});

servidor.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}/produtos (Ctrl+C para parar)`);
});
