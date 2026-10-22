# Aula 2.2: Como a internet funciona

> **Por que esta aula importa?** Como dev FullStack, você vai trabalhar **dos dois lados** de cada requisição: o React/Next.js **faz** a requisição, e o Spring **responde**. Quando algo dá errado ("deu 401", "deu CORS", "a API não responde"), quem entende o que acontece no meio do caminho resolve em minutos. Esta aula é esse "meio do caminho".
>
> Muita coisa aqui você já usa no Spring sem pensar (`@GetMapping`, `ResponseEntity`, `@PathVariable`). Agora vamos ver o que existe **por baixo** dessas anotações.

**Exercícios:** a pasta [exercicios](./exercicios/) tem perguntas e um **servidor HTTP de verdade** feito em Node, para você testar tudo desta aula. As instruções estão no [exercicios.md](./exercicios/exercicios.md).

---

## 1. A visão geral: cliente, servidor, requisição e resposta

Toda comunicação na web segue o mesmo modelo:

```
   CLIENTE                                          SERVIDOR
 (navegador, app                                (Spring Boot, Node,
  React, curl...)                                 qualquer back-end)
       │                                                 │
       │ ──── 1. REQUISIÇÃO (request) ─────────────────▶ │
       │      "GET /produtos/2, por favor"               │  2. processa
       │                                                 │     (busca no banco...)
       │ ◀─── 3. RESPOSTA (response) ─────────────────── │
       │      "200 OK, aqui está o produto"              │
```

- O **cliente** sempre **começa** a conversa, fazendo uma requisição.
- O **servidor** só **responde**: ele nunca manda nada sem ter recebido um pedido (exceto em tecnologias específicas, como WebSockets).
- As regras dessa conversa são definidas pelo protocolo **HTTP** (*HyperText Transfer Protocol*).

> ☕ No Spring, o **Tomcat** (o servidor embutido do Spring Boot) recebe o texto da requisição HTTP, o Spring transforma isso numa chamada ao método do seu `@RestController`, e o que você retorna vira o texto da resposta HTTP. Nesta aula, você vai ver esse texto.

---

## 2. Endereços: IP, portas e DNS

### 2.1 Endereço IP

Todo computador conectado a uma rede tem um **endereço IP**, que identifica onde ele está, como o número de um telefone.

- **IPv4:** quatro números de 0 a 255, como `4.228.31.150`. São "só" cerca de 4 bilhões de endereços, o que já não é suficiente.
- **IPv6:** o formato novo, bem mais longo, como `2001:db8::8a2e:370:7334`.

### 2.2 Portas

Um mesmo computador pode ter vários programas recebendo conexões ao mesmo tempo (o seu Spring, um banco de dados, o servidor de desenvolvimento do React...). A **porta** é o número que diz **para qual programa** a conexão vai.

> Se o IP é o endereço de um prédio, a porta é o número do apartamento.

Portas que você vai ver o tempo todo:

| Porta | Quem usa |
|---|---|
| **80** | HTTP (padrão: não precisa escrever na URL) |
| **443** | HTTPS (padrão: não precisa escrever na URL) |
| **8080** | O Spring Boot (padrão do `server.port`) |
| **5173** | O Vite em desenvolvimento (um projeto React criado com o Vite) |
| **3000** | O Next.js em desenvolvimento (`next dev`) |
| **5432** / **3306** | PostgreSQL / MySQL |

> ☕ Quando você muda o `server.port=8081` no `application.properties`, está escolhendo em qual porta o Tomcat vai "escutar".

> ⚠️ **Duas portas diferentes contam como "outro site"** para o navegador: o React em `localhost:5173` chamando o Spring em `localhost:8080` é uma comunicação entre **origens diferentes**. É daí que vem o famoso erro de **CORS** (aula 4.6).

### 2.3 `localhost`

`localhost` é um nome especial que significa **"este próprio computador"**. Ele sempre aponta para o IP `127.0.0.1` (ou `::1`, no IPv6). A requisição nem chega a sair da sua máquina para a rede.

É por isso que você acessa o seu Spring em `http://localhost:8080`: o servidor está rodando no mesmo computador que o navegador.

### 2.4 Domínios

Ninguém decora IPs. Por isso existem os **domínios**: nomes legíveis, como `github.com` ou `minhaloja.com.br`.

```
          api . minhaloja . com . br
          ───   ─────────   ───   ──
           │        │        │     └── domínio de topo de país (Brasil)
           │        │        └──────── categoria (.com, .org, .gov...)
           │        └───────────────── o nome que você registra e paga por ano
           └────────────────────────── subdomínio (você cria quantos quiser)
```

- Domínios `.br` são registrados no **registro.br**; os outros, em empresas chamadas *registrars*.
- Depois de registrar `minhaloja.com.br`, você pode criar subdomínios à vontade: `www.minhaloja.com.br` para o site (o front React/Next.js) e `api.minhaloja.com.br` para a API (o Spring), por exemplo.

### 2.5 DNS: a "agenda de contatos" da internet

O **DNS** (*Domain Name System*) traduz um **domínio** para um **endereço IP**. Quando você digita `github.com` no navegador:

```
1. Navegador: "Já sei o IP de github.com?" → olha o próprio cache
2. Se não sabe, pergunta ao sistema operacional, que também tem um cache
3. Se ninguém sabe, pergunta a um servidor DNS (do seu provedor de internet, ou um público como o 1.1.1.1)
4. Esse servidor descobre, consultando a hierarquia do DNS:
     servidores raiz → "quem cuida do .com?" → servidor do .com → "quem cuida do github.com?"
     → servidor do github.com → "o IP é 4.228.31.150"
5. A resposta volta, e fica guardada em cache por um tempo (o TTL)
6. Só AGORA o navegador se conecta ao IP para fazer a requisição HTTP
```

**O mesmo domínio pode ter IPs diferentes** dependendo de onde você está. Sites grandes têm servidores espalhados pelo mundo, e o DNS responde com o IP do servidor **mais próximo** de você (é assim que funciona uma CDN, seção 8), ou alterna entre vários servidores para dividir a carga.

Você pode fazer uma consulta de DNS no terminal com o `nslookup`:

```bash
nslookup github.com
```

> ☕ É parecido com o **service discovery** de microsserviços (Eureka, Consul): em vez de fixar o IP de cada serviço no código, você usa um nome, e um sistema traduz o nome para o endereço atual.

> 🔍 **Para conhecer:** um domínio tem vários tipos de registro no DNS. Os principais são o **A** (domínio → IPv4), o **AAAA** (domínio → IPv6) e o **CNAME** (domínio → outro domínio, como um apelido). Você vai configurar esses registros quando fizer o deploy do seu projeto (aula 12.4).

---

## 3. Anatomia de uma URL

**URL** (*Uniform Resource Locator*) é o endereço completo de um recurso:

```
https://api.minhaloja.com.br:8443/produtos/42?ordem=preco&pagina=2#avaliacoes
└─┬─┘   └────────┬─────────┘ └─┬┘└────┬─────┘└─────────┬─────────┘└────┬────┘
protocolo      host          porta   caminho      query string      fragmento
```

| Parte | Exemplo | O que é | No Spring |
|---|---|---|---|
| **Protocolo** | `https` | Como conversar (HTTP ou HTTPS) | — |
| **Host** | `api.minhaloja.com.br` | O domínio (vira um IP via DNS) | — |
| **Porta** | `8443` | Opcional: sem ela, usa 80 (HTTP) ou 443 (HTTPS) | `server.port` |
| **Caminho** | `/produtos/42` | **Qual recurso** você quer | `@GetMapping("/produtos/{id}")` + `@PathVariable` |
| **Query string** | `?ordem=preco&pagina=2` | Parâmetros extras, no formato `chave=valor`, separados por `&` | `@RequestParam` |
| **Fragmento** | `#avaliacoes` | Uma posição **dentro da página**: o navegador usa para rolar até uma seção | — |

> ⚠️ **O fragmento nunca é enviado ao servidor.** Ele existe só no navegador. (Você vai vê-lo de novo em alguns sistemas de rotas de front-end.)

**Caminho ou query string?** A convenção é:
- **Caminho** para **identificar** o recurso: `/produtos/42` (o produto 42).
- **Query string** para **filtrar, ordenar ou paginar**: `/produtos?categoria=bebidas&pagina=2`.

> ⚠️ Alguns caracteres precisam ser **codificados** numa URL. O espaço, por exemplo, vira `%20`: `?busca=coca%20cola`. O navegador e as funções que montam URLs (como o `URLSearchParams`, que você vai ver na aula 4.3) fazem isso por você.

---

## 4. HTTP: o que realmente trafega

### 4.1 HTTP é texto

Uma requisição HTTP é, literalmente, **um texto** com um formato definido. É isto que o seu navegador manda quando você abre `http://localhost:3000/produtos/2`:

```http
GET /produtos/2 HTTP/1.1
Host: localhost:3000
Accept: application/json
User-Agent: Mozilla/5.0 ...
```

E isto é o que o servidor responde:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 48

{
  "id": 2,
  "nome": "Feijão",
  "preco": 9.5
}
```

### 4.2 As partes de uma requisição

```
GET /produtos/2 HTTP/1.1            ← linha inicial: MÉTODO, CAMINHO, VERSÃO
Host: localhost:3000                ← cabeçalhos (headers): "Nome: valor"
Content-Type: application/json      ←
                                    ← uma linha em branco separa os cabeçalhos do corpo
{ "nome": "Leite" }                 ← corpo (body): opcional (o GET normalmente não tem)
```

### 4.3 As partes de uma resposta

```
HTTP/1.1 201 Created                ← linha inicial: VERSÃO, STATUS CODE, TEXTO DO STATUS
Content-Type: application/json      ← cabeçalhos
Location: /produtos/4               ←
                                    ← linha em branco
{ "id": 4, "nome": "Leite" }        ← corpo
```

> ☕ No Spring, você monta exatamente isso com o `ResponseEntity`:
> ```java
> return ResponseEntity
>     .created(URI.create("/produtos/4"))   // status 201 + cabeçalho Location
>     .body(produto);                        // corpo (o Jackson converte para JSON, aula 1.6)
> ```

### 4.4 Os cabeçalhos mais importantes

| Cabeçalho | Onde | Para que serve | No Spring |
|---|---|---|---|
| `Content-Type` | Requisição e resposta | O **formato do corpo**: `application/json`, `text/html`... | `produces`/`consumes` do `@RequestMapping` |
| `Accept` | Requisição | O formato que o cliente **quer receber** | idem |
| `Authorization` | Requisição | As credenciais, como um token: `Bearer eyJhbGc...` | Spring Security lê esse cabeçalho |
| `Location` | Resposta | Onde o recurso criado está (usado com o 201) | `ResponseEntity.created(uri)` |
| `Allow` | Resposta | Quais métodos a rota aceita (usado com o 405) | O Spring preenche sozinho |
| `Cookie` / `Set-Cookie` | Requisição / resposta | O servidor pede ao navegador para guardar um dado, e o navegador o devolve em toda requisição | `HttpServletResponse.addCookie` |
| `Cache-Control` | Resposta | Se e por quanto tempo a resposta pode ficar em cache | `ResponseEntity.ok().cacheControl(...)` |

> ⚠️ O `Content-Type` é o cabeçalho que mais causa erros: se o front mandar um JSON **sem** `Content-Type: application/json`, o Spring responde **415 Unsupported Media Type**, e o servidor dos exercícios faz o mesmo. Bibliotecas de requisição como o Axios colocam o cabeçalho certo automaticamente; com o `fetch` nativo (aula 4.5), é você quem coloca.

### 4.5 HTTP não tem memória (*stateless*)

Cada requisição é **independente**: o servidor não lembra da requisição anterior. Se você fez login e, em seguida, pediu a lista de pedidos, o servidor **não sabe** que é você, a menos que a segunda requisição traga algo que identifique você, como um **cookie** de sessão ou um **token** no cabeçalho `Authorization`.

> ☕ É por isso que existe a `HttpSession` no mundo Servlet (o servidor guarda os dados e manda ao navegador só um cookie com o id da sessão) e o JWT no mundo das APIs REST (o próprio token carrega quem é o usuário). Você vai comparar as duas abordagens no Módulo 6.

---

## 5. Métodos HTTP e REST

### 5.1 Os métodos

O **método** diz **o que você quer fazer** com o recurso indicado no caminho:

| Método | Para quê | Tem corpo? | No Spring |
|---|---|---|---|
| **GET** | Buscar / ler | Não | `@GetMapping` |
| **POST** | Criar | Sim | `@PostMapping` |
| **PUT** | **Substituir** o recurso inteiro | Sim | `@PutMapping` |
| **PATCH** | Alterar **só alguns campos** | Sim | `@PatchMapping` |
| **DELETE** | Remover | Normalmente não | `@DeleteMapping` |

> 🔍 Existem outros. Os dois que você vai encontrar são o **HEAD** (como o GET, mas só com os cabeçalhos, sem o corpo) e o **OPTIONS** (pergunta ao servidor o que é permitido; o navegador o usa automaticamente no CORS, aula 4.6).

**PUT x PATCH:** suponha o produto `{ "id": 2, "nome": "Feijão", "preco": 9.5 }`.

```http
PUT /produtos/2
{ "nome": "Feijão Carioca", "preco": 10.9 }    ← manda o recurso INTEIRO (o que faltar se perde)

PATCH /produtos/2
{ "preco": 10.9 }                              ← manda SÓ o que muda
```

### 5.2 REST: a convenção das rotas

**REST** é um **estilo** de organizar uma API: o caminho identifica **o recurso** (um substantivo, normalmente no plural), e o **método** diz a ação. Nada de verbos no caminho.

| Ação | ✅ REST | ❌ Evite |
|---|---|---|
| Listar produtos | `GET /produtos` | `GET /listarProdutos` |
| Buscar o produto 7 | `GET /produtos/7` | `GET /buscarProduto?id=7` |
| Criar | `POST /produtos` | `POST /criarProduto` |
| Substituir | `PUT /produtos/7` | `POST /atualizarProduto` |
| Alterar só alguns campos | `PATCH /produtos/7` | |
| Remover | `DELETE /produtos/7` | `GET /deletarProduto?id=7` 😱 |
| Itens do pedido 3 | `GET /pedidos/3/itens` | `GET /itensDoPedido?pedido=3` |

> ☕ É exatamente o que você faz num `@RestController` com `@RequestMapping("/produtos")` e os métodos anotados com `@GetMapping("/{id}")`, `@PostMapping` etc.

### 5.3 Métodos seguros e idempotentes

Dois conceitos que caem em entrevista e que importam na prática:

- **Seguro:** não altera nada no servidor. Só o **GET** (e o HEAD e o OPTIONS).
- **Idempotente:** fazer a mesma requisição **uma vez ou dez vezes** deixa o servidor **no mesmo estado**.

| Método | Seguro | Idempotente | Por quê |
|---|---|---|---|
| GET | ✅ | ✅ | Só lê |
| PUT | ❌ | ✅ | Substituir o produto 7 pelos mesmos dados dez vezes dá o mesmo resultado que uma |
| DELETE | ❌ | ✅ | Depois da primeira vez, o produto já não existe; as outras não mudam mais nada (mesmo que respondam 404) |
| POST | ❌ | ❌ | Cada POST cria **mais um** produto |
| PATCH | ❌ | Depende | `{ "preco": 10 }` é idempotente; "somar 1 ao estoque" não é |

**Por que isso importa?** Se a rede cair no meio de uma requisição, o cliente **não sabe** se o servidor a recebeu. Repetir um GET, um PUT ou um DELETE não causa problema. Repetir um POST pode gerar um **pedido duplicado**. É por isso que botões de "Finalizar compra" costumam ser desabilitados depois do primeiro clique.

---

## 6. Status codes

O **status code** é o número de três dígitos da resposta, que diz **o que aconteceu**. O primeiro dígito indica a categoria:

| Faixa | Significado | Resumo |
|---|---|---|
| **1xx** | Informativo | Raro no dia a dia |
| **2xx** | Sucesso | "Deu certo" |
| **3xx** | Redirecionamento | "Está em outro lugar" |
| **4xx** | Erro **do cliente** | "Você pediu errado" |
| **5xx** | Erro **do servidor** | "Eu falhei" |

> 💡 A diferença entre **4xx** e **5xx** é a primeira pergunta ao investigar um erro: um 4xx quer dizer que o front mandou algo errado (ou sem permissão); um 5xx quer dizer que o problema está no back-end.

### 6.1 Os que você precisa saber de cor

| Status | Nome | Quando usar | No Spring |
|---|---|---|---|
| **200** | OK | Sucesso com corpo (GET, PUT, PATCH) | `ResponseEntity.ok(x)`, ou só retornar o objeto |
| **201** | Created | Algo foi **criado** (POST). Vem com o cabeçalho `Location` | `ResponseEntity.created(uri).body(x)` |
| **204** | No Content | Sucesso **sem corpo** (DELETE, por exemplo) | `ResponseEntity.noContent().build()` |
| **301** / **302** | Moved | Redirecionamento permanente / temporário (o navegador segue sozinho) | `redirect:` |
| **304** | Not Modified | "A versão do seu cache ainda vale" | Automático com cache |
| **400** | Bad Request | Dados inválidos: JSON quebrado, campo obrigatório vazio | Falha do `@Valid` → `MethodArgumentNotValidException` |
| **401** | Unauthorized | **Não autenticado**: não sei quem você é (sem token, ou token expirado) | Spring Security, sem login |
| **403** | Forbidden | **Sem permissão**: sei quem você é, mas você não pode fazer isso | Spring Security, sem a role necessária |
| **404** | Not Found | O recurso (ou a rota) não existe | `ResponseStatusException(HttpStatus.NOT_FOUND)` |
| **405** | Method Not Allowed | A rota existe, mas não aceita esse método | Automático |
| **409** | Conflict | Conflito com o estado atual: e-mail já cadastrado, por exemplo | `ResponseStatusException(HttpStatus.CONFLICT)` |
| **415** | Unsupported Media Type | `Content-Type` não suportado | Automático |
| **500** | Internal Server Error | Erro inesperado no servidor | Qualquer exceção não tratada |
| **502** / **503** / **504** | Bad Gateway / Service Unavailable / Gateway Timeout | O servidor está fora do ar, sobrecarregado ou demorou demais (comum atrás de um proxy) | Infraestrutura |

> 🔍 **Para conhecer:** o **422** (Unprocessable Content) é usado por algumas APIs no lugar do 400 para erros de validação, e o **429** (Too Many Requests) indica que o cliente passou do limite de requisições.

### 6.2 ⚠️ A confusão clássica: 401 x 403

- **401:** *"Quem é você?"* Falta autenticação, ou ela é inválida. **Solução no front:** mandar o usuário para o login.
- **403:** *"Sei quem você é, mas você não pode."* Falta autorização. **Solução no front:** mostrar uma mensagem de "acesso negado". Fazer login de novo não resolve.

> 💡 O nome "Unauthorized" do 401 é um erro histórico da especificação: ele deveria se chamar "Unauthenticated".

---

## 7. HTTPS: o HTTP com segurança

### 7.1 O problema do HTTP puro

No HTTP, o texto viaja **aberto** pela rede. Qualquer um no caminho (alguém na mesma rede Wi-Fi do café, por exemplo) pode **ler** a senha do seu login e o token do cabeçalho `Authorization`, e até **alterar** a resposta.

### 7.2 A solução: HTTPS = HTTP + TLS

O **HTTPS** é o mesmo HTTP, mas dentro de uma camada de criptografia chamada **TLS**. Ele garante três coisas:

1. **Confidencialidade:** ninguém no caminho consegue ler o conteúdo.
2. **Integridade:** ninguém consegue alterar o conteúdo sem que isso seja percebido.
3. **Autenticidade:** você está falando com o `github.com` **de verdade**, e não com um impostor. Isso é garantido por um **certificado digital**, emitido por uma autoridade certificadora (*Certificate Authority*) em que o navegador confia.

O cadeado na barra de endereço do navegador indica que a conexão é HTTPS e que o certificado é válido.

> 💡 Hoje, certificados são **gratuitos** (com o Let's Encrypt) e as plataformas de hospedagem configuram o HTTPS automaticamente. Não existe mais motivo para colocar um sistema no ar sem HTTPS.

> ☕ Em desenvolvimento, o seu Spring roda em `http://localhost:8080`, sem HTTPS, e tudo bem: a requisição nem sai da sua máquina. Em produção, a regra é **HTTPS sempre**, principalmente com login e JWT (Módulo 6).

> 🔍 **Para conhecer:** abaixo do HTTP, quem leva os dados de um computador ao outro é o **TCP**, um protocolo que garante que os pedaços cheguem completos e na ordem certa. As versões novas do HTTP (o **HTTP/2** e o **HTTP/3**) mantêm os mesmos métodos, cabeçalhos e status codes, mas transportam tudo de forma mais rápida. Para quem programa, praticamente nada muda.

---

## 8. Hospedagem: onde o seu sistema fica

**Hospedar** é colocar o seu sistema num computador que fica ligado o tempo todo, conectado à internet, com um IP (e um domínio apontando para ele). As duas pontas de um sistema FullStack são hospedadas de formas **diferentes**:

| | Front React (SPA com Vite) | Front Next.js | Back-end Spring |
|---|---|---|---|
| O que é, depois do build | Arquivos **estáticos**: HTML, CSS, JS e imagens | Um app Node que **renderiza páginas no servidor** (e também pode gerar páginas estáticas) | Um programa que **fica rodando** (a JVM) |
| O servidor precisa executar código? | Não: só entrega os arquivos | Sim, para as partes renderizadas no servidor | Sim: processa cada requisição |
| Onde hospedar | Vercel, Netlify, GitHub Pages, Cloudflare Pages ou um Nginx | Vercel (a empresa que criou o Next.js), ou qualquer servidor Node ou container Docker | Render, Railway, Fly.io, uma VM na nuvem (AWS, Azure, Google Cloud) ou containers Docker |
| Custo típico | Muitas vezes gratuito | Plano gratuito na Vercel para projetos pessoais | Normalmente pago (mesmo que barato) |

> ☕ Repare: o build de um projeto React com o Vite gera uma pasta com arquivos prontos, como um site estático. Quem roda esse código é o **navegador** do usuário, e não o servidor. O Next.js fica no meio do caminho: parte do código roda no navegador e parte roda num **servidor Node**, mais ou menos como o seu `.jar` do Spring precisa de uma máquina executando a JVM. Você vai entender essa divisão no Módulo 9.

**CDN** (*Content Delivery Network*): uma rede de servidores espalhados pelo mundo, que guardam cópias dos arquivos estáticos. O usuário recebe os arquivos do servidor mais próximo, o que deixa o carregamento mais rápido. As plataformas de hospedagem de front-end já usam CDN automaticamente. (É aquele caso da seção 2.5, em que o DNS devolve IPs diferentes para pessoas em lugares diferentes.)

---

## 9. Ferramentas para ver o HTTP acontecendo

### 9.1 O HTTP Client do IntelliJ (o que você vai usar nos exercícios)

O IntelliJ Ultimate tem um cliente HTTP embutido: você escreve as requisições num arquivo `.http` e executa cada uma com um clique, vendo a resposta completa.

```http
### Buscar um produto
GET http://localhost:3000/produtos/2

### Criar um produto
POST http://localhost:3000/produtos
Content-Type: application/json

{ "nome": "Leite", "preco": 6.49 }
```

> ☕ É uma alternativa ao **Postman** ou ao Insomnia, só que dentro da IDE e com as requisições salvas num arquivo que vai para o Git, junto com o código. É muito útil para testar as suas APIs Spring.

### 9.2 O `curl`, no terminal

O `curl` faz requisições HTTP pela linha de comando. É a ferramenta universal: funciona em qualquer servidor, sem interface gráfica.

```bash
curl.exe -i http://localhost:3000/produtos/2
```

| Opção | O que faz |
|---|---|
| `-i` | Mostra também a linha de status e os cabeçalhos da resposta (sem ela, aparece só o corpo) |
| `-X POST` | Escolhe o método (o padrão é GET) |
| `-H "Nome: valor"` | Adiciona um cabeçalho |
| `-d '...'` | Envia um corpo |

> ⚠️ **Por que `curl.exe`?** No **Windows PowerShell** (o terminal padrão do IntelliJ no Windows), `curl` é um **apelido** para outro comando, o `Invoke-WebRequest`, que tem opções diferentes. Escrevendo `curl.exe`, você chama o `curl` de verdade, que já vem instalado no Windows. Em outros terminais (como o Git Bash, ou no Linux e no Mac), basta escrever `curl`.

> 💡 Para requisições com corpo JSON, prefira o HTTP Client do IntelliJ: no PowerShell, as aspas do JSON dão bastante trabalho, e letras acentuadas (como o "ã" de "Feijão") podem chegar corrompidas ao servidor, porque o terminal nem sempre envia o texto em UTF-8.

### 9.3 A aba Network do DevTools

No navegador, a aba **Network** do DevTools (F12) mostra **todas** as requisições que a página faz, com métodos, status, cabeçalhos e corpos. É a ferramenta número 1 para depurar a comunicação entre o front e a API. Você vai explorá-la na próxima aula (2.3).

---

## 10. Juntando tudo: o que acontece quando você digita uma URL

Você digita `https://www.minhaloja.com.br/produtos` e aperta Enter:

1. **URL:** o navegador separa as partes: protocolo `https`, host `www.minhaloja.com.br`, porta 443 (padrão do HTTPS) e caminho `/produtos`.
2. **DNS:** o navegador descobre o IP de `www.minhaloja.com.br`, usando o cache ou consultando a hierarquia do DNS (seção 2.5).
3. **Conexão:** o navegador abre uma conexão TCP com esse IP, na porta 443.
4. **TLS:** o servidor apresenta o certificado, o navegador confere se é válido, e os dois combinam a criptografia (seção 7).
5. **Requisição HTTP:** o navegador envia `GET /produtos` com os seus cabeçalhos.
6. **Servidor:** o servidor (um Nginx ou uma CDN, no caso de um front React com o Vite) responde `200 OK` com o `index.html`.
7. **Mais requisições:** ao ler o HTML, o navegador descobre que precisa de arquivos CSS, JavaScript e imagens, e faz **uma requisição para cada um**.
8. **Renderização:** o navegador monta a página na tela (aula 2.3).
9. **A aplicação React começa a rodar** no navegador e faz as **próprias** requisições para a API, como `GET https://api.minhaloja.com.br/produtos`, que é atendida pelo seu Spring, e repete os passos 2 a 5 para outro domínio.
10. **A API responde** com JSON, e o React mostra os produtos na tela.

> 💡 Com o **Next.js**, os passos 6 a 10 podem acontecer de outro jeito: o servidor do Next busca os produtos no Spring **antes** de responder, e o navegador já recebe o HTML com os produtos prontos. Esse é o assunto do Módulo 9.

> 💡 Isso tudo costuma levar **menos de um segundo**. Quando demora, a aba Network mostra em qual dessas etapas o tempo foi gasto.

---

## 11. E no React e no Next.js?

Tudo desta aula aparece quando o front conversa com a sua API Spring. Um adianto do que vem pela frente (o `await` e o `fetch` são explicados no Módulo 4):

```typescript
// React (uma SPA criada com o Vite): quem faz a requisição é o NAVEGADOR
const resposta = await fetch("http://localhost:8080/produtos?ordem=preco");  // GET + query string
if (!resposta.ok) {                                                             // ⚠️ veja abaixo
  throw new Error(`A API respondeu ${resposta.status}`);
}
const produtos = await resposta.json();

await fetch(`http://localhost:8080/produtos/${id}`, {
  method: "PATCH",                                     // o método HTTP
  headers: { "Content-Type": "application/json" },     // o cabeçalho (seção 4.4)
  body: JSON.stringify({ preco: 10.9 }),               // o corpo (aula 1.6)
});
```

- ⚠️ **O `fetch` não trata 4xx e 5xx como erro.** Para ele, "erro" é só quando a requisição **nem chega** ao servidor (sem internet, servidor desligado). Um 404 ou um 500 chegam como uma resposta normal, e é você quem precisa conferir o `resposta.ok` (que é `true` só para os status 2xx). Esquecer isso é um dos bugs mais comuns de quem começa.
- Na prática, você não vai escrever esse código em todo componente: bibliotecas como o **TanStack Query** (aula 8.3) cuidam do carregamento, do erro e do cache das requisições, e uma função "embrulhando" o `fetch` adiciona o cabeçalho `Authorization` com o token num lugar só (aula 8.6).
- Em desenvolvimento, o React (porta 5173) e o Spring (porta 8080) são **origens diferentes**, o que exige configurar o **CORS** no Spring (aula 4.6) ou um **proxy** no Vite (aula 8.11).

**No Next.js, a requisição pode sair do servidor, e não do navegador:**

```tsx
// Um Server Component do Next.js (Módulo 9): este código roda no SERVIDOR do Next
export default async function PaginaProdutos() {
  const resposta = await fetch("http://localhost:8080/produtos");  // o servidor do Next chama o Spring
  const produtos = await resposta.json();
  return <ListaDeProdutos produtos={produtos} />;                   // o navegador já recebe a página pronta
}
```

Como quem chama o Spring é o **servidor** do Next, e não o navegador, **não existe CORS** nessa comunicação (o CORS é uma regra dos navegadores), e o token de acesso pode ficar guardado só no servidor, sem nunca passar pelo JavaScript do navegador. Esse papel de "intermediário" entre o navegador e a sua API se chama **BFF** (*Backend for Frontend*), e você vai estudá-lo na aula 9.8.

---

## 12. 📋 Resumo (cola rápida)

| Conceito | O que é | No Spring |
|---|---|---|
| Cliente / servidor | Quem pede / quem responde | O Tomcat recebe e o controller responde |
| IP / porta | Endereço do computador / do programa | `server.port` |
| DNS | Traduz domínio → IP | (parecido com service discovery) |
| URL | protocolo, host, porta, caminho, query, fragmento | `@PathVariable`, `@RequestParam` |
| Requisição | método + caminho + cabeçalhos + corpo | `HttpServletRequest`, `@RequestBody`, `@RequestHeader` |
| Resposta | status + cabeçalhos + corpo | `ResponseEntity` |
| Métodos | GET, POST, PUT, PATCH, DELETE | `@GetMapping`, `@PostMapping`... |
| Status | 2xx sucesso, 4xx erro do cliente, 5xx erro do servidor | `ResponseEntity.status(...)` |
| HTTPS | HTTP + criptografia TLS + certificado | Configurado no servidor ou na plataforma |
| Hospedagem | Front: arquivos estáticos. Back: programa rodando | O `.jar` rodando numa máquina |

**Regras de ouro:**
1. O caminho identifica **o recurso**; o método diz **a ação**. Nada de verbos no caminho.
2. 4xx = o cliente errou; 5xx = o servidor errou. É a primeira pergunta ao investigar um erro.
3. 401 = "não sei quem você é"; 403 = "sei quem você é, mas você não pode".
4. JSON no corpo → `Content-Type: application/json`.
5. HTTP não tem memória: quem identifica o usuário a cada requisição é o cookie ou o token.
6. Em produção, **HTTPS sempre**.
7. No PowerShell, use `curl.exe`.

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga as instruções. A Parte 2 usa o [servidor.js](./exercicios/servidor.js) e o [requisicoes.http](./exercicios/requisicoes.http).
