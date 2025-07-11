import { empty, hasData } from 'app/app-core/helpers'
import { Pipe, PipeTransform } from '@angular/core'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import * as dayjs from 'dayjs'

@Pipe({
	name: 'appointmentsCount',
})
export class AppointmentCountsPipe implements PipeTransform {
	transform(appointments: Appointment[], date: Date): number {
		let count: number = 0

		appointments.forEach((appointment) => {
			if (
				dayjs(appointment.date).format('MM-DD-YY') ===
				dayjs(date).format('MM-DD-YY')
			) {
				count++
			}
		})

		return count - 2
	}
}
