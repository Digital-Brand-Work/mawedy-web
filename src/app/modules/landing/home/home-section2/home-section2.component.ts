import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'home-section2',
	templateUrl: './home-section2.component.html',
	styleUrls: ['./home-section2.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection2Component implements OnInit {
	constructor() {}

	step: 'one' | 'two' = 'one'

	ngOnInit(): void {}
}
