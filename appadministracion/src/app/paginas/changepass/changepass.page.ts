import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { User } from 'src/app/models/user';
import { ToastController, LoadingController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.page.html',
  styleUrls: ['./changepass.page.scss'],
})
export class ChangepassPage implements OnInit {


  user = new User();
  strNewPass;
  loader: any
  constructor(private authService: AuthService, 
              private toastCtrl: ToastController, 
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private plat:Platform,
              private router:Router) { }

  ngOnInit() {
    //this.usoBoton();
  }


  async enviarLinkPass(){
    console.log(this.user.strEmail);
    
    if(this.user.strEmail==='' || this.user.strPassword==='' || this.strNewPass===''){
      return this.presentToast('No puedes dejar campos vacios')
    }
    if(this.user.strPassword === undefined|| this.user.strPassword===undefined || this.strNewPass===undefined){
     return  this.presentToast('No puedes dejar campos vacios')
    }else{
      this.authService.changePass(this.user).subscribe(data =>{
        if(data["mensaje"]==="Contraseña actualizada"){
          this.cargarLoader();
          setTimeout(() =>{
            this.loader.dismiss();
            this.presentToast(data["mensaje"]);
          }, 1500)
        }else{
          this.cargarLoader();
          setTimeout(() =>{
            this.loader.dismiss();
            this.presentToast(data["mensaje"]);
          }, 1500)
        }
      })  
    }
    }


    
async cargarLoader(){
  this.loader = await this.loadingCtrl.create({
    message :"Cambiando contraseña"
  });
  return this.loader.present();
  }
   /*await this.authService.changePassFirebase(this.user).then((response: any) =>{
    this.presentToast("El mensaje para tu cambio de contraseña ha sido enviado");
   }).catch((err:any) =>{
    this.presentToast("No fue enviado el correo, intentalo de nuevo");
   })
  }
*/
    async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}


