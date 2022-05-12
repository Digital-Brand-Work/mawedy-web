import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { DashboardAppointmentSelectTimeSlotModal } from './dashboard-appointment-select-time-slot.service'

@Component({
	selector: 'dashboard-appointment-select-time-slot',
	templateUrl: './dashboard-appointment-select-time-slot.component.html',
	styleUrls: ['./dashboard-appointment-select-time-slot.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentSelectTimeSlotComponent implements OnInit {
	constructor(
		private dashboardAppointmentSelectTimeSlotModal: DashboardAppointmentSelectTimeSlotModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentSelectTimeSlotModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
