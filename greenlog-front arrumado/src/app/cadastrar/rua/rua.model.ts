import { Interface } from "readline";
import { Bairro } from "../bairro/bairro.model";

export interface Rua {
  id?: number;
  nome: string;
  origem: Bairro;
  destino: Bairro;
  distancia: number;
}

export interface RuaUPDATE{
  nome: String
  origemId: Number;
  destinoId: Number;
  distancia: Number
}