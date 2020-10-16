import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Cliente } from 'src/app/models/cliente';
import { ClienteServiceService } from 'src/app/servicios/clientes/cliente-service.service';
import { AlertController, MenuController, ToastController, Platform } from '@ionic/angular';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {


  clientes : Cliente[];
  numero =0;
  constructor( private clienteServ: ClienteServiceService,
               private alertController: AlertController, 
               private menu: MenuController,
               private callNumber: CallNumber,
               private toasCtrl: ToastController,
               private plat:Platform,
               private router:Router ) { 
     
  }
 
  ngOnInit() {   
    let fecha : Date = new Date();
    console.log(fecha);
    
    //this.usoBoton();
    this.menu.enable(true, 'second');
   this.clientes = this.obtain();
  
  }

  ionViewWillEnter(){
    this.menu.enable(true, 'second');
  }

  obtain():any{
    this.clienteServ.getClientes().subscribe(data =>{
      if(data["contenido"].length !==0){
     this.clientes= data["contenido"];
     console.log(this.clientes);
    }else{
      this.numero=1;
      console.log(this.numero);
      
    }
    });
  }

  async openMenu(){
    await this.menu.open();
  }
  contactarCliente(Telefono){
    this.callNumber.callNumber(Telefono, true).then((res) =>{
    }).catch(() =>{
    })
  }
showToast(message)
{
  this.toasCtrl.create({
    message: message,
    duration: 2500
  }).then(toastData => toastData.present());
  } 
/*
  usoBoton(){
    this.plat.ready().then(() =>{
      document.addEventListener('backbutton', () =>{
        this.router.navigate(['/']);
      });
    });
  }
  */
}
