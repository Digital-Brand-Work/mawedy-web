import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { DoctorAvailabilityModal } from '../modals/doctor-availability/doctor-availability.service'

@Component({
	selector: 'doctors-table',
	templateUrl: './doctors-table.component.html',
	styleUrls: ['./doctors-table.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsTableComponent implements OnInit {
	constructor(private doctorAvailabilityModal: DoctorAvailabilityModal) {}

	opened$: BehaviorSubject<boolean> = this.doctorAvailabilityModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
