import { Pipe, PipeTransform } from '@angular/core'
import { parseInt } from 'lodash'

@Pipe({
	name: 'toTime',
})
export class TimePipe implements PipeTransform {
	transform(value: string): string {
		return (
			(parseInt(value.toString().split(':')[0]) < 10 ? '0' : '') + value
		)
	}
}
