import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService); 
    const localToken = !!localStorage.getItem('token'); // Check if token exists in localStorage
    if (!localToken && authService.isAuthenticatedSubject.value === false) {
        console.warn('Access denied - User not authenticated');
        return false; // Prevent access if not authenticated
    }
    console.log('User is authenticated, access granted');
  return true;
};
