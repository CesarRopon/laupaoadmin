import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../servicios/auth/auth.service';
import {Admin} from '../../models/admin';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController, Platform } from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = new User();
  loader: any;


  constructor(private authService: AuthService, 
              public storage:Storage,
              private router: Router, 
              private toastCtrl: ToastController, 
              private loadCtrl: LoadingController,
              private alert: AlertController,
              private plat:Platform) { 
                this.plat.ready().then(() =>{
                  document.addEventListener('backbutton', ()=>{
                    if(this.constructor.name === "LoginPage"){
                     this.alertas();
                    }else{
                      this.router.navigate(['/menuprincipal']);
                    }
                  })
                })
  }

  ngOnInit() {
  }


async login(){
   /*this.authService.login(this.user).subscribe(data =>{
     if(data["mensaje"] ==="Contraseña incorrecta" || data["mensaje"]==="Correo incorrecto" || data["mensaje"]==="Error al ingresar"){
      this.cargarLoader()
      setTimeout(() =>{
        this.loader.dismiss();
        this.showToast("Contraseña y/o nombre de usuario incorrectos");
      }, 1500)
     }else{
      this.cargarLoader();
      setTimeout(() =>{
       this.loader.dismiss();
       this.router.navigate(['/menuprincipal']);
       this.showToast("Bienvenido");
       this.storage.set('email', this.user.strEmail);
     }, 1500)
     }
   });*/

   if(this.user.strEmail===null || this.user.strEmail===undefined){
    this.showToast("Correo vacio");
   }else if(this.user.strPassword===null || this.user.strPassword===undefined){
    this.showToast("Contraseña vacia");
   }else{
     this.authService.login(this.user).subscribe(data =>{
       console.log(data);
       
       if(data["mensaje"] === "Error interno" || data["mensaje"]==="Contraseña incorrecta" || data["mensaje"]==="Correo incorrecto"){
        this.cargarLoader()
        setTimeout(() =>{
          this.loader.dismiss();
          this.showToast(data["mensaje"]);
        }, 1500)

       }else{
        this.cargarLoader();
        setTimeout(() =>{
        
          
         this.loader.dismiss();
         this.router.navigate(['/menuprincipal']);
         this.showToast(data["mensaje"]);
         this.storage.set('token', true);
         
         this.storage.set('idAdmin', data["contenido"]._id);
       }, 1500)
       }
     }) 
   }
}


showToast(message: string){
  this.toastCtrl.create({
    message: message,
    duration: 3000
  })
  .then(toastData => toastData.present());
}

async cargarLoader(){
  this.loader = await this.loadCtrl.create({
    message :"Validando..."
  });
  return this.loader.present();
  }


  usoBoton(){
    this.plat.ready().then(() =>{
      document.addEventListener('backbutton', () =>{
       this.alertas();
      });
    });
  }
  

  async alertas(){
    let alertaFnc = this.alert.create({
      header: 'Atencion',
      subHeader: 'Salir de la LauPao',
      message: '¿Estas seguro de querer salir de la aplicacion?',
      buttons: [
        {
          text: 'No permanecer',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Si salir',
          handler: () => {   
             navigator["app"].exitApp(); 
            //this.productos = this.obtenerProd();
          }
        }
      ]
    });
     (await alertaFnc).present();
  }


}
