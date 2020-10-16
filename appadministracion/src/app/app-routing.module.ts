import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../app/guards/auth.guard'
import {NoauthGuard} from '../app/guards/noauth.guard'
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule),
    
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
   
  },
  {
    path: 'registrar',
    loadChildren: () => import('./paginas/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'menuprincipal',
    children:[
      {
        path:'',
        loadChildren: () => import('./paginas/menuprincipal/menuprincipal.module').then( m => m.MenuprincipalPageModule),
        

      },
      {
        path:':idAdmin',
        loadChildren:() => import ('./paginas/menuprincipal/update-admin/update-admin.module').then(m =>m.UpdateAdminPageModule) 
      }
    ]
      },
  {
    path: 'changepass',
    loadChildren: () => import('./paginas/changepass/changepass.module').then( m => m.ChangepassPageModule),

  },
  {
    path: 'clientes',
    children:[
      {
        path:'',
        loadChildren: () => import('./paginas/clientes/clientes.module').then( m => m.ClientesPageModule),
      },
      {
        path:':idCliente',
        children:[
          {
            path:'comentarios',
            children:[
              {
                path:'',
                loadChildren: () => import('./paginas/clientes/comentarios/comentarios.module').then(m =>m.ComentariosPageModule) ,
              },
              {
                path:':idComentario',
                loadChildren: () => import('./paginas/clientes/comentarios/contestacion/contestacion.module').then(m =>m.ContestacionPageModule) ,
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'productos',
    children:[
      {
        path: '',
        loadChildren: () => import('./paginas/productos/productos.module').then( m => m.ProductosPageModule),
       
      },
      {
        path: ':idProducto',
        loadChildren :() => import ('./paginas/productos/producto-detalle/producto-detalle.module').then (m =>m.ProductoDetallePageModule)
      }, 
    ]
  },
  {
    path: 'mapa-ubicacion',
    children: [
      {
          path:':idPedido',
          loadChildren: () => import('./paginas/mapa-ubicacion/mapa-ubicacion.module').then( m => m.MapaUbicacionPageModule)
      }
    ]
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./paginas/agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'tamanio',
    children:[
      {
        path:'',
        loadChildren: () => import('./paginas/tamanio/tamanio.module').then( m => m.TamanioPageModule),
      },
      {
        path:':idTamanio',
        loadChildren: () => import ('./paginas/tamanio/update/update.module').then(m => m.UpdatePageModule)
      }
    ]
  },
  {
    path: 'especialidad',
    children:[
      {
        path:'',
        loadChildren: () => import('./paginas/especialidad/especialidad.module').then( m => m.EspecialidadPageModule),
      },
      {
        path:':idEspecialidad',
        loadChildren: () => import('./paginas/especialidad/updateespecialidad/updateespecialidad.module').then(m => m.UpdateespecialidadPageModule)
      }
    ]
    
  },
  {
    path: 'tipo',
    children:[
      {
        path: '',
        loadChildren: () => import('./paginas/tipo/tipo.module').then( m => m.TipoPageModule),
      },
      {
        path: ':idTipo',
        loadChildren: () => import ('./paginas/tipo/update-tipo/update-tipo.module').then(m => m.UpdateTipoPageModule)
      }
    ]
  },
  {
    path: 'agregar-tipo',
    loadChildren: () => import('./paginas/agregar-tipo/agregar-tipo.module').then( m => m.AgregarTipoPageModule),

  },
  {
    path: 'pedidos',
    children:[
      {
        path:'',
        loadChildren: () => import('./paginas/pedidos/pedidos.module').then( m => m.PedidosPageModule)
      },
      {
        path:':idPedido',
        loadChildren: () => import ('./paginas/pedidos/detalle-pedido/detalle-pedido.module').then(m =>m.DetallePedidoPageModule)
      }
    ]
  },
  {
    path: 'agregartamanio',
    loadChildren: () => import('./paginas/agregartamanio/agregartamanio.module').then( m => m.AgregartamanioPageModule)
  },
  {
    path: 'agregarespecialidad',
    loadChildren: () => import('./paginas/agregarespecialidad/agregarespecialidad.module').then( m => m.AgregarespecialidadPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
