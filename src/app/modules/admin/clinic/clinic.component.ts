import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'clinic',
	templateUrl: './clinic.component.html',
	styleUrls: ['./clinic.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
