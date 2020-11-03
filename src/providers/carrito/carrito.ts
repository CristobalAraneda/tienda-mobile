import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';



@Injectable()
export class CarritoService {

  items:any[] = [];

  constructor(public http: HttpClient,
             private alertCtrl:AlertController) {
    console.log('Hello CarritoProvider Provider');
  }

  agregar_carrito( item_parametro:any ){

    console.log(item_parametro);

    for (let item of this.items) {
      if( item.codigo == item_parametro.codigo){

        this.alertCtrl.create({
          title: "Item exixte",
          subTitle: item_parametro + ", ya se encuentra en el carrito de compra",
          buttons:["OK"]
        }).present();

        return;
      }
      
    }
    this.items.push( item_parametro );

  }

}
