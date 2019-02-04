export class User {
    public nombre: string;
    public email: string;
    public uid: string;

    constructor( nombre: string, email: string, uid: string ) {
        this.nombre = nombre;
        this.email  = email;
        this.uid    = uid;
    }   

    // get nombre() {
    //     return this._nombre;
    // }

    // set nombre( nombre: string) {
    //     this._nombre = nombre;
    // }

    // get email() {
    //     return this._email;
    // }

    // set email( email: string) {
    //     this._email = email;
    // }

    // get uid() {
    //     return this._uid;
    // }

    // set uid( uid: string) {
    //     this._uid = uid;
    // }
}   