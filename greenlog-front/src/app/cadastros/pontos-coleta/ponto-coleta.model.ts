import { Bairros } from "../../padronizacao/modal/modal-cadastro-bairros/cadastro.bairros.model";

export interface PontoColeta {
  id?: number; 
  bairro: Bairros | null;
  nome: string;
  responsavel: string;
  telefoneResponsavel?: string; 
  emailResponsavel?: string; 
  endereco?: string;
  horarioFuncionamento?: string;
  tiposResiduosAceitos: string[];
}