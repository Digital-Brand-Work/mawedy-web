import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { BaseService } from '@digital_brand_work/api/base.api'
import { AlertState } from 'app/components/alert/alert.service'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject } from 'rxjs'

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
	) {}

	@Input() isGradient: boolean = false

	@Input() subscription!: Subscription

	@Input() interval?: 'yearly' | 'monthly' | null

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	ngOnInit(): void {}

	identity = (item: any) => item

	resolve(clinic: Clinic): boolean {
		const goldenToPlatinum =
			clinic.subscription_type === 'Golden' &&
			this.subscription.type === 'Platinum'

		const standardToGolden =
			clinic.subscription_type === 'Standard' &&
			this.subscription.type === 'Golden'

		const standardToPlatinum =
			clinic.subscription_type === 'Standard' &&
			this.subscription.type === 'Platinum'

		if (goldenToPlatinum || standardToGolden || standardToPlatinum) {
			return true
		}

		return false
	}

	subscribe() {
		new BaseService(
			this._http,
			this._indexedDBService,
			'v1/subscriptions/swap',
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
				},
				error: (http) => {
					this._errorHandlerService.handleError(http)
				},
			})
	}
}
