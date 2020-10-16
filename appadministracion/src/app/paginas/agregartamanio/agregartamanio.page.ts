import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Tamanio } from 'src/app/models/tamanio';
import { TamaniosService } from 'src/app/servicios/tamaños/tamanios.service';

@Component({
  selector: 'app-agregartamanio',
  templateUrl: './agregartamanio.page.html',
  styleUrls: ['./agregartamanio.page.scss'],
})
export class AgregartamanioPage implements OnInit {


  tamanio= new Tamanio();
  loader: any
  constructor(private tamanioService: TamaniosService,
              private alert: AlertController,
              private toastCtrl: ToastController,
              private loadCtrl: LoadingController,
              ) { }

  ngOnInit() {
     }

  addSize(size){
    
    this.cargarLoader();
    setTimeout(() =>{
      this.loader.dismiss();
      this.tamanioService.addSize(size).subscribe(data =>{
        if(data["mensaje"]==="Dado de alta"){
          this.showToast("Tamaño "+data["contenido"])
        }else{
          this.showToast(data["contenido"])
        }
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
      header: 'Nuevo tamaño',
      subHeader: 'Alta Tamaño',
      message: '¿Estas seguro de querer agregar este tamaño?',
      buttons: [
        {
          text: 'No agregar',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Si agregar',
          handler: () => {    
            this.addSize(tipopost);
            //this.productos = this.obtenerProd();
          }
        }
      ]
    });
     (await alertaFnc).present();
  }

}
