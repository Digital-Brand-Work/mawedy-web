import { DashboardAppointmentAssignSlotModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-assign-slot/dashboard-appointment-assign-slot.service'
import { Component, HostListener, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { DashboardAppointmentCancelAndAssignSlotModal } from './dashboard-appointment-cancel-and-assign-slot.service'

@Component({
	selector: 'dashboard-appointment-cancel-and-assign-slot',
	templateUrl:
		'./dashboard-appointment-cancel-and-assign-slot.component.html',
	styleUrls: [
		'./dashboard-appointment-cancel-and-assign-slot.component.scss',
	],
})
export class DashboardAppointmentCancelAndAssignSlotComponent
	implements OnInit
{
	constructor(
		private dashboardAppointmentCancelAndAssignSlotModal: DashboardAppointmentCancelAndAssignSlotModal,
		private dashboardAppointmentAssignSlotModal: DashboardAppointmentAssignSlotModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentCancelAndAssignSlotModal.opened$

	dashboardAppointmentAssignSlotModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentAssignSlotModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
