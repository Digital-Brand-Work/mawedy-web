import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { Router } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { Subscription } from 'app/app-core/models/utility.models'
import { PRICE_PER_USER } from 'app/app-core/constants/app.constant'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Component, OnInit } from '@angular/core'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	take,
	takeUntil,
} from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { RegisterService } from '../../home/register.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { IndexedDbController } from 'app/app-core/indexed-db/indexed-db.controller'
import { DB } from 'app/app-core/enums/index.db.enum'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'
import { HomeSubscriptionState } from 'app/app-core/misc/home.state'
import { setPrefix } from 'app/app-core/helpers'

@Component({
	selector: 'landing-subscription-section1',
	templateUrl: './landing-subscription-section1.component.html',
	styleUrls: ['./landing-subscription-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class LandingSubscriptionSection1Component implements OnInit {
	constructor(
		private _router: Router,
		private _mediaService: MediaService,
		private _scrollService: ScrollService,
		private _registerService: RegisterService,
		private _clinicUserService: ClinicUserService,
		private _indexedDbService: NgxIndexedDBService,
		private _indexedDbController: IndexedDbController,
		private _errorHandlerService: ErrorHandlerService,
		private _homeSubscriptionState: HomeSubscriptionState,
	) {}

	additionalUsers: number = 0
	billMultiplier: number = 1
	isProcessing: boolean = false
	PRICE_PER_USER = PRICE_PER_USER
	onMobileNext: boolean = false
	unsubscribe$: Subject<any> = new Subject<any>()
	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$
	subscription$: BehaviorSubject<Subscription | null> = new BehaviorSubject(
		null,
	)
	hasLoggedIn$: BehaviorSubject<boolean> =
		this._clinicUserService.hasLoggedIn$

	interval$: BehaviorSubject<string | null> =
		this._homeSubscriptionState.interval$

	ngOnInit(): void {}

	ngAfterContentInit(): void {
		this.fetchFromIndexDB()
	}

	ngOnDestroy(): void {
		this.subscription$.next(null)
		this.subscription$.complete()
	}

	scrollTopTop() {
		this._scrollService.scrollToTop()
	}

	fetchFromIndexDB() {
		combineLatest([
			this._indexedDbService.getByKey(DB.SUBSCRIPTION_REQUEST, 1),
			this._indexedDbService.getByKey(DB.ACCOUNT_USERS_REQUEST, 1),
			this._indexedDbService.getByKey(DB.CLINIC, 1),
			this.breakpoint$,
		])
			.pipe(take(1))
			.subscribe({
				next: (request: any) => {
					const [
						subscription_request,
						account_user_request,
						clinic,
						breakpoint,
					] = request

					if (breakpoint) {
						this.onMobileNext = false
					}

					if (clinic) {
						this.hasLoggedIn$.next(true)
					}

					if (subscription_request) {
						this.subscription$.next(
							subscription_request.subscription,
						)

						this.interval$.next(subscription_request.interval)

						if (subscription_request.interval === 'yearly') {
							this.billMultiplier = 12
						}
					}

					if (account_user_request) {
						this.additionalUsers = account_user_request.users
					}
				},
				error: () => {
					this._router.navigate(['/'])
				},
			})
	}

	toCheckOut() {
		this._indexedDbController.upsert(DB.ACCOUNT_USERS_REQUEST, {
			id: 1,
			subscription_request_id: 1,
			users: this.additionalUsers,
		})

		this._router.navigate(['checkout'])
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

					localStorage.setItem('password', data?.form?.value.password)

					this._clinicUserService.saveDataLocally(userAccount)

					this._indexedDbController.upsert(DB.ACCOUNT_USERS_REQUEST, {
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

	signOut(): void {
		this._clinicUserService.logout()
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
