import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipo } from 'src/app/models/tipos';
@Injectable({
  providedIn: 'root'
})
export class TipopostService {

  readonly urlApi = 'https://appadministracion.herokuapp.com/api';
  readonly ulrLocal = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  

  obtenerTipPost(){
    return this.http.get(`${this.urlApi}/tipospostre`);
  }

  changeStatusPost(idTipo: string){
    return this.http.delete(`${this.urlApi}/tipospostre/${idTipo}`)
  }

  addType(tipo:Tipo){
    return this.http.post(`${this.urlApi}/tipospostre`, tipo)
  }

  updateType(idTipo, tipo:Tipo){
    return this.http.put(`${this.urlApi}/tipospostre/${idTipo}`, tipo);
  }

  getEspecyfic(idTipo: string){
    return this.http.get(`${this.urlApi}/tipospostre/${idTipo}`)
  }
  


}
