import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NameFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'nameFilter',
})
export class NameFilterPipe implements PipeTransform {
  /**
   * Formatador do nome formato Xxxx xx Xxx Xxx = Alisson Dias da Cruz
   */
  transform(input) {
    var listadeNomes = input.split(" ")
    var listaNomesFormatado = listadeNomes.map(nome=>{
      if(/(da|de)/.test(nome))return nome;
      return nome.charAt(0).toUpperCase()+nome.substring(1).toLowerCase();
    });
    return listaNomesFormatado.join(" ");
    
  };  
}
