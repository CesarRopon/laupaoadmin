import { Component, OnInit } from '@angular/core';
import {TipopostService} from '../../servicios/tipopostserv/tipopost.service'
import { Tipo } from 'src/app/models/tipos';
import { MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.page.html',
  styleUrls: ['./tipo.page.scss'],
})
export class TipoPage implements OnInit {

  tipos: Tipo[];
  numero:any=2;
  loader: any;
  constructor(private tiposPostre: TipopostService,
              private menu: MenuController,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alert: AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'sixth');
      this.getTipos();
  }

  ionViewWillEnter(){
    this.menu.enable(true, 'sixth');
    this.getTipos();
  }
  updateTipo(){

  }

 
  async openMenu(){
    await this.menu.open();
  }

  getTipos(): any{
    this.tiposPostre.obtenerTipPost().subscribe(data =>{
      if(data["mensaje"]==="Tipos no encontrados"){
        this.tipos = []
        this.numero =this.tipos.length
        console.log(this.tipos + this.numero);
        
        return this.tipos;
      }else{
        
        this.tipos = data["contenido"]["tipos"]
        this.numero= this.tipos.length
        console.log(this.tipos + this.numero);
        return this.tipos;
      }      
      //console.log(this.productos); 
      //console.log(data); 
    })
  }


  

async deleteTipo(id){
  this.cargarLoader();
  setTimeout(() =>{
    this.loader.dismiss();
    this.tiposPostre.changeStatusPost(id).subscribe(data =>{
      console.log(data);
      this.getTipos();
      if(this.tipos===undefined || this.tipos ===null){
         this.numero = this.tipos; 
         
      }else if(this.tipos.length>=0){
        this.numero = this.tipos.length;
      }
    });
    this.showToast('Eliminado');
    
  }, 1500)
 
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
   message :"Eliminando..."
 });
 return this.loader.present();

 }

 async alertas(id){
  let alertaFnc = this.alert.create({
    header: 'Atencion',
    subHeader: 'Baja tipo product',
    message: '¿Estas seguro de querer eliminar este tipo?',
    buttons: [
      {
        text: 'No eliminar',
        role: 'cancel',
        handler: (blah) => {
          
        }
      }, {
        text: 'Si eliminar',
        handler: () => {
          this.deleteTipo(id);      
          //this.productos = this.obtenerProd();
        }
      }
    ]
  });
   (await alertaFnc).present();
}


}
