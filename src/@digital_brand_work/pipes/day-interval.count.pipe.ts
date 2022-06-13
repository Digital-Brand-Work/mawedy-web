import { Pipe, PipeTransform } from '@angular/core'
import * as dayjs from 'dayjs'

@Pipe({
	name: 'day_interval',
})
export class DayIntervalPipe implements PipeTransform {
	transform(from: Date, to: Date): string {
		const intervalFrom = dayjs(from)

		const intervalTo = dayjs(to)

		return intervalTo.diff(intervalFrom, 'days').toString()
	}
}
