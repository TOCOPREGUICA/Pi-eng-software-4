export interface PontoColeta {
  id?: number; 
  bairroId: number | null;
  nome: string;
  responsavel: string;
  telefoneResponsavel?: string; 
  emailResponsavel?: string; 
  endereco?: string;
  horarioFuncionamento?: string;
  tiposResiduosAceitos: string[];
}