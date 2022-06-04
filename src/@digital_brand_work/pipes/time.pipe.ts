import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'toTime',
})
export class TimePipe implements PipeTransform {
	transform(value: number): string {
		return (value < 10 ? '0' : '') + value
	}
}
