import { dbwAnimations } from './../../../@digital_brand_work/animations/animation.api'
import { RegisterService } from './../landing/partner-with-us/partner-with-us-section1/register.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { AlertState } from 'app/components/alert/alert.service'
import {
	mawedySubscriptions,
	PRICE_PER_USER,
} from 'app/mawedy-core/constants/app.constant'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import { HomeSubscriptionState } from 'app/misc/home.state'
import { BehaviorSubject, Observable, take } from 'rxjs'
@Component({
	selector: 'checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss'],
	animations: [...dbwAnimations],
})
export class CheckoutComponent implements OnInit {
	constructor(
		private _mediaService: MediaService,
		private _homeSubscriptionState: HomeSubscriptionState,
	) {}

	PRICE_PER_USER = PRICE_PER_USER

	defaultSubscription: Subscription =
		mawedySubscriptions[mawedySubscriptions.length - 1].yearly

	subscription$: BehaviorSubject<Subscription | null> =
		this._homeSubscriptionState.subscription$

	interval$: BehaviorSubject<string | null> =
		this._homeSubscriptionState.interval$

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	additionalUsers: number = 5

	billMultiplier: number = 1

	ngOnInit(): void {
		this.subscription$.pipe(take(1)).subscribe((subscription) => {
			if (subscription === null) {
				this.subscription$.next(this.defaultSubscription)

				return this.interval$.next('yearly')
			}
		})

		this.interval$.pipe(take(1)).subscribe((interval) => {
			if (interval === 'yearly') {
				this.billMultiplier = 12
			}
		})
	}
}
