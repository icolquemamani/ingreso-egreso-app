import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _afAuth: AngularFireAuth,
               private _router: Router,
               private _afDB: AngularFirestore ) { }

  initAuthListener() {
    this._afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log('user', fbUser)
    });
  }

  crearUsuario( email, nombre, password ) {
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
                      });
                })
                .catch(err => {
                  console.error(err);
                  Swal.fire({
                    title: 'Register Error!',
                    text: err.message,
                    type: 'error',
                    confirmButtonText: 'OK'
                  });
                });
  }

  login( email: string, password: string ) {
    this._afAuth.auth
                .signInWithEmailAndPassword( email, password )
                .then(resp => {
                  console.log(resp);
                  this._router.navigate(['/'])
                })
                .catch(err => {
                  console.error(err);
                  Swal.fire({
                    title: 'Login Error!',
                    text: err.message,
                    type: 'error',
                    confirmButtonText: 'OK'
                  });
                });
  }

  logout() {
    this._afAuth.auth.signOut().then(resp => {
      console.log(resp);
      this._router.navigate(['/login']);
    })
    .catch(err => {
      console.error(err);
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
}
