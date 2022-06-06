import { TimeSlot } from './../../../doctor.model'
import { Component, Input, OnInit } from '@angular/core'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'

@Component({
	selector: 'doctor-details-working-schedule',
	templateUrl: './doctor-details-working-schedule.component.html',
	styleUrls: ['./doctor-details-working-schedule.component.scss'],
})
export class DoctorDetailsWorkingScheduleComponent implements OnInit {
	constructor() {}

	@Input() timeslots: TimeSlot[] = []

	weekdays: WeekDay[] = weekDays

	ngOnInit(): void {}

	identity = (item: any): any => item

	isAvailable(timeslots: TimeSlot[]): boolean {
		let available = false

		for (let slot of timeslots) {
			if (slot.active) {
				available = true
			}
		}

		return available
	}
}
