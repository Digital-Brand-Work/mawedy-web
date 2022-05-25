import { File } from './../../../../mawedy-core/models/utility.models'
import { FormGroup } from '@angular/forms'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import {
	mawedySubscriptions,
	PRICE_PER_USER,
} from 'app/mawedy-core/constants/app.constant'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Component, Inject, OnInit } from '@angular/core'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { BehaviorSubject, Observable, take } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { HomeSubscriptionState } from 'app/misc/home.state'
import { RegisterService } from '../../home/register.service'
import { AlertState } from 'app/components/alert/alert.service'
import { DOCUMENT } from '@angular/common'

@Component({
	selector: 'landing-subscription-section1',
	templateUrl: './landing-subscription-section1.component.html',
	styleUrls: ['./landing-subscription-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class LandingSubscriptionSection1Component implements OnInit {
	constructor(
		@Inject(DOCUMENT) private document: Document,
		private _mediaService: MediaService,
		private _scrollService: ScrollService,

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

	register(data: { form: FormGroup; trade_license_photo: any }) {
		console.log(event)

		this.isProcessing = true

		let form = new FormData()

		this.subscription$.pipe(take(1)).subscribe((subscription) => {
			data.form.value.subscription_type = subscription.type
		})

		form.append('trade_license_photo', data.trade_license_photo)

		form.append('success', this.document.location.origin + '')

		form.append('cancel', this.document.location.origin + '')

		if (data.form.value !== undefined) {
			for (let key in data?.form?.value) {
				if (data.form.value[key] !== undefined) {
					form.append(key, data.form.value[key])
				}
			}
		}

		this._registerService
			.post(form)
			.subscribe({
				next: () => {},
				error: (error) => {
					this._alert.add({
						title: error.name,
						message: error.message,
						type: 'error',
						id: Math.floor(Math.random() * 100000000000).toString(),
					})

					this._alert.add({
						title: 'Try Again Later',
						message: 'Something went wrong. Unexpected Error occur',
						type: 'error',
						id: Math.floor(Math.random() * 100000000000).toString(),
					})
				},
			})
			.add(() => (this.isProcessing = false))
	}
}
