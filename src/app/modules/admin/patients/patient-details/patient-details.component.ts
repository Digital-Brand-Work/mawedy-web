import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'patient-details',
	templateUrl: './patient-details.component.html',
	styleUrls: ['./patient-details.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientDetailsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
