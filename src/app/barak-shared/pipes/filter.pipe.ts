import {Pipe, PipeTransform} from '@angular/core';
import {ICollectionItem} from '../types/ICollectionItem';

@Pipe({
  name: 'myFilter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: ICollectionItem[], term, isCaseSensitive: boolean): any {
    //console.log(`term: ${term}, isCaseSensitive: ${isCaseSensitive}`);
    // tslint:disable-next-line: max-line-length
    return term ? items.filter(item => !isCaseSensitive ? item.name.toString().toLowerCase().indexOf(term.toLowerCase()) !== -1 : item.name.indexOf(term) !== -1) : items;
  }

}
