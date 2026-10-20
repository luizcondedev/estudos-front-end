# Exercícios da Aula 1.7: Módulos

Os exercícios desta aula usam **vários arquivos**, porque módulos só fazem sentido assim. O `package.json` desta pasta (com `"type": "module"`) ativa os módulos ES para todas as subpastas (seção 3 da aula). **Não apague esse arquivo.**

Rode todos os comandos **de dentro desta pasta** (`exercicios`). No terminal da IDE (no IntelliJ: **Alt+F12**):

```bash
cd 01-javascript/aula-07-modulos/exercicios
```

## Parte 1: prever (`parte-1-prever/`)

Leia os quatro arquivos da pasta (`contador.js`, `a.js`, `b.js` e `main.js`), responda as perguntas nos comentários do `main.js` **antes de rodar** e depois confira:

```bash
node parte-1-prever/main.js
```

## Parte 2: conserte os bugs (`parte-2-bugs/`)

Cada arquivo `bug-N.js` tem um problema de import. Para cada um:
1. Rode e leia a mensagem de erro (ou a saída errada).
2. Explique a causa no comentário do arquivo.
3. Conserte **só o import** (ou o export, quando o enunciado pedir).

```bash
node parte-2-bugs/bug-1.js
```
```bash
node parte-2-bugs/bug-2.js
```
```bash
node parte-2-bugs/bug-3.js
```
```bash
node parte-2-bugs/bug-4.js
```

> Esses arquivos **dão erro de propósito** até você consertar.

## Parte 3: refatorar em módulos (`parte-3-refatorar/`)

O arquivo `tudo-junto.js` tem um mini sistema de loja inteiro num arquivo só. Sua tarefa é separá-lo em módulos, como num projeto de verdade. As instruções estão no topo do `main.js`.

Para conferir, rode os dois e compare: a saída precisa ser **idêntica**.

```bash
node parte-3-refatorar/tudo-junto.js
```
```bash
node parte-3-refatorar/main.js
```
