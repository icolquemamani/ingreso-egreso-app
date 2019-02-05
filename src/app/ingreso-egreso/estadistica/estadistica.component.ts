import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  public ingresos: number;
  public egresos: number;
  public countIngresos: number;
  public countEgresos: number;
  private subscription: Subscription = new Subscription();

  //charts 
  public doughnutChartLabels:string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData:number[] = [ 0, 0 ];
 
  constructor( private _store:Store<AppState> ) { }

  ngOnInit() {
    this.subscription = this._store.select('ingresoEgreso')
        .subscribe( ingresoEgreso => {
          this.contarIngresoEgreso( ingresoEgreso.items );
        });
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {
    this.egresos = this.ingresos = 0;
    this.countEgresos = this.countIngresos = 0;
    
    items.forEach( item => {
      if(item.tipo === 'ingreso' ) {
        this.countIngresos++;
        this.ingresos += item.monto;
      } else {
        this.countEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [ this.ingresos, this.egresos ];
  }
}
