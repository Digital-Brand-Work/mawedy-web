import { Router } from '@angular/router'
import { Component, Input, OnInit } from '@angular/core'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import { HomeSubscriptionState } from 'app/misc/home.state'
import { IndexedDbController } from 'app/mawedy-core/indexed-db/indexed-db.controller'
import { DB } from 'app/mawedy-core/enums/index.db.enum'

@Component({
	selector: 'home-section3-pricing',
	templateUrl: './home-section3-pricing.component.html',
	styleUrls: ['./home-section3-pricing.component.scss'],
})
export class HomeSection3PricingComponent implements OnInit {
	constructor(
		private _router: Router,
		private _homeSubscriptionState: HomeSubscriptionState,
		private _indexedDbController: IndexedDbController,
	) {}

	@Input() isGradient: boolean = false

	@Input() subscription?: Subscription

	@Input() interval?: 'yearly' | 'monthly' | null

	ngOnInit(): void {}

	identity = (item: any) => item

	subscribe() {
		if (this.subscription.type === 'Standard') {
			return this._router.navigate(['/partner-with-us'])
		}

		this._homeSubscriptionState.subscription$.next(this.subscription)

		this._homeSubscriptionState.interval$.next(this.interval)

		this._indexedDbController.upsert(DB.SUBSCRIPTION_REQUEST, {
			id: 1,
			interval: this.interval,
			subscription: this.subscription,
		})

		this._homeSubscriptionState.subscription$.next(this.subscription)

		this._homeSubscriptionState.interval$.next(this.interval)

		this._router.navigate(['/subscription'])
	}
}
