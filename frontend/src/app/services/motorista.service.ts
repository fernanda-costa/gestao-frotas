import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Motorista } from '../models/motorista.model';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {
  private readonly API_URL = 'http://localhost:8080/api/motoristas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(`${this.API_URL}/${id}`);
  }

  cadastrar(motorista: Motorista): Observable<Motorista> {
    return this.http.post<Motorista>(this.API_URL, motorista);
  }

  editar(id: number, motorista: Motorista): Observable<Motorista> {
    return this.http.put<Motorista>(`${this.API_URL}/${id}`, motorista);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/inativar`, {});
  }
}