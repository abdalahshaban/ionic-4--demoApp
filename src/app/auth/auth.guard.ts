import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authServ: AuthService, private router: Router) {

  }
  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authServ.userIsAuthenticate) {
      this.router.navigateByUrl('/auth')
    } else {
      return this.authServ.userIsAuthenticate;
    }
  }
}

