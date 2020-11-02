import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosService } from "../../providers/productos/productos"

import {ProductoPage} from "../index.paginas"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
              public _ps: ProductosService) {

  }

  siguiente_page( infiniteScroll){

    this._ps.cargar_todos()
            .then( ()=>{
              infiniteScroll.complete();
            })

  }

}
