import { Pipe, PipeTransform } from '@angular/core'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { AppointmentStatusEnum } from '../enums/appointment-status.enum'

@Pipe({ name: 'dashboard_status' })
export class DashboardStatusPipe implements PipeTransform {
	transform(appointment: Appointment): string {
		if (appointment.status === AppointmentStatusEnum.CANCELLED) return `red`

		if (appointment.status === AppointmentStatusEnum.CONFIRMED)
			return `green`
		if (appointment.status === AppointmentStatusEnum.DONE) return `blue`

		if (appointment.status === AppointmentStatusEnum.PENDING) return `red`
	}
}
