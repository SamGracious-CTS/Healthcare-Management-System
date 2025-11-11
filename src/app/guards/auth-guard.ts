import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.parseUrl('/'); // not logged in -> redirect to login
  }

  const allowedRoles = (route.data && (route.data as any).roles) as string[] | undefined;
  if (!allowedRoles || allowedRoles.length === 0) {
    return true; // no role restriction on this route
  }

  const role = authService.getUserRole();
  return role && allowedRoles.includes(role)
    ? true
    : router.parseUrl('/'); // unauthorized -> redirect (adjust path if you have an Unauthorized page)
};
