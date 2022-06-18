import { dbwAnimations } from './../../../../../../@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'mobile-home-section1',
	templateUrl: './home-section1.component.html',
	styleUrls: ['./home-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class MobileHomeSection1Component implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
