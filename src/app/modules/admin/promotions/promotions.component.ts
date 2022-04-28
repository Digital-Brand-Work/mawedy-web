import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'promotions',
	templateUrl: './promotions.component.html',
	styleUrls: ['./promotions.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
