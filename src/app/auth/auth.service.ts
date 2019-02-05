import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, subscribeOn } from 'rxjs/operators';

import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userSubscription: Subscription = new Subscription();
  private _ususario: User;

  constructor( private _afAuth: AngularFireAuth,
               private _router: Router,
               private _afDB: AngularFirestore,
               private _store: Store<AppState> ) { }

  initAuthListener() {
    this._afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if ( fbUser ) {
        this._userSubscription = this._afDB.doc(`${ fbUser.uid }/usuario`)
                  .valueChanges()
                  .subscribe((usuarioObj:any) => {
                    const user = new User( usuarioObj );
                    this._store.dispatch( new SetUserAction(user) );
                    this._ususario = user;
                  });
      } else {
        this._ususario = null;
        this._userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario( email, nombre, password ) {
    this._store.dispatch( new ActivarLoadingAction() );
    this._afAuth.auth
                .createUserWithEmailAndPassword( email, password )
                .then(resp => {
                  
                  const user: User = {
                    nombre: nombre, 
                    email : resp.user.email,
                    uid   : resp.user.uid
                  };
                 
                  this._afDB.doc(`${ user.uid }/usuario`)
                      .set( user)
                      .then(() => {
                        this._router.navigate(['/'])
                        this._store.dispatch( new DesactivarLoadingAction() );
                      });
                })
                .catch(err => {
                  console.error(err);
                  this._store.dispatch( new DesactivarLoadingAction() );
                  Swal.fire({
                    title: 'Register Error!',
                    text: err.message,
                    type: 'error',
                    confirmButtonText: 'OK'
                  });
                });
  }

  login( email: string, password: string ) {
    this._store.dispatch( new ActivarLoadingAction() );
    this._afAuth.auth
                .signInWithEmailAndPassword( email, password )
                .then(resp => {
                  console.log(resp);
                  this._router.navigate(['/'])
                  this._store.dispatch( new DesactivarLoadingAction() );
                })
                .catch(err => {
                  console.error(err);
                  this._store.dispatch( new DesactivarLoadingAction() );
                  Swal.fire({
                    title: 'Login Error!',
                    text: err.message,
                    type: 'error',
                    confirmButtonText: 'OK'
                  });
                });
  }

  logout() {
    this._afAuth.auth.signOut()
        .then(resp => {
          this._store.dispatch( new UnsetUserAction() );
          this._router.navigate(['/login']);
        })
        .catch(err => {
          Swal.fire({
            title: 'Logout Error!',
            text: err.message,
            type: 'error',
            confirmButtonText: 'OK'
          });
        });
  }

  isAuth() {
    return this._afAuth.authState.pipe(
        map( ( fbUser: any ) => {
          if( fbUser == null ) {
            this._router.navigate(['/login']);
          }
          return fbUser =! null;
        })
      ) 
  }

  getUsuario() {
    return { ...this._ususario };
  }
}
