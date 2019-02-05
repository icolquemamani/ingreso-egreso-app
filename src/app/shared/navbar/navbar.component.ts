import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  
  public $user: any;

  constructor( private _store: Store<AppState> ) { }

  ngOnInit() {
    this.$user = this._store.select('auth')
                     .pipe(
                        filter( auth => auth.user != null ),
                        map( auth => auth.user )
                     );
  }

}
