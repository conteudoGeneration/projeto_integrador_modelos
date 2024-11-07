import Departamento from "./Departamento"

export default interface Colaborador{
    id: number
    nome: string
    email: string
    foto: string
    cargo: string
    salario: number
    horasMensais: number
    dependentes: number
    departamento: Departamento
}