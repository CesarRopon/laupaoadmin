import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export class Comentario{
    _id:string;
    idAdmin: string;
    idCliente: string;
    strComentario:string;
    dteFechaComentario: string;
    blnStatus:boolean;
    dteFechaContestacion:string;
    strContestacion: string;
}