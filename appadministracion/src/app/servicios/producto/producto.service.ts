import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from 'src/app/models/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  readonly  urlApis = 'https://appadministracion.herokuapp.com/api';
  readonly urlLocal = 'http://192.168.1.71:3000/api';
  constructor(private http:HttpClient) { }

  obtenerProductos(){
    return this.http.get(`${this.urlApis}/productos`);
  }

  obtenerProductoEspecifico(_id:string){
    return this.http.get(`${this.urlApis}/productos/${_id}`);
  }

  postProducts(nuevoProd:Producto){
    //nuevoProd.strImg = img
    return this.http.post(`${this.urlApis}/productos`, nuevoProd );
  }
  actualizarProducto(newProd:Producto, _id:string){
    this.http.put(`${this.urlApis}/productos/${_id}`, newProd)
  }

  changeEstatusProd(_id: string){
    return this.http.delete(`${this.urlApis}/productos/${_id}`);
  }

}
