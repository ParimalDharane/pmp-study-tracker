import { Pipe, PipeTransform } from '@angular/core';
import { Topic } from './topic.model';

@Pipe({
  name: 'stsearch'
})
export class StsearchPipe implements PipeTransform {
  transform(values: Topic[], searchText: string): any {
    if (!values) return [];
    if (!searchText) return values;

    return values.filter(function(item){
      return (item.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
       ||  (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
       ||  (item.area.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
       ||  (item.procgroup.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    })
  }
}
