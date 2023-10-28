import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root',
})

export class secretariGuard implements CanActivate {

  constructor(
    private router: Router, private auth: AuthServiceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      map((user) => {
       // console.log(user?.roles)
        if (user?.roles.includes('Secretaria')) {
          return true;
        } else {
        this.router.navigate(['/home']);
          return false;
        }
      }),
    );
  }
}

