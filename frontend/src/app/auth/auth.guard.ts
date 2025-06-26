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
      if (this.auth.perfilUsuario === 'ADMINISTRADOR') {
        this.router.navigate(['/admin']);
      } else if (this.auth.perfilUsuario === 'MOTORISTA') {
        this.router.navigate(['/motorista']);
      }
      return false;
    }

    if (!estaAutenticado && rotaDestino !== 'login') {
      this.router.navigate(['/login']);
      return false;
    }

    const perfisPermitidos = route.data?.['perfis'];
    if (perfisPermitidos && !perfisPermitidos.includes(this.auth.perfilUsuario)) {
      if (this.auth.perfilUsuario === 'ADMINISTRADOR') {
        this.router.navigate(['/admin']);
      } else if (this.auth.perfilUsuario === 'MOTORISTA') {
        this.router.navigate(['/motorista']);
      }
      return false;
    }

    return true;
  }
}
