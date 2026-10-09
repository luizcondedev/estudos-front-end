const produtos = [
    { 
        nome: "Batata", 
        preco: 8.00, 
        categoria: "VERDURA"
    }, 
    {
        nome: "Coca Cola", 
        preco: 13.99, 
        categoria: "BEBIDA"
    },
    {
        nome: "Arroz 2KG", 
        preco: 15.99, 
        categoria: "GRAOS"
    },
    {
        nome: "Lasanha Congelada", 
        preco: 20.99, 
        categoria: "CONGELADOS"
    },
    {
        nome: "Notebook Gamer Acer", 
        preco: 7689.98, 
        categoria: "ELETRONICOS"
    }
]

const valorAcima50 = produtos.filter(p => p.preco >= 50);
const nomesEmMaiusculo = produtos.map(p => p.nome.toUpperCase());
const valorTotal = produtos.reduce((total, p) => total + p.preco, 0);

const aplicarDesconto = (produto, desconto) => {
    const precoComDesconto = produto.preco - ((produto.preco * desconto) / 100);
    return { ...produto, preco: precoComDesconto}
}

console.log(produtos)
console.log(valorAcima50)   
console.log(nomesEmMaiusculo)
console.log(valorTotal)
console.log(aplicarDesconto(produtos[0], 50))