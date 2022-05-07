import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'promotions-table',
	templateUrl: './promotions-table.component.html',
	styleUrls: ['./promotions-table.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsTableComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	identity = (item: any) => item
}
