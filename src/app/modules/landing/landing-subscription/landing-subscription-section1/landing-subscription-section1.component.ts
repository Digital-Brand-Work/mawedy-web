import { setPrefix, slugToSentence } from './../../../../mawedy-core/helpers'
import { Router } from '@angular/router'
import { FormGroup } from '@angular/forms'
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
import { RegisterService } from '../../home/register.service'
import { AlertState } from 'app/components/alert/alert.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'

@Component({
	selector: 'landing-subscription-section1',
	templateUrl: './landing-subscription-section1.component.html',
	styleUrls: ['./landing-subscription-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class LandingSubscriptionSection1Component implements OnInit {
	constructor(
		private _mediaService: MediaService,
		private _scrollService: ScrollService,
		private _router: Router,
		private _alert: AlertState,
		private _homeSubscriptionState: HomeSubscriptionState,
		private _registerService: RegisterService,
		private _clinicUserService: ClinicUserService,
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

				this._alert.add({
					title: `Session has expired.`,
					message: 'Please resubscribe to continue.',
					type: 'info',
					id: Math.floor(Math.random() * 100000000000).toString(),
				})

				this._router.navigate(['/'])

				return this.interval$.next('yearly')
			}
		})

		this.interval$.pipe(take(1)).subscribe((interval) => {
			if (interval === 'yearly') {
				this.billMultiplier = 12
			}
		})
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this._scrollService.scrollToTop()
		}, 50)
	}

	register(data: { form: FormGroup; trade_license_photo: any }) {
		this.isProcessing = true

		let form = new FormData()

		this.subscription$.pipe(take(1)).subscribe((subscription) => {
			data.form.value.subscription_type = subscription.type
		})

		this.interval$.pipe(take(1)).subscribe((interval) => {
			data.form.value.interval = interval
		})

		form.append('trade_license_photo', data.trade_license_photo)

		form.append(
			'urls[success]',
			window.location.origin +
				`/success?subscription=${data.form.value.subscription_type}&interval=${data.form.value.interval}`,
		)

		form.append(
			'urls[cancel]',
			window.location.origin +
				`/subscription?subscription=${data.form.value.subscription_type}&interval=${data.form.value.interval}`,
		)

		form.append(
			'phone_number_one',
			`${setPrefix(data.form.value.phone_number_one_country_code)}${
				data.form.value.phone_number_one
			}`,
		)

		for (let key in data?.form?.value) {
			if (
				data.form.value[key] !== undefined ||
				data.form.value[key] !== ''
			) {
				if (key !== 'phone_number_one') {
					form.append(key, data.form.value[key])
				}
			}
		}

		this._registerService
			.post(form)
			.subscribe({
				next: (userAccount) => {
					this._homeSubscriptionState.users$.next(
						this.additionalUsers,
					)

					this._clinicUserService.saveDataLocally(userAccount)

					this._router.navigate(['checkout'])
				},
				error: (http) => {
					for (let key in http.error.errors) {
						for (let error of http.error.errors[key]) {
							this._alert.add({
								title: `Error in ${slugToSentence(key)}`,
								message: error,
								type: 'error',
								id: Math.floor(
									Math.random() * 100000000000,
								).toString(),
							})
						}
					}
				},
			})
			.add(() => (this.isProcessing = false))
	}
}
