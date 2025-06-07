import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rua, RuaUPDATE } from './rua.model';

@Injectable({
  providedIn: 'root'
})
export class RuaService {
    
  private apiUrl = 'http://localhost:8080/api/conexoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Rua[]> {
    return this.http.get<Rua[]>(this.apiUrl);
  }

  salvar(rua: Rua): Observable<Rua> {
    return this.http.post<Rua>(this.apiUrl, this.padronizacao(rua));
  }

  atualizar(id: number, rua: Rua): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, this.padronizacao(rua));
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  padronizacao(rua: Rua): RuaUPDATE {
    return {
      nome: rua.nome,
      origemId: rua.origem.id!,
      destinoId: rua.destino.id!,
      distancia: rua.distancia,
    };
  }
}