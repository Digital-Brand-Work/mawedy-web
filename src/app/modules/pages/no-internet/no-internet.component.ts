import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'no-internet',
	templateUrl: './no-internet.component.html',
	styleUrls: ['./no-internet.component.scss'],
	animations: [...dbwAnimations],
})
export class NoInternetComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
