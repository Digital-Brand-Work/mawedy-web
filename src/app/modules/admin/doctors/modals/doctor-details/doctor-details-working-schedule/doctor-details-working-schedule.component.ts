import { TimeSlot } from './../../../doctor.model'
import { Component, OnInit } from '@angular/core'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'

@Component({
	selector: 'doctor-details-working-schedule',
	templateUrl: './doctor-details-working-schedule.component.html',
	styleUrls: ['./doctor-details-working-schedule.component.scss'],
})
export class DoctorDetailsWorkingScheduleComponent implements OnInit {
	constructor() {}

	timeslots: TimeSlot[] = []

	weekdays: WeekDay[] = weekDays

	ngOnInit(): void {}

	getTimeSlot = (day: any): TimeSlot =>
		this.timeslots.find(
			(slot) => day.toLowerCase() === slot.day.toLowerCase(),
		)

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

	shorten(day: WeekDay): string {
		const char = day.split('')

		return `${char[0]}${char[1]}${char[2]}`
	}
}
