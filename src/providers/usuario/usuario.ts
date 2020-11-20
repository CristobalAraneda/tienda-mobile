import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Url_SERVICIOS } from "../../config/url.servicios"





@Injectable()
export class UsuarioService {

  token:string;
  id_usuario:string;

  constructor(public http: HttpClient,
             private alertCtrl:AlertController, private platform: Platform, private storage: Storage) {

    this.cargar_storage();
    
  }

activo():boolean{
  if (this.token) {
    return true;      
  } else {
    return false;
  }
}

//TODO: ingresa le correo y contraseña
  ingresar( correo:string, contrasena:string ){

    let data = new HttpParams()
    .append("correo", correo)
    .append("contrasena", contrasena);

    console.log(data);

    let url = Url_SERVICIOS + "/login";

    return this.http.post( url, data)
               .map( resp=>{
                 let data_resp = resp
                 console.log( data_resp );

                 //valida la correo y contraseña
                 if ( data_resp["error"] ) {

                  //error true
                  this.alertCtrl.create({
                    title: "Error al iniciar",
                    subTitle: data_resp["mensaje"],
                    buttons: ["ok"]
                  }).present();
                   
                 }else{
                   //erro false
                   this.token = data_resp["token"];
                   this.id_usuario = data_resp["id_usuario"];

                   console.log(this.token);
                   console.log(this.id_usuario);
                    
                   //guardar storage
                   this.guardar_storage();
                 }
               })


  }
//TODO: cierre de secion de login
  cerrar_sesion(){

    this.token = null;
    this.id_usuario = null;

    //guardar en storage
    this.guardar_storage



  }

  //TODO: Guarda en storage de usuario
  guardar_storage(){

    if(this.platform.is("cordova")){

      //en dispocitivo
      this.storage.set('token',this.token);
      this.storage.set('id_usuario',this.id_usuario);

    }else{
      //computador
      if( this.token ){
        localStorage.setItem("token",this.token);
        localStorage.setItem("id_usuario",this.id_usuario);
      }else{
        localStorage.removeItem('token');
        localStorage.removeItem('id_usuario');
      }
    }

  }
  //TODO:  carga de storage de usuario
  cargar_storage(){

    let promesa =new Promise((resolve, reject) => {

      if(this.platform.is("cordova")){
        //en dispocitivo
         this.storage.ready()
                    .then( ()=> {
                      this.storage.get("token")
                                  .then( token => {
                                    if( token ){
                                      this.token =token;
                                    }
                                  })

                                  this.storage.get("id_usuario")
                                  .then( id_usuario => {
                                    if( id_usuario ){
                                      this.id_usuario =id_usuario;
                                    }
                                    resolve();
                                  })
                    })
        
  
      }else{
        //computador

        if( localStorage.getItem("token") ){
          // existe items en el storage
          this.token =localStorage.getItem("token");
          this.id_usuario =localStorage.getItem("id_usuario");
        }

        resolve();
       
      }
      
    });
    return promesa;
  }

    


}
