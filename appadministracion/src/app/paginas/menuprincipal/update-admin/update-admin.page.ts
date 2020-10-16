import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NodeWithI18n } from '@angular/compiler';
import { Admin } from 'src/app/models/admin';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.page.html',
  styleUrls: ['./update-admin.page.scss'],
})
export class UpdateAdminPage implements OnInit {

  admin = new Admin();
  admiin = new Admin();
  loader: any;
  constructor(private adminServ: AuthService,
    private alert: AlertController,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private actvRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actvRoute.paramMap.subscribe( param=>{
      this.admiin._id = param.get('idAdmin');
    })
    this.adminServ.obtenerAdminById(this.admiin._id).subscribe(data =>{
      this.admiin = data["contenido"];
      console.log(this.admiin);
      
    })
  }

  
  async alertas(adminUpdated){
    let alertaFnc = this.alert.create({
      header: 'Atencion',
      subHeader: 'Actualizacion datos',
      message: '¿Estas seguro de querer actualizar estos datos?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Si, continuar',
          handler: () => {    
            this.updateAdmin(adminUpdated);
            //this.productos = this.obtenerProd();
          }
        }
      ]
    });
     (await alertaFnc).present();
  }

  async cargarLoader(){
    this.loader = await this.loadCtrl.create({
      message :"Guardando cambios..."
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

   updateAdmin(adminUpdated){
    this.cargarLoader();
    setTimeout(() =>{
      this.loader.dismiss();
      console.log(this.admin);
      
      this.adminServ.updateAdmin(this.admiin._id, adminUpdated).subscribe(data =>{
        if(data["mensaje"]==="No se encontro el id" ||data["mensaje"]=== "Algo salio mal"){
          return this.showToast("Cambios no agregados, intentalo de nuevo")
        }
        return this.showToast(data["mensaje"]);
      })
    },1500)
  }


}
