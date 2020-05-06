import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class AuthticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authenticationService.token.length) {
      const cloneRequest = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.authenticationService.token}`
        ),
      });
      return next.handle(cloneRequest);
    }

    return next.handle(req);
  }
}
