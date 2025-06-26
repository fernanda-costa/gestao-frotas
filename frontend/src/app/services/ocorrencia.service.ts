import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ocorrencia } from '../models/ocorrencia.model';

@Injectable({ providedIn: 'root' })
export class OcorrenciaService {

  private readonly API_URL = 'http://localhost:8080/api/ocorrencias';

  constructor(private http: HttpClient) { }

  salvar(ocorrencia: Ocorrencia): Observable<Ocorrencia> {
    return this.http.post<Ocorrencia>(this.API_URL, ocorrencia);
  }

  listarTodos(): Observable<Ocorrencia[]> {
    return this.http.get<Ocorrencia[]>(this.API_URL);
  }

}