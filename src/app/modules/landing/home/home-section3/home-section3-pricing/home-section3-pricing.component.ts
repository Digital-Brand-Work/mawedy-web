import { Router } from '@angular/router'
import { Component, Input, OnInit } from '@angular/core'
import { Subscription } from 'app/app-core/models/utility.models'
import { HomeSubscriptionState } from 'app/app-core/misc/home.state'
import { IndexedDbController } from 'app/app-core/indexed-db/indexed-db.controller'
import { DB } from 'app/app-core/enums/index.db.enum'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { take } from 'rxjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Component({
	selector: 'home-section3-pricing',
	templateUrl: './home-section3-pricing.component.html',
	styleUrls: ['./home-section3-pricing.component.scss'],
})
export class HomeSection3PricingComponent implements OnInit {
	constructor(
		private _router: Router,
		private _clinicUserService: ClinicUserService,
		private _indexedDbService: NgxIndexedDBService,
		private _indexedDbController: IndexedDbController,
		private _homeSubscriptionState: HomeSubscriptionState,
	) {}

	@Input()
	isGradient: boolean = false

	@Input()
	subscription?: Subscription

	@Input()
	interval?: 'yearly' | 'monthly' | null

	ngOnInit(): void {}

	subscribe(): any {
		this._clinicUserService.clinic$.pipe(take(1)).subscribe((clinic) => {
			if (clinic) {
				return this._clinicUserService
					.resolveClinicPath()
					.pipe(take(1))
					.subscribe((resolvedPath) => {
						this._router.navigate([
							`${resolvedPath}subscription/packages`,
						])
					})
			}

			if (this.subscription.type === 'Standard') {
				return this._router.navigate(['/partner-with-us'])
			}

			this._homeSubscriptionState.subscription$.next(this.subscription)

			this._homeSubscriptionState.interval$.next(this.interval)

			const db = DB.SUBSCRIPTION_REQUEST

			const data = {
				id: 1,
				interval: this.interval,
				subscription: this.subscription,
			}

			this._indexedDbService
				.getByKey(DB.SUBSCRIPTION_REQUEST, 1)
				.subscribe({
					next: () => {
						this._indexedDbService
							.update(db, {
								id: 1,
								...data,
							})
							.subscribe()
					},
					error: () => {
						this._indexedDbService
							.add(db, {
								subscription_request_id: 1,
								...data,
							})
							.subscribe()
					},
				})
				.add(() => {
					this._homeSubscriptionState.subscription$.next(
						this.subscription,
					)

					this._homeSubscriptionState.interval$.next(this.interval)

					if (this._router.url.includes('subscription')) {
						location.reload()
						return
					}

					this._router.navigate(['/subscription']).then(() => {
						location.reload()
					})
				})
		})
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
