import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { DoctorAvailabilityModal } from '../modals/doctor-availability/doctor-availability.service'
import { DoctorDetailsModal } from '../modals/doctor-details/doctor-details.service'

@Component({
	selector: 'doctors-table',
	templateUrl: './doctors-table.component.html',
	styleUrls: ['./doctors-table.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsTableComponent implements OnInit {
	constructor(
		private doctorAvailabilityModal: DoctorAvailabilityModal,
		private doctorDetailsModal: DoctorDetailsModal,
	) {}

	doctorAvailabilityModalOpened$: BehaviorSubject<boolean> =
		this.doctorAvailabilityModal.opened$

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this.doctorDetailsModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
