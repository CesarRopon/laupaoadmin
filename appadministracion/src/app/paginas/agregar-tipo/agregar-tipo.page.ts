import { Component, OnInit } from '@angular/core';
import { TipopostService } from "../../servicios/tipopostserv/tipopost.service";
import { AlertController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { Tipo } from 'src/app/models/tipos';
@Component({
  selector: 'app-agregar-tipo',
  templateUrl: './agregar-tipo.page.html',
  styleUrls: ['./agregar-tipo.page.scss'],
})
export class AgregarTipoPage implements OnInit {

  tipo = new Tipo();
  loader: any
  constructor(private tipoServ: TipopostService,
              private alert: AlertController,
              private toastCtrl: ToastController,
              private loadCtrl: LoadingController,
              private plat:Platform) { }

  ngOnInit() {
    //this.usoBoton();
  }
/*
  usoBoton(){ 
  this.plat.ready().then(() =>{
    document.addEventListener('backbutton', () =>{
      
    });
  });
  }
*/

  addType(tipoPostre){
    this.cargarLoader();
    setTimeout(() =>{
      this.loader.dismiss();
      console.log(this.tipo);
      
      this.tipoServ.addType(tipoPostre).subscribe(data =>{
        if(data["mensaje"]==="No agregado"){
          return this.showToast("No agregado, intentalo de nuevo")
        }
        return this.showToast(data["mensaje"]);
      })
    },1500)
  }

  async cargarLoader(){
    this.loader = await this.loadCtrl.create({
      message :"Agregando..."
    });
    return this.loader.present();
   
    }

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
   }
  
   async alertas(tipopost){
    let alertaFnc = this.alert.create({
      header: 'Nuevo postre',
      subHeader: 'Alta tipo postre',
      message: '¿Estas seguro de querer agregar este tipo postre?',
      buttons: [
        {
          text: 'No agregar',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Si agregar',
          handler: () => {    
            this.addType(tipopost);
            //this.productos = this.obtenerProd();
          }
        }
      ]
    });
     (await alertaFnc).present();
  }


}
