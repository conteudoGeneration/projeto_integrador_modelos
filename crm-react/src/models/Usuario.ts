import Oportunidade from "./Oportunidade";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  oportunidade?: Oportunidade | null;
}
