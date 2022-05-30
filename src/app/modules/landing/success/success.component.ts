import { IndexedDbController } from './../../../mawedy-core/indexed-db/indexed-db.controller'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { mawedySubscriptions } from 'app/mawedy-core/constants/app.constant'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { Observable, take } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'

@Component({
	selector: 'success',
	templateUrl: './success.component.html',
	styleUrls: ['./success.component.scss'],
	animations: [...dbwAnimations],
})
export class SuccessComponent implements OnInit {
	constructor(
		private _mediaService: MediaService,
		private _router: Router,
		private _clinicUserService: ClinicUserService,
		private _indexedDbService: NgxIndexedDBService,
		private _indexedDBController: IndexedDbController,
	) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	subscription?: Subscription

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.fetchFromIndexDB()
		}, 500)
	}

	ngOnDestroy(): void {}

	fetchFromIndexDB() {
		this._indexedDbService
			.getByKey(DB.SUBSCRIPTION_REQUEST, 1)
			.pipe(take(1))
			.subscribe({
				next: (subscription_request: any) => {
					if (!subscription_request) {
						return this._router.navigate(['/'])
					}

					const index = mawedySubscriptions.findIndex(
						(subscription) =>
							subscription[subscription_request.interval]
								?.type ===
							subscription_request.subscription.type,
					)

					if (index >= 0) {
						this._indexedDBController.removeAll([
							DB.SUBSCRIPTION_REQUEST,
							DB.ACCOUNT_USERS_REQUEST,
						])

						return (this.subscription =
							mawedySubscriptions[index][
								subscription_request.interval
							])
					}

					this._router.navigate(['/'])
				},
				error: () => {
					this._router.navigate(['/'])
				},
			})
	}

	identity = (item: any) => item

	explore() {
		this._clinicUserService.hasLoggedIn$
			.pipe(take(1))
			.subscribe((hasLoggedIn) => {
				if (hasLoggedIn) {
					this._clinicUserService.toDashboard()
				} else {
					return this._router.navigate(['/'])
				}
			})
	}
}
