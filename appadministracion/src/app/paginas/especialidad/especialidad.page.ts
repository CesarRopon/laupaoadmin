import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Especialidad } from 'src/app/models/especialidad';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.page.html',
  styleUrls: ['./especialidad.page.scss'],
})
export class EspecialidadPage implements OnInit {


  especialidades: Especialidad[];
  numero:any=2;
  loader: any;
  constructor(private especServ: EspecialidadesService,
              private menu: MenuController,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alert: AlertController) { }

  ngOnInit() {
    this.menu.enable(true, 'eleven');
      this.getTipos();
  }

  ionViewWillEnter(){
    this.menu.enable(true, 'eleven');
    this.getTipos();
  }
  updateTipo(){

  }

 
  async openMenu(){
    await this.menu.open();
  }

  getTipos(): any{
    this.especServ.getEspec().subscribe(data =>{
      if(data["mensaje"]==="Especialidades"){

        this.especialidades = data["contenido"];
        this.numero =2;
        console.log(this.especialidades);     
        return this.especialidades;
      }else{
  
        this.numero= 0;
        return this.especialidades;
      }      
    })
  }


  

async deleteTipo(id){
  this.cargarLoader();
  setTimeout(() =>{
    this.loader.dismiss();
    this.especServ.deleteEspec(id).subscribe(data =>{
      console.log(data);
      this.getTipos();
      if(this.especialidades===undefined || this.especialidades ===null){
         this.numero = this.especialidades; 
         
      }else if(this.especialidades.length>=0){
        this.numero = this.especialidades.length;
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
    subHeader: 'Baja especialidad',
    message: '¿Estas seguro de querer eliminar esta especialidad?',
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
