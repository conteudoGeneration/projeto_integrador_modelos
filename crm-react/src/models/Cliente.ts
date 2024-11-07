import Oportunidade from "./Oportunidade"

export default interface Cliente{
    id : number
    nome : string
    email : string
    foto : string
    historico : string
    oportunidade?: Oportunidade | null;
}