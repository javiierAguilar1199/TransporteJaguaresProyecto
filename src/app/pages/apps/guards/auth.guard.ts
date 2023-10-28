import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenServiceService,
    private router: Router,
    private auth: AuthServiceService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken();
    return this.auth.user$.pipe(
      map((user) => {
       // console.log(user);
        if ("id_Usuario" in user) {
          if (token) {
            return true;
          } else {
            this.router.navigate(['/authentication/boxed-login']);
            return false;
          }
        } else {
        this.router.navigate(['/authentication/boxed-login']);
          return false;
        }
      }),
    );
  }
}
