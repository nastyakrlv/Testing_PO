import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return !authService.isLoggedIn();
};
