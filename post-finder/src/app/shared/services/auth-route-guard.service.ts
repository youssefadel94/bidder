import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._authService.isAuthenticated() && state.url != "/auth/login") {
      
      
      this._router.navigate(['/auth/login']);
      return false;
    }
    else {
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}
