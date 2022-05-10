import { Component, OnInit } from '@angular/core'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'

@Component({
	selector: 'doctor-details-working-schedule',
	templateUrl: './doctor-details-working-schedule.component.html',
	styleUrls: ['./doctor-details-working-schedule.component.scss'],
})
export class DoctorDetailsWorkingScheduleComponent implements OnInit {
	constructor() {}

	weekdays: WeekDay[] = weekDays

	ngOnInit(): void {}

	identity = (item: any): any => item

	shorten(day: WeekDay): string {
		const char = day.split('')

		return `${char[0]}${char[1]}${char[2]}`
	}
}
