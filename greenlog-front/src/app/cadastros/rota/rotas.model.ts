import { Caminhao } from "../caminhao/caminhao.service";

export class Rota {
  id?: number;
  caminhao!: Caminhao; // <- objeto inteiro
  data!: string;
  origem!: string;
  destino!: string;

  constructor(caminhao: Caminhao, data: string, origem: string, destino: string) {
    this.caminhao = caminhao;
    this.data = data;
    this.origem = origem;
    this.destino = destino;
  }
}
