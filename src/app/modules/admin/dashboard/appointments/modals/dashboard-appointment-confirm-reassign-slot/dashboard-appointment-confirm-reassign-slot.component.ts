import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { DashboardAppointmentConfirmReassignSlotModal } from './dashboard-appointment-confirm-reassign-slot.service'

@Component({
	selector: 'dashboard-appointment-confirm-reassign-slot',
	templateUrl: './dashboard-appointment-confirm-reassign-slot.component.html',
	styleUrls: ['./dashboard-appointment-confirm-reassign-slot.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentConfirmReassignSlotComponent
	implements OnInit
{
	constructor(
		private dashboardAppointmentConfirmReassignSlotModal: DashboardAppointmentConfirmReassignSlotModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentConfirmReassignSlotModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
