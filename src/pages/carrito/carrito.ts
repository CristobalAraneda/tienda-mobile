import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CarritoService } from '../../providers/index.sevices';


@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams,
            private _cs:CarritoService,
            private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');

    
  }

}
