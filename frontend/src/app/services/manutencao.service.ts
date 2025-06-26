import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Manutencao } from '../models/manutencao.model';

@Injectable({ providedIn: 'root' })
export class ManutencaoService {

  private readonly API_URL = 'http://localhost:8080/api/manutencoes';

  constructor(private http: HttpClient) { }

  salvar(manutencao: Manutencao): Observable<Manutencao> {
    return this.http.post<Manutencao>(this.API_URL, manutencao);
  }

}