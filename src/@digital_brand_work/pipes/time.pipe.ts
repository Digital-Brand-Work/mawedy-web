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

		if (
			value.toString().split(':')[1] &&
			value.toString().split(':')[1].length === 3
		) {
			return (value < 10 ? '0' : '') + value.toString().slice(0, -1)
		}

		return ((value < 10 ? '0' : '') + value).toString()
	}
}
