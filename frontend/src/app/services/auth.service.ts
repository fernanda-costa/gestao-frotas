import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  constructor() {
    const data = localStorage.getItem('usuario');
    if (data) {
      this.usuarioSubject.next(JSON.parse(data));
    }
  }

  login(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
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

  get tipoUsuario(): string | null {
    return this.usuario?.tipo || null;
  }

  get estaAutenticado(): boolean {
    return !!this.usuario;
  }
}
