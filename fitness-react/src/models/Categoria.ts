import Exercicio from "./Exercicio";

export default interface Categoria {
    id: number;
    descricao: string;
    icone: string;
    exercicio?: Exercicio[];
}