import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Veiculo } from '../models/veiculo.models';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private readonly API_URL = 'http://localhost:8080/api/veiculos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.API_URL}/${id}`);
  }

  cadastrar(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.API_URL, veiculo);
  }

  editar(id: number, veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.API_URL}/${id}`, veiculo);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/inativar`, {});
  }
}