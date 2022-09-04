import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authenticationService.isLoggedIn().pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/user/login');
        }
      })
    );
  }
}
