import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DetallePedido } from 'src/app/models/detallePedido';
@Injectable({
  providedIn: 'root'
})
export class DetallepedidoService {

  readonly urlApis = 'https://appadministracion.herokuapp.com/api';
  readonly urlLocal = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getDetalles(idPedido:string){
    return this.http.get(`${this.urlApis}/pedidos/${idPedido}/detalles`);
  }

  insertDetalle(idPedido:string, detalle: DetallePedido){
    return this.http.post(`${this.urlLocal}/pedidos/${idPedido}/detalles`,detalle);
  }

  updateDetalle(){

  }

  deleteDetalle(idPedido: string, idDetallePedido: string){
    return this.http.delete(`${this.urlLocal}/pedidos/${idPedido}/detalles/${idDetallePedido}`);
  }
}
