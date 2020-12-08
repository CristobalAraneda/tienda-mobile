import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.orden = this.navParams.get("orden");
  }

 // me quede aqui:181 eliminar y implementar buscador

 

}
