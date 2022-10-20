import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { BaseService } from '@digital_brand_work/api/base.api'
import { AlertState } from 'app/components/alert/alert.service'
import { Subscription } from 'app/app-core/models/utility.models'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, take } from 'rxjs'

@Component({
	selector: 'subscription-package-item',
	templateUrl: './subscription-package-item.component.html',
	styleUrls: ['./subscription-package-item.component.scss'],
})
export class SubscriptionPackageItemComponent implements OnInit {
	constructor(
		private _http: HttpClient,
		private _alert: AlertState,
		private _indexedDBService: NgxIndexedDBService,
		private _errorHandlerService: ErrorHandlerService,
		private _clinicUserService: ClinicUserService,
		private _router: Router,
	) {}

	@Input() isGradient: boolean = false

	@Input() subscription?: Subscription

	@Input() interval?: 'yearly' | 'monthly' | null

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	ngOnInit(): void {}

	subscribe() {
		new BaseService(
			this._http,
			this._indexedDBService,
			'v1/clinic/subscriptions/swap',
		)
			.post({
				interval: this.interval === 'yearly' ? 'year' : 'month',
				type: this.subscription.type,
			})
			.subscribe({
				next: () => {
					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Subscription successfully changed`,
						message: `You have successfully changed your subscription ${this.subscription.type}`,
						type: 'success',
					})

					this._clinicUserService.clinic$
						.pipe(take(1))
						.subscribe((oldClinic) => {
							this._clinicUserService.clinic$.next({
								...oldClinic,
								subscription_interval:
									this.interval === 'yearly'
										? 'year'
										: 'month',
								subscription_type: this.subscription.type,
							})
						})
				},
				error: (http) => {
					if (
						http.error.key === 'SWAP_SUBSCRIPTION_ERROR' &&
						http.error.sub_key === 'MISSING_SUBSCRIPTION'
					) {
						this._router.navigate(['/checkout'])
					} else {
						this._errorHandlerService.handleError(http)
					}
				},
			})
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
