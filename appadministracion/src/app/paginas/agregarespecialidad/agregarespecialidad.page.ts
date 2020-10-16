import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import {Especialidad} from '../../models/especialidad';
@Component({
  selector: 'app-agregarespecialidad',
  templateUrl: './agregarespecialidad.page.html',
  styleUrls: ['./agregarespecialidad.page.scss'],
})
export class AgregarespecialidadPage implements OnInit {
  especialidad = new Especialidad();
  loader: any
  constructor(private especServ:EspecialidadesService,
              private alert: AlertController,
              private toastCtrl: ToastController,
              private loadCtrl: LoadingController,
              ) { }

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

  addType(espec){
    this.cargarLoader();
    setTimeout(() =>{
      this.loader.dismiss();   
      this.especServ.addEspec(espec).subscribe(data =>{
        if(data["mensaje"]==="Insertado"){
          return this.showToast("Especialidad agregada");
        }

        return this.showToast(data["contenido"]);
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
      header: 'Nuevo especialidad',
      subHeader: 'Alta de especialidad',
      message: '¿Estas seguro de querer agregar esta especialidad?',
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
