import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { TipopostService } from 'src/app/servicios/tipopostserv/tipopost.service';
import { Tamanio } from 'src/app/models/tamanio';
import { TamaniosService } from 'src/app/servicios/tamaños/tamanios.service';

@Component({
  selector: 'app-tamanio',
  templateUrl: './tamanio.page.html',
  styleUrls: ['./tamanio.page.scss'],
})
export class TamanioPage implements OnInit {

  tamanios: Tamanio[];
  numero:any=2;
  loader: any;
  constructor(private sizesService: TamaniosService,
              private menu: MenuController,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alert: AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'ten');
      this.getTipos();
  }

  ionViewWillEnter(){
    this.menu.enable(true, 'ten');
    this.getTipos();
  }
  updateTipo(){

  }

 
  async openMenu(){
    await this.menu.open();
  }

  getTipos(): any{
    this.sizesService.getSizes().subscribe(data =>{
      if(data["mensaje"]==="Datos obtenidos exitosamente"){

        this.tamanios = data["contenido"];
        this.numero =2;
        console.log(this.tamanios);
        
        return this.tamanios;
      }else{
  
        this.numero= 0;
        return this.tamanios;
      }      
    })
  }


  

async deleteTipo(id){
  this.cargarLoader();
  setTimeout(() =>{
    this.loader.dismiss();
    this.sizesService.deleteSize(id).subscribe(data =>{
      console.log(data);
      this.getTipos();
      if(this.tamanios===undefined || this.tamanios ===null){
         this.numero = this.tamanios; 
         
      }else if(this.tamanios.length>=0){
        this.numero = this.tamanios.length;
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
    subHeader: 'Baja tamaño',
    message: '¿Estas seguro de querer eliminar este tamaño?',
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
