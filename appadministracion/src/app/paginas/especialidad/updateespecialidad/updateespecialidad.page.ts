import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Especialidad } from 'src/app/models/especialidad';

@Component({
  selector: 'app-updateespecialidad',
  templateUrl: './updateespecialidad.page.html',
  styleUrls: ['./updateespecialidad.page.scss'],
})
export class UpdateespecialidadPage implements OnInit {


  espec = new Especialidad();
  especialidad= new Especialidad;
  loader: any;
  constructor(private especServ:EspecialidadesService,
              private alert: AlertController,
              private toastCtrl: ToastController,
              private loadCtrl: LoadingController,
              private actvRoute: ActivatedRoute,
              ) { }

  ngOnInit() {

    this.actvRoute.paramMap.subscribe(param =>{
      this.espec._id = param.get('idEspecialidad');
     });
     this.especServ.getEspecyficEspec(this.espec._id).subscribe(data =>{  
        this.espec.strDescripcion = data["contenido"]["strDescripcion"]
        this.espec.nmbCosto = data["contenido"]["nmbCosto"];
     });
  }

  async alertas(espec){
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
            this.updateEspec(espec);
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

   updateEspec(espec){
    this.cargarLoader();
    setTimeout(() =>{
      this.loader.dismiss();
       
      this.especServ.updateEspec(espec,this.espec._id).subscribe(data =>{
        if(data["mensaje"]===`Actualizado`){
          return this.showToast(data["contenido"]);
        }
        return this.showToast(data["mensaje"]);
      })
    },1500)
  }

}
