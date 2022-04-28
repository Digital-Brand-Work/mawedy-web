import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'doctors',
	templateUrl: './doctors.component.html',
	styleUrls: ['./doctors.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	filter() {}
}
