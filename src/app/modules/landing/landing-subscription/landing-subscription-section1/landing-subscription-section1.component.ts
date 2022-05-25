import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import {
	mawedySubscriptions,
	PRICE_PER_USER,
} from 'app/mawedy-core/constants/app.constant'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Component, OnInit } from '@angular/core'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { BehaviorSubject, Observable, take } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { HomeSubscriptionState } from 'app/misc/home.state'

@Component({
	selector: 'landing-subscription-section1',
	templateUrl: './landing-subscription-section1.component.html',
	styleUrls: ['./landing-subscription-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class LandingSubscriptionSection1Component implements OnInit {
	constructor(
		private _mediaService: MediaService,
		private _homeSubscriptionState: HomeSubscriptionState,
		private _scrollService: ScrollService,
	) {}

	PRICE_PER_USER = PRICE_PER_USER

	defaultSubscription: Subscription =
		mawedySubscriptions[mawedySubscriptions.length - 1].yearly

	subscription$: BehaviorSubject<Subscription | null> =
		this._homeSubscriptionState.subscription$

	interval$: BehaviorSubject<string | null> =
		this._homeSubscriptionState.interval$

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	additionalUsers: number = 0

	billMultiplier: number = 1

	ngOnInit(): void {
		this.subscription$.pipe(take(1)).subscribe((subscription) => {
			if (subscription === null) {
				this.subscription$.next(this.defaultSubscription)

				this.interval$.next('yearly')
			}
		})

		this.interval$.pipe(take(1)).subscribe((interval) => {
			if (interval === 'yearly') {
				this.billMultiplier = 12
			}
		})
	}

	ngAfterViewInit(): void {
		this._scrollService.scrollToTop()
	}
}
