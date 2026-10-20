// ============================================================
// Aula 1.6: Exercícios
// Rode com: node exercicios.js
// Nos exercícios de "prever", responda nos comentários ANTES de rodar.
// Os testes de cada exercício estão comentados: descomente-os quando
// terminar o exercício.
// ============================================================

// ------------------------------------------------------------
// 1) TRY / CATCH / FINALLY: prever a ordem
// Escreva, na ordem, as letras que cada chamada vai imprimir.
// ------------------------------------------------------------
function processar(valor) {
  try {
    console.log("1) A");
    if (valor === 0) throw new Error("zero não pode");
    console.log("1) B");
    return "C";
  } catch (e) {
    console.log("1) D:", e.message);
    return "E";
  } finally {
    console.log("1) F");
  }
}

// processar(10) imprime:          Resposta: 1) A / 1)B / 1) F
// e retorna:                       Resposta: C
// processar(0) imprime:           Resposta: 1) A / 1) D: zero não pode / 1) F
// e retorna:                       Resposta: E
console.log("1) retornou:", processar(10));
console.log("1) retornou:", processar(0));

// ------------------------------------------------------------
// 2) TIPOS DE ERRO: prever
// A função qualErro recebe uma função (um callback, como os que você
// passa para o map), executa essa função dentro de um try e devolve o
// "name" do erro lançado.
// Para cada item, diga qual erro será lançado: TypeError, ReferenceError,
// RangeError ou SyntaxError. E diga POR QUÊ.
// ------------------------------------------------------------
function qualErro(funcao) {
  try {
    funcao();
    return "nenhum erro";
  } catch (e) {
    return e.name;
  }
}

const usuario = null;
console.log("2.1)", qualErro(() => usuario.nome));               // Resposta:TypeError Por quê: Porque usuario é null
console.log("2.2)", qualErro(() => totalDeVendas * 2));          // Resposta:ReferenceError Por quê: Está referenciando uma variável que não existe
console.log("2.3)", qualErro(() => JSON.parse("{'nome': 'Ana'}"))); // Resposta:SyntaxError Por quê: JSON so aceita aspas duplas
console.log("2.4)", qualErro(() => "ab".repeat(-1)));            // Resposta:RangeError Por quê: -1 não entra na contagem de vezes
console.log("2.5)", qualErro(() => { const calcular = 10; calcular(); })); // Resposta:TypeError Por quê: Calcular é um tipo Number e não uma função

// ------------------------------------------------------------
// 3) LANÇANDO OS TIPOS CERTOS
// Crie a função dividir(a, b) que:
//   - lança TypeError("Os dois valores devem ser números") se a OU b não
//     for um número finito (use Number.isFinite, seção 8 da aula)
//   - lança RangeError("Divisão por zero") se b for 0
//   - senão, retorna a / b
// ------------------------------------------------------------
function dividir(a, b){
  if(!Number.isFinite(a) || !Number.isFinite(b)) throw new TypeError("Os dois valores devem ser números");
  if(b === 0) throw new RangeError("Divisão por zero");

  return a / b;
}

 console.log("3)", dividir(10, 4)); // esperado: 2.5
 try {
   dividir(10, 0);
 } catch (e) {
   console.log("3)", e.name, "-", e.message); // esperado: RangeError - Divisão por zero
 }

 try {
   dividir("10", 2);
 } catch (e) {
   console.log("3)", e.name, "-", e.message); // esperado: TypeError - Os dois valores devem ser números/
  }

// ------------------------------------------------------------
// 4) ERRO CUSTOMIZADO
// a) Crie a classe ValidacaoError, que estende Error e recebe
//    (mensagem, campo). O name deve ser "ValidacaoError".
// b) Crie a função validarProduto(produto), que recebe um objeto
//    { nome, preco } e lança ValidacaoError quando:
//      - o nome for falsy → mensagem "Nome é obrigatório", campo "nome"
//      - o preço não for um número finito maior que zero →
//        mensagem "Preço deve ser um número maior que zero", campo "preco"
//    Se estiver tudo certo, a função não retorna nada.
// ------------------------------------------------------------
class ValidacaoError extends Error {
   constructor(mensagem, campo) {
     super(mensagem);
     this.name = "ValidacaoError";
     this.campo = campo;
   }
}

function validarProduto(produto){
   if(!produto.nome) throw new ValidacaoError("Nome é obrigatório", "nome");
   if(!Number.isFinite(produto.preco) || produto.preco <= 0) throw new ValidacaoError("Preço deve ser um número maior que zero", "preco");
}

 try {
   validarProduto({ nome: "Arroz", preco: -5 });
 } catch (e) {
   console.log("4)", e instanceof ValidacaoError, e instanceof Error, e.name, e.campo, e.message);
   // esperado: true true ValidacaoError preco Preço deve ser um número maior que zero
 }
 try {
   validarProduto({ preco: 10 });
 } catch (e) {
   console.log("4)", e.campo, e.message); // esperado: nome Nome é obrigatório
 }

// ------------------------------------------------------------
// 5) CAPTURA SELETIVA (capture só o que sabe tratar!)
// Crie a função cadastrar(produto), que:
//   - chama validarProduto(produto)
//   - se passar, retorna "Produto X cadastrado" (X = nome)
//   - se der ValidacaoError, retorna "Erro no campo Y: MENSAGEM"
//   - qualquer OUTRO erro deve continuar subindo (relance com throw)
// ------------------------------------------------------------
function cadastrar(produto){
   try{
     validarProduto(produto);
     return `Produto ${produto.nome} cadastrado`;
   }catch (e) {
     if (e instanceof ValidacaoError){
       return `Erro no campo ${e.campo}: ${e.message}`;
     }else {
       throw e;
     }
   }
}

 console.log("5)", cadastrar({ nome: "Feijão", preco: 9.5 })); // esperado: Produto Feijão cadastrado
 console.log("5)", cadastrar({ nome: "Leite", preco: 0 }));    // esperado: Erro no campo preco: Preço deve ser um número maior que zero
 try {
   cadastrar(null); // validarProduto vai tentar ler a propriedade nome de null
 } catch (e) {
   console.log("5) erro que subiu:", e.name); // esperado: TypeError (não pode ser engolido pelo cadastrar!)
 }

// ------------------------------------------------------------
// 6) CONSERTE O BUG
// O catch abaixo imprime "Erro: undefined" em vez da mensagem.
// Explique a causa e conserte, mudando o MÍNIMO possível.
// Causa: Passamos uma string ao invés de um objeto Error, e string não tem message
// ------------------------------------------------------------
function sacar(saldo, valor) {
  if (valor > saldo) throw new Error("Saldo insuficiente");
  return saldo - valor;
}

try {
  sacar(100, 500);
} catch (e) {
  console.log("6) Erro:", e.message); // esperado depois do conserto: Erro: Saldo insuficiente
}

// ------------------------------------------------------------
// 7) JSON.STRINGIFY: prever
// Escreva exatamente o texto que será impresso.
// Resposta: {"id":1,"cliente":"Ana","total":null,"itens":["Arroz",null,"Feijão"],"observacao":null}
// ------------------------------------------------------------
const pedido = {
  id: 1,
  cliente: "Ana",
  desconto: undefined,
  total: NaN,
  calcularFrete() {
    return 10;
  },
  itens: ["Arroz", undefined, "Feijão"],
  observacao: null,
};

console.log("7)", JSON.stringify(pedido));

// ------------------------------------------------------------
// 8) JSON DE UMA CLASSE
// a) Responda ANTES de rodar: o que a primeira linha imprime? Por quê?
//    Resposta: '{"nome":"Notebook","desconto":500} | Porque o preço é um campo privado, para passar precisamos de um método toJSON
// b) Depois, adicione na classe um método toJSON() para que o JSON
//    tenha nome, preco e precoComDesconto.
// c) Imprima o JSON formatado, com indentação de 2 espaços.
// ------------------------------------------------------------
class ProdutoLoja {
  #preco;

  constructor(nome, preco, desconto = 0) {
    this.nome = nome;
    this.#preco = preco;
    this.desconto = desconto;
  }

  get preco() {
    return this.#preco;
  }

  get precoComDesconto() {
    return this.#preco - this.desconto;
  }

  toJSON(){
    return {nome: this.nome, preco: this.#preco, precoComDesconto: this.precoComDesconto};
  }
}

const notebook = new ProdutoLoja("Notebook", 4000, 500);
console.log("8a)", JSON.stringify(notebook));
console.log(JSON.stringify(notebook, null, 2));

// esperado na letra c (depois da letra b):
// {
//   "nome": "Notebook",
//   "preco": 4000,
//   "precoComDesconto": 3500
// }

// ------------------------------------------------------------
// 9) JSON.PARSE SEGURO
// Crie a função lerJson(texto), que retorna:
//   - { sucesso: true, dados: <o objeto lido> } se o texto for um JSON válido
//   - { sucesso: false, erro: <a mensagem do erro> } se for inválido
// Só o SyntaxError deve ser tratado; qualquer outro erro, relance.
// ------------------------------------------------------------
function lerJson(texto){
  try {
    const dados = JSON.parse(texto);
    return {sucesso: true, dados};
  } catch (e) {
    if(e instanceof SyntaxError){
      return {sucesso: false, erro: e.message};
    }else{
      throw e;
    }
  }
}

 console.log("9)", lerJson('{"nome": "Ana", "idade": 30}'));
// // esperado: { sucesso: true, dados: { nome: 'Ana', idade: 30 } }
 console.log("9)", lerJson("{nome: 'Ana'}").sucesso); // esperado: false
 console.log("9)", lerJson("").erro);                 // esperado: Unexpected end of JSON input

// ------------------------------------------------------------
// 10) O PARSE NÃO DEVOLVE A CLASSE
// a) Responda ANTES de rodar: o que cada linha imprime?
//    10.1: Resposta: false
//    10.2: Resposta: Undefined
// b) Crie a variável `clienteDeVolta`: uma instância de verdade de Cliente,
//    reconstruída a partir de `dados`.
// ------------------------------------------------------------
class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  saudacao() {
    return `Olá, ${this.nome}!`;
  }
}

const json = JSON.stringify(new Cliente("Bia", "bia@email.com"));
const dados = JSON.parse(json);
console.log("10.1)", dados instanceof Cliente);
console.log("10.2)", typeof dados.saudacao);
const clienteDeVolta = new Cliente(dados.nome, dados.email);

 console.log("10b)", clienteDeVolta instanceof Cliente, clienteDeVolta.saudacao()); // esperado: true Olá, Bia!

// ------------------------------------------------------------
// 11) DESAFIO: IMPORTAR PRODUTOS DE UMA "API"
// Crie a função importarProdutos(textoJson), que:
//   1. Faz o JSON.parse do texto. Se o JSON for inválido, lança
//      new Error("Resposta da API inválida", { cause: <o erro original> })
//      Atenção ao escopo de bloco (aula 1.4): uma variável criada com const
//      DENTRO do try não existe fora dele. Pense em onde declarar a variável
//      que vai guardar o resultado do parse.
//   2. Se o resultado não for um array, lança TypeError("Era esperada uma lista")
//      Dica: Array.isArray(valor) retorna true se o valor for um array.
//   3. Valida cada item com validarProduto (exercício 4):
//      - os válidos vão para a lista `validos`
//      - os que lançarem ValidacaoError vão para a lista `erros`, no formato
//        { indice, campo, mensagem }
//      - qualquer outro erro deve subir
//      Dica: o forEach passa o índice como 2º parâmetro do callback:
//        lista.forEach((item, indice) => { ... });
//   4. Retorna { validos, erros }
// ------------------------------------------------------------
const respostaDaApi = `[
  { "nome": "Arroz", "preco": 15.99 },
  { "nome": "", "preco": 9.5 },
  { "nome": "Feijão", "preco": 8.5 },
  { "nome": "Leite", "preco": -3 }
]`;


function importarProdutos(textoJson){
  let resultado;
  const validos = [];
  const erros = [];

  try{
    resultado = JSON.parse(textoJson);
  } catch (e) {
    throw new Error("Resposta da API Inválida", {cause: e});
  }

  if(!Array.isArray(resultado)) throw new TypeError("Era esperada uma lista");

  resultado.forEach((item, indice) => {
    try {
      validarProduto(item);
      validos.push(item);
    }catch (e) {
      if(e instanceof ValidacaoError){
        erros.push({indice: indice, campo: e.campo, mensagem: e.message});
      }else{
        throw e;
      }
    }
  })

  return {validos, erros};
}

 const resultado = importarProdutos(respostaDaApi);
 console.log("11)", resultado.validos.map(p => p.nome)); // esperado: [ 'Arroz', 'Feijão' ]
 console.log("11)", resultado.erros);
 // esperado:
 // [
// //   { indice: 1, campo: 'nome', mensagem: 'Nome é obrigatório' },
// //   { indice: 3, campo: 'preco', mensagem: 'Preço deve ser um número maior que zero' }
// // ]
 try {
   importarProdutos("<html>Erro 500</html>");
 } catch (e) {
   console.log("11)", e.message, "| causa:", e.cause.name); // esperado: Resposta da API inválida | causa: SyntaxError
 }
 try {
   importarProdutos('{ "nome": "Arroz" }');
 } catch (e) {
   console.log("11)", e.name, "-", e.message); // esperado: TypeError - Era esperada uma lista
 }
