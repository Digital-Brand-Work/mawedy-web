import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'appointments-month-calendar-appointment-item',
	templateUrl:
		'./appointments-month-calendar-appointment-item.component.html',
	styleUrls: [
		'./appointments-month-calendar-appointment-item.component.scss',
	],
})
export class AppointmentsMonthCalendarAppointmentItemComponent
	implements OnInit
{
	constructor() {}

	/**
    	green = Through Clinic = #E9F0F1
    	violet = Phone Appointment = #EDEAF7
    	blue = Online = #E5EFF7
	*/
	@Input() color: 'green' | 'violet' | 'blue'

	ngOnInit(): void {}
}
