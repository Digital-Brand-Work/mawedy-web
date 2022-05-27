import { Router } from '@angular/router'
import { Component, Input, OnInit } from '@angular/core'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import { HomeSubscriptionState } from 'app/misc/home.state'

@Component({
	selector: 'home-section3-pricing',
	templateUrl: './home-section3-pricing.component.html',
	styleUrls: ['./home-section3-pricing.component.scss'],
})
export class HomeSection3PricingComponent implements OnInit {
	constructor(
		private _router: Router,
		private _homeSubscriptionState: HomeSubscriptionState,
	) {}

	@Input() isGradient: boolean = false

	@Input() subscription?: Subscription

	@Input() interval?: 'yearly' | 'monthly' | null

	ngOnInit(): void {}

	identity = (item: any) => item

	subscribe() {
		this._homeSubscriptionState.subscription$.next(this.subscription)

		this._homeSubscriptionState.interval$.next(this.interval)

		this._router.navigate(['/subscription'])
	}
}
