import { Pipe, PipeTransform } from '@angular/core'
import {
	APPOINTMENT_INTERVAL,
	END_OF_MINUTES,
} from 'app/mawedy-core/constants/app.constant'

@Pipe({
	name: 'add30Minutes',
})
export class add30MinutesPipe implements PipeTransform {
	transform(value: string): string {
		if (value.split(':').length === 0) return value

		const [hour, minutes] = value.split(':')

		if (parseInt(minutes) + APPOINTMENT_INTERVAL < END_OF_MINUTES) {
			return `${hour}:${parseInt(minutes) + APPOINTMENT_INTERVAL}`
		}

		return `${parseInt(hour) + 1}:${
			parseInt(minutes) - APPOINTMENT_INTERVAL
		}`
	}
}
