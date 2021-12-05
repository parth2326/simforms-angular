import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router){

    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      // handle your auth error or rethrow
      if (err.status === 401 || err.status === 403) {
          localStorage.clear();
          this.router.navigateByUrl(`/`);
      }

      return throwError(err);
  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const token: string = localStorage.getItem('authKey');

      if (token) {
          request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }

      return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));

    }
}
