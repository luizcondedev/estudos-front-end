# Exercícios da Aula 3.2: Formulários HTML e validação nativa

⏱️ Cerca de 50 minutos. Responda **neste arquivo**, nos espaços marcados com `Resposta:` (cada parte de uma pergunta tem o seu).

> 💡 Quando escrever uma tag ou um atributo numa resposta, coloque entre crases, como em `` `<label>` ``. Sem as crases, a pré-visualização do IntelliJ interpreta a tag e esconde parte do texto.

**Para rodar:** no terminal do IntelliJ, de dentro desta pasta (`exercicios`):

```bash
node servidor.js
```

Depois, abra **http://localhost:3002** no Chrome. Para parar o servidor: **Ctrl+C**. Você não precisa alterar o `servidor.js`: ele entrega as páginas da pasta `publico` e **mostra o que cada formulário enviou**.

**No DevTools (F12), aba Network:** marque o **Preserve log**, para a lista de requisições não ser apagada quando a página trocar.

---

### 1) Observando um envio

Abra **http://localhost:3002/busca.html**. Este formulário já está pronto: não altere o arquivo.

a) Digite `caneca`, escolha a categoria **Canecas** e clique em **Buscar**. Copie o endereço que ficou na barra do navegador:
Resposta:

b) No `busca.html`, o campo de texto tem `id="termo"` e `name="q"`. Qual dos dois apareceu no endereço? Por quê (seção 1)?
Resposta:

c) O usuário escolheu a opção "Canecas" (com C maiúsculo). Qual valor chegou ao servidor para a categoria, e de qual atributo da `<option>` ele veio (seção 4)?
Resposta:

d) Na aba **Network**, clique na requisição `busca?q=...` e abra a aba **Payload**. Com qual título os campos aparecem ali?
Resposta:

e) Por que o `get` é o método certo para uma busca (seção 1)?
Resposta:

---

### 2) Consertando o login

Abra **http://localhost:3002/login.html**. Este formulário tem **5 bugs**.

> ⚠️ **Não altere o `login.html` antes do item e.** Os itens **a** a **d** pedem para observar os sintomas com o arquivo **original**.

a) Clique na palavra **E-mail** (o rótulo, e não o campo). O cursor foi para o campo de e-mail?
Resposta:

Agora clique na palavra **Senha**. O cursor foi para o campo da senha?
Resposta:

b) Em "Continuar conectado neste computador?", clique em **Sim** e depois em **Não**. O que aconteceu de errado?
Resposta:

c) Preencha um e-mail válido (por exemplo, `luiz@exemplo.com`) e a senha `segredo123`, e clique em **Limpar**. O que aconteceu, em vez de limpar os campos?
Resposta:

d) Olhe a página que o servidor devolveu e o endereço na barra do navegador. O que aparece no endereço que **nunca** deveria aparecer ali?
Resposta:

Na tabela do servidor, o campo do e-mail chegou?
Resposta:

e) **Agora conserte os 5 bugs** no `publico/login.html` e preencha a tabela:

| Bug | A causa no HTML | Como você consertou |
|---|---|---|
| Clicar em "E-mail" não leva ao campo | Resposta: | Resposta: |
| Dá para marcar "Sim" e "Não" juntos | Resposta: | Resposta: |
| O botão "Limpar" envia o formulário | Resposta: | Resposta: |
| A senha aparece no endereço | Resposta: | Resposta: |
| O e-mail não chega ao servidor | Resposta: | Resposta: |

f) Recarregue a página, preencha de novo, marque **Sim** e clique em **Entrar**. Copie o que a página do servidor mostrou (o método, de onde vieram os dados, e os campos com os valores):
Resposta:

g) Na aba **Network**, clique na requisição `login`. Na aba **Payload**, com qual título os campos aparecem agora?
Resposta:

Na aba **Headers**, qual é o `Content-Type` da **requisição** (em Request Headers)?
Resposta:

---

### 3) Criando o cadastro, em etapas

O arquivo `publico/cadastro.html` já tem a estrutura da página. Escreva o seu formulário no lugar do comentário, uma etapa por vez. Depois de cada etapa, recarregue **http://localhost:3002/cadastro.html** e confira a página.

**Como organizar:** coloque cada campo, com o seu rótulo, dentro de um `<p>`. O CSS da página já deixa tudo alinhado.

```html
<p>
  <label for="nome">Nome</label>
  <input type="text" id="nome" name="nome">
</p>
```

**Etapa 1, o formulário e os campos de texto.** Um `<form>` que envia para `/cadastro` com o método `post`, com estes campos (cada um com o seu `<label>` ligado) e um botão de enviar com o texto "Cadastrar":

| Rótulo | `type` | `name` |
|---|---|---|
| Nome | `text` | `nome` |
| E-mail | `email` | `email` |
| Senha | `password` | `senha` |
| Idade | `number` | `idade` |
| CEP (opcional) | `text` | `cep` |

**Etapa 2, os outros campos** (antes do botão):
- Um `<fieldset>` com a legenda "Plano" e dois radios com o `name` `plano`: **Grátis** (`value="gratis"`, já marcado) e **Pro** (`value="pro"`).
- Um `<select>` com o rótulo "O que mais te interessa?" e o `name` `interesse`, com três opções: Canecas, Camisetas e Moletons (com os `value` em minúsculas).
- Um `<textarea>` com o rótulo "Quer nos contar algo? (opcional)" e o `name` `mensagem`.
- Dois checkboxes: "Quero receber novidades por e-mail" (`name="novidades"`) e "Li e aceito os termos de uso" (`name="termos"`).

**Etapa 3, a validação** (seção 6):

| Campo | Regras |
|---|---|
| Nome | Obrigatório, com pelo menos 3 caracteres |
| E-mail | Obrigatório |
| Senha | Obrigatória, com pelo menos 8 caracteres |
| Idade | Obrigatória, de 18 a 120 |
| CEP | **Opcional**, mas, se preenchido, no formato `12345-678`. Use o `pattern` da seção 6 e um `title` explicando o formato |
| Termos | Precisa estar marcado |

a) Preencha tudo com dados válidos (sem marcar "novidades") e clique em **Cadastrar**. Qual foi o título da página que o servidor devolveu?
Resposta:

b) Na tabela "O que chegou", o campo `novidades` aparece? E o `termos`, com qual valor? Explique os dois casos (seção 4).
Resposta:

---

### 4) Testando a validação do navegador

Volte ao seu formulário. Em cada item, tente enviar e copie a **mensagem do balão** que o navegador mostrou.

a) Com todos os campos vazios. Qual é a mensagem, e em qual campo ela apareceu?
Resposta:

Por que ela apareceu nesse campo, e não em todos de uma vez (seção 6)?
Resposta:

b) Com o nome preenchido e o e-mail `luiz` (sem o `@`):
Resposta:

c) Com o e-mail certo e a senha `123`:
Resposta:

d) Com a senha certa e a idade `15`:
Resposta:

e) Com a idade certa e o CEP `123`. O texto do seu `title` apareceu junto?
Resposta:

f) Com o CEP **vazio** e o resto certo (e os termos marcados). O formulário foi enviado? Por que o `pattern` não bloqueou (seção 6)?
Resposta:

---

### 5) Passando por cima da validação

Com o servidor rodando, abra **outra aba** do terminal do IntelliJ e envie um cadastro inválido direto para o servidor, sem passar pelo navegador:

```bash
curl.exe -i -X POST http://localhost:3002/cadastro -d "nome=A&email=nao-e-email&senha=123&idade=10"
```

O `-d` manda os dados no corpo da requisição, no mesmo formato `nome=valor&nome=valor` que o formulário usa. O `-i` e o `-X` você conhece da aula 2.2.

a) Qual foi o status da resposta?
Resposta:

Quantos problemas o servidor listou?
Resposta:

b) O seu formulário tem `required`, `minlength` e `min`. Por que nenhum deles impediu esse envio?
Resposta:

c) Se o servidor **não** validasse nada, o que teria acontecido com esse cadastro?
Resposta:

d) No Spring, o que faz o papel dessa validação do servidor (seção 6)? E por que ela continua necessária mesmo com o front validando tudo?
Resposta:

---

### 6) 🔍 Desafio opcional: desligando a validação no DevTools

No seu `cadastro.html` aberto no Chrome, vá à aba **Elements**, clique com o botão direito na tag `<form>` → **Add attribute**, digite `novalidate` e aperte **Enter**. Deixe todos os campos vazios e clique em **Cadastrar**.

a) O navegador bloqueou o envio? O que o servidor respondeu?
Resposta:

b) Depois de recarregar a página (F5), a validação do navegador voltou? Por quê (aula 2.3, seção 6.1)?
Resposta:
