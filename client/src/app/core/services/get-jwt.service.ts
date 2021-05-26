import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetJwtService implements CanActivate {
  private key = 'User-Token';
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.getToken();
    if (token) {
      return true;
    }
    return this.router.parseUrl('/Login');
  }
  getToken(): string | null {
    return sessionStorage.getItem(this.key);
  }
  setToken(token: string): void {
    sessionStorage.setItem(this.key, token);
  }
  getId(): string | null {
    return sessionStorage.getItem('user-id');
  }
  setId(id: string): void {
    sessionStorage.setItem('user-id', id);
  }
}
