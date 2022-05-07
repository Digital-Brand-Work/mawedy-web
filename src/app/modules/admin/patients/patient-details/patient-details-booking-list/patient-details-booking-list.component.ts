import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'patient-details-booking-list',
	templateUrl: './patient-details-booking-list.component.html',
	styleUrls: ['./patient-details-booking-list.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientDetailsBookingListComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	identity = (item: any) => item
}
