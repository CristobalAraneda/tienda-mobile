import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ModalController, Platform} from 'ionic-angular';

import { UsuarioService } from "../usuario/usuario";

import { CarritoPage, LoginPage } from "../../pages/index.paginas";

import { Storage } from '@ionic/storage';

@Injectable()
export class CarritoService {

  items:any[] = [];
  total_carrito:number;

  constructor(public http: HttpClient,
             private alertCtrl:AlertController,
             private platform:Platform,
             private storage:Storage,
             private modalCrtl:ModalController,
             private _us:UsuarioService
             ) {
   
              this.cargar_storage();
              this.actualiza_total();
  }

  ver_carrito(){
//TODO: Manejo de ver carro de compra
    let modal:any;

    if( this._us.token ){
      //muesta el carrito
      modal=this.modalCrtl.create( CarritoPage );
    }else{
      // muestra el login
      modal=this.modalCrtl.create( LoginPage );
    }
    modal.present();

    modal.onDidDismiss( (abrirCarrito:boolean)=>{

      console.log(abrirCarrito);

      if( abrirCarrito ){
        
        this.modalCrtl.create( CarritoPage ).present();
        
      }
    } )

  }
//TODO: Agrega item a carrito
  agregar_carrito( item_parametro:any ){

    console.log(item_parametro);

    for (let item of this.items) {
      if( item.codigo == item_parametro.codigo){

        this.alertCtrl.create({
          title: "Item exixte",
          subTitle: item_parametro.producto + ", ya se encuentra en el carrito de compra",
          buttons:["OK"]
        }).present();

        return;
      }
      
    }
    this.items.push( item_parametro );
    this.actualiza_total();
    this.guardar_storage();

  }
//TODO: Guarda en storage de carrito
  guardar_storage(){

    if(this.platform.is("cordova")){

      //en dispocitivo

      this.storage.set('items',this.items);

    }else{
      //computador
      localStorage.setItem("items", JSON.stringify( this.items));
    }

  }
  //TODO:  carga de storage de carrito
  cargar_storage(){

    let promesa =new Promise((resolve, reject) => {

      if(this.platform.is("cordova")){
        //en dispocitivo
         this.storage.ready()
                    .then( ()=> {
                      this.storage.get("items")
                                  .then( items => {
                                    if( items ){
                                      this.items =items;
                                    }
                                    resolve();
                                  })
                    })
        
  
      }else{
        //computador

        if( localStorage.getItem("items") ){
          // existe items en el storage
          this.items =JSON.parse( localStorage.getItem("items") );
        }

        resolve();
       
      }
      
    });
    return promesa;

  }

  actualiza_total(){

    this.total_carrito = 0;
    for (let item of this.items ) {
      this.total_carrito += Number( item.precio_compra );

      
    }
    console.log(this.total_carrito);
      
  }
//TODO: ellimina los iten de carrito del storage
  remove_item( idx:number ){

    this.items.splice(idx,1);
    this.guardar_storage();
  }

}
