import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'subscription-summary',
	templateUrl: './subscription-summary.component.html',
	styleUrls: ['./subscription-summary.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionSummaryComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
