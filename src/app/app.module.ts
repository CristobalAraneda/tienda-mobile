import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
//paginas
import { ProductoPage,TabsPage,CarritoPage,CategoriasPage,LoginPage,OrdenesPage,OrdenesDetallePage, PorCategoriasPage, HomePage } from "../pages/index.paginas";
 

//pipes
import { ImagenPipe } from "../pipes/imagen/imagen"

//servicios
import { CarritoService, ProductosService, UsuarioService } from '../providers/index.sevices';


@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    TabsPage,
    ProductoPage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage, 
    PorCategoriasPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ProductoPage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage, 
    PorCategoriasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoService,
    ProductosService,
    UsuarioService
  ]
})
export class AppModule {}
