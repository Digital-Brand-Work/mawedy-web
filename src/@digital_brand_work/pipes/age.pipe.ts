import { Pipe, PipeTransform } from '@angular/core'
import * as dayjs from 'dayjs'

@Pipe({
	name: 'age',
})
export class AgePipe implements PipeTransform {
	transform(value: Date): string {
		let today = dayjs()

		let birthDate = dayjs(value)

		let years = today.diff(birthDate, 'years')

		return `${years} Yrs`
	}
}
