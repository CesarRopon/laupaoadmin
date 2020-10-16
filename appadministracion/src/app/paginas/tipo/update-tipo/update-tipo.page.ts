import { Component, OnInit } from '@angular/core';
import { TipopostService } from '../../../servicios/tipopostserv/tipopost.service';
import { AlertController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { Tipo } from 'src/app/models/tipos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-tipo',
  templateUrl: './update-tipo.page.html',
  styleUrls: ['./update-tipo.page.scss'],
})
export class UpdateTipoPage implements OnInit {

  tipoo = new Tipo();
  tipo = new Tipo;
  loader: any;
  constructor(private tipoServ: TipopostService,
              private alert: AlertController,
              private toastCtrl: ToastController,
              private loadCtrl: LoadingController,
              private actvRoute: ActivatedRoute,
              private plat:Platform) { }

  ngOnInit() {

    this.actvRoute.paramMap.subscribe(param =>{
      this.tipoo._id = param.get('idTipo');
     });
     this.tipoServ.getEspecyfic(this.tipoo._id).subscribe(data =>{  
        this.tipoo.strDescripcion = data["contenido"]["strDescripcion"]
        this.tipoo.nmbCosto = data["contenido"]["nmbCosto"];
     });
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
      console.log(this.tipo);
      
      this.tipoServ.updateType(this.tipoo._id, tipoPostre).subscribe(data =>{
        if(data["mensaje"]==="No agregado"){
          return this.showToast("No agregado, intentalo de nuevo")
        }
        return this.showToast(data["mensaje"]);
      })
    },1500)
  }
}
