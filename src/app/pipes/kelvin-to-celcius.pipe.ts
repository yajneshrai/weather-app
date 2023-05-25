import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelcius'
})
export class KelvinToCelciusPipe implements PipeTransform {
  private readonly KELVIN: number = 273.15;

  transform(value: number, ...args: unknown[]): unknown {
    return Math.ceil((value - this.KELVIN)).toFixed(0);
  }

}
