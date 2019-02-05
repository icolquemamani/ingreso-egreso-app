import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( private _authService: AuthService ) { }

  // Debe devolver una promesa falso o verdadero
  canActivate() {    
    return this._authService.isAuth();
  }

  canLoad() {
    return this._authService.isAuth()
                            .pipe(
                              take(1)
                            );
  }
}
