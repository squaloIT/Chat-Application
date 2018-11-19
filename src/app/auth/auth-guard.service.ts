import { CanLoad, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
   return !this.authService.isAuthenticated();
  }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
