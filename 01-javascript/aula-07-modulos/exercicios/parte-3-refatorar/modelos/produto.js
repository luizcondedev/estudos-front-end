import {formatarMoeda} from "../utils/formatacao.js";

function validarPreco(preco) {
    if (!Number.isFinite(preco) || preco <= 0) {
        throw new RangeError("Preço deve ser um número maior que zero");
    }
}

export class Produto {
    static #contador = 0;
    #preco;

    constructor({nome, preco}) {
        this.preco = preco; // passa pelo setter, que valida
        Produto.#contador++;
        this.id = Produto.#contador;
        this.nome = nome;
    }

    get preco() {
        return this.#preco;
    }

    set preco(valor) {
        validarPreco(valor);
        this.#preco = valor;
    }

    get precoFormatado() {
        return formatarMoeda(this.#preco);
    }

    toString() {
        return `${this.nome} (${this.precoFormatado})`;
    }

    static total() {
        return Produto.#contador;
    }
}