import { Appointment } from './../../modules/admin/appointments/appointment.model'
import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'calendar-items',
	templateUrl: './calendar-item.component.html',
	styleUrls: ['./calendar-item.component.scss'],
	animations: [...dbwAnimations],
})
export class CalendarItemComponent implements OnInit {
	constructor() {}

	@Input() appointments: Appointment[] = []

	@Input() date: Date

	ngOnInit(): void {}

	identity = (item: any) => item
}
