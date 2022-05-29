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
import { BehaviorSubject, forkJoin, Observable, take } from 'rxjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
@Component({
	selector: 'checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss'],
	animations: [...dbwAnimations],
})
export class CheckoutComponent implements OnInit {
	constructor(
		private _router: Router,
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

	ngOnInit(): void {
		forkJoin([
			this._indexedDbService.getByKey(DB.SUBSCRIPTION_REQUEST, 1),
			this._indexedDbService.getByKey(DB.ACCOUNT_USERS_REQUEST, 1),
		])
			.pipe(take(1))
			.subscribe({
				next: (results) => {
					const [subscription_request, account_users_request]: any =
						results

					this.interval$.next(subscription_request.interval)

					this.subscription$.next(subscription_request.subscription)

					this.additionalUsers = account_users_request.users
				},
			})
	}
}
