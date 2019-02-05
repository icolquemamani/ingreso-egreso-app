import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { map } from 'rxjs/operators';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {
  $items: any;

  constructor( private _store:Store<AppState>,
               private _IEService: IngresoEgresoService ) { }

  ngOnInit() {
    this.$items = this._store.select('ingresoEgreso').pipe(map( data => data.items ));
  }

  borrarItem( item: IngresoEgreso ){
    this._IEService.borrarIngresoEgreso( item.uid ).then(() => {
      Swal.fire({
        title: 'Eliminado',
        text:  item.descripcion,
        type: 'info'
      })
    });
  }

}
