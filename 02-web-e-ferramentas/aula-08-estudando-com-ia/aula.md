# Aula 2.8: Estudando com IA

> **Por que esta aula importa?** A IA consegue resolver quase todos os exercícios deste curso em segundos. E é exatamente por isso que ela pode atrapalhar o seu aprendizado: o código funciona, mas o conhecimento não fica com você. Numa entrevista, num teste técnico ou na hora de revisar o código que a própria IA gerou (aula 10.9), o que conta é o que **você** sabe. Esta aula mostra como usar a IA para aprender **mais rápido**, e não para pular o aprendizado. A parte de usar a IA para produzir mais no trabalho fica para o Módulo 10, quando você já tiver a base para avaliar o que ela entrega.
>
> ⏱️ **Aula enxuta:** cerca de 20 minutos de leitura e 40 de exercícios.

**Exercícios:** o [exercicios.md](./exercicios/exercicios.md) traz o passo a passo. Você vai precisar de um chat de IA (Claude, ChatGPT, Gemini ou outro).

---

## 1. O que a pesquisa diz

Em janeiro de 2026, a Anthropic publicou um experimento com 52 programadores aprendendo uma biblioteca nova ([o estudo](https://www.anthropic.com/research/AI-assistance-coding-skills)). Metade usou um assistente de IA, e metade programou sem ajuda. Depois, todos fizeram uma prova sobre a biblioteca:

- O grupo **com IA** acertou, em média, **50%** da prova; o grupo **sem IA**, **67%**. A maior diferença foi nas questões de **depuração**, justamente a habilidade de que você precisa para conferir o código de uma IA.
- O grupo com IA terminou só uns 2 minutos mais rápido.
- **O jeito de usar fez toda a diferença:** quem usou a IA para fazer **perguntas sobre os conceitos** foi bem na prova (65% ou mais). Quem pediu para a IA **escrever o código** ficou abaixo de 40%.

A conclusão não é "não use IA". É: **use a IA para entender, e não para fazer por você**.

---

## 2. Tutor x atalho

| A IA como **atalho** (evite enquanto aprende) | A IA como **tutor** (use à vontade) |
|---|---|
| "Resolve este exercício" | "Explica o conceito que este exercício treina" |
| Colar o erro e aceitar o conserto sem ler | "O que esta mensagem de erro quer dizer? Onde eu procuro?" |
| "Escreve a função que faz X" | "Estou travado: me dá **uma dica**, sem código" |
| Copiar o código gerado sem entender cada linha | "Revisa o meu código: aponta os problemas, mas não reescreve" |
| Pedir a resposta das perguntas da aula | "Me faz 5 perguntas sobre este assunto e corrige as minhas respostas" |

**A regra prática:** se você não conseguiria explicar uma linha do código, essa linha ainda não é sua. Não a use.

**Quando travar num exercício**, siga esta ordem:
1. Tente sozinho por uns **20 minutos**. Travar faz parte: é o esforço de lembrar e de testar hipóteses que fixa o conhecimento.
2. Releia a seção da aula sobre o assunto.
3. Peça uma **dica** à IA, sem código. Se não bastar, peça a próxima dica, mais específica.
4. Só depois de resolver (ou de desistir de verdade), peça para a IA **explicar** a solução, e refaça o exercício do zero sem olhar.

---

## 3. Como pedir: os prompts de um aluno

Um **prompt** é o texto que você manda para a IA. Quanto mais **contexto** ele tiver, melhor a resposta. Um bom prompt de estudo diz quem você é, o que está aprendendo, o que você quer e o que você **não** quer:

```text
Sou desenvolvedor Java e estou aprendendo JavaScript. Estou estudando closures.
Explique o conceito comparando com o que existe no Java (lambdas, classes anônimas).
Depois, me faça 3 perguntas para eu ver se entendi, uma de cada vez,
e só me dê a resposta depois que eu tentar responder.
Não use exemplos com React ainda: eu não estudei React.
```

**Modelos que funcionam:**

| Para quê | Prompt |
|---|---|
| Entender um conceito | "Explique [conceito] para quem vem do Java, com uma analogia e um exemplo curto. Diga também os erros mais comuns." |
| Dicas em níveis | "Estou travado neste exercício: [enunciado]. Meu código até agora: [código]. Me dê só uma dica pequena, sem código. Se eu pedir, dê a próxima." |
| Entender um erro | "Recebi este erro: [mensagem completa]. Neste código: [trecho]. Explique o que a mensagem significa e onde eu devo procurar. Não conserte o código." |
| Revisão | "Revise o meu código como um dev sênior revisaria: aponte problemas e explique o porquê de cada um, mas não reescreva." |
| Testar o que aprendeu | "Vou explicar [conceito] com as minhas palavras. Aponte o que está errado ou incompleto." |
| Quiz | "Faça 5 perguntas sobre [assunto], uma por vez, e corrija cada resposta antes da próxima." |

> ☕ **O seu Java é uma vantagem aqui:** peça sempre a comparação com o Java. A IA é muito boa em analogias entre linguagens, e você aprende mais rápido ligando o conceito novo a algo que já domina, como as aulas deste curso fazem com os blocos ☕.

**Os modos de estudo:** os principais chats têm (ou já tiveram) um modo próprio para estudar, que faz perguntas e dá dicas em vez de entregar a resposta: o *Study mode* do ChatGPT, o *Guided Learning* do Gemini e os modos de aprendizado do Claude. Os nomes e os lugares mudam com frequência; procure por "estudo" ou "learning" nas opções da ferramenta que você usa. Eles ajudam, mas não substituem um bom prompt: a resposta completa continua a uma pergunta de distância.

---

## 4. A IA erra, e com muita confiança

A IA escreve tudo com o mesmo tom seguro, esteja certa ou errada. Os erros mais comuns, e você já tem base para pegar vários deles:

- **Código desatualizado:** ela aprendeu com textos de anos atrás. Exemplos que você já conhece: o `.eslintrc` (o ESLint 10 nem lê mais, aula 2.5) e o Create React App (abandonado; hoje se usa o Vite, aula 2.7). No React e no Next.js, isso vai aparecer muito: componentes de classe, Pages Router...
- **APIs e pacotes inventados:** uma função que não existe na biblioteca, ou um pacote do npm com um nome plausível que nunca existiu. E existe golpe com isso: há quem registre no npm os nomes que as IAs costumam inventar, com código malicioso (aula 2.4, seção 9).
- **Erros de segurança:** chaves de API no front-end (aula 2.7), validação só no navegador.

**Como conferir:**
1. **Rode o código.** É o teste mais rápido.
2. **Confira na documentação oficial:** o [MDN](https://developer.mozilla.org/pt-BR/) para JavaScript, HTML e CSS; o [react.dev](https://react.dev), o [nextjs.org/docs](https://nextjs.org/docs) e o [vite.dev](https://vite.dev) para as ferramentas. Para pacotes, a página no [npmjs.com](https://www.npmjs.com).
3. **Informe as versões no prompt:** "estou usando o React 19, o Next.js 16 e o ESLint 10". Isso reduz muito as respostas antigas.
4. **Desconfie quando a resposta contradiz a aula ou a documentação.** Na dúvida, a documentação ganha.

---

## 5. A IA dentro do IntelliJ

- **O completamento automático:** o IntelliJ Ultimate vem com o **Full Line Code Completion**, uma IA que roda no seu computador e sugere o resto da linha enquanto você digita (o texto cinza, que você aceita com Tab). Ele é ótimo para produzir, mas, nos exercícios, completa justamente a parte que você deveria pensar. **Enquanto estiver estudando**, considere desligá-lo: **Settings → Editor → General → Code Completion → Inline**, e desmarque **Enable inline completion using language models**. Religue quando for trabalhar.
- **Assistentes e agentes:** o IntelliJ tem o JetBrains AI Assistant, e outras ferramentas, como o Claude Code e o GitHub Copilot, também se integram a ele. Você vai estudar os agentes no Módulo 10. Enquanto aprende, use-os como tutores, com as mesmas regras desta aula.

---

## 6. Cuidados com o que você cola num chat

- **Nunca cole segredos:** senhas, chaves de API, o conteúdo de um `.env` de verdade.
- **Código da empresa só em ferramentas aprovadas pela empresa.** Muitas empresas proíbem colar código interno em chats públicos, e dados de clientes são protegidos pela **LGPD** (a lei brasileira de proteção de dados pessoais). Na dúvida, pergunte antes.

---

## 7. E no React e no Next.js?

Os Módulos 7 a 9 são onde a IA mais vai te tentar e onde ela mais erra por estar desatualizada: o React e o Next.js mudaram muito nos últimos anos. Duas regras para lá:
- **Sempre diga as versões** no prompt (React 19, Next.js 16, App Router).
- **Desconfie de código com `class`, `componentDidMount`, `getServerSideProps` ou `pages/`**: são padrões antigos, que você vai aprender só a reconhecer (aula 7.13 e Módulo 9).

---

## 8. 📋 Resumo (cola rápida)

| Situação | Faça | Evite |
|---|---|---|
| Não entendi um conceito | Pedir explicação com analogia do Java e um quiz | Pular para o exercício sem entender |
| Travei num exercício | 20 minutos sozinho → aula → dica em níveis | Pedir a solução |
| Deu erro | Pedir para explicar a mensagem e onde procurar | Colar o conserto sem ler |
| Terminei | Pedir uma revisão sem reescrita | Aceitar uma "versão melhorada" que você não entende |
| A IA respondeu | Rodar e conferir na documentação | Confiar no tom de certeza |

**Regras de ouro:**
1. Use a IA para **entender**, e não para **fazer** por você.
2. Se não consegue explicar uma linha, ela ainda não é sua.
3. Peça dicas, não soluções. E refaça sem olhar depois.
4. Informe quem você é, o que está aprendendo e as versões que usa.
5. Na dúvida, a documentação oficial ganha da IA.
6. Nada de segredos nem de código da empresa em chats não aprovados.

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga o passo a passo.
