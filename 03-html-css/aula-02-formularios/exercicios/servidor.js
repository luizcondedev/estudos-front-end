// ============================================================
// Aula 3.2: o servidor dos formulários (você NÃO precisa alterar este arquivo)
// Rode com (de dentro da pasta exercicios): node servidor.js
// Depois abra no navegador: http://localhost:3002
// Para parar o servidor: Ctrl+C no terminal.
//
// Ele faz três coisas:
//   1. Entrega os arquivos da pasta "publico" (as páginas com os formulários)
//   2. Em /busca e /login, MOSTRA o que o formulário enviou (método e campos)
//   3. Em /cadastro, VALIDA os dados no servidor antes de aceitar
//
// ☕ No Spring, o item 3 seria um @PostMapping("/cadastro") recebendo um
// objeto com @Valid e as anotações do Bean Validation (@NotBlank, @Size...).
// Este código usa coisas que você vai estudar no Módulo 4 (async/await).
// ============================================================

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORTA = 3002;
const PASTA_PUBLICA = join(import.meta.dirname, "publico");

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

// Troca os caracteres especiais do HTML por entidades (aula 3.1, seção 5),
// para o texto digitado pelo usuário aparecer como texto, e nunca virar uma tag.
function escapar(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Lê o corpo da requisição inteiro, como texto
async function lerCorpo(req) {
  let corpo = "";
  for await (const pedaco of req) corpo += pedaco;
  return corpo;
}

function pagina(titulo, conteudo) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapar(titulo)}</title>
  <link rel="stylesheet" href="/estilos.css">
</head>
<body>
  <main>
    <h1>${escapar(titulo)}</h1>
    ${conteudo}
    <p><a href="javascript:history.back()">← Voltar para o formulário</a></p>
  </main>
</body>
</html>`;
}

function tabelaDeCampos(campos) {
  if (campos.length === 0) {
    return "<p><strong>Nenhum campo chegou ao servidor.</strong></p>";
  }
  const linhas = campos
    .map(([nome, valor]) => `<tr><td>${escapar(nome)}</td><td>${escapar(valor)}</td></tr>`)
    .join("");
  return `<table>
      <thead><tr><th>name (o nome do campo)</th><th>valor</th></tr></thead>
      <tbody>${linhas}</tbody>
    </table>`;
}

// As regras do cadastro, conferidas NO SERVIDOR (exercício 5)
function validarCadastro(dados) {
  const erros = [];
  const nome = (dados.get("nome") ?? "").trim();
  const email = dados.get("email") ?? "";
  const senha = dados.get("senha") ?? "";
  const idade = Number(dados.get("idade"));
  const cep = dados.get("cep") ?? "";
  const plano = dados.get("plano");

  if (nome.length < 3) erros.push("nome: precisa ter pelo menos 3 caracteres");
  // (as mensagens não têm acentos porque o PowerShell pode mostrá-los errados, aula 2.2)
  if (!/^[^@\s]+@[^@\s]+$/.test(email)) erros.push("email: precisa ser um e-mail de verdade (com @)");
  if (senha.length < 8) erros.push("senha: precisa ter pelo menos 8 caracteres");
  if (!Number.isInteger(idade) || idade < 18) erros.push("idade: precisa ser 18 ou mais");
  if (cep !== "" && !/^\d{5}-\d{3}$/.test(cep)) erros.push("cep: use o formato 12345-678");
  if (plano !== "gratis" && plano !== "pro") erros.push("plano: escolha gratis ou pro");
  if (!dados.has("termos")) erros.push("termos: precisa aceitar os termos de uso");
  return erros;
}

const servidor = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORTA}`);
  const caminho = url.pathname;

  // ---------- As rotas que recebem os formulários ----------
  if (["/busca", "/login", "/cadastro"].includes(caminho)) {
    const corpo = req.method === "POST" ? await lerCorpo(req) : "";
    // Os campos chegam no formato nome=valor&nome=valor, na URL (GET) ou no corpo (POST)
    const dados = req.method === "POST" ? new URLSearchParams(corpo) : url.searchParams;
    const campos = [...dados.entries()];
    const origem = req.method === "POST" ? "no corpo da requisição" : "na URL (query string)";
    const querHtml = (req.headers.accept ?? "").includes("text/html");

    console.log(`${req.method} ${req.url} → ${campos.length} campo(s)`);

    if (caminho === "/cadastro") {
      if (req.method !== "POST") {
        res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8", Allow: "POST" });
        res.end("405: o cadastro aceita apenas POST. Confira o atributo method do seu <form>.\n");
        return;
      }
      const erros = validarCadastro(dados);
      if (erros.length > 0) {
        if (!querHtml) {
          // Para o curl (exercício 5): uma resposta em texto simples
          res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(`400 Bad Request: o servidor recusou o cadastro.\n${erros.map((e) => `- ${e}`).join("\n")}\n`);
          return;
        }
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          pagina(
            "400: o servidor recusou o cadastro",
            `<p>A validação <strong>do servidor</strong> encontrou ${erros.length} problema(s):</p>
             <ul>${erros.map((e) => `<li>${escapar(e)}</li>`).join("")}</ul>
             <h2>O que chegou</h2>${tabelaDeCampos(campos)}`,
          ),
        );
        return;
      }
      if (!querHtml) {
        res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("201 Created: cadastro aceito.\n");
        return;
      }
      res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        pagina(
          "Cadastro aceito pelo servidor ✅",
          `<p>Os dados passaram na validação <strong>do servidor</strong>.</p>
           <h2>O que chegou</h2>${tabelaDeCampos(campos)}`,
        ),
      );
      return;
    }

    // /busca e /login: só mostram o que chegou
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      pagina(
        `O servidor recebeu: ${req.method} ${caminho}`,
        `<p>Método: <strong>${req.method}</strong>. Os dados vieram <strong>${origem}</strong>.</p>
         ${tabelaDeCampos(campos)}`,
      ),
    );
    return;
  }

  // ---------- Os arquivos da pasta "publico" ----------
  const relativo = caminho === "/" ? "index.html" : caminho;
  const arquivo = normalize(join(PASTA_PUBLICA, relativo));
  if (!arquivo.startsWith(PASTA_PUBLICA)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("403: acesso negado\n");
    return;
  }
  try {
    const conteudo = await readFile(arquivo);
    res.writeHead(200, { "Content-Type": TIPOS[extname(arquivo)] ?? "application/octet-stream" });
    res.end(conteudo);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`404: não encontrei ${caminho}\n`);
  }
});

servidor.listen(PORTA, () => {
  console.log(`Servidor da aula 3.2 no ar: http://localhost:${PORTA}`);
  console.log("Para parar: Ctrl+C");
});
