import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
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
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentDetailsModal.opened$

	ngOnInit(): void {}
}
