import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductosService, CarritoService,UsuarioService } from "../../providers/index.sevices"

import {ProductoPage} from "../index.paginas"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage = ProductoPage;

  constructor(public navCtrl: NavController,
              private _ps: ProductosService,
              private _cs: CarritoService,
              private _us: UsuarioService) {

  }

  siguiente_page( infiniteScroll){

    this._ps.cargar_todos()
            .then( ()=>{
              infiniteScroll.complete();
            })

  }

}
