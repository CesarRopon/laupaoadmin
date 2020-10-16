import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from 'src/app/models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  readonly  urlApis = 'https://appadministracion.herokuapp.com/api';
  constructor(private http: HttpClient) { }


  getEspec(){
    return this.http.get(`${this.urlApis}/especialidades`);
  }

  addEspec(espec: Especialidad){
    return this.http.post(`${this.urlApis}/especialidades`, espec);
  }

  getEspecyficEspec(idEspecialidad:string){
    return this.http.get(`${this.urlApis}/especialidades/${idEspecialidad}`);
  }

  updateEspec(espec:Especialidad, idEspecialidad:string){ 
    return this.http.put(`${this.urlApis}/especialidades/${idEspecialidad}`,espec);
  }

  deleteEspec(idEspecialidad: string){
    return this.http.delete(`${this.urlApis}/especialidades/${idEspecialidad}`);
  }
}
