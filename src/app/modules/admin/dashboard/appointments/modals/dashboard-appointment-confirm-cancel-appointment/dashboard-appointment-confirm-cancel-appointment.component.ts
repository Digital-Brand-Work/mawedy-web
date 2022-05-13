import { Component, HostListener, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { DashboardAppointmentConfirmCancelAppointmentModal } from './dashboard-appointment-confirm-cancel-appointment.service'

@Component({
	selector: 'dashboard-appointment-confirm-cancel-appointment',
	templateUrl:
		'./dashboard-appointment-confirm-cancel-appointment.component.html',
	styleUrls: [
		'./dashboard-appointment-confirm-cancel-appointment.component.scss',
	],
})
export class DashboardAppointmentConfirmCancelAppointmentComponent
	implements OnInit
{
	constructor(
		private dashboardAppointmentConfirmCancelAppointmentModal: DashboardAppointmentConfirmCancelAppointmentModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentConfirmCancelAppointmentModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
