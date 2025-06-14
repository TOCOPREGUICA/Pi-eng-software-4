import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const usuario = localStorage.getItem('usuarioLogado');

      if (usuario) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
