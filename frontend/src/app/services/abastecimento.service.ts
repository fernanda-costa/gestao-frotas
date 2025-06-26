import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agendamento } from '../models/agendamento.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Abastecimento } from '../models/abastecimento.model';

@Injectable({ providedIn: 'root' })
export class AbastecimentoService {

  private readonly API_URL = 'http://localhost:8080/api/abastecimentos';

  constructor(private http: HttpClient) { }

  salvar(abastecimento: Abastecimento): Observable<Abastecimento> {
    return this.http.post<Abastecimento>(this.API_URL, abastecimento);
  }

}