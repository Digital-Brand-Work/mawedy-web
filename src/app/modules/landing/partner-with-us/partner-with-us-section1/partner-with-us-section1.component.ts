import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'partner-with-us-section1',
	templateUrl: './partner-with-us-section1.component.html',
	styleUrls: ['./partner-with-us-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsSection1Component implements OnInit {
	constructor() {}

	step: 'one' | 'two' = 'one'

	focus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	ngOnInit(): void {}
}
