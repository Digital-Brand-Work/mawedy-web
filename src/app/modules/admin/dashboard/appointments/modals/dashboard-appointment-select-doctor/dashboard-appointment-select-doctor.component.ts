import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { DashboardAppointmentSelectDoctorModal } from './dashboard-appointment-select-doctor.service'

@Component({
	selector: 'dashboard-appointment-select-doctor',
	templateUrl: './dashboard-appointment-select-doctor.component.html',
	styleUrls: ['./dashboard-appointment-select-doctor.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentSelectDoctorComponent implements OnInit {
	constructor(
		private dashboardAppointmentSelectDoctorModal: DashboardAppointmentSelectDoctorModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentSelectDoctorModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
