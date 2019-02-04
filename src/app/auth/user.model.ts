export class User {
    public nombre: string;
    public email: string;
    public uid: string;

    constructor( dataUser: DataUser ) {
        this.nombre = dataUser ? dataUser.nombre : null;
        this.email  = dataUser ? dataUser.email : null;
        this.uid    = dataUser ? dataUser.uid : null;
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

interface DataUser {
    nombre: string;
    email: string;
    uid: string;
}