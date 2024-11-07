import Viagem from "./Viagem";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  celular: string;
  foto: string;
  viagem?: Viagem;
}
