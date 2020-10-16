import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FileTransfer ,FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx'
import { Producto } from 'src/app/models/producto';



@Injectable({
  providedIn: 'root'
})
export class ImagenesService {


  readonly  urlApis = 'https://appadministracion.herokuapp.com/api';
  readonly urlLocal = 'http://192.168.1.71:3000/api'
  constructor(private http:HttpClient,
              private transfer:FileTransfer) { }




  addimg(producto:Producto){

    const fileTranfer = this.transfer.create();
    let url = 'http://192.168.1.71:3000/api/productos';


    var opciones : FileUploadOptions ={
      fileKey :'strImg',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params:{producto}
    }
    

  }
  subirImagen(img){

    
    
    let url = 'http://192.168.1.71:3000/api/productos';

    var opciones : FileUploadOptions ={
      fileKey :'strImg',
      chunkedMode: false,
      mimeType: 'image/jpeg'
    }

    const fileTransfer:FileTransferObject = this.transfer.create();
    return fileTransfer.upload(img, url, opciones).then(() =>{
        
    }).catch(() =>{

    });
  }
}
