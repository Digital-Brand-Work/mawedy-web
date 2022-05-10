import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'

@Component({
	selector: 'working-schedule',
	templateUrl: './working-schedule.component.html',
	styleUrls: ['./working-schedule.component.scss'],
})
export class WorkingScheduleComponent implements OnInit {
	constructor() {}

	@Output() onChangeSchedule = new EventEmitter()

	weekdays: string[] = weekDays

	ngOnInit(): void {}

	identity = (item: any) => item

	shorten(day: WeekDay) {
		const char = day.split('')

		return `${char[0]}${char[1]}${char[2]}`
	}
}
