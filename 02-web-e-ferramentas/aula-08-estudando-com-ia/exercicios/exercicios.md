# Exercícios da Aula 2.8: Estudando com IA

⏱️ Cerca de 40 minutos. Responda **neste arquivo**, nos espaços marcados com `Resposta:` (cada parte de uma pergunta tem o seu). Confira no final se nenhum ficou vazio (**Ctrl+F**).

Você vai precisar de um chat de IA: Claude, ChatGPT, Gemini ou o que preferir. Para cada exercício, **comece uma conversa nova**, para uma não influenciar a outra.

---

### 1) A IA como tutora de um conceito

Escolha **o conceito do curso que você acha mais difícil até agora** (alguns candidatos: `this`, closures, cópia rasa, `defer`, cookies `HttpOnly`, tree-shaking).

a) Qual conceito você escolheu?
Resposta:

b) Escreva um prompt seguindo o modelo da seção 3 da aula: diga quem você é, peça a comparação com o Java e peça um quiz de 3 perguntas, **uma por vez**, com a correção só depois de você responder. Cole aqui o prompt que você usou:
Resposta:

c) Qual foi a analogia com o Java que a IA usou? Ela te ajudou, ou ficou forçada?
Resposta:

d) Responda o quiz no chat. Quantas das 3 você acertou? Alguma pergunta mostrou uma dúvida que você nem sabia que tinha?
Resposta:

e) Confira **um** ponto da explicação da IA na aula do curso ou no MDN. Qual ponto você conferiu, e ele estava certo?
Resposta:

---

### 2) Dicas em níveis, sem pedir o código

O arquivo [desafio.js](./desafio.js) pede uma função `resumoPorCategoria`. **A regra:** você pode pedir à IA só **dicas**, nunca o código. Se a IA mandar código mesmo assim, não leia: avise que você quer só dicas.

> 💡 Antes de começar, desligue o completamento por IA do IntelliJ, que sugere o resto da linha enquanto você digita (seção 5 da aula). Depois do exercício, você decide se religa.

a) Tente sozinho primeiro (uns 15 minutos). Até onde você chegou sem ajuda?
Resposta:

b) Use o prompt de "dicas em níveis" da seção 3. Cole aqui o prompt e **cada dica** que você pediu, em ordem:
Resposta:

c) Termine o `desafio.js` e rode-o com `node desafio.js` (de dentro da pasta `exercicios`). As duas linhas de verificação deram ✅?
Resposta:

d) Quantas dicas você precisou? Qual delas destravou o problema?
Resposta:

---

### 3) Pegando a IA no erro

Alguém perguntou a uma IA: *"Como eu crio um projeto React com lint, mostro o total formatado em reais e uso a chave da API de pagamento?"* Esta foi a resposta (escrita por mim, imitando uma IA, **com erros de propósito**):

> Claro! Siga os passos:
>
> 1. Crie o projeto com `npx create-react-app minha-loja`.
> 2. Para o lint, crie um arquivo `.eslintrc.json` com `{ "extends": "eslint:recommended" }`.
> 3. Para formatar o total em reais, use a função `formatCurrency` do date-fns: `import { formatCurrency } from "date-fns"` e `formatCurrency(141.6, "BRL")`.
> 4. Coloque a chave da API de pagamento no `.env`, como `VITE_CHAVE_PAGAMENTO=sk_live_123abc`, e leia com `import.meta.env.VITE_CHAVE_PAGAMENTO`.
> 5. Antes de mostrar o total, confira se ele é válido com `if (total === NaN)`.

Encontre **os 5 problemas**. Para cada um, diga **o que está errado** e **onde você conferiu**: uma aula do curso, uma documentação oficial ou um teste que você rodou.

| Passo | O que está errado | Onde conferi |
|---|---|---|
| 1 | Resposta: | Resposta: |
| 2 | Resposta: | Resposta: |
| 3 | Resposta: | Resposta: |
| 4 | Resposta: | Resposta: |
| 5 | Resposta: | Resposta: |

> 💡 Para o passo 3: se você já fez a aula 2.7, tem o `date-fns` instalado na `lojinha-vite`. Que tal testar o `import` lá, com o `npm run dev` e o Console aberto?

Qual desses erros seria o **mais grave** se fosse para produção, e por quê?
Resposta:

---

### 4) 🔍 Desafio opcional: revisão sem reescrita

Escolha um código **seu** de uma aula anterior (por exemplo, a classe `Carrinho` da aula 1.5 ou o `servidor.js` da aula 2.2) e peça à IA uma revisão com o prompt de "revisão" da seção 3: aponte os problemas, explique, **não reescreva**.

a) Qual código você mandou?
Resposta:

b) Cite dois pontos que a IA apontou. Você concorda com eles? Por quê?
Resposta:
