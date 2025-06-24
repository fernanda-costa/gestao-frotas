// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const estaAutenticado = this.auth.estaAutenticado;
    const rotaDestino = route.routeConfig?.path;
    if (rotaDestino === 'login' && estaAutenticado) {

      if (this.auth.tipoUsuario == 'ADMIN') {
        this.router.navigate(['/admin']);
        return false;
      }

      if (this.auth.tipoUsuario == 'MOTORISTA') {
        this.router.navigate(['/motorista']);
        return false;
      }

      return false;

    }

    if (!estaAutenticado && rotaDestino !== 'login') {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
