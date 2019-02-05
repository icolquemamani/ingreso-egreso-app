import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
// import { AppState } from '../app.reducers';
import { AppState } from './ingreso-egreso.reducers';

import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor( private _ingresoEgresoService: IngresoEgresoService,
               private _store: Store<AppState> ) { }

  ngOnInit() {
    this.loadingSubs = this._store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required ),
      'monto': new FormControl(0, Validators.min(0) )
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    this._store.dispatch( new ActivarLoadingAction());

    const ingresoEgreso: IngresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });

    this._ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
        .then(() => {
          this._store.dispatch( new DesactivarLoadingAction());

          Swal.fire({
            title: 'Creado',
            text: ingresoEgreso.descripcion,
            type: 'success',
            confirmButtonText: 'OK'
          });
          this.forma.reset({
            monto: 0
          });
        }, err => {
          this._store.dispatch( new DesactivarLoadingAction());
        });
  }
}
