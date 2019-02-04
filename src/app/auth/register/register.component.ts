import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( private _authService: AuthService ) { }

  ngOnInit() {
  }

  onSubmit( data: any ) {
    console.log(data)
    this._authService.crearUsuario( data.email, data.nombre, data.password);
  }
}
