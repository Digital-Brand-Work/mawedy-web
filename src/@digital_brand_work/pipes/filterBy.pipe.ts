import { Pipe, PipeTransform } from '@angular/core'
import * as dayjs from 'dayjs'

@Pipe({
	name: 'filter_by_date',
})
export class FilterByDatePipe implements PipeTransform {
	transform(items: any[], date: Date): any[] {
		return items.filter(
			(item) =>
				dayjs(item.date).format('MM-DD-YY') ===
				dayjs(date).format('MM-DD-YY'),
		)
	}
}
