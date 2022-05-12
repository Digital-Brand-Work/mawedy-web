import { Component, Input, OnInit } from '@angular/core'
import { DashboardAppointmentDetailsModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-details/dashboard-appointment-details.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'appointments-day-calendar-appointment-item',
	templateUrl: './appointments-day-calendar-appointment-item.component.html',
	styleUrls: ['./appointments-day-calendar-appointment-item.component.scss'],
})
export class AppointmentsDayCalendarAppointmentItemComponent implements OnInit {
	constructor(
		private dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
	) {}

	dashboardAppointmentDetailsModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentDetailsModal.opened$

	/**
    	green = Through Clinic = #E9F0F1
    	violet = Phone Appointment = #EDEAF7
    	blue = Online = #E5EFF7
	*/
	@Input() color: 'green' | 'violet' | 'blue' = 'blue'

	ngOnInit(): void {}
}
