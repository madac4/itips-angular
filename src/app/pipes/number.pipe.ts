import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'number',
    standalone: true,
})
export class NumberPipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): unknown {
        const formattedNumber = new Intl.NumberFormat('de-DE').format(value);
        return formattedNumber;
    }
}
