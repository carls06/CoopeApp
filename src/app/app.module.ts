import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule} from 'angularfire2/firestore'
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { PrestamistasComponent } from './components/prestamistas/prestamistas.component';
import { DetailPrestamistaComponent } from './components/detail-prestamista/detail-prestamista.component';
import {  HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent,UsuariosComponent,DetailUserComponent,PrestamistasComponent,DetailPrestamistaComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    AngularFireAuthModule,
    IonicStorageModule,
    HttpClientModule
    
  ],
  providers: [
    StatusBar,
    HttpClientModule,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
