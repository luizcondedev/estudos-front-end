# Aula 1.7: Módulos ES (`import` e `export`)

> **Por que esta aula importa?** Até agora, cada exercício coube num arquivo só. Um projeto React real tem **centenas** de arquivos: cada componente, hook e modelo fica no seu. E a **primeira coisa** que você vai ver em praticamente todo arquivo React é isto:
> ```typescript
> import { useState } from "react";
> import { CardProduto } from "./CardProduto";
> ```
> Esta aula ensina como os arquivos conversam entre si. É a última aula do Módulo 1.

**Como rodar os exemplos:** os exemplos desta aula precisam de **mais de um arquivo**. Crie uma pasta de testes (ex.: `testes-modulos/`) com os arquivos de cada exemplo e um `package.json` (seção 3).

---

## 1. O problema: tudo junto e misturado

Imagine um projeto com três arquivos carregados na mesma página, sem módulos:

```javascript
// produtos.js
const total = 10;

// carrinho.js
const total = 3;   // ❌ SyntaxError: o nome "total" já foi declarado!
```

Sem módulos, todos os arquivos compartilham **o mesmo escopo global**. Problemas:
- **Conflito de nomes:** dois arquivos não podem ter variáveis com o mesmo nome.
- **Ordem importa:** se o `carrinho.js` usa algo do `produtos.js`, o `produtos.js` precisa ser carregado antes. Com 50 arquivos, isso vira um pesadelo.
- **Nada é privado:** qualquer arquivo pode ler e alterar as variáveis de qualquer outro.

> ☕ Imagine o Java **sem pacotes e sem `import`**: todas as classes do projeto (e das bibliotecas) no mesmo lugar, sem `private`, todo mundo enxergando todo mundo. Era assim o JavaScript antigo no navegador.

---

## 2. O que é um módulo

**Um módulo é um arquivo com escopo próprio.** Duas regras simples:

1. **Nada sai do arquivo** sem um `export`.
2. **Nada entra no arquivo** sem um `import`.

```javascript
// matematica.js
const PI_APROXIMADO = 3.14;          // não exportado: invisível para os outros arquivos

export function areaCirculo(raio) {  // exportado: os outros arquivos podem importar
  return PI_APROXIMADO * raio * raio;
}
```

```javascript
// main.js
import { areaCirculo } from "./matematica.js";

console.log(areaCirculo(2));   // 12.56
console.log(PI_APROXIMADO);    // ❌ ReferenceError: não foi exportado
```

> ☕ **Comparação com Java:**
>
> | Java | Módulos JS |
> |---|---|
> | `public` | `export` |
> | `private` / package-private | não exportar |
> | `import com.loja.modelo.Produto;` | `import { Produto } from "./modelo/produto.js";` |
> | O pacote é definido pela pasta + a declaração `package` | O "endereço" é **o caminho do arquivo** |
>
> A grande diferença: em Java você importa por **nome do pacote** (e o classpath encontra o arquivo); em JS você importa pelo **caminho do arquivo**.

---

## 3. Ativando módulos no Node

O Node tem dois sistemas de módulos (o antigo, CommonJS, aparece na seção 10). Para usar o `import`/`export` com segurança, avise ao Node que a pasta usa módulos ES. A forma padrão é um arquivo **`package.json`** na pasta do projeto, com este conteúdo:

```json
{
  "type": "module"
}
```

O `package.json` é o arquivo de configuração de um projeto Node (é parecido com o `pom.xml` do Maven). Você vai estudá-lo a fundo na aula 2.4; por enquanto, só precisa dessa linha.

> 💡 O Node 24 até consegue **detectar sozinho** um arquivo que usa `import`/`export`, mas deixar o `"type": "module"` explícito é o padrão dos projetos reais (todo projeto criado com o Vite vem assim) e evita surpresas.

**No navegador**, um módulo é carregado com `type="module"`:

```html
<script type="module" src="main.js"></script>
```

> ⚠️ Abrir esse HTML com dois cliques (endereço `file://`) **não funciona**: por segurança, o navegador só carrega módulos de um servidor. Você vai resolver isso no Módulo 2 com o Vite, que roda um servidor local. Por isso, os exercícios desta aula rodam no Node.

---

## 4. Export nomeado (o mais usado)

### 4.1 Exportando

Coloque `export` na frente da declaração:

```javascript
// formatacao.js
export const MOEDA = "BRL";

export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: MOEDA });
}

export class Formatador {
  // ...
}
```

Ou declare tudo normalmente e exporte numa lista no final:

```javascript
// formatacao.js
const MOEDA = "BRL";

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: MOEDA });
}

export { MOEDA, formatarMoeda };
```

As duas formas são equivalentes. A lista no final tem a vantagem de mostrar, num lugar só, tudo o que o arquivo oferece.

### 4.2 Importando

```javascript
// main.js
import { formatarMoeda, MOEDA } from "./formatacao.js";

console.log(formatarMoeda(1500)); // "R$ 1.500,00"
```

- As **chaves** `{ }` listam o que você quer trazer. **Os nomes precisam ser exatamente os exportados.**
- Você importa **só o que vai usar**.

> ⚠️ As chaves do `import` **parecem** destructuring (aula 1.2), mas **não são**. É uma sintaxe própria dos módulos: por exemplo, não dá para usar valor padrão (`{ x = 1 }`) dentro de um `import`.

### 4.3 O caminho do arquivo

| Caminho | Significado |
|---|---|
| `"./formatacao.js"` | Na **mesma pasta** do arquivo atual |
| `"./utils/formatacao.js"` | Na subpasta `utils` |
| `"../formatacao.js"` | Na pasta **de cima** (`..` = pasta pai) |
| `"react"`, `"@tanstack/react-query"` | Sem `./` ou `../`: uma **biblioteca** instalada pelo npm (seção 9) |

> ⚠️ **A extensão `.js` é obrigatória** no Node e no navegador. Sem ela, o Node não encontra o arquivo:
> ```
> Error [ERR_MODULE_NOT_FOUND]: Cannot find module '...\formatacao' imported from ...\main.js
> Did you mean to import "./formatacao.js"?
> ```
> Em projetos React com o Vite, no Next.js e em projetos TypeScript em geral, você vai ver imports **sem** extensão (`"./CardProduto"`), porque lá a ferramenta de build resolve isso. Em JS puro, sempre coloque o `.js`.

### 4.4 Renomeando com `as`

Quando dois módulos exportam o mesmo nome, ou o nome não é bom para o seu arquivo:

```javascript
import { formatar as formatarMoeda } from "./moeda.js";
import { formatar as formatarData } from "./data.js";

formatarMoeda(10);
formatarData("2026-10-17");
```

Também dá para renomear no `export`: `export { formatarMoeda as formatar };`.

> ☕ Em Java não existe apelido no `import`: se duas classes têm o mesmo nome (`java.util.Date` e `java.sql.Date`), você precisa usar o nome completo de uma delas no código. Em JS, o `as` resolve isso.

---

## 5. Export default

### 5.1 O que é

Cada arquivo pode ter **um** export marcado como `default` ("padrão"): o "principal" daquele arquivo.

```javascript
// saudacao.js
export default function saudar(nome) {
  return `Olá, ${nome}!`;
}
```

E ele é importado **sem chaves**, com **o nome que você quiser**:

```javascript
// main.js
import saudar from "./saudacao.js";
import cumprimentar from "./saudacao.js"; // o mesmo default, com outro nome: também funciona

saudar("Ana");        // "Olá, Ana!"
```

Um arquivo pode ter um default **e** vários exports nomeados, e você importa os dois juntos assim:

```javascript
import saudar, { formatarMoeda } from "./utils.js";
//     ↑ default  ↑ nomeados
```

### 5.2 ⚠️ As armadilhas do default

**1) Importar um default com chaves dá erro:**

```javascript
// lista.js
export default ["Arroz", "Feijão"];

// main.js
import { lista } from "./lista.js";
// ❌ SyntaxError: The requested module './lista.js' does not provide an export named 'lista'
```

O default não tem nome "de verdade", então não existe um export chamado `lista`.

**2) Importar um nomeado sem chaves pega o default (em silêncio!):**

```javascript
// utils.js
export function formatarMoeda(valor) { /* ... */ }
export default function saudar(nome) { /* ... */ }

// main.js
import formatarMoeda from "./utils.js"; // sem chaves → pega o DEFAULT (a função saudar!)
formatarMoeda(1500);                    // "Olá, 1500!" 😱 nenhum erro, só um bug
```

**3) Cada arquivo pode dar um nome diferente** para o mesmo default, o que dificulta procurar onde algo é usado.

### 5.3 Nomeado ou default?

**Prefira o export nomeado.** É o padrão recomendado pela comunidade TypeScript: o nome é sempre o mesmo em todo o projeto, o editor consegue completar e renomear automaticamente, e erros de digitação viram erros de verdade, e não bugs silenciosos.

O default ainda aparece bastante, então você precisa saber ler e usar. E existe uma exceção importante: no **Next.js**, os arquivos de página e de layout (`page.tsx`, `layout.tsx`) **precisam** usar `export default`, porque é assim que o framework encontra o componente principal de cada rota (aula 9.2).

---

## 6. Importando tudo: `import * as`

```javascript
import * as formatacao from "./formatacao.js";

formatacao.formatarMoeda(10);
formatacao.MOEDA;
```

Isso cria um objeto (chamado de *namespace*) com **todos** os exports nomeados do arquivo.

> ☕ Parece o `import com.loja.util.*;` do Java, mas com uma diferença: em Java, o `*` coloca as classes direto no seu arquivo; em JS, tudo fica **dentro de um objeto**, e você usa sempre com o prefixo (`formatacao.formatarMoeda`).

---

## 7. Reexportar e o arquivo "barril" (`index.js`)

Um módulo pode **reexportar** o que outro exporta:

```javascript
// modelos/index.js
export { Produto } from "./produto.js";
export { Carrinho } from "./carrinho.js";
```

Isso permite que quem usa importe tudo de **um lugar só**:

```javascript
// sem o index.js
import { Produto } from "./modelos/produto.js";
import { Carrinho } from "./modelos/carrinho.js";

// com o index.js
import { Produto, Carrinho } from "./modelos/index.js";
```

Esse arquivo que só reexporta é chamado de **barrel** ("barril"). Também existe a forma `export * from "./produto.js";`, que reexporta todos os exports nomeados de uma vez.

> ☕ Não existe um equivalente direto em Java. A ideia é parecida com uma **fachada** (*facade*) para um pacote: quem usa não precisa conhecer a organização interna das pastas. Bibliotecas de componentes usam muito isso: um único arquivo de entrada que reexporta tudo o que a biblioteca oferece.

---

## 8. Como os módulos se comportam (as regras que causam surpresas)

### 8.1 Cada módulo tem escopo próprio

As variáveis do "topo" de um módulo **não** são globais: só existem naquele arquivo. Dois módulos podem ter uma variável `total` cada um, sem conflito. Fim do problema da seção 1.

### 8.2 Módulos estão sempre em modo estrito

Dentro de um módulo, o modo estrito (*strict mode*, aula 1.4) é **automático**. Consequências que você já conhece:
- O `this` no topo do arquivo é `undefined`.
- Uma função "solta" tem `this` `undefined` (seção 4.2 da aula 1.4).
- Atribuir a uma variável que não foi declarada dá `ReferenceError` (fora do modo estrito, o JS criava uma variável global sem avisar).

### 8.3 Um módulo é executado uma única vez

Se vários arquivos importam o mesmo módulo, ele **roda uma vez só**, na primeira importação. Os outros recebem o **mesmo** resultado, que fica guardado em cache. Consequência: o estado do módulo é **compartilhado**.

```javascript
// contador.js
console.log("contador.js carregado");
let total = 0;
export function incrementar() { total++; }
export function valor() { return total; }

// a.js
import { incrementar } from "./contador.js";
incrementar();

// b.js
import { incrementar } from "./contador.js";
incrementar();

// main.js
import "./a.js";   // importar só para executar (sem trazer nada)
import "./b.js";
import { valor } from "./contador.js";
console.log(valor());
```

Saída:

```
contador.js carregado     ← uma vez só, apesar de três imports
2                         ← a.js e b.js incrementaram o MESMO total
```

> ☕ É parecido com um **campo `static`** em Java (existe uma única vez por classe carregada, e o bloco `static { }` roda uma única vez) ou com um **bean singleton** do Spring: todos que pedem recebem a mesma instância.

> 💡 No React, bibliotecas de estado global como o **Zustand** (aula 8.5) usam exatamente esse comportamento: a "store" é criada num módulo, e todo componente que a importa recebe a **mesma** store.

### 8.4 Imports são somente leitura

Você **não pode reatribuir** algo importado:

```javascript
import { MOEDA } from "./formatacao.js";

MOEDA = "USD"; // ❌ TypeError: Assignment to constant variable.
```

Mas, como acontece com `const` (aula 1.2, seção 2.3), o **conteúdo** de um objeto importado **pode** ser alterado:

```javascript
// config.js
export const config = { moeda: "BRL" };

// main.js
import { config } from "./config.js";
config.moeda = "USD"; // ✅ permitido, e TODOS os módulos que importam config veem a mudança (seção 8.3!)
```

Isso é exatamente o tipo de mutação de dado compartilhado que a aula 1.2 ensinou a evitar.

### 8.5 Imports ficam no topo e são processados antes de tudo

- Os `import` precisam estar **no nível de cima do arquivo**: não podem ficar dentro de um `if`, de uma função ou de um `try`.
- Antes de executar **qualquer linha** do seu arquivo, o JS lê todos os imports e carrega os módulos. Se um import estiver errado (arquivo inexistente ou nome não exportado), o programa **para antes de começar**, sem executar nada.

```javascript
console.log("isto NÃO é impresso");
import { naoExiste } from "./formatacao.js";
// ❌ SyntaxError: The requested module './formatacao.js' does not provide an export named 'naoExiste'
```

> ☕ Isso é o mais perto que o JS puro chega de um **erro de compilação** do Java: o erro aparece antes de rodar, e não no meio da execução.

> 🔍 **Para conhecer:** existe também o `import()` como **função**, que carrega um módulo sob demanda, no meio do código. Ele é a base do `lazy` do React (aula 8.8), que só baixa o código de uma tela quando o usuário entra nela, e o Next.js faz isso automaticamente para cada rota. Como ele é assíncrono, você vai entendê-lo depois do Módulo 4.

---

## 9. Importando bibliotecas

Quando o caminho **não** começa com `./`, `../` ou `/`, o JS entende que é uma **biblioteca** instalada pelo npm, que fica na pasta `node_modules`:

```javascript
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
```

> ☕ É o equivalente às dependências do `pom.xml`: você declara a biblioteca, o Maven baixa, e você importa as classes dela. No JS, quem baixa é o npm (aula 2.4).

---

## 10. 🔍 CommonJS: o sistema antigo do Node

Antes dos módulos ES existirem (2015), o Node criou o próprio sistema, o **CommonJS**. Você ainda vai encontrá-lo em código antigo, em tutoriais e em arquivos de configuração:

```javascript
// CommonJS (antigo)
const { formatarMoeda } = require("./formatacao.js");
module.exports = { formatarMoeda };

// Módulos ES (atual)
import { formatarMoeda } from "./formatacao.js";
export { formatarMoeda };
```

Num projeto com `"type": "module"`, o `require` não existe:

```
ReferenceError: require is not defined in ES module scope, you can use import instead
```

**Regra:** só saiba **reconhecer** o CommonJS. Em código novo, use sempre `import`/`export`.

---

## 11. Organizando um projeto em módulos

Algumas regras práticas, que você vai ver no React e no Next.js:

- **Uma "coisa" principal por arquivo:** um componente, um hook, uma classe. É a mesma regra do Java (uma classe pública por arquivo).
- **Pastas por funcionalidade** (`produtos/`, `carrinho/`, `auth/`) em vez de pastas por tipo técnico, quando o projeto cresce.
- **Exporte só o necessário.** Funções auxiliares internas ficam sem `export`, como um método `private`.
- **Evite dependências circulares** (A importa B, que importa A). Em Java elas funcionam sem problema; em JS podem causar erros difíceis de entender, como acessar uma classe antes de ela estar pronta (lembra da TDZ, aula 1.4?).

---

## 12. E no React?

Um componente React típico usa tudo desta aula:

```tsx
import { useState } from "react";                   // biblioteca (npm)
import { Button } from "@/components/ui/button";    // componente do shadcn/ui (aula 8.7)
import { CardProduto } from "./CardProduto";        // outro componente do projeto
import type { Produto } from "./tipos";             // só um tipo (TypeScript, Módulo 5)

export function ListaProdutos({ produtos }: { produtos: Produto[] }) {   // export nomeado
  const [selecionado, setSelecionado] = useState<number | null>(null);

  return (
    <div>
      {produtos.map(p => <CardProduto key={p.id} produto={p} />)}
      <Button onClick={() => setSelecionado(null)}>Limpar</Button>
    </div>
  );
}
```

- O **`@/`** no começo do caminho é um **atalho** configurado no projeto para a pasta principal do código (normalmente a `src`). Ele evita caminhos longos como `"../../../components/ui/button"`. Os projetos criados com o shadcn/ui e com o `create-next-app` já vêm com esse atalho.
- O **`import type`** traz só um **tipo** do TypeScript: nada disso existe quando o código roda (você vai entender no Módulo 5).
- Para usar um componente, basta importá-lo e escrevê-lo como uma "tag" (`<CardProduto />`). Diferente do Angular, não existe uma segunda lista de configuração para registrar os componentes.

---

## 13. 📋 Resumo (cola rápida)

| Conceito | Módulos JS | Java |
|---|---|---|
| Tornar visível para outros arquivos | `export` | `public` |
| Manter interno | não exportar | `private` / package-private |
| Importar | `import { X } from "./x.js"` (pelo caminho) | `import pacote.X;` (pelo nome) |
| Renomear no import | `import { X as Y }` | não existe |
| Importar tudo | `import * as ns from "./x.js"` (objeto) | `import pacote.*;` |
| "Principal" do arquivo | `export default` (importado sem chaves) | não existe |
| Reexportar | `export { X } from "./x.js"` | não existe (fachada) |
| Execução | uma vez, estado compartilhado | `static` / bean singleton |
| Erro de import | antes de executar qualquer linha | erro de compilação |
| Biblioteca externa | `import { X } from "pacote"` (npm) | dependência do Maven |
| Sistema antigo | `require` / `module.exports` (CommonJS) | — |

**Regras de ouro:**
1. Nada sai de um módulo sem `export`; nada entra sem `import`.
2. Em JS puro, **sempre** coloque a extensão `.js` no caminho.
3. Prefira **export nomeado**; cuidado com o default importado com o nome errado.
4. Um módulo roda **uma vez só**, e o estado dele é compartilhado por todos que o importam.
5. Imports são somente leitura, mas objetos importados podem ser alterados (evite).
6. No Next.js, páginas e layouts **exigem** `export default`: é a exceção à regra 3.

---

## ✍️ Exercícios

Os exercícios desta aula ficam na pasta [exercicios](./exercicios/), divididos em três partes. Veja as instruções no [README da pasta](./exercicios/README.md).
