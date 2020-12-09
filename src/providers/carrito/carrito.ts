import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ModalController, Platform} from 'ionic-angular';

import { UsuarioService } from "../usuario/usuario";

import { Url_SERVICIOS } from "../../config/url.servicios";

import { CarritoPage, LoginPage } from "../../pages/index.paginas";

import { Storage } from '@ionic/storage';


@Injectable()
export class CarritoService {

  items:any[] = [];
  total_carrito:number;
  ordenes:any[] =[];

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
//TODO: carga el total del carrito 
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
    this.actualiza_total();
  }

  //TODO: Realiza los pedido 
  realizar_pedido(){


    let codigo:string[]=[];

    for (let item of this.items) {
      codigo.push( item.codigo );
      
    }

    let data = new HttpParams()

    .append("items",codigo.join(","));

   //BUG: validar usuario SW

    let url = `${Url_SERVICIOS}/pedidos/realizar_orden/${ this._us.token}/${ this._us.id_usuario}`;

    //console.log(url);
    //console.log(data["updates"]);

    this.http.post( url, data )
        .subscribe( resp =>{

          let respuesta = resp;


          if( respuesta["error"]){
            //FIXME: mostar error

            this.alertCtrl.create({
              title: "Error al Realizar pedido",
              subTitle: respuesta["mensaje"],
              buttons: ["ok"]
            }).present();

           
          }else{
            this.items= [];

            //FIXME: borrar storage

            this.alertCtrl.create({
              title:" Orden ralizado",
              subTitle: "Nº Orden "+respuesta["orden_id"],
              buttons:["OK"]
            }).present();
          }
          
        }) 


    
  }
//TODO: Carga todas las ordenes
  cargar_odenes(){

    let url = `${Url_SERVICIOS}/pedidos/obtener_pedido/${ this._us.token}/${ this._us.id_usuario}`;

    this.http.get( url )
        .subscribe( data =>{

          if(data["error"]){

            //FIXME: manejar error

            console.log(data["mensaje"]);

          }else{

            this.ordenes = data["mensaje"];

            console.log(this.ordenes);



          }

        })
  }
//FIXME: dar de alta el pedido 
  borrar_oredene(){
    /* cambiar la estrictura de borrar , mejorar a para  produccion metodo 181 */

    let url = `${Url_SERVICIOS}/pedidos/obtener_pedido/${ this._us.token}/${ this._us.id_usuario}`;
    this.http.delete( url )
        .map( resp => resp);
  }


}
