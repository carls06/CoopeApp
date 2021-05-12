import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioI } from '../models/usuario.interface';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: UsuarioI[], texto: string): UsuarioI[] {
    if(texto.length===0){return value;}
    texto=texto.toLocaleLowerCase();

    return value.filter((user)=>{
      return user.nombre.includes(texto);
    })
  }

}
