import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

import { Url_SERVICIOS } from "../../config/url.servicios";

@Injectable()
export class ProductosService {

  pagina:number = 0;
  productos:any[] = [];
  lineas:any[] = [];
  por_categoria:any[] = [];
  resultados:any[] = [];


  constructor(public http: HttpClient) {
    //console.log('Hello ProductosProvider Provider');
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_por_categoria( categoria:number){


    let url = Url_SERVICIOS + "/productos/por_tipo/" + categoria;
    console.log( url);

    this.http.get( url )
             .map( resp => resp )
             .subscribe( data => {

              console.log(data);

              if(data['error']){

                //FIXME:manejo de error

              }else{
               
                this.por_categoria = data["productos_por_tipo"];
                
                 console.log(this.por_categoria);
              }

             })

  }

  cargar_lineas(){


    let url = Url_SERVICIOS + "/lineas";
      console.log( url);

      this.http.get( url )
               .map( resp => resp )
               .subscribe( data => {

                console.log(data);

       if(data['error']){

         //FIXME:manejo de error
         

       }else{
        
         this.lineas = data['lineas']

          
         
          console.log(this.lineas);
          
       }

    
        

      })


  }

  cargar_todos(){

    let promesa = new Promise( (resolve, reject ) => {

      let url = Url_SERVICIOS + "/productos/todos/" + this.pagina;
      console.log( url);
  
      this.http.get( url )
               .map( resp => resp )
               .subscribe( data => {
  
                console.log(data);
  
                if(data['error']){

                  //FIXME: manejo de erro 
                 
  
                }else{
                 
                  let nuevaData = this.agrupar(data['productos'],2)

                   this.productos.push(...nuevaData);
                  
                   console.log(this.productos);
                   this.pagina +=1;
                }

                resolve(); 
                 
  
               })

    });
    return promesa;

  
  }


  private agrupar( arr:any, tamano:number){

    let nueviArreglo = [];
    for( let i = 0; i<arr.length; i+=tamano ){
      nueviArreglo.push( arr.slice(i, i+tamano) );
    }
    console.log( nueviArreglo );
    return nueviArreglo;
  }

  buscar_producto( busquda:string ){
  //BUG: al limpiar el tremino de buscar en vacio llama el servicio en error 
    let url = Url_SERVICIOS + "/productos/buscar/" + busquda;

    this.http.get( url )
        .subscribe( resp=>{
          let data = resp;

          this.resultados = data["productos_Busqueda"]
        });


  }

}
