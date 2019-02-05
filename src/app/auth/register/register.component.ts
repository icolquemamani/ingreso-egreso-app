import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  cargando: boolean;
  subscription: Subscription = new Subscription();

  constructor( private _authService: AuthService,
               private _store: Store<AppState> ) { }

  ngOnInit() {
    this.subscription = this._store.select('ui')
        .subscribe( ui => {
          this.cargando = ui.isLoading;
    });
  }

  onSubmit( data: any ) {
    this._authService.crearUsuario( data.email, data.nombre, data.password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
