import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'toTime',
})
export class TimePipe implements PipeTransform {
	transform(value: number): string {
		if (
			value.toString().charAt(0) === '0' &&
			value.toString().length === 2
		) {
			return value.toString()
		}

		return (value < 10 ? '0' : '') + value
	}
}
