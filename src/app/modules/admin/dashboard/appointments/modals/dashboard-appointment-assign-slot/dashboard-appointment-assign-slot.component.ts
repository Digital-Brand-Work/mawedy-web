import { DashboardAppointmentAssignSlotModal } from './dashboard-appointment-assign-slot.service'
import { Component, HostListener, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'dashboard-appointment-assign-slot',
	templateUrl: './dashboard-appointment-assign-slot.component.html',
	styleUrls: ['./dashboard-appointment-assign-slot.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentAssignSlotComponent implements OnInit {
	constructor(
		private dashboardAppointmentAssignSlotModal: DashboardAppointmentAssignSlotModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentAssignSlotModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
