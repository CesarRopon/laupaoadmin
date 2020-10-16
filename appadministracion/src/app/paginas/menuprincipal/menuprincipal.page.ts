import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {Ubicacion} from '../../models/ubicacion';
import {ClienteServiceService} from '../../servicios/clientes/cliente-service.service'
import {Storage} from '@ionic/storage';
import { Admin } from 'src/app/models/admin';
import { Network } from "@ionic-native/network/ngx";
import { ComentariosService } from "../../servicios/comentarios/comentarios.service";
import { Comentario } from "../../models/comentariosCliente";
import { Cliente } from 'src/app/models/cliente';


@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
})
export class MenuprincipalPage implements OnInit {

  loader: any;
  //ubicacion = new Ubicacion();
  admin = new Admin();
  fechaCompleta: any;
  passOculta ="";
  contador:number= 1;
  pass ="";
  comentarios: Comentario[];
  numero=0;
  commment;

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  constructor(private menu: MenuController, 
              private ldainController: LoadingController, 
              private autS: AuthService, 
              private router:Router, 
              private afAuth:AngularFireAuth, 
              public alert: AlertController,
              private cliente: ClienteServiceService,
              public storage: Storage,
              public net: Network,
              private toast: ToastController,
              private commentsService: ComentariosService) {


              /*this.net.onDisconnect().subscribe(() =>{
                this.showToast("Wifi desconectado, seleccione su provedor de internet");
              });

              this.net.onConnect().subscribe(() =>{
                setTimeout(() => {
                  if(this.net.type === 'wifi'){
                    this.showToast('Estas conectado(a) a red wifi');
                  }else{
                    this.showToast(`Estas conectado(a) a su red ${this.net.type}`);
                  }
                }, 3000);
              });*/
            }

  ngOnInit() {
    this.passOculta="";
    const date = new Date();
    let mesB = this.meses[date.getMonth()];
    this.fechaCompleta = `${date.getDate()} de ${mesB} del ${date.getFullYear()}`;
    this.menu.enable(true, 'first');  
    this.obtenerAdmin();
    //this.getComments();
    
  }

  ionViewWillEnter(){
    this.passOculta="";
    const date = new Date();
    let mesB = this.meses[date.getMonth()];
    this.fechaCompleta = `${date.getDate()} de ${mesB} del ${date.getFullYear()}`;
    this.menu.enable(true, 'first');
    this.obtenerAdmin();
  }


  logout(){
    this.alertas();
  }

  async alertas(){
    let alertaFnc = this.alert.create({
      header: 'Atencion',
      subHeader: 'Cierre de sesión',
      message: '¿Estas seguro(a) de querer cerrar la sesion?',
      buttons: [
        {
          text: 'No, permanecer aqui',
          role: 'cancel',
          handler: (blah) => {
      
          }
        }, {
          text: 'Si, salir',
          handler: () => {
            this.crearLoader();
            this.cerrarLoader(); 
            this.storage.set('token', null);       
            this.router.navigate(["login"])  
          }
        }
      ]
    });
     (await alertaFnc).present();
  }

async crearLoader(){
  this.loader= await this.ldainController.create({
    message:"Cerrando sesion, espere un momento"
  })
  return this.loader.present();
}

cerrarLoader(){
  setTimeout(() =>{
    this.loader.dismiss();
    this.autS.logOut();
    this.router.navigate(['/login']);
  }, 1500)
}

async openMenu(){
  await this.menu.open();
}

obtenerAdmin(){
  this.storage.get('idAdmin').then((val)=>{
    this.autS.obtenerAdminById(val).subscribe(data =>{
      console.log(val);
      
      //this.convertirPass(data["contenido"]["persona"][0]["strPassword"]);
      this.admin = data["contenido"];
      this.storage.set('idAdmin', data["contenido"]["_id"]);
    })
  }).catch((err:any) =>{
    console.log(err);  
  })
 
}

showToast(message: string){
  this.toast.create({
    message: message,
    duration: 2500
  }).then(toastData => toastData.present());
}

convertirPass(pass:string){
  let array : any = Array.from(pass);
  this.passOculta="";
  for(let val of array){
    this.passOculta+="*";
  }
  
}

convPass(){
    if(this.contador===1){
      this.pass =this.passOculta; 
      this.passOculta = this.admin[0]["strPassword"];
      this.contador =2
    }else{
      this.passOculta = this.pass;
      this.contador=1;
    }
}

/*getComments(){
  this.commentsService.getAllCommentsByClient().subscribe( data=>{
    if(data["comentarios"].length!==0){
      this.comentarios=data["comentarios"];
      console.log(this.comentarios);    
    }else{
      console.log("No hay registros");
     this.numero=1;
    } 
})

}1*/


}

