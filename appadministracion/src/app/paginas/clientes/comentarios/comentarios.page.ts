import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/comentariosCliente';
import { ClienteServiceService } from 'src/app/servicios/clientes/cliente-service.service';
import { ComentariosService } from 'src/app/servicios/comentarios/comentarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import {Platform } from '@ionic/angular'; 
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  numero =0;
  comentarios: Comentario[];
  cliente = new Cliente;
  constructor(private clienteService: ClienteServiceService,
              private commentService: ComentariosService,
              private actvRouter: ActivatedRoute,
              private plat: Platform,
              private router: Router  ) { 


              }

  ngOnInit() {
     
    //this.usoBoton();
    this.actvRouter.paramMap.subscribe(param =>{
      this.cliente._id = param.get('idCliente');
      console.log(this.cliente._id);
      
    })
    this.getClient();
    this.getComments(this.cliente._id)
  }

  getComments(id){
    this.commentService.getAllCommentsByClient(id).subscribe(data =>{
      if(data["comentariosCliente"].length ===0){
        this.numero=1
        console.log(data);
        
      }else{
        this.numero=0;
        this.comentarios = data["comentariosCliente"]
        console.log(this.comentarios);
        
      }
    })
  }

  getClient(){
    this.clienteService.getClienteEspecifico(this.cliente).subscribe(data =>{
      this.cliente.strNombre= data["contenido"].strNombre;
      this.cliente.strApellidos = data["contenido"].strApellidos;
    });
  }
/*
  usoBoton(){
    this.plat.ready().then(() =>{
      document.addEventListener('backbutton', () =>{
        this.router.navigate(['/clientes'])
      });
    });
  }
*/
}
