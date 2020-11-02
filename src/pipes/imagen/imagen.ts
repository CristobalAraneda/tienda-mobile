import { Pipe, PipeTransform } from '@angular/core';

import { Url_IMAGENES } from "../../config/url.servicios";


@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  
  transform(codigo: string) {
    return Url_IMAGENES + codigo +".jpg";
  }
}
