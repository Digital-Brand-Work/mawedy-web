import { setPrefix } from './../../../../mawedy-core/helpers'
import { Router } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import { PRICE_PER_USER } from 'app/mawedy-core/constants/app.constant'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Component, OnInit } from '@angular/core'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { BehaviorSubject, forkJoin, Observable, take } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { HomeSubscriptionState } from 'app/misc/home.state'
import { RegisterService } from '../../home/register.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { IndexedDbController } from 'app/mawedy-core/indexed-db/indexed-db.controller'

@Component({
	selector: 'landing-subscription-section1',
	templateUrl: './landing-subscription-section1.component.html',
	styleUrls: ['./landing-subscription-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class LandingSubscriptionSection1Component implements OnInit {
	constructor(
		private _indexedDbService: NgxIndexedDBService,
		private _indexedDbController: IndexedDbController,
		private _errorHandlerService: ErrorHandlerService,
		private _mediaService: MediaService,
		private _scrollService: ScrollService,
		private _router: Router,
		private _homeSubscriptionState: HomeSubscriptionState,
		private _registerService: RegisterService,

		private _clinicUserService: ClinicUserService,
	) {}

	isProcessing: boolean = false

	PRICE_PER_USER = PRICE_PER_USER

	subscription$: BehaviorSubject<Subscription | null> =
		this._homeSubscriptionState.subscription$

	interval$: BehaviorSubject<string | null> =
		this._homeSubscriptionState.interval$

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	additionalUsers: number = 0

	billMultiplier: number = 1

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this._scrollService.scrollToTop()

			forkJoin([
				this._indexedDbService.getByKey('subscription_request', 1),
			])
				.pipe(take(1))
				.subscribe({
					next: (results) => {
						const subscription_request: any = results[0]

						this.subscription$.next(
							subscription_request.subscription,
						)
						this.interval$.next(subscription_request.interval)

						if (subscription_request.interval === 'yearly') {
							this.billMultiplier = 12
						}
					},
					error: () => {
						this._router.navigate(['/'])
					},
				})
		}, 100)
	}

	register(data: { form: FormGroup; trade_license_photo: any }) {
		this.isProcessing = true

		let form = new FormData()

		form.append('trade_license_photo', data.trade_license_photo)

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

					this._indexedDbController.upsert('account_users_request', {
						id: 1,
						subscription_request_id: 1,
						users: this.additionalUsers,
					})

					this._router.navigate(['checkout'])
				},
				error: (http) => {
					this._errorHandlerService.handleError(http)
				},
			})
			.add(() => (this.isProcessing = false))
	}
}
