import Usuario from "./Usuario"
import Veiculo from "./Veiculo"

export default interface Oportunidade{
    id: number
    partida: string
    destino: string
    dataPartida: string
    valor: number
    distancia: number
    velocidadeMedia: number
    tempoEstimado?: string
    veiculo: Veiculo
    usuario: Usuario
}