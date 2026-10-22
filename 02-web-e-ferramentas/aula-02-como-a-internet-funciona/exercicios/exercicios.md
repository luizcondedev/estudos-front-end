# Exercícios da Aula 2.2: Como a internet funciona

Escreva as respostas **neste arquivo**, nos espaços marcados com `Resposta:`. A Parte 2 também tem código para implementar no `servidor.js`.

---

## Parte 1: conceitos

### 1) Anatomia de uma URL

Para a URL abaixo, identifique cada parte (seção 3 da aula):

```
https://api.minhaloja.com.br:8443/produtos/42?ordem=preco&pagina=2#avaliacoes
```

| Parte | Valor                     |
|---|---------------------------|
| Protocolo | Resposta: https://        |
| Domínio (host) | Resposta:minhaloja.com.br |
| Subdomínio | Resposta:api.             |
| Porta | Resposta:8443             |
| Caminho (path) | Resposta:/produtos/42     |
| Query string (os parâmetros e os valores) | Resposta:?ordem=preco&pagina=2                 |
| Fragmento | Resposta:#avaliacoes                 |

a) Qual dessas partes **nunca chega ao servidor**? Por quê?
Resposta: O protocolo, domínio, subdomínio, porta e o fragmento

b) Se essa API fosse um `@RestController` do Spring, com a rota `@GetMapping("/produtos/{id}")`, qual parte da URL chegaria no `@PathVariable` e quais chegariam em `@RequestParam`?
Resposta: No PathVariable chegaria o Caminho e no RequestParam chegaria a QueryString 

c) Se a URL não tivesse o `:8443`, qual porta seria usada? Por quê?
Resposta: A 80 ou 443

### 2) Métodos e rotas REST

Para cada ação sobre os produtos de uma loja, escreva o **método HTTP** e o **caminho** seguindo as convenções REST (seção 5 da aula):

| Ação | Método e caminho |
|---|---|
| Listar todos os produtos | Resposta: |
| Buscar o produto 7 | Resposta: |
| Cadastrar um produto novo | Resposta: |
| Substituir todos os dados do produto 7 | Resposta: |
| Alterar só o preço do produto 7 | Resposta: |
| Remover o produto 7 | Resposta: |

a) Quais dessas ações são **idempotentes**? Explique, com suas palavras, o que isso significa.
Resposta: Listar, Buscar, Substituir todos os dados e Delete, pois caso eu execute mais de uma vez, eu não altero o estado do servidor

b) Por que a idempotência importa quando a rede falha no meio de uma requisição e o front-end tenta de novo?
Resposta: Porque, por exemplo, eu posso clicar para finalizar uma compra, a rede pode falhar, se o front tentar novamente, posso acabar realizando duas compras. 

### 3) Qual status code?

Para cada situação, escreva o status code mais adequado (seção 6 da aula):

| Situação | Status          |
|---|-----------------|
| Produto cadastrado com sucesso | Resposta: 201   |
| Lista de produtos devolvida | Resposta: 200   |
| Produto removido, sem nada para devolver no corpo | Resposta: 204   |
| O front pediu o produto 999, que não existe | Resposta:  404  |
| O JSON enviado tem um campo obrigatório vazio | Resposta:   400 |
| A requisição chegou sem o token de login | Resposta:    401 |
| Um usuário logado, mas sem permissão de admin, tentou remover um produto | Resposta:403    |
| Tentativa de cadastrar um e-mail que já existe | Resposta:  409  |
| Uma `NullPointerException` não tratada estourou no Spring | Resposta:  500  |

a) Qual é a diferença entre o **401** e o **403**?
Resposta: 401 é quando o usuário não está autenticado e 403 é quando o usuário não tem autorização 

### 4) DNS na prática

No terminal do IntelliJ (**Alt+F12**), rode:

```bash
nslookup github.com
```
```bash
nslookup registro.br
```

a) Qual endereço IP apareceu para cada domínio?
Resposta: 4.228.31.150 do github e 200.160.2.3 para o registro.br

b) O que o `nslookup` fez (seção 2 da aula)? Qual o papel do DNS quando você digita `github.com` no navegador?
Resposta: Ele faz a tradução de dominio para endereço IP, que é o papel do DNS quando digitamos no navegador. 

c) Por que outra pessoa, em outra cidade, pode receber um IP **diferente** para o mesmo `github.com`?
Resposta: Porque o DNS procura o servidor mais proximo de mim. 

d) O que é o `localhost`, e por que ele não precisa de DNS?
Resposta: O Localhost é um servidor local, rodando dentro da minha própria maquina, ele não precisa de DNS, pois está na minha maquina. 

---

## Parte 2: um servidor HTTP de verdade

O arquivo [servidor.js](./servidor.js) é uma API pequena, feita com o Node, que faz o papel de uma API Spring Boot: um CRUD de produtos em memória. Leia a **Parte 1** dele (a Parte 2 é o "motor", que você vai entender no Módulo 4).

**Para rodar:** no terminal do IntelliJ, de dentro desta pasta (`exercicios`):

```bash
node servidor.js
```

O terminal fica "preso" mostrando o log de cada requisição, assim como o console do Spring Boot. Para parar: **Ctrl+C**. Depois de alterar o código, pare e rode de novo.

> ⚠️ Se aparecer o erro `EADDRINUSE`, a porta 3000 já está em uso, provavelmente por outro `node servidor.js` que ficou rodando. Feche o outro terminal ou pare aquele processo.

### 5) Prever e testar

Abra o arquivo [requisicoes.http](./requisicoes.http) no IntelliJ. Ele tem requisições prontas, e cada uma tem um ▶ verde ao lado, que a executa e mostra a resposta completa: status, cabeçalhos e corpo. É o **HTTP Client** do IntelliJ Ultimate (uma alternativa ao Postman que já vem na IDE).

**Antes de executar**, preveja o status de cada uma. Depois execute e anote o status real:

| Requisição | Status previsto | Status real |
|---|----------------|---|
| R1. Listar todos | 200            | |
| R2. Ordenar por preço | 200            | |
| R3. Buscar o produto 2 | 200            | |
| R4. Buscar o produto 99 | 404            | |
| R5. Criar um produto | 201            | |
| R6. Criar um produto inválido | 400            | |
| R7. JSON quebrado | 400            | |
| R8. Content-Type errado | 415            | |
| R9. Método não permitido | 405            | |
| R10. Rota inexistente | 404            | |

a) Na resposta da **R5**, existe um cabeçalho que não aparece nas outras. Qual é, e para que ele serve?
Resposta: Location, e serve para informar o caminho onde do que foi criado

b) Na resposta da **R9**, qual cabeçalho diz ao cliente quais métodos aquela rota aceita?
Resposta: Allow

c) Execute a **R1** e depois a **R5** duas vezes. Execute a R1 de novo: o que mudou? Agora pare o servidor (Ctrl+C), rode-o de novo e execute a R1. O que aconteceu com os produtos criados, e por quê?
Resposta: Criou 2 produtos iguais com ID diferentes, quando executa novamente o servidor, eles somem pois a persistência é feita apenas em memória. 

d) Com o servidor rodando, abra `http://localhost:3000/produtos` **no navegador**. Olhe o log no terminal: além do `GET /produtos`, o navegador fez **outra** requisição que você não pediu. Qual, e para quê?
Resposta: O chrome fez um GET para descobrir a pasta do projeto durante o desenvolvimento. 

e) Agora faça a R3 pelo terminal, com o `curl` (abra um **segundo** terminal no IntelliJ, porque o primeiro está ocupado com o servidor):

```bash
curl.exe -i http://localhost:3000/produtos/2
```

O que o `-i` faz? E por que, no PowerShell, é preciso escrever `curl.exe`, e não só `curl` (seção 9 da aula)?
Resposta: O -i mostra os cabeçalhos e os status, precisamos escrever o .exe no final pq no Powershell o curl é uma abreviação a outra função. 

### 6) Implementar: DELETE

No `servidor.js`, no lugar do `TODO (exercício 6)`, implemente a rota **`DELETE /produtos/:id`**:
- Se o produto não existir → **404** com `{ erro: "Produto X não encontrado" }` (como no GET).
- Se existir → remova-o da lista **sem mutar o array** (aula 1.2) e responda **204**, sem corpo.
- Atualize o cabeçalho `Allow` do 405 no final da função, porque agora a rota aceita outro método.

Teste com as requisições **E6.1** e **E6.2** do `requisicoes.http`, e com a R1 para conferir que o produto sumiu.

a) Por que a resposta do DELETE usa o **204**, e não o **200**?
Resposta:

### 7) Desafio: PATCH

No lugar do `TODO (exercício 7)`, implemente a rota **`PATCH /produtos/:id`**, que altera **só os campos enviados**:
- Se o produto não existir → **404**, como no GET.
- O `id` enviado no corpo deve ser **ignorado** (ninguém pode trocar o id de um produto). Dica: destructuring com rest (aula 1.2, seção 6.2).
- Monte o produto atualizado juntando o produto atual com os campos enviados (spread, aula 1.2).
- Valide o produto **atualizado** reaproveitando a função `validarProduto`. Se for inválido → **400** com `{ erro }`.
- Atualize a lista **sem mutar** (o `map` da seção 4.4 da aula 1.2) e responda **200** com o produto atualizado.
- Atualize o `Allow` de novo.

Teste com as requisições **E7.1** a **E7.4**. Resultados esperados (supondo que você rodou a E7.1 antes da E7.2, sem reiniciar o servidor):

| Requisição | Status | Corpo |
|---|---|---|
| E7.1 | 200 | `{ "id": 2, "nome": "Feijão", "preco": 10.9 }` |
| E7.2 | 200 | `{ "id": 2, "nome": "Feijão Carioca", "preco": 10.9 }` (o id continua 2) |
| E7.3 | 400 | `{ "erro": "O campo preco deve ser um número maior que zero" }` |
| E7.4 | 404 | `{ "erro": "Produto 99 não encontrado" }` |

### 8) Ligando com o Spring

Escreva como seria a **assinatura** de cada rota do `servidor.js` num `@RestController` do Spring: a anotação do método e os parâmetros (não precisa do corpo do método). Exemplo:

```java
@GetMapping("/produtos/{id}")
public ResponseEntity<Produto> buscar(@PathVariable Long id)
```

Resposta:

```java
// GET /produtos (com ?ordem opcional)

@GetMapping("/produtos")
public ResponseEntity<List<Produto>> listar(
        @RequestParam(required = false) String ordem
);

// POST /produtos

@PostMapping("/produtos")
public ResponseEntity<Produto> cadastrar(@RequestBody Produto produto);

// DELETE /produtos/{id}
@DeleteMapping("/produtos/{id}")
public ResponseEntity<Void> deletar(@PathVariable Long id);

// PATCH /produtos/{id}
@PatchMapping("/produtos/{id}")
public ResponseEntity<Produto> deletar(@PathVariable Long id, 
                                       @RequestBody Produto produto);
```
