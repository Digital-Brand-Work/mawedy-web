import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'home-section4',
	templateUrl: './home-section4.component.html',
	styleUrls: ['./home-section4.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection4Component implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
