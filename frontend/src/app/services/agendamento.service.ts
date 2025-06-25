import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Motorista } from '../models/motorista.model';
import { S } from '@angular/cdk/keycodes';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {

  private readonly API_URL = 'http://localhost:8080/api/agendamentos';

  constructor(private http: HttpClient) { }

  obterAgendamentosDoUsuario(motoristaId: number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.API_URL}/motorista/${motoristaId}`);
  }

  obterTodosAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.API_URL);
  }

  iniciarViagem(id: number, kmSaida: number, observacoes: string) {
    return this.http.put<Agendamento>(`${this.API_URL}/iniciar/${id}`, { observacoes, kmSaida });
  }

  finalizarViagem(id: number, kmRetorno: number, observacoes: string) {
    return this.http.put<Agendamento>(`${this.API_URL}/finalizar/${id}`, { kmRetorno, observacoes });
  }

  salvar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.API_URL, agendamento);
  }

  obterTodosAgendamentosComFiltros(
    motoristaId?: number,
    status?: string,
    dataInicio?: string,
    dataFinal?: string
  ): Observable<Agendamento[]> {
    let params = new HttpParams();
    console.log(motoristaId, status, dataFinal, dataInicio)

    if (motoristaId != null) {
      params = params.set('motoristaId', motoristaId.toString());
    }
    if (status) {
      params = params.set('status', status);
    }
    if (dataInicio) {
      params = params.set('dataInicio', dataInicio);
    }
    if (dataFinal) {
      params = params.set('dataFinal', dataFinal);
    }

    return this.http.get<Agendamento[]>(this.API_URL, { params });
  }

}