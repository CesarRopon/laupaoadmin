import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController, Platform, ActionSheetController } from '@ionic/angular';
import {storage} from 'firebase';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {TipopostService} from '../../servicios/tipopostserv/tipopost.service'
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { Producto } from 'src/app/models/producto';
import { ImagenesService } from 'src/app/servicios/imgs/imagenes.service';
//import { threadId } from 'worker_threads';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  base64Image;
  tipos: any;
  tipopostre:any;
  producto = new Producto();
  constructor(private menu: MenuController, 
              private toastCtrl: ToastController,
              private alert :AlertController,
              private camara:Camera, 
              private post: TipopostService,
              private plat:Platform,
              private router:Router,
              private prodServ: ProductoService,
              private actionCtrl: ActionSheetController,
              private imgServ: ImagenesService,
              ) { }

  ngOnInit() {
    //this.usoBoton();
    this.menu.enable(true, 'fourth');
    this.obtenerTipoPostre();
  }

  ionViewWillEnter(){
    this.menu.enable(true, 'fourth');
  }

  async openMenu(){
    await this.menu.open();
  }

  tomarsillo(){
    console.log("cacacacaaca");
    
  }

  async tomarFoto(){
    try{
    //definieindo opciones de la camara
    const opciones : CameraOptions ={
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType:this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      saveToPhotoAlbum:true
    }
    
    const result = await this.camara.getPicture(opciones).then();
    const image = `data:image/jpeg;base64,${result}`;
    /*const imgs = storage().ref('pictures/');
    imgs.putString(image, 'data_url');*/

  }catch(err){
    console.log(err);
    
  }
  }

  showtoast(result){
    this.toastCtrl.create(
      {
        message: result,
        duration:4000
        
      }
    ).then(toastData => toastData.present());
  }

  obtenerTipoPostre(){
    this.post.obtenerTipPost().subscribe(datos=>{
      this.tipos = datos["contenido"]["tipos"];
      console.log(this.tipos);
      
    })
  }


  obtenerTipoTipeado(carambolas){
    console.log(carambolas);
    
  }

  async alertas(producto){
    let alertaFnc = this.alert.create({
      header: 'Atencion',
      subHeader: 'Alta producto',
      message: `¿Dar de alta ${producto.strNombre}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si agregar',
          handler: () => {
            this.llevarProd(producto);
            //this.productos = this.obtenerProd();
          }
        }
      ]
    });
     (await alertaFnc).present();
  }

  llevarProd(producto){
    this.prodServ.postProducts(producto).subscribe(data =>{
     if(data["mensaje"]==="Error de insercion" || data["mensaje"]==="Error interno"){
      this.showtoast(data["mensaje"]);
     }else{ 
      this.showtoast(data["mensaje"]);
     }
    })
  }

  agregarProd(){
    //this.imgServ.addimg(this.producto);
  }


  async presentActionSheet(){
    let actionSheet = this.actionCtrl.create({
    buttons :[
      {
        text: 'Abrir galeria',
        handler :() =>{
          this.TakeFoto(this.camara.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text:'Tomar foto',
        handler: () =>{
          this.TakeFoto(this.camara.PictureSourceType.CAMERA);
        }
       },
       {
         text: 'Cancelar',
         role: 'cancel'
       }
    ]
    });

    (await actionSheet).present()
  }


  TakeFoto(sourceType){
    try{
    var opciones ={
      quality:100,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType:this.camara.EncodingType.JPEG,
      mediaType:this.camara.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    this.camara.getPicture(opciones).then((imagePath) =>{
      //this.base64Image = imagePath;
      this.base64Image = `data:image/jpeg;base64,${imagePath}`;

    }).catch((err:any) =>{
      this.showtoast("Foto tomada");
    })
  }catch(err){
    this.showtoast("Error en la camara");
    
  }
  }


  subirFoto(){
    
    try {
      
    this.imgServ.subirImagen(this.base64Image).then((data) =>{
      this.showtoast(data)
    }).catch((err: any) =>{
      this.showtoast(err)
    })
    //this.showtoast("Subido este pedo");
    } catch (error) {
      this.showtoast(error)
    }
  }

}

