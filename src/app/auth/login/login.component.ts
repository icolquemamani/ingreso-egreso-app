import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(private _authService: AuthService,
              private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('ui')
        .subscribe(ui => this.cargando = ui.isLoading );
  }

  onSubmit( data: any ) {
    this._authService.login(data.email, data.password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
