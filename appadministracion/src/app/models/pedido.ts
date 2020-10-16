import { DetallePedido } from './detallePedido';

export class Pedido{
    _id: string;
    nmbMonto: number;
	blnStatus: boolean;
    idCliente: string;
    idUbicacion:string;
	dteFechaAlta: Date;
    dteFechaEntrega: Date;
}