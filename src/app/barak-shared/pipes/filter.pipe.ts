import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'myFilter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term, isCaseSensitive: boolean): any {
    //console.log(`term: ${term}, isCaseSensitive: ${isCaseSensitive}`);
    // tslint:disable-next-line: max-line-length
    return term ? items.filter(item => !isCaseSensitive ? item.toString().toLowerCase().indexOf(term.toLowerCase()) !== -1  : item.indexOf(term) !== -1) : items;
  }

}
