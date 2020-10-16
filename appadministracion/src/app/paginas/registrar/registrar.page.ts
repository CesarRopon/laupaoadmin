import { Component, OnInit } from '@angular/core';
import {Admin} from '../../models/admin';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  admin= new Admin();
  loader :any;
  constructor(private authS:AuthService, private toastCtrl: ToastController, 
                      private loadingCtrl: LoadingController,
                      private afAuth: AuthService,
                      private navCtrl: NavController, private router: Router) {
    
   }

  ngOnInit() {
  }

  async registrarAdmin(admin:Admin)
  {try {
    if(this.admin.strPassword.length<6){
      this.showToast("La contraseña debe tener al menos 6 caracteres");
    }else{
      
    try {
      await (await this.authS.registrar(this.admin)).subscribe(data =>{  
       
        if(data["mensaje"]==="0"){
          this.crearLoader("Hubo un error, intentalo de nuevo"),
          this.closeLoader("Error")
        }else{
          this.crearLoader("Administrador dado de alta, porfavor inicia sesion");
          this.closeLoaderAndRedirect();   
        }

      }) 
    }catch(e){
      this.showToast(e);
    }
  }
  } catch (error) {
    this.showToast("La contraseña debe tener al menos 6 caracteres");
  }
  }



  async crearLoader(msj){
    this.loader = await this.loadingCtrl.create({
      message: msj
    });
    return this.loader.present();
  }

closeLoader(msj){
    setTimeout(() =>{
      this.loader.dismiss();
    }, 1500)
  }

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }

  closeLoaderAndRedirect(){
    setTimeout(() =>{
      this.loader.dismiss();
      this.router.navigate(['/login', ]);
    }, 1500)
  }
  
}
