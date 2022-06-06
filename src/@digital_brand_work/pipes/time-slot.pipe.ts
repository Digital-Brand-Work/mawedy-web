import { Pipe, PipeTransform } from '@angular/core'
import { TimeSlot } from 'app/modules/admin/doctors/doctor.model'

@Pipe({
	name: 'toTimeSlot',
})
export class ToTimeSlotPipe implements PipeTransform {
	transform(day: string, timeslots: TimeSlot[]): TimeSlot | boolean {
		if (timeslots.length === 0) {
			return false
		}

		return timeslots.find(
			(slot) => day.toLowerCase() == slot.day.toLowerCase(),
		)
	}
}
