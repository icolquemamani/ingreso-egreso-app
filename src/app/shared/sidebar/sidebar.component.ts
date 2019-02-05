import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public $user: any;

  constructor( private _authService: AuthService,
               private _IEService: IngresoEgresoService,
               private _store: Store<AppState> ) { }

  ngOnInit() {
    this.$user = this._store.select('auth')
                     .pipe(
                        filter( auth => auth.user != null ),
                        map( auth => auth.user )
                     );
  }

  logout() {
    this._authService.logout();
    this._IEService.cancelSubscriptions();
  }
}
