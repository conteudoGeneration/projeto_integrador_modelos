import Colaborador from "./Colaborador"

export default interface Departamento{
    id: number
    descricao: string
    icone: string
    colaborador?: Colaborador
}