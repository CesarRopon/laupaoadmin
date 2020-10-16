import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto/producto.service';
import { Producto } from 'src/app/models/producto';
@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
})
export class ProductoDetallePage implements OnInit {

  producto: Producto[];
  idProd:any

  constructor(private actvRoute: ActivatedRoute, private prodServ: ProductoService) { }

  ngOnInit() {
    this.actvRoute.paramMap.subscribe(param =>{
     this.idProd = param.get('idProducto');
    });
    this.producto = this.obtenerProd(this.idProd);
  }

 obtenerProd(id):any {
    this.prodServ.obtenerProductoEspecifico(id).subscribe(data =>{
      this.producto =data["contenido"]["producto"] ;

    })
  }

}
