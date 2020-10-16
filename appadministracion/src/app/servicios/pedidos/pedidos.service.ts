import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Pedido } from 'src/app/models/pedido';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  readonly  urlApis = 'https://appadministracion.herokuapp.com/api';
  readonly urlLocal = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getPedidos(){
    return this.http.get(`${this.urlApis}/pedidos`)
  }

  postPedido(pedido: Pedido){
    return this.http.post(`${this.urlApis}/pedidos`,pedido );
  }

  getEspecifycPedido(idPedido:string){
    return this.http.get(`${this.urlApis}/pedidos/${idPedido}`)
  }

  entregarPedido(idPedido: string, pedido: Pedido){
    return this.http.put(`${this.urlApis}/pedidos/${idPedido}`, pedido )
  }

  

}
