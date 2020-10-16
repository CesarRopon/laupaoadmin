import { User } from './user';

export class Admin extends User{
    _id:string;
    strNombre:string;
    strApellidos:string;
    strTelefono:string;
    nmbLatitud:number;
    nmbLongitud:number;

    constructor(){
        super()
        
    }

}