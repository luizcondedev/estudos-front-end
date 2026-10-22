# Aula 2.1: A IDE para front-end (IntelliJ IDEA Ultimate)

> **Aula curta e sem exercícios.** O objetivo é deixar o IntelliJ pronto para JavaScript, TypeScript, React e Next.js, e mostrar o recurso que mais vai te ajudar daqui para a frente: o **debugger**.

---

## 1. Qual IDE para front-end? As opções

| | IntelliJ gratuito | **IntelliJ Ultimate** (o seu) | WebStorm | VS Code |
|---|---|---|---|---|
| Java e Spring | Java ✅, Spring ❌ | ✅ completo | ❌ | Com extensões |
| JS, TS, HTML e CSS | Básico (desde a 2026.1) | ✅ completo | ✅ completo | ✅ (com extensões) |
| **React e Next.js** | Só o básico de React | ✅ completo | ✅ completo | ✅ (com extensões) |
| Debugger de JavaScript | ❌ | ✅ | ✅ | ✅ |
| HTTP Client (arquivos `.http`) | ❌ | ✅ | ✅ | Com extensão |
| Preço | Grátis | Pago | Grátis para estudo | Grátis |

**Na prática:**
- O **WebStorm** é o IntelliJ só com a parte de front-end. Mesma empresa (JetBrains), mesma interface, mesmos atalhos. É a opção para quem quer o "IntelliJ do front" sem pagar, já que é gratuito para uso não comercial (estudo, projetos pessoais).
- O **IntelliJ Ultimate** já inclui **tudo** o que o WebStorm tem. Ou seja: você tem o back (Java/Spring) e o front (React/Next.js) **na mesma IDE**, o que é ótimo para quem quer ser FullStack. **Você não precisa do WebStorm.**
- O **VS Code** é o editor mais usado no front-end. Você vai vê-lo em tutoriais e cursos, então é bom saber que tudo o que o curso ensina também funciona nele, só que configurado por extensões.

---

## 2. Configurando o Node no IntelliJ

O IntelliJ precisa saber onde o Node está instalado, assim como precisa saber onde está o JDK para rodar Java.

1. Abra as configurações: **File → Settings** (atalho **Ctrl+Alt+S**).
2. Vá em **Languages & Frameworks → Node.js**.
3. Em **Node interpreter**, selecione o Node instalado (o IntelliJ costuma detectá-lo sozinho, algo como `C:\Program Files\nodejs\node.exe`). A versão ao lado deve ser a 24.

> ☕ É o equivalente ao **Project SDK** (o JDK) da configuração de um projeto Java.

**Confira os plugins:** em **Settings → Plugins → Installed**, confirme que estes estão ativados (no Ultimate, eles já vêm instalados): **JavaScript and TypeScript** (é ele que traz o suporte a React, JSX e Next.js) e **Node.js**.

---

## 3. Rodando um arquivo JS pela IDE

Até agora, você rodou tudo com `node arquivo.js` no terminal. Pelo IntelliJ, há duas formas:

- **Terminal integrado:** **Alt+F12** abre o terminal já na pasta do projeto. Funciona exatamente como antes.
- **Run configuration:** clique com o botão direito no arquivo → **Run 'exercicios.js'** (ou **Ctrl+Shift+F10** com o arquivo aberto). A saída aparece no painel **Run**, igual a quando você roda uma classe Java com `main`.

Depois da primeira vez, o arquivo vira uma *run configuration* (no canto superior direito), e você roda de novo com **Shift+F10**.

> ⚠️ **Terminal do IntelliJ no Windows:** ele abre o **PowerShell** por padrão. Na aula 2.2, você vai usar um comando em que isso faz diferença (`curl.exe`).

---

## 4. O debugger: o recurso mais importante desta aula

Você já usa o debugger com Java. **Funciona do mesmo jeito com JavaScript**, e ele resolve na hora vários tipos de dúvida que apareceram no Módulo 1 ("o que tem no acumulador do `reduce` em cada volta?", "quem é o `this` aqui?").

### 4.1 Passo a passo

1. **Coloque um breakpoint:** clique na margem esquerda, ao lado do número da linha (aparece uma bolinha vermelha), ou use **Ctrl+F8** na linha.
2. **Rode em modo debug:** botão direito no arquivo → **Debug 'exercicios.js'** (ou **Shift+F9** depois que a run configuration existir).
3. A execução **para** no breakpoint, e o painel **Debug** mostra todas as variáveis daquele momento.

### 4.2 Os atalhos (os mesmos do Java)

| Atalho | Ação |
|---|---|
| **F8** | *Step over*: executa a linha atual e vai para a próxima |
| **F7** | *Step into*: entra na função chamada na linha |
| **Shift+F8** | *Step out*: termina a função atual e volta para quem chamou |
| **F9** | *Resume*: continua até o próximo breakpoint |
| **Alt+F8** | *Evaluate expression*: calcula qualquer expressão naquele ponto (ex.: `acumulador[produto.categoria]`) |

### 4.3 O que observar no painel de variáveis

- **Local:** as variáveis da função atual, incluindo os parâmetros.
- **Closure:** as variáveis que a função "lembra" do escopo de fora (aula 1.4). Você consegue **ver a closure** ali.
- **`this`:** o valor do `this` naquele momento. Acabou a adivinhação. 😄
- **Campos privados (`#preco`):** aparecem dentro do objeto, embora o código de fora não consiga acessá-los.

> ☕ A diferença em relação ao Java é só que o JS não tem tipos: o painel mostra o **valor atual** de cada variável, e não um tipo declarado.

> 🔍 **Para conhecer:** o IntelliJ também depura o JavaScript que roda **no navegador** (com uma run configuration do tipo **JavaScript Debug**). Você vai usar isso a partir do Módulo 4, quando o código começar a rodar em páginas, e depois com o React e o Next.js. No Next.js, dá para depurar tanto o código que roda no navegador quanto o que roda no servidor.

---

## 5. Atalhos úteis para front-end

A boa notícia: **são os mesmos atalhos do Java**. Os mais úteis para JS/TS:

| Atalho | Ação |
|---|---|
| **Shift, Shift** | Procurar qualquer coisa (arquivo, classe, função, configuração) |
| **Ctrl+Shift+F** | Procurar um texto em todos os arquivos |
| **Ctrl+B** (ou Ctrl+clique) | Ir para a declaração: funciona nos **imports** (abre o arquivo importado, aula 1.7) |
| **Alt+F7** | Encontrar onde algo é usado |
| **Shift+F6** | Renomear em todo o projeto: com **export nomeado** (aula 1.7), ele atualiza todos os imports sozinho |
| **Alt+Enter** | Ações rápidas: importar o que falta, corrigir erros |
| **Ctrl+/** | Comentar ou descomentar a linha (muito útil nos testes comentados dos exercícios) |
| **Ctrl+Alt+L** | Formatar o código (na aula 2.5, você vai configurá-lo para usar o Prettier) |
| **Ctrl+E** | Arquivos recentes |

---

## 6. Markdown e Git

- **Markdown:** os arquivos `aula.md` abrem com o texto à esquerda e a **visualização formatada** à direita. Nos botões do canto superior direito do editor, você escolhe só o texto, só a visualização ou os dois.
- **Git:** o IntelliJ tem a integração com Git que você já conhece do Java (**Ctrl+K** para commit, **Ctrl+Shift+K** para push). Vamos falar mais disso na aula 2.6. A pasta `.idea/`, que guarda as configurações locais da IDE, já está no `.gitignore` desde a aula 1.4.

---

## 7. 🎯 Experimente (opcional)

Não há exercícios para entregar, mas vale gastar 10 minutos usando o debugger nos exercícios que você já fez:

1. **O `reduce` volta a volta:** abra o `exercicios.js` da aula 1.2, coloque um breakpoint **dentro** do `reduce` do desafio 12 e rode em modo debug. A cada **F9**, veja o `acumulador` crescer. É a tabela "volta a volta" da explicação daquele desafio, só que ao vivo.
2. **O `this` que se perde:** na aula 1.4, coloque um breakpoint **dentro** da `function` do exercício 8 (a versão com o bug) e veja o `this` como `undefined`. Depois, faça o mesmo com a arrow function e veja o `this` como `mercado`.
3. **A closure:** no `criarContador` do exercício 4 da aula 1.4, coloque um breakpoint dentro do `incrementar()` e procure a variável `atual` na seção **Closure** do painel.

---

## 8. 📋 Resumo

| Tarefa | No IntelliJ | Equivalente no Java |
|---|---|---|
| Configurar o Node | Settings → Languages & Frameworks → Node.js | Configurar o JDK |
| Rodar um arquivo | Botão direito → Run (Ctrl+Shift+F10) | Rodar o `main` |
| Depurar | Botão direito → Debug, breakpoints com Ctrl+F8 | Igual |
| Passo a passo | F8 / F7 / Shift+F8 / F9 | Igual |
| Terminal | Alt+F12 (PowerShell) | Igual |

**Regras de ouro:**
1. O IntelliJ Ultimate já tem tudo para front-end: não precisa de outra IDE.
2. Quando tiver dúvida sobre o que um código está fazendo, **use o debugger** antes de adivinhar.
3. Os atalhos do Java valem para JS, TS, React e Next.js.
