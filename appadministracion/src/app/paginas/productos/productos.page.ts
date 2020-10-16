import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { Producto } from 'src/app/models/producto';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos : Producto[];
  textBuscar = '';
  loader: any;
  numero :any =2;
  constructor(private menu:MenuController, 
              private prodServ: ProductoService, 
              private toastCtrl: ToastController, 
              private loadCtrl: LoadingController,
              private prodSer: ProductoService,
              private alert:AlertController ) { }

  ngOnInit() {
    this.menu.enable(true, 'third');
    this.obtenerProd();
  }

  ionViewWillEnter(){
    this.menu.enable(true, 'third');
    this.obtenerProd();
  }


  obtenerProd(): any{
    this.prodServ.obtenerProductos().subscribe(data =>{
      if(data["msg"]==="No hay productos"){
        this.productos = []
        this.numero =this.productos.length
        console.log(this.productos + this.numero);
        
        return this.productos;
      }else{
        
        this.productos = data["contenido"]["producto"]
        this.numero= this.productos.length
        console.log(this.productos + this.numero);
        return this.productos;
      }      
      //console.log(this.productos); 
      //console.log(data); 
    })
  }

  async openMenu(){
    await this.menu.open();
  }
  buscar(event){
    this.textBuscar = event.detail.value;
  }


  


async delete(id){
  this.cargarLoader();
  setTimeout(() =>{
    this.loader.dismiss();
    this.prodServ.changeEstatusProd(id).subscribe(data =>{
      console.log(data);
      this.obtenerProd();
      if(this.productos===undefined || this.productos ===null){
         this.numero = this.productos; 
         
      }else if(this.productos.length>=0){
        this.numero = this.productos.length;
        
      }
    });
    //this.obtenerProd();
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
    subHeader: 'Baja producto',
    message: '¿Estas seguro de querer eliminar este producto?',
    buttons: [
      {
        text: 'No eliminar',
        role: 'cancel',
        handler: (blah) => {
          
        }
      }, {
        text: 'Si eliminar',
        handler: () => {
          this.delete(id);      
          //this.productos = this.obtenerProd();
        }
      }
    ]
  });
   (await alertaFnc).present();
}

}
