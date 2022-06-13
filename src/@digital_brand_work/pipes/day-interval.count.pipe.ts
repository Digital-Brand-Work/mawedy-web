import { Pipe, PipeTransform } from '@angular/core'
import * as dayjs from 'dayjs'

@Pipe({
	name: 'day_interval',
})
export class DayIntervalPipe implements PipeTransform {
	transform(to: Date): string {
		const intervalFrom = dayjs()

		const intervalTo = dayjs(to)

		return intervalTo.diff(intervalFrom, 'days').toString()
	}
}
