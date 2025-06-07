import { Bairro } from "../bairro/bairro.model";

export interface Rua {
  id?: number;
  nome: string;
  origem: Bairro;
  destino: Bairro;
  distancia: number;
}