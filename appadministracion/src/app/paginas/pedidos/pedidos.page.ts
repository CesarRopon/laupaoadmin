import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {CalendarComponent} from 'ionic2-calendar';
import { Pedido } from 'src/app/models/pedido';
import { PedidosService } from 'src/app/servicios/pedidos/pedidos.service';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  fechasPedidos =[];
  arreglo:any;
  eventSource =[];
  viewTitle: string;
  pedidos: Pedido[];
  calendar={
    mode: 'month',
    currentDate: new Date()
  }
  numeroPedidos=0;
 
   anio = new Date();
   
  
  number =0;
  mesesEnglish =[`January ${this.anio.getFullYear()}`, `February ${this.anio.getFullYear()}`, 
                  `March ${this.anio.getFullYear()}`, `April ${this.anio.getFullYear()}`, 
                    `May ${this.anio.getFullYear()}`, `June ${this.anio.getFullYear()}`, 
                 `July ${this.anio.getFullYear()}`, `August ${this.anio.getFullYear()}`, 
                 `September ${this.anio.getFullYear()}`,`October ${this.anio.getFullYear()}`,
                  `November ${this.anio.getFullYear()}`, `December ${this.anio.getFullYear()}`]
  @ViewChild(CalendarComponent) myCal : CalendarComponent;
  constructor(private menu: MenuController,
              private pedidosService: PedidosService) { }

  
  ngOnInit() {
    this.menu.enable(true, 'eight');
  }

  
  next(){

    this.myCal.slideNext();
  }

  back(){
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title){
    this.nombreMes(title);
  }

  ionViewWillEnter(){
    this.pedidos =[];
    this.fechasPedidos =[];
    this.eventSource=[];
    this.obtenerPedidos();
    this.menu.enable(true, 'eight');
  }

  openMenu(){
    this.menu.open();
  }

  agregarEvento(fechas){
    var eventos =[];
    for(var i =0; i<fechas.length; i++){
      console.log(`Pedido de ${this.pedidos[i]["idCliente"]["strNombre"]} ${this.pedidos[i]["idCliente"]["strApellidos"]}`);
     
       eventos.push({ 
         title: `Pedido de ${this.pedidos[i]["idCliente"]["strNombre"]} ${this.pedidos[i]["idCliente"]["strApellidos"]}`,
         startTime : new Date(fechas[i]),
         endTime : new Date(fechas[i]),
         allDay: false
       })
    }
    this.eventSource = eventos;  
  }

  cambiarvista(){
    if(this.number===0){
      this.number=1;
    }else{
      this.number=0;
    }
  }


  obtenerPedidos(){
    this.pedidosService.getPedidos().subscribe(data =>{
      console.log(data);
      
      if(data["contenido"].length===0){
        console.log("Error bro");   
        this.numeroPedidos =1;  
      }else{
        this.numeroPedidos=0;
        this.pedidos = data["contenido"];
        Object.keys(this.pedidos).forEach(index=> {           
            this.fechasPedidos.push(this.pedidos[index].dteFechaEntrega);
        });
        this.agregarEvento(this.fechasPedidos)
      }
    })
  }

  nombreMes(month){

    let numero =0;
    for(var i =0; i<12; i++){
      if(month === this.mesesEnglish[i]){
        numero = (i+1)
      }
    }
    switch(numero){
      case 1:
        this.viewTitle = `Enero ${this.anio.getFullYear()}`;
        break;
      case 2: 
        this.viewTitle = `Febrero ${this.anio.getFullYear()}`;
        break;
      case 3:
        this.viewTitle = `Marzo ${this.anio.getFullYear()}`;
        break;
      case 4: 
        this.viewTitle = `Abril ${this.anio.getFullYear()}`;
        break; 
      case 5:
        this.viewTitle = `Mayo ${this.anio.getFullYear()}`;
        break;
      case 6: 
        this.viewTitle = `Junio ${this.anio.getFullYear()}`;
        break; 
      case 7:
        this.viewTitle = `Julio ${this.anio.getFullYear()}`;
        break;
      case 8: 
        this.viewTitle = `Agosto ${this.anio.getFullYear()}`;
        break; 
      case 9:
        this.viewTitle = `Septiembre ${this.anio.getFullYear()}`;
        break;
      case 10:
        this.viewTitle = `Octubre ${this.anio.getFullYear()}`;
        break;
      case 11:
        this.viewTitle = `Noviembre ${this.anio.getFullYear()}`;
        break;
      case 12:
        this.viewTitle = `Diciembre ${this.anio.getFullYear()}`;
        break;
        default: 
        break    
  }
}
}