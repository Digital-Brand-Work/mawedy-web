import { ClinicTimeSlot } from './../clinic.model'
import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'clinic-timings',
	templateUrl: './clinic-timings.component.html',
	styleUrls: ['./clinic-timings.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicTimingsComponent implements OnInit {
	constructor() {}

	@Input()
	timeslots?: ClinicTimeSlot[] = []

	ngOnInit(): void {}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
