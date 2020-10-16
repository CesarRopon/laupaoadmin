import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Comentario } from 'src/app/models/comentariosCliente';
import {Storage} from '@ionic/storage';
import { ClienteServiceService } from 'src/app/servicios/clientes/cliente-service.service';
import { ComentariosService } from 'src/app/servicios/comentarios/comentarios.service';
import { ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-contestacion',
  templateUrl: './contestacion.page.html',
  styleUrls: ['./contestacion.page.scss'],
})
export class ContestacionPage implements OnInit {


  comentario = new Comentario();
  cliente = new Cliente();
  idAdmin: string;
  respuesta = new Comentario();
  numero =0;
  fechaCompleta;
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  constructor(private actvRouter: ActivatedRoute, 
              public storage: Storage,
              private clienteService: ClienteServiceService,
              private commentService: ComentariosService,
              private toastCtrl: ToastController,
              private router: Router,
              private plat: Platform){}

  ngOnInit() {
    this.actvRouter.paramMap.subscribe(param =>{
      this.comentario._id = param.get('idComentario');
      this.cliente._id = param.get('idCliente');
      console.log(param.get('idCliente'));
    })
    this.storage.get('idAdmin').then((val)  =>{
     this.comentario.idAdmin = val
    })
    this.getComment(this.cliente._id, this.comentario._id);
  }


  getComment(idCliente, idComentario){
    this.commentService.getEspecyficComment(idCliente, idComentario).subscribe(data =>{
      if(data["mensaje"] === "Comentario no encontrado" ){
      this. numero=1;
      }else{
        this.comentario = data["comentarioCliente"];
        console.log(this.comentario);   
      }
    }

    )
  }

  responseComment(comentario:string){
    if(comentario ===undefined || comentario==='' || comentario ==="" || comentario===null){
      this.numero=1;
    }else{
      this.numero=2
    }  
    if(this.numero===2){
      console.log(comentario);
      
    const date = new Date();
    let mesB = this.meses[date.getMonth()];
    this.respuesta.blnStatus = true;
    this.respuesta.dteFechaContestacion  = `${date.getDate()}/${mesB}/${date.getFullYear()}`;;
    this.respuesta.strContestacion= this.comentario.strContestacion;
    this.commentService.answerComment(this.cliente._id, this.respuesta, this.comentario._id).subscribe(data =>{
     if(data["mensaje"]==="Contestado correctamente"){
        this.showToast("Contestado correctamente");
        this.router.navigate(['clientes',this.cliente._id,'comentarios'])
     }else{
        this.showToast("Comentario no contestado")
     }
    })
  }else{
    this.showToast("La respuesta no puede esta vacia");
  }
  }


  showToast(message: string){
    this.toastCtrl.create({
      message:message,
      duration:1500
    }).then(toastData => toastData.present());
  }
/*
  usoBoton(){
    this.plat.ready().then(() =>{
      document.addEventListener('backbutton', () =>{
        this.router.navigate(['clientes',this.cliente._id,'comentarios'])
      });
    });
  }*/
  
}
