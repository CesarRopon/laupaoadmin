import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { title } from 'process';
import { Ubicacion } from 'src/app/models/ubicacion';
import { Pedido } from 'src/app/models/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente';
declare var google:any;
@Component({
  selector: 'app-mapa-ubicacion',
  templateUrl: './mapa-ubicacion.page.html',
  styleUrls: ['./mapa-ubicacion.page.scss'],
})
export class MapaUbicacionPage implements OnInit {


  map;
  constructor(private pedidoServ: PedidosService,
              private actvRoute: ActivatedRoute,
              private toastCtrl:ToastController,
              private alert: AlertController,
              private router: Router,
              private loadCtrl: LoadingController) { }

  @ViewChild('map', {read :ElementRef, static:false}) mapElement:ElementRef;
 // map:GoogleMap;

 loader:any;
 infoWindows: any =[];
 pedido= new Pedido();
 cliente= new Cliente();
 ubicacion = new Ubicacion();
 
  ngOnInit() {
    this.obtenerUbicacionPedido();
   // this.cargarMapa();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewWillEnter(){
    this.obtenerUbicacionPedido();
  }

  obtenerUbicacionPedido(){
    
    this.actvRoute.paramMap.subscribe((param) =>{
      this.pedido._id = param.get('idPedido')
    })
    this.pedidoServ.getEspecifycPedido(this.pedido._id).subscribe(data =>{
        if(data["mensaje"] ==="Pedido encontrado"){
          this.pedido = data["contenido"];
          this.ubicacion = data["contenido"]["idUbicacion"];
          this.cliente = data["contenido"]["idCliente"];
          console.log(this.pedido);
          
        }else{
          console.log(data);
          
        }
    })
    }
  
  showMap(){
    //Iniciara el mapa en la ubicacion a la que queremos ir, poniendo el market 
    const location = new google.maps.LatLng(this.ubicacion.nmbLatitud, this.ubicacion.nmbLongitud);
    const options ={
      center:location,
      zoom:15,
      disableDefaultUI:true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, options);
    this.agregarMarkers(this.ubicacion); 
  }

  ionViewDidEnter(){

    this.showMap();
    //this.cargarMapa();
  }

  agregarMarkers(markers){
    
    let position = new google.maps.LatLng(this.ubicacion.nmbLatitud, this.ubicacion.nmbLongitud);
    let mapMarker = new google.maps.Marker({
      position :position,
      title : this.ubicacion.strAliasUbicacion,
      latitude: this.ubicacion.nmbLatitud,
      longitude : this.ubicacion.nmbLongitud,
      //draggable: true
    })
    /*
    google.maps.event.addListener(mapMarker, 'dragend', function(evt) {
      console.log(evt.latLng.lat());
      console.log(evt.latLng.lng());
    })*/
      mapMarker.setMap(this.map);
      this.addInfoToMap(mapMarker);
    }
  

  

  addInfoToMap(marker){
    let infoWindowContent = '<div id="content">'+
                            '<p id="firstHeading" class="firstHeading">Nombre: '+this.cliente.strNombre+'</p>'+
                            '<p> Apellidos: '+this.cliente.strApellidos+'</hp>'+ 
                            '<p>Ubicacion: '+marker.title+'</p>'+
                            '<ion-button id="navigate" expand="block">Entregar</ion-button>'
                            '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content:infoWindowContent
    })

    marker.addListener('click',() =>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker)

      google.maps.event.addListenerOnce(infoWindow, 'domready', () =>{
        document.getElementById('navigate').addEventListener('click', () =>{
          console.log('Iniciando navegacion');
          window.open('https://www.google.com/maps/dir/?api=1&destination='+marker.latitude+','+marker.longitude);
        })
      })
    });

    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }

  async alertas(){
    let alertaFnc = this.alert.create({
      header: 'Atencion',
      subHeader: 'Pedido entregado',
      message: '¿Seguro(a) que ya entregaste el pedido?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si, entregado',
          handler: () => {
          this.entregar()
          }
        }
      ]
    });
     (await alertaFnc).present();

  }
  
  entregar(){
    console.log(this.pedido._id);
    let pedido = new Pedido;
    pedido.blnStatus = true;
    this.pedidoServ.entregarPedido(this.pedido._id, pedido).subscribe(data=>{
      if(data["mensaje"]==="Pedido actualizado"){
        this.cargarLoader();
        setTimeout(() => {
          this.loader.dismiss();
          this.presentToast("Completado");
          this.router.navigate(["/pedidos"]);
        }, 1500);
          
      }else{
          this.presentToast("No se marco el pedido como completado, intentalo de nuevo")
      }
    })
  }

  async cargarLoader(){
    this.loader = await this.loadCtrl.create({
      message :"Marcando como completado, espera un momento"
    });
    return this.loader.present();
    }
}
