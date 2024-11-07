import Categoria from "./Categoria";
import Usuario from "./Usuario";

export default interface Produto {
    id: number;
    nome: string;
    preco: number;
    calorias : number
    proteinas : number
    foto: string;
    categoria: Categoria;
    usuario: Usuario;
}