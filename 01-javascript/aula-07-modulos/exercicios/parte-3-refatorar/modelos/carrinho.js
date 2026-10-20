import {formatarMoeda} from "../utils/formatacao.js";

export class Carrinho {
    #itens = [];

    adicionar(produto, quantidade = 1) {
        if (quantidade <= 0) throw new RangeError("Quantidade deve ser maior que zero");

        const existente = this.#itens.find(item => item.produto.id === produto.id);
        if (existente) {
            existente.quantidade += quantidade;
        } else {
            this.#itens.push({ produto, quantidade });
        }
    }

    get total() {
        return this.#itens.reduce((soma, item) => soma + item.produto.preco * item.quantidade, 0);
    }

    get totalFormatado() {
        return formatarMoeda(this.total);
    }

    get itens() {
        return this.#itens.map(item => ({ ...item }));
    }
}