import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Storage} from '@ionic/storage'
import { AuthService } from '../servicios/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {

  constructor(private router:Router, 
              public storage: Storage,
              private auths: AuthService){

  }
  token;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
    if(!this.auths.isLogged){
      console.log("es falseeee");
      
      this.router.navigate(["login"]);
      return false
    }else{
      console.log("Es trueee")     
      return true;
    }
    

  }
  
}
