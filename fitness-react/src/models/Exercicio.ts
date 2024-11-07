import Categoria from "./Categoria";

export default interface Exercicio {
  id: number
  nome: string
  tempo: number
  serie: number
  repeticao: number
  peso: number
  descanso: number
  foto: string
  categoria: Categoria
}