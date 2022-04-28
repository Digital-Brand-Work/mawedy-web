import { dbwAnimations } from './../../../../../@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'appointments',
	templateUrl: './appointments.component.html',
	styleUrls: ['./appointments.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
