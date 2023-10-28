import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenServiceService {
  constructor() {}
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  deleteToken() {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem('token');
  }
}
