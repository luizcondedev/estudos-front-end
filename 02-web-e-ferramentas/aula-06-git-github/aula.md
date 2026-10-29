# Aula 2.6: Git e GitHub para front-end

> **Por que esta aula importa?** Em qualquer time, ninguém faz commit direto na `main`: o trabalho acontece em **branches**, e entra no projeto por um **pull request**, depois de revisado e de passar pelos testes automáticos. Esse é também o fluxo da Vercel, que publica uma versão de teste do seu site Next.js a cada pull request. Você já faz commit e push pelo IntelliJ; esta aula completa o que falta para trabalhar em time e em freelas: branches, merge, **conflitos** (o momento em que todo mundo trava na primeira vez), pull requests e um histórico de commits que se entende.
>
> ⏱️ **Aula enxuta:** cerca de 30 minutos de leitura e 50 de exercícios. O foco é o que você ainda não usa; o IntelliJ continua sendo a sua ferramenta principal, e o terminal entra para você entender o que cada botão faz.

**Exercícios:** o [exercicios.md](./exercicios/exercicios.md) traz o passo a passo. Desta vez, você vai **entregar a aula por um pull request**, como num time de verdade.

---

## 1. O modelo mental: as quatro áreas

O Git guarda o seu trabalho em quatro lugares. Entender a passagem de um para o outro explica quase todos os comandos:

```text
 Pasta de trabalho  ──git add──▶  Staging  ──git commit──▶  Repositório local  ──git push──▶  GitHub (remoto)
 (os arquivos que               (o que vai entrar         (o histórico, na           (a cópia
  você edita)                    no próximo commit)        pasta .git)                compartilhada)
                     ◀──────────────────────────── git pull ───────────────────────────────────
```

- **Pasta de trabalho:** os arquivos como estão agora, no disco.
- **Staging** (ou *index*): a "lista do próximo commit". Você escolhe **quais** mudanças entram.
- **Repositório local:** o histórico de commits, guardado na pasta oculta `.git`. Cada **commit** é uma foto do projeto inteiro naquele momento, com autor, data, mensagem, um identificador (o *hash*, como `1d2c622`) e a referência ao commit que veio antes dele, chamado de **pai**. É essa ligação de cada commit com o seu pai que forma o histórico.
- **Remoto:** a cópia no GitHub, chamada de **`origin`** por padrão.

**O que o IntelliJ faz quando você clica:**

| No IntelliJ | Atalho | No terminal |
|---|---|---|
| Marcar arquivos na janela de commit | — | `git add arquivo` |
| **Commit** | **Ctrl+K** | `git add` + `git commit -m "mensagem"` |
| **Push** | **Ctrl+Shift+K** | `git push` |
| **Update Project** | **Ctrl+T** | `git pull` |
| A janela **Git**, aba **Log** | **Alt+9** | `git log --oneline --graph` |
| As cores dos arquivos (azul = alterado, verde = novo, vermelho = fora do Git) | — | `git status` |

> 💡 **Por que usar o terminal, se o IntelliJ faz tudo?** Você vai encontrar comandos de Git em toda documentação, tutorial e resposta de IA, e às vezes vai trabalhar num servidor sem IDE. Saber o comando por trás do botão é o que te tira de um problema. No dia a dia, use o que for mais confortável.

**Os comandos de leitura**, que nunca alteram nada:

```bash
git status                # o que mudou e o que está no staging
git diff                  # as mudanças linha por linha (ainda fora do staging)
git log --oneline -10     # os últimos 10 commits, um por linha
```

---

## 2. Mensagens de commit: Conventional Commits

**O que é:** uma convenção para a primeira linha da mensagem: **`tipo: descrição`** (ou `tipo(escopo): descrição`). É o padrão que este repositório usa desde a primeira aula.

| Tipo | Quando | Exemplo |
|---|---|---|
| `feat` | Funcionalidade nova | `feat: filtro de produtos por categoria` |
| `fix` | Correção de bug | `fix: total do carrinho ignorava a quantidade` |
| `docs` | Só documentação | `docs: atualiza o README` |
| `style` | Formatação, sem mudar o comportamento | `style: aplica o Prettier` |
| `refactor` | Reorganiza o código, sem mudar o comportamento | `refactor: extrai a validação para um módulo` |
| `test` | Testes | `test: casos de borda do desconto` |
| `chore` | Manutenção (dependências, configurações) | `chore: atualiza o eslint para a 10.13` |

**Para que serve:** o histórico fica legível de relance, e ferramentas conseguem ler as mensagens. Uma ligação direta com o semver da aula 2.4: há ferramentas que calculam a versão nova de um pacote pelos commits. Um `fix` sobe o **patch**, um `feat` sobe o **minor**, e um `feat!:` (com `!`) ou um rodapé `BREAKING CHANGE:` sobe o **major**.

**Um bom commit:**
- **Pequeno e com um assunto só.** "Corrige o login e muda a cor do botão" são dois commits.
- **A mensagem diz o que mudou e, se não for óbvio, por quê.** Evite "ajustes", "wip" e "commit".

---

## 3. Branches

**O que é:** uma **linha de trabalho separada**. Tecnicamente, uma branch é só uma **etiqueta que aponta para um commit** e anda junto quando você faz commits nela. Por isso criar uma branch é instantâneo e não copia nenhum arquivo.

**Para que serve:** trabalhar numa funcionalidade sem mexer na `main`, que deve estar **sempre funcionando**. Se a ideia não der certo, é só abandonar a branch.

```bash
git switch -c feature/carrinho    # cria a branch e já entra nela
git switch main                   # volta para a main
git branch                        # lista as branches locais; o * marca a atual
```

> 💡 Em tutoriais antigos, você vai ver o `git checkout -b feature/carrinho`. Ele faz o mesmo que o `git switch -c`, mas o `checkout` faz muitas coisas diferentes; o `switch` foi criado só para trocar de branch, e é mais seguro.

**Nomes comuns:** `feature/nome-curto`, `fix/nome-do-bug`, ou o número da tarefa (`feature/123-login`).

**No IntelliJ:** o nome da branch atual aparece no **canto superior esquerdo** da janela. Clique nele para criar uma branch (**New Branch**), trocar de branch ou ver as branches remotas.

**Armadilha:** ao trocar de branch, as mudanças **que ainda não viraram commit vão junto com você** para a outra branch. Antes de trocar, faça o commit (ou guarde as mudanças com o `git stash`, seção 6).

---

## 4. Merge e conflitos

**O que é o merge:** juntar o trabalho de uma branch em outra. Estando na branch que vai **receber** as mudanças:

```bash
git switch main
git merge feature/carrinho
```

O Git compara as duas linhas de trabalho. Se elas mudaram **partes diferentes** dos arquivos, ele junta tudo sozinho. Se as duas mudaram **as mesmas linhas**, ele não tem como saber qual versão é a certa, e para com um **conflito**:

```text
CONFLICT (content): Merge conflict in precos.js
Automatic merge failed; fix conflicts and then commit the result.
```

**Como o conflito aparece no arquivo:**

```javascript
<<<<<<< HEAD
export const frete = 15;
=======
export const frete = 12;
export const freteGratisAcimaDe = 200;
>>>>>>> feature/frete-gratis
export const desconto = 0.05;
```

- Entre `<<<<<<< HEAD` e `=======`: a versão da branch **onde você está** (o `HEAD` é sempre "onde você está agora").
- Entre `=======` e `>>>>>>>`: a versão da branch que está **chegando**.

**Como resolver, passo a passo:**
1. Decida como o código **deve ficar**. Nem sempre é escolher um lado: muitas vezes a resposta certa junta os dois (aqui, o frete de 15 **e** a linha nova do frete grátis).
2. Edite o arquivo para ficar assim e **apague as três linhas de marcação**.
3. Marque o conflito como resolvido com `git add precos.js`, e termine o merge com `git commit --no-edit` (o `--no-edit` usa a mensagem padrão, "Merge branch '...'").

**O commit de merge:** um commit normal tem **um** pai (seção 1). O commit que o merge cria tem **dois**: o último commit da branch onde você estava e o último commit da branch que chegou. É assim que o Git registra que as duas linhas de trabalho se juntaram, e é por isso que, no `git log --graph`, ele aparece com duas linhas chegando nele:

```text
*   8a1c462 Merge branch 'feature/frete-gratis'      ← dois pais: c789e69 e 98a6a8a
|\
| * 98a6a8a feat: frete grátis acima de 200 reais
* | c789e69 fix: corrige o valor do frete para 15 reais
|/
* fc49615 feat: valores iniciais de frete e desconto
```

(Se a branch que recebe o merge não teve nenhum commit novo desde que a outra foi criada, o Git nem cria um commit de merge: ele só move a etiqueta da branch para a frente. Isso se chama *fast-forward*.)

**No IntelliJ (bem mais fácil):** quando acontece um conflito, ele abre a janela **Conflicts** (ou use o menu **Git → Resolve Conflicts**). Clique em **Merge...** e aparece uma tela com três colunas: **a sua versão** à esquerda, **a que está chegando** à direita e o **resultado** no meio. Use as setas **>>** e **<<** para trazer cada mudança para o meio, edite o que precisar e clique em **Apply**. O IntelliJ já marca o arquivo como resolvido.

**Armadilhas:**
- **Nunca faça o commit com as marcações** `<<<<<<<` no código. O ESLint e o Prettier acusam erro de sintaxe, mas o Git não impede.
- **Desistiu no meio?** `git merge --abort` volta tudo para como estava antes do merge.
- **Conflitos pequenos são fáceis; conflitos enormes são o problema.** Faça branches curtas e traga a `main` para a sua branch com frequência (`git merge main`), para os conflitos aparecerem pequenos.

> 🔍 **Rebase:** uma alternativa ao merge que "reescreve" os commits da sua branch como se ela tivesse começado depois, deixando o histórico em linha reta. É muito usado, mas tem uma regra de ouro: **nunca faça rebase de uma branch que outras pessoas já baixaram**, porque ele troca os commits por commits novos. Enquanto estiver aprendendo, fique no merge.

---

## 5. GitHub e pull requests

**O que é um pull request (PR):** um **pedido para juntar uma branch na `main`**, feito no GitHub. Antes do merge, o time **revisa o código** (comentários linha por linha, pedidos de mudança, aprovação), e ferramentas automáticas rodam o lint, os testes e o build (aula 12.4).

> ☕ É o mesmo processo de code review que você vê (ou vai ver) em qualquer empresa Java: no GitLab, ele se chama *merge request*.

**O fluxo completo:**

```bash
git switch -c feature/carrinho          # 1) cria a branch
# ...trabalha e faz commits...          # 2) commits pequenos
git push -u origin feature/carrinho     # 3) envia a branch para o GitHub
```

4. No GitHub, aparece um aviso amarelo **"Compare & pull request"**. Clique, escreva um título (pode seguir o Conventional Commits) e uma descrição do que mudou e de como testar, e clique em **Create pull request**.
5. **Revisão:** se pedirem mudanças, faça novos commits na mesma branch e dê `git push`: **o PR é atualizado sozinho**.
6. **Merge:** depois de aprovado, clique em **Merge pull request** no GitHub. As opções mais comuns:
   - **Create a merge commit:** mantém todos os commits da branch.
   - **Squash and merge:** junta todos os commits da branch em **um só** na `main`. Deixa o histórico da `main` limpo, e é o mais usado.
7. **Depois do merge:** volte para a `main` e atualize-a (`git switch main` e `git pull`, ou **Ctrl+T** no IntelliJ). A branch pode ser apagada.

O `-u` do push (de *upstream*) liga a sua branch local à branch do GitHub. Só é preciso na primeira vez: depois disso, `git push` e `git pull` sozinhos já sabem para onde ir.

**No IntelliJ:** o push de uma branch nova já faz o papel do `-u`. Depois do push, também dá para criar o PR sem sair da IDE, pela janela **Pull Requests** (é preciso conectar a sua conta do GitHub em **Settings → Version Control → GitHub**).

---

## 6. O `.gitignore` e como desfazer as coisas

### O `.gitignore`

**O que é:** o arquivo que lista o que o Git **não** deve controlar. Cada linha é um padrão:

```gitignore
node_modules/      # uma pasta (a / no fim indica pasta)
dist/
.env               # um arquivo
.env.*             # o * vale qualquer texto: .env.local, .env.production...
*.log              # todos os arquivos terminados em .log
!.env.example      # o ! cria uma exceção: este arquivo VAI para o Git
```

- Pode existir um `.gitignore` em **qualquer pasta**, valendo para ela e para as de dentro. Os exercícios desta aula usam um.
- O Vite e o `create-next-app` já criam um `.gitignore` pronto. Para outros projetos, o GitHub mantém modelos em [github.com/github/gitignore](https://github.com/github/gitignore).
- Para descobrir **qual regra** está ignorando um arquivo: `git check-ignore -v caminho/do/arquivo`.

**Armadilhas:**
- **O `.gitignore` não tira do Git um arquivo que já foi commitado.** Para isso, rode `git rm --cached arquivo` (ele sai do Git, mas continua no seu disco) e faça o commit.
- **Se um segredo (uma senha, uma chave de API) já foi enviado ao GitHub, considere-o vazado**, mesmo que você apague o arquivo depois: ele continua no histórico. A solução é trocar a chave. Você vai ver isso no Módulo 6.

### Desfazendo as coisas

| Situação | Comando | No IntelliJ |
|---|---|---|
| Descartar as mudanças de um arquivo (que ainda não viraram commit) | `git restore arquivo` | Botão direito → **Git → Rollback** |
| Tirar um arquivo do staging | `git restore --staged arquivo` | Desmarcar na janela de commit |
| Corrigir a mensagem ou incluir um arquivo no último commit, **antes do push** | `git commit --amend` (o commit é **substituído** por um novo, com outro hash) | Opção **Amend** na janela de commit |
| Desfazer um commit que **já foi enviado** | `git revert <hash>` (cria um commit novo, que desfaz o outro) | No Log, botão direito no commit → **Revert Commit** |
| Guardar as mudanças por um tempo, para trocar de branch | `git stash` e, depois, `git stash pop` | **Git → Uncommitted Changes → Stash Changes** |

**Armadilha:** comandos como `git reset --hard` e `git push --force` **apagam trabalho** sem volta, e o `--force` pode apagar o trabalho de outras pessoas no GitHub. Se uma resposta (ou uma IA) sugerir um deles, entenda exatamente o que ele faz antes de rodar.

> ⚠️ **O editor do Git no terminal:** alguns comandos, como um `git commit` sem o `-m`, abrem um editor de texto para você escrever a mensagem. No Git para Windows, o padrão é o **Vim**, que confunde quem nunca usou. Para sair dele: aperte **Esc**, digite **`:wq`** e **Enter** (salva e sai). Para evitar o problema, use sempre o `-m "mensagem"` ou o `--no-edit`, ou troque o editor: `git config --global core.editor notepad`.

---

## 7. 🔍 Para conhecer: Husky e lint-staged

São duas ferramentas que rodam o **lint e o Prettier automaticamente antes de cada commit**, para nenhum código fora do padrão chegar ao repositório:

- **Husky:** instala **ganchos** (*hooks*) do Git, que são scripts que o Git roda em certos momentos, como logo antes de um commit (o `pre-commit`).
- **lint-staged:** roda as ferramentas **só nos arquivos que estão no staging**, e não no projeto inteiro (por isso é rápido).

A configuração típica: `npm install -D husky lint-staged`, `npx husky init` (cria a pasta `.husky`), o comando `npx lint-staged` dentro do arquivo `.husky/pre-commit`, e a lista de comandos no `package.json`:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

Se o ESLint achar um erro, **o commit é cancelado**. Você vai configurar isso no projeto final (Módulo 12), junto com o CI.

---

## 8. E no React e no Next.js?

- **O `create-next-app` já cria o repositório Git** (com o `.gitignore` e o primeiro commit). O Vite cria o `.gitignore`, mas o `git init` fica por sua conta.
- **A Vercel publica cada pull request** numa URL de teste (*preview deployment*), para você e o cliente verem a mudança funcionando antes do merge (aula 9.11). Em freelas, isso é ótimo para pedir a aprovação do cliente.
- **Arquivos `.env.local`** (as variáveis de ambiente do Next.js e do Vite, aulas 8.11 e 9.11) **nunca** vão para o Git: o `.gitignore` dos dois já cuida disso.

---

## 9. 📋 Resumo (cola rápida)

| Tarefa | Terminal | IntelliJ |
|---|---|---|
| Ver o que mudou | `git status` / `git diff` | As cores dos arquivos / a janela de commit |
| Commit | `git add arquivo` + `git commit -m "feat: ..."` | **Ctrl+K** |
| Enviar | `git push` (na 1ª vez: `git push -u origin nome`) | **Ctrl+Shift+K** |
| Atualizar | `git pull` | **Ctrl+T** |
| Criar e trocar de branch | `git switch -c nome` / `git switch nome` | O nome da branch, no canto superior esquerdo |
| Juntar uma branch | `git merge nome` | Menu da branch → **Merge** |
| Resolver um conflito | Editar + `git add` + `git commit --no-edit` | **Git → Resolve Conflicts → Merge...** |
| Histórico | `git log --oneline --graph` | **Alt+9** → Log |
| Desfazer um commit enviado | `git revert <hash>` | Log → **Revert Commit** |

**Regras de ouro:**
1. Nunca trabalhe direto na `main`: crie uma branch para cada tarefa.
2. Commits pequenos, com mensagens no padrão Conventional Commits.
3. Branches curtas e atualizadas com a `main`: conflitos pequenos são fáceis.
4. Num conflito, decida como o código **deve ficar**, que pode ser uma mistura dos dois lados, e nunca deixe as marcações no arquivo.
5. Segredos nunca vão para o Git. Se foram, troque-os.
6. Desconfie de `reset --hard` e `push --force`.

---

## ✍️ Exercícios

Abra o [exercicios.md](./exercicios/exercicios.md) e siga o passo a passo.
