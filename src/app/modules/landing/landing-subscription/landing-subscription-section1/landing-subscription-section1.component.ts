import { Subscription } from 'app/mawedy-core/models/utility.models'
import {
	mawedySubscriptions,
	subscription,
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
	) {}

	defaultSubscription: Subscription =
		mawedySubscriptions[mawedySubscriptions.length - 1].yearly

	subscription$: BehaviorSubject<Subscription | null> =
		this._homeSubscriptionState.subscription$

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	ngOnInit(): void {
		this.subscription$.pipe(take(1)).subscribe((subscription) => {
			if (subscription === null) {
				this.subscription$.next(this.defaultSubscription)
			}
		})
	}
}
