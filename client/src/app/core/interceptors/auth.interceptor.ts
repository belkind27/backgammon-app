import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetJwtService } from '../services/get-jwt.service';

@Injectable()
export class SetHeadersInterceptor implements HttpInterceptor {
  constructor(private jwtService: GetJwtService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        this.jwtService.getToken() as string
      ),
    });
    return next.handle(authReq);
  }
}
