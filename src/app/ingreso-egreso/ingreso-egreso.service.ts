import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  private _subsStore: Subscription = new Subscription();
  private _subsItems: Subscription = new Subscription();

  constructor( private _afDB: AngularFirestore,
               private _authService: AuthService,
               private _store:Store<AppState> ) { }

  initIngresoEgresoItems() {
    this._subsStore = this._store.select('auth')
        .pipe(
          filter( auth => auth.user != null )
        )
        .subscribe( auth => {
          console.log(auth.user);
          this.ingresoEgresoItems(auth.user.uid);
        });
  }

  private ingresoEgresoItems( uid: string ) {
    this._subsItems = this._afDB.collection(`${ uid }/ingresos-egresos/items`)
              .snapshotChanges()
              .pipe(
                map( docData => {
                  return docData.map( doc => {
                    return {
                      uid: doc.payload.doc.id,
                      ...doc.payload.doc.data()
                    };
                  });
                })
              )
              .subscribe( (items: any) => {
                this._store.dispatch( new SetItemsAction(items) );
              })
  }

  cancelSubscriptions() {
    this._subsStore.unsubscribe();
    this._subsItems.unsubscribe();
    this._store.dispatch( new UnsetItemsAction() );
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    const user = this._authService.getUsuario();

    return this._afDB.doc(`${ user.uid }/ingresos-egresos`)
               .collection('items').add({ ...ingresoEgreso });
        
  }

  borrarIngresoEgreso( uid: string ) {
    const user = this._authService.getUsuario();

    return this._afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`)
                     .delete();
  }
}
