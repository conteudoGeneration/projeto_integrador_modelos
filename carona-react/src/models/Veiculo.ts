import Viagem from "./Viagem"

export default interface Veiculo{
    id: number
    modelo: string
    placa: string
    foto: string
    viagem?: Viagem;
}