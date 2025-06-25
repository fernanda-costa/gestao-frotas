import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  private readonly API_URL = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {
    const data = localStorage.getItem('usuario');
    if (data) {
      this.usuarioSubject.next(JSON.parse(data));
    }
  }

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.API_URL, { email, senha }).pipe(
      tap(usuario => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuarioSubject.next(usuario);
      })
    );
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }

  get usuarioLogado$(): Observable<Usuario | null> {
    return this.usuarioSubject.asObservable();
  }

  get usuario(): Usuario | null {
    return this.usuarioSubject.value;
  }

  get perfilUsuario(): string | null {
    return this.usuario?.perfil || null;
  }

  get estaAutenticado(): boolean {
    return !!this.usuario;
  }
}
