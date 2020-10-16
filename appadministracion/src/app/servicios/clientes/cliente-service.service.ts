import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Cliente} from '../../models/cliente';
import { Ubicacion } from 'src/app/models/ubicacion';
@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {


  readonly  urlApis = 'https://appadministracion.herokuapp.com/api';
  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get(`${this.urlApis}/clientes`);
  }

  getClienteEspecifico(cliente:Cliente){
    return this.http.get(`${this.urlApis}/clientes/${cliente._id}`)
  }

  deleteCliente(cliente: Cliente){
    return this.http.delete(`${this.urlApis}/clientes/${cliente._id}`)
  }

  
/*
  postUbicacion(ubicacion: Ubicacion){
    console.log(ubicacion);
    let idCliente = "5f13d86d95ca05b00c7941f5";
    return this.http.post(`${this.urlApis}/clientes/${idCliente}/ubicaciones`, ubicacion);
  }*/
}
