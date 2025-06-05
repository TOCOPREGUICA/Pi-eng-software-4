export class Rota {
  constructor(
    public caminhao: string,
    public data: string,
    public origem: string,
    public destino: string,
    public id?: number
  ) {}
}