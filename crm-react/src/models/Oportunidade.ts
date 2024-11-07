import Cliente from "./Cliente"
import Usuario from "./Usuario"

export default interface Oportunidade{
    id : number
    nome : string
    valor: number
    dataAbertura: string
    dataFechamento: string
    status: number
    cliente: Cliente;
    usuario: Usuario;
}