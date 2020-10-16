import { Ubicacion } from './ubicacion';
import { Comentario } from './comentariosCliente';

export class Cliente{
    
    _id: string;
	strNombre: string;
	blnActivo: boolean;
    strApellidos: string;
    strEmail: string;
    strPassword: string;
    strTelefono: string;
    aJsUbicacion: [Ubicacion];
    aJsnComentarios:[Comentario];


}