import { empty, hasData } from 'app/app-core/helpers'
import { Pipe, PipeTransform } from '@angular/core'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import * as dayjs from 'dayjs'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'

@Pipe({
	name: 'filter_by_doctor',
})
export class FilterByDoctorPipe implements PipeTransform {
	transform(
		appointments: Appointment[],
		doctor: string | null,
	): Appointment[] {
		if (empty(doctor) || doctor === 'null') {
			return appointments
		}

		return appointments.filter((appointment) => {
			return appointment?.doctor?.id === doctor
		})
	}
}
