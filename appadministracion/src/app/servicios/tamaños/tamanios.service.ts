import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tamanio } from 'src/app/models/tamanio';

@Injectable({
  providedIn: 'root'
})
export class TamaniosService {

  readonly  urlApis = 'https://appadministracion.herokuapp.com/api';
  constructor(private http: HttpClient) { }


  getSizes(){
    return this.http.get(`${this.urlApis}/tamanios`);
  }

  addSize(tamanio: Tamanio){
    return this.http.post(`${this.urlApis}/tamanios`, tamanio);
  }

  getEspecyficSize(idTamanio:string){
    return this.http.get(`${this.urlApis}/tamanios/${idTamanio}`);
  }

  updateSize(tamanio:Tamanio, idTamanio:string){ 
    return this.http.put(`${this.urlApis}/tamanios/${idTamanio}`,tamanio );
  }

  deleteSize(idTamanio: string){
    return this.http.delete(`${this.urlApis}/tamanios/${idTamanio}`);
  }
}
