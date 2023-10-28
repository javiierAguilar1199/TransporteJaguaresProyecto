import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


import { TokenServiceService } from 'src/app/services/token-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  request = this.addToken(request);

    return next.handle(request);
  }
  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    if (token) {
      const authrequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token).set('Content-Type', 'application/json'),
      });
      request = authrequest;
    } else {
      return request;
    }
    return request;
  }
}
