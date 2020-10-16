import { Injectable } from '@angular/core';
import {HttpClient  } from "@angular/common/http";
import { Comentario } from 'src/app/models/comentariosCliente';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  readonly  urlApis = 'https://appadministracion.herokuapp.com/api';
  readonly urlLocal = 'http://localhost:3000/api';
  constructor(private http: HttpClient,
             ) { 



             }
  getAllCommentsByClient(idCliente: string){
    return this.http.get(`${this.urlApis}/clientes/${idCliente}/comentarios`);
  }

  
  getEspecyficComment(idCliente:string, idComentario:string){
    return this.http.get(`${this.urlApis}/clientes/${idCliente}/comentarios/${idComentario}`);
  }

  answerComment(idCliente:string, adminResponse:Comentario, idComentario:string){
    return this.http.put(`${this.urlApis}/clientes/${idCliente}/comentarios/${idComentario}`,adminResponse);
  }

}
