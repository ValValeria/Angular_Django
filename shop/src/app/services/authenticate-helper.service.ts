import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthenticateHelperService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const reqAuth = req.clone({
      headers: new HttpHeaders({
        Auth: localStorage.getItem('auth') || '{}'
      })
    });

    return next.handle(reqAuth);
  }
}

