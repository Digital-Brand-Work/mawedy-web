import { dbwAnimations } from './../../../@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { PRICE_PER_USER } from 'app/mawedy-core/constants/app.constant'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import { HomeSubscriptionState } from 'app/misc/home.state'
import { BehaviorSubject, combineLatest, Observable, take } from 'rxjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { Clinic } from '../admin/clinic/clinic.model'
import { ClinicUserService } from '../admin/clinic/clinic.service'
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
		private _indexedDbService: NgxIndexedDBService,
	) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	subscription$: BehaviorSubject<Subscription | null> =
		this._homeSubscriptionState.subscription$

	interval$: BehaviorSubject<string | null> =
		this._homeSubscriptionState.interval$

	PRICE_PER_USER = PRICE_PER_USER

	additionalUsers?: number

	billMultiplier: number = 1

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.fetchFromIndexDB()
		}, 500)
	}

	fetchFromIndexDB() {
		combineLatest([
			this._indexedDbService.getByKey(DB.SUBSCRIPTION_REQUEST, 1),
			this._indexedDbService.getByKey(DB.ACCOUNT_USERS_REQUEST, 1),
		])
			.pipe(take(1))
			.subscribe({
				next: (results) => {
					const [subscription_request, account_users_request]: any =
						results

					if (!subscription_request || !account_users_request) {
						return ''
					}

					if (subscription_request.interval === 'yearly') {
						this.billMultiplier = 12
					}

					this.interval$.next(subscription_request.interval)

					this.subscription$.next(subscription_request.subscription)

					this.additionalUsers = account_users_request.users
				},
			})
	}
}
