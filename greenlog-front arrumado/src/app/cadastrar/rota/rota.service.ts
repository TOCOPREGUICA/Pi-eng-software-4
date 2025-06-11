import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CaminhoDTO, Rota, RotaUPDATE } from "./rota.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RotaService {
    
  private readonly apiUrl = 'http://localhost:8080/api/rotas';
  private readonly caminhoUrl = 'http://localhost:8080/api/caminhos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Rota[]> {
    return this.http.get<Rota[]>(this.apiUrl);
  }

  salvar(rota: Rota): Observable<RotaUPDATE> {
    return this.http.post<RotaUPDATE>(this.apiUrl, this.padronizacao(rota));
  }

  atualizar(id: number, rota: Rota): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, rota);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  calcularRota(destinoId: number): Observable<CaminhoDTO> {
    return this.http.get<CaminhoDTO>(`${this.caminhoUrl}/menor-caminho`, {
      params: { destinoId }
    });
  }
  padronizacao(rota: Rota): RotaUPDATE {
    return {
      caminhaoId: { id: rota.caminhao!.id },
      destinoId: { id: rota.destino!.id },
      tipoResiduo: rota.tipoResiduo
    };
  }
}