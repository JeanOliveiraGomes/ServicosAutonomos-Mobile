import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ElipseFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'elipseFilter',
})
export class ElipseFilterPipe implements PipeTransform {
  /**
   * Encurta o tamanho da string e acrescenta (...) no final da string.
   */
  transform(input, size) {
    
    if(input.length <= size)return input;
    var output  = input.substring(0,(size|| 2))+"...";
    
    return output;
  };
}
