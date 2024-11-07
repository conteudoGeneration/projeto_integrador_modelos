import Produto from "./Produto";

export default interface Categoria {
    id: number;
    descricao: string;
    icone: string;
    produto?: Produto[];
}