// ============================================================
// Aula 1.5: Exercícios
// Rode com: node exercicios.js
// Os testes no final de cada exercício estão comentados:
// descomente-os quando terminar o exercício.
// ============================================================

// ------------------------------------------------------------
// 1) TRADUZINDO DO JAVA
// Traduza esta classe Java para JavaScript:
//
// public class Cliente {
//     private String nome;
//     private String email;
//     private boolean ativo = true;
//
//     public Cliente(String nome, String email) {
//         this.nome = nome;
//         this.email = email;
//     }
//     public Cliente(String nome) { this(nome, "sem-email"); }
//
//     public void desativar() { this.ativo = false; }
//     public boolean isAtivo() { return ativo; }
//     public String getNome() { return nome; }
// }
//
// Regras: nome e email públicos; ativo PRIVADO com getter `ativo`
// (usado como cliente.ativo, sem parênteses). Sem sobrecarga!
// ------------------------------------------------------------
// TODO

// const cli1 = new Cliente("Ana", "ana@email.com");
// const cli2 = new Cliente("Bia");
// cli2.desativar();
// console.log("1)", cli1.email, cli1.ativo, cli2.email, cli2.ativo); // esperado: ana@email.com true sem-email false
// cli1.ativo = false; // não deve ter efeito (só existe getter)
// console.log("1)", cli1.ativo); // esperado: true

// ------------------------------------------------------------
// 2) GETTER, SETTER E VALIDAÇÃO
// Crie a classe Produto com:
//   - constructor({ nome, preco, estoque = 0 }) (objeto de parâmetros)
//   - #preco privado com get/set; o setter lança Error se o preço for negativo
//   - getter `precoFormatado` → "R$ 8,00" (use toLocaleString, seção 5.2)
//   - getter `disponivel` → true se estoque > 0
//   - toString() → "Produto(Batata, R$ 8,00)"
// ------------------------------------------------------------
// TODO

// const batata = new Produto({ nome: "Batata", preco: 8 });
// console.log("2)", batata.preco, batata.precoFormatado, batata.disponivel, `${batata}`);
// try {
//   batata.preco = -1;
// } catch (e) {
//   console.log("2) erro capturado:", e.message);
// }
// try {
//   new Produto({ nome: "Inválido", preco: -10 }); // deve falhar já na criação!
// } catch (e) {
//   console.log("2) erro na criação:", e.message);
// }

// ------------------------------------------------------------
// 3) STATIC
// Adicione à classe Produto (exercício 2):
//   - um contador estático PRIVADO de quantos produtos foram criados
//   - um id automático em cada instância (1, 2, 3...)
//   - um método estático total() que retorna quantos foram criados
// ------------------------------------------------------------

// const p1 = new Produto({ nome: "A", preco: 1 });
// const p2 = new Produto({ nome: "B", preco: 2 });
// console.log("3)", p1.id, p2.id, Produto.total()); // ids sequenciais, total = quantidade criada até aqui

// ------------------------------------------------------------
// 4) HERANÇA
// Crie:
//   - class Funcionario: nome, salarioBase; método calcularSalario() → salarioBase
//     e descrever() → "Ana ganha R$ 3.000,00" (use calcularSalario()!)
//   - class Gerente extends Funcionario: recebe também "bonus" e
//     sobrescreve calcularSalario() → salarioBase + bonus
//   - class Estagiario extends Funcionario: sobrescreve calcularSalario()
//     → metade do salarioBase; e descrever() → descrição do pai + " (estagiário)"
// Repare que você NÃO precisa sobrescrever descrever() no Gerente: polimorfismo!
// ------------------------------------------------------------
// TODO

// const equipe = [
//   new Funcionario("Ana", 3000),
//   new Gerente("Bia", 5000, 2000),
//   new Estagiario("Caio", 2000),
// ];
// equipe.forEach(f => console.log("4)", f.descrever()));
// console.log("4) Folha total:", equipe.reduce((total, f) => total + f.calcularSalario(), 0)); // esperado: 11000
// console.log("4)", equipe[1] instanceof Funcionario, equipe[0] instanceof Gerente); // esperado: true false

// ------------------------------------------------------------
// 5) EQUALS: prever e resolver
// a) Responda ANTES de descomentar: o que cada linha imprime?
//    Resposta 5.1:
//    Resposta 5.2:
// b) Crie em Produto um método equals(outro) que compare por nome e preço,
//    e use-o com some() para verificar se a lista contém o produto.
// ------------------------------------------------------------
// const x = new Produto({ nome: "Arroz", preco: 15 });
// const y = new Produto({ nome: "Arroz", preco: 15 });
// console.log("5.1)", x === y);
// console.log("5.2)", [x].includes(y));
// TODO (b)

// ------------------------------------------------------------
// 6) O THIS SE PERDE: prever e consertar
// O código abaixo quebra. Responda por quê e conserte SÓ A ÚLTIMA LINHA.
// Por quê:
// ------------------------------------------------------------
class Relogio {
  segundos = 0;
  tic() {
    this.segundos++;
    console.log("6) segundos:", this.segundos);
  }
}
const relogio = new Relogio();
// setTimeout(relogio.tic, 0); // ← descomente, veja o erro e conserte

// ------------------------------------------------------------
// 7) DESAFIO: CARRINHO DE COMPRAS
// Crie a classe Carrinho:
//   - #itens privado: array de { produto, quantidade }
//   - adicionar(produto, quantidade = 1): se o produto (mesmo id) já existe,
//     soma a quantidade; senão, adiciona. Lança Error se quantidade <= 0.
//   - remover(idProduto)
//   - getter total → soma de preco * quantidade
//   - getter quantidadeItens → soma das quantidades
//   - getter itens → retorna uma CÓPIA do array (quem usa não pode mutar o #itens!)
// Use os métodos de array das aulas anteriores (find, filter, reduce...).
// ------------------------------------------------------------
// TODO

// const carrinho = new Carrinho();
// const arroz = new Produto({ nome: "Arroz", preco: 15.99 });
// const feijao = new Produto({ nome: "Feijão", preco: 9.5 });
// carrinho.adicionar(arroz, 2);
// carrinho.adicionar(feijao);
// carrinho.adicionar(arroz);      // deve somar: arroz fica com 3
// console.log("7)", carrinho.quantidadeItens, carrinho.total.toFixed(2)); // esperado: 4 57.47
// carrinho.itens.push("lixo");    // não pode afetar o carrinho
// carrinho.remover(feijao.id);
// console.log("7)", carrinho.quantidadeItens, carrinho.itens.length); // esperado: 3 1
