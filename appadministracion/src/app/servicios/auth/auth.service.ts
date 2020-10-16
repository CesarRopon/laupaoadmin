import { Injectable } from '@angular/core';
import {HttpClient }from '@angular/common/http';
import {Admin} from '../../models/admin';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Storage} from '@ionic/storage';

//import { HTTP } from '@ionic-native/http';
//No olvidar importar aqui las clases


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  admin : Admin;

  user : User;

  readonly  urlApis = 'https://appadministracion.herokuapp.com/api';
  readonly urlApiLocal  = 'http://localhost:3000/api';

  public isLogged: any;
  constructor(private http: HttpClient, 
              private authfire: AngularFireAuth,
              public storage: Storage) { 
            
                this.storage.get('token').then((val) =>{
                  this.isLogged = val;
                })

    
    //authfire.authState.subscribe(user => (this.isLogged = user));  
  }

   login(user: User){  
    return this.http.post(`${this.urlApis}/admin/login`,user)
  }

   async registrar(admin:Admin){
    return await this.http.post(`${this.urlApis}/admin`, admin); 
  }


  obtenerAdmins(): any{
    return this.http.get(`${this.urlApis}/admin`);
  }

  async registrarEnfirebase(admin:Admin){
    return await this.authfire.createUserWithEmailAndPassword(admin.strEmail, admin.strPassword)
  }


  changePass(user: User){
    return this.http.put(`${this.urlApis}/admins/changePass/${user.strEmail}`, user); 
  }
  
  obtenerEspecifico(strEmail: string){
    return this.http.get(`${this.urlApis}/admin/${strEmail}`);
  }

  logOut(){
    this.authfire.signOut();
  }

  updateAdmin(idAdmin: string, admin: Admin ){
    return this.http.put(`${this.urlApis}/admin/${idAdmin}`, admin);
  }

  obtenerAdminById(idAdmin: string){
    return this.http.get(`${this.urlApis}/admins/${idAdmin}`);
  }
}
