import { Component, OnInit } from '@angular/core';
import { Tamanio } from 'src/app/models/tamanio';
import { TamaniosService } from 'src/app/servicios/tamaños/tamanios.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  size = new Tamanio();
  tamanio = new Tamanio;
  loader: any;
  constructor(private tamanioServ: TamaniosService ,
              private alert: AlertController,
              private toastCtrl: ToastController,
              private loadCtrl: LoadingController,
              private actvRoute: ActivatedRoute,
              ) { }

  ngOnInit() {

    this.actvRoute.paramMap.subscribe(param =>{
      this.size._id = param.get('idTamanio');
     });
     this.tamanioServ.getEspecyficSize(this.size._id).subscribe(data =>{  
       if(data["mensaje"]==="Correcto"){
        this.size.strDescripcion = data["contenido"]["strDescripcion"]
        this.size.nmbCosto = data["contenido"]["nmbCosto"];
       }else{
         this.showToast(data["mensaje"]);
       }
     });
  }

  async alertas(tipopost){
    let alertaFnc = this.alert.create({
      header: 'Atencion',
      subHeader: 'Actualizacion tamaño',
      message: '¿Estas seguro de querer actualizad este tamaño?',
      buttons: [
        {
          text: 'No actualizar',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Si actualizar',
          handler: () => {    
            this.updateType(tipopost);
            //this.productos = this.obtenerProd();
          }
        }
      ]
    });
     (await alertaFnc).present();
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

   updateType(tipoPostre){
    this.cargarLoader();
    setTimeout(() =>{
      this.loader.dismiss();
      //console.log(this.tipo);
      this.tamanioServ.updateSize(this.tamanio, this.size._id).subscribe(data =>{
        if(data["mensaje"]==="Encontrado"){
          this.showToast(data["contenido"])
        }
        return this.showToast(`${data["mensaje"]}, ${data["contenido"]}`);
      })
    },1500)
  }

}
