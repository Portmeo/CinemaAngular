import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeMovie'
})
export class TimeMoviePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    const hours = Math.floor(value / 60);
    const minutes = Math.floor(value % 60);
    return `${hours}h ${minutes}m`;
  }

}
