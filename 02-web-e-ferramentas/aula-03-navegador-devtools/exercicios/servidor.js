// ============================================================
// Aula 2.3: o servidor da "Lojinha" (você NÃO precisa alterar este arquivo)
// Rode com (de dentro da pasta exercicios): node servidor.js
// Depois abra no navegador: http://localhost:3001
// Para parar o servidor: Ctrl+C no terminal.
//
// Ele faz duas coisas:
//   1. Entrega os arquivos da pasta "publico" (o HTML, o CSS e o JS do site)
//   2. Responde a API GET /api/produtos (com um atraso proposital de 1,5 s)
//
// ☕ Num projeto Spring Boot, é como ter os arquivos em src/main/resources/static
// e um @RestController para a API, tudo no mesmo servidor.
// Este código usa coisas que você vai estudar no Módulo 4 (async/await).
// ============================================================

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORTA = 3001;
const PASTA_PUBLICA = join(import.meta.dirname, "publico");

const produtos = [
  { id: 1, nome: "Arroz 5 kg", preco: 27.9, categoria: "Mercearia" },
  { id: 2, nome: "Feijão Carioca 1 kg", preco: 8.49, categoria: "Mercearia" },
  { id: 3, nome: "Café Torrado 500 g", preco: 22.9, categoria: "Bebidas" },
  { id: 4, nome: "Leite Integral 1 L", preco: 5.79, categoria: "Laticínios" },
];

// O Content-Type certo para cada tipo de arquivo (aula 2.2, seção 4.4)
const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const esperar = ms => new Promise(resolver => setTimeout(resolver, ms));

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // ---------- A API ----------
  if (url.pathname === "/api/produtos" && req.method === "GET") {
    await esperar(1500); // simula um banco de dados lento
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ dados: produtos, total: produtos.length }, null, 2));
    console.log(`${req.method} ${req.url} → 200`);
    return;
  }

  // ---------- Os arquivos do site ----------
  const caminho = url.pathname === "/" ? "/index.html" : url.pathname;
  const arquivo = normalize(join(PASTA_PUBLICA, caminho));

  try {
    if (!arquivo.startsWith(PASTA_PUBLICA)) throw new Error("Fora da pasta pública");
    const conteudo = await readFile(arquivo);
    const cabecalhos = { "Content-Type": TIPOS[extname(arquivo)] ?? "application/octet-stream" };

    // Na página principal, o servidor manda o navegador guardar dois cookies (exercício 9)
    if (caminho === "/index.html") {
      cabecalhos["Set-Cookie"] = [
        "visitante=dev-carioca; Path=/; SameSite=Lax",
        "sessao=abc123-token-secreto; Path=/; HttpOnly; SameSite=Lax",
      ];
    }

    res.writeHead(200, cabecalhos);
    res.end(conteudo);
    console.log(`${req.method} ${req.url} → 200`);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Arquivo não encontrado");
    console.log(`${req.method} ${req.url} → 404`);
  }
});

servidor.listen(PORTA, () => {
  console.log(`Lojinha rodando em http://localhost:${PORTA} (Ctrl+C para parar)`);
});
