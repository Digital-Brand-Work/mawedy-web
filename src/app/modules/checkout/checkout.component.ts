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
declare var window: any
@Component({
	selector: 'checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss'],
	animations: [...dbwAnimations],
})
export class CheckoutComponent implements OnInit {
	constructor(
		private _mediaService: MediaService,
		private _scrollService: ScrollService,
		private _router: Router,
		private _alert: AlertState,
		private _homeSubscriptionState: HomeSubscriptionState,
		private _registerService: RegisterService,
	) {}

	isProcessing: boolean = false

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

	showApplePay = false

	ngOnInit(): void {
		this.showApplePay = false

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

		if (window.ApplePaySession) {
			const merchantIdentifier = 'example.com.store'

			window.ApplePaySession.canMakePaymentsWithActiveCard(
				merchantIdentifier,
			).then((canMakePayments: boolean) => {
				if (canMakePayments) {
					this.showApplePay = true
				}
			})
		}
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this._scrollService.scrollToTop()
		}, 50)
	}

	onLoadPaymentData($event) {}
}
