import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import  {HttpClientModule, HttpHeaders} from '@angular/common/http'; 
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth'; 
import {environment} from '../environments/environment';
import {IonicStorageModule} from '@ionic/storage';
import {PipesModule} from '../app/pipes/pipes.module';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {  Network} from "@ionic-native/network/ngx";
import { CallNumber } from "@ionic-native/call-number/ngx";
import {NgCalendarModule} from 'ionic2-calendar';
import {FileTransfer} from '@ionic-native/file-transfer/ngx'
//import {HTTP} from '@ionic-native/http';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
            AppRoutingModule, 
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            IonicStorageModule.forRoot(),
            PipesModule,
            NgCalendarModule
            ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Network,
    CallNumber,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
     },
     
   // HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
