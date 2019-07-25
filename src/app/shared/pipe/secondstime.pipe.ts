import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondstime'
})
export class SecondsTimePipe implements PipeTransform {

  transform(value: any) {
    const d = Number(value);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    // const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? 'hr, ' : 'hrs, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? 'min ' : 'mins ') : '';
    // const sDisplay = s > 0 ? s + (s === 1 ? ' sec' : ' secs') : '';
    return hDisplay + mDisplay;
  }

}
