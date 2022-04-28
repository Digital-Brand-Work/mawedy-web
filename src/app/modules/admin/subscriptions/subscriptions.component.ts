import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'subscriptions',
	templateUrl: './subscriptions.component.html',
	styleUrls: ['./subscriptions.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
