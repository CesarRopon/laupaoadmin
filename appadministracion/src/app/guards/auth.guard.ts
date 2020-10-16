import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from'../servicios/auth/auth.service';
import {Storage} from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  variable;
  ed;
  constructor(private authS: AuthService, 
              private router:Router,
              public storage: Storage){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      if(this.authS.isLogged){
        console.log("true");
        return true
      }
      console.log("false");
      this.router.navigate(["login"]);
      return false;

  }
  
}
