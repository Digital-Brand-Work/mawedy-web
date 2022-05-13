import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { DashboardAppointmentConfirmReassignSlotModal } from '../dashboard-appointment-confirm-reassign-slot/dashboard-appointment-confirm-reassign-slot.service'
import { DashboardAppointmentDetailsModal } from './dashboard-appointment-details.service'

@Component({
	selector: 'dashboard-appointment-details',
	templateUrl: './dashboard-appointment-details.component.html',
	styleUrls: ['./dashboard-appointment-details.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentDetailsComponent implements OnInit {
	constructor(
		private dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private dashboardAppointmentConfirmReassignSlotModal: DashboardAppointmentConfirmReassignSlotModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentDetailsModal.opened$

	dashboardAppointmentConfirmReassignSlotModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentConfirmReassignSlotModal.opened$

	ngOnInit(): void {}
}
