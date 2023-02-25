import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(myArray: any[], searchFilter: string): any[] {
    if (!myArray || !searchFilter) {
      return myArray;
    }

    return myArray.filter(item => {
      return item.name.toLowerCase().includes(searchFilter.toLowerCase())
        || item.address.toLowerCase().includes(searchFilter.toLowerCase())
        || item.phoneNumber.toLowerCase().includes(searchFilter.toLowerCase()
        || item.password.toLowerCase().includes(searchFilter.toLowerCase())
        || item.password.toLowerCase().includes(searchFilter.toLowerCase()));
    });
  }
}
