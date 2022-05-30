import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { DashboardAppointmentCancelAndAssignSlotModal } from '../dashboard-appointment-cancel-and-assign-slot/dashboard-appointment-cancel-and-assign-slot.service'
import { DashboardAppointmentDetailsModal } from '../dashboard-appointment-details/dashboard-appointment-details.service'
import { DashboardAppointmentConfirmCancelAppointmentModal } from './dashboard-appointment-confirm-cancel-appointment.service'

@Component({
	selector: 'dashboard-appointment-confirm-cancel-appointment',
	templateUrl:
		'./dashboard-appointment-confirm-cancel-appointment.component.html',
	styleUrls: [
		'./dashboard-appointment-confirm-cancel-appointment.component.scss',
	],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentConfirmCancelAppointmentComponent
	implements OnInit
{
	constructor(
		private dashboardAppointmentConfirmCancelAppointmentModal: DashboardAppointmentConfirmCancelAppointmentModal,
		private dashboardAppointmentCancelAndAssignSlotModal: DashboardAppointmentCancelAndAssignSlotModal,
		private dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentConfirmCancelAppointmentModal.opened$

	dashboardAppointmentCancelAndAssignSlotModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentCancelAndAssignSlotModal.opened$

	dashboardAppointmentDetailsModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentDetailsModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
