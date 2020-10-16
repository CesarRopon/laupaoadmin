import { Component, OnInit } from '@angular/core';
import {DetallePedido} from '../../../models/detallePedido';
import {Pedido} from '../../../models/pedido';
import {DetallepedidoService} from '../../../servicios/detalles/detallepedido.service';
import {PedidosService} from '../../../servicios/pedidos/pedidos.service';
import { ActivationEnd, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {


  detalles : DetallePedido[];
  pedidos : Pedido[];
  idPedido:string
  cliente: Cliente[]
  constructor(private detalleServ: DetallepedidoService,
              private pedidoServ: PedidosService,
              private actRouter: ActivatedRoute,
              private toastCtrl: LoadingController  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.getDetalles();
  }

  getDetalles(){
    this.actRouter.paramMap.subscribe((param)=>{
      this.idPedido = param.get('idPedido');
    })

    console.log(this.idPedido);
    
    this.detalleServ.getDetalles(this.idPedido).subscribe(data =>{
      if(data["mensaje"] === "Detalles encontrados"){
        this.cliente = data["contenido"]["idCliente"]
        this.pedidos= data["contenido"];
        this.detalles = data["contenido"][0]["aJsnDetallePedido"];

      }else{
        this.presentToast(data["mensaje"])
      }
      
    })
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  multiplicacion(costo, precioU){
    return costo * precioU
  }
}
