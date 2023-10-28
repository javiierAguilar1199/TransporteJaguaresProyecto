import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { Auth } from '../../models/auth.model';
import { TokenServiceService } from './token-service.service';

import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

  private apiUrl = `${environment.API_URL}Login/`;
  private user: BehaviorSubject<Auth>;
  public user$: Observable<Auth>;

  remember = 0;

  constructor(private http: HttpClient, private tokenService: TokenServiceService) {
    this.remember = Number(localStorage.getItem('remember') || '0');
    if (this.remember == 1) {
      this.user = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('userInfo') || '{}'));
    } else {
      this.user = new BehaviorSubject<Auth>(JSON.parse(sessionStorage.getItem('userInfo') || '{}'));
    }
    this.user$ = this.user.asObservable();
  }

  public get currentUserValue(): Auth {
    return this.user.value;
  }

  public get GetRemember(): number {
    return Number(localStorage.getItem('remember') || '0');
  }
  
  login(pId_usuario: string, pContrasenia: string, remember?: boolean) {
    return this.http
      .post<Auth>(`${this.apiUrl}InicioSesion`, { pId_usuario, pContrasenia })
      .pipe(tap((response) => {
        if (response.ok == true) {
          localStorage.setItem('remember', remember == true ? '1': '0');
          if (remember == true) {
            localStorage.setItem('userInfo', JSON.stringify(response));
          } else {
            sessionStorage.setItem('userInfo', JSON.stringify(response));
          }
          this.tokenService.saveToken(response.token);
          this.user.next(response);

          //se llama metodo de vidal por si es ocupado mas adelante
          this.getProfile();
        }
      })
      );
  }

    // Método para renovar el token
    renewToken(): Observable<Auth> {
      const token = this.tokenService.getToken();
      return this.http.post<Auth>(`${this.apiUrl}RenewToken`, { token }).pipe(
        tap((response) => {
          if (response.ok === true) {
            this.tokenService.saveToken(response.token);
          }
        })
      );
    }

  
  getProfile() {
    return this.http
      .get<Auth>(`${this.apiUrl}Verificacion`)
      .pipe(tap((user) => this.user.next(user)));
  }


  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.user.next(null!);
  }
}
