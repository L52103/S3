import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const estaLogueado = localStorage.getItem('logueado') === 'true';
  if (!estaLogueado) {
    window.location.href = '/login';
  }
  return estaLogueado;
};
