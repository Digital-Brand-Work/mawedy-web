import { BillingPortalAPi } from './../subscription.service'
import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject, take } from 'rxjs'
import { SubscriptionInvoicesModal } from '../modals/subscription-invoices/subscription-invoices.service'
import { AlertState } from 'app/components/alert/alert.service'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'
import { ClinicUserService } from '../../clinic/clinic.service'
import { Clinic } from '../../clinic/clinic.model'
import { BaseService } from '@digital_brand_work/api/base.api'
import { HttpClient } from '@angular/common/http'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Component({
	selector: 'subscription-summary',
	templateUrl: './subscription-summary.component.html',
	styleUrls: ['./subscription-summary.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionSummaryComponent implements OnInit {
	constructor(
		private _http: HttpClient,
		private _alert: AlertState,
		private billingPortalAPI: BillingPortalAPi,
		private _clinicUserService: ClinicUserService,
		private _indexedDBService: NgxIndexedDBService,
		private _errorHandlerService: ErrorHandlerService,
		private subscriptionInvoicesModal: SubscriptionInvoicesModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	opened$: BehaviorSubject<boolean> = this.subscriptionInvoicesModal.opened$

	ngOnInit(): void {}

	setToAutomatic(mode: boolean) {
		new BaseService(
			this._http,
			this._indexedDBService,
			'v1/clinic/subscriptions/update',
		)
			.post({ payment_mode: mode ? 'Automatic' : 'Manual' })
			.subscribe({
				next: () => {
					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						message: `${
							mode
								? 'Your bill will be deducted on your account every billing period'
								: "Your account's payment mode is manual will give you an automated invoice every billing period"
						}`,
						title: `Switched to ${mode ? 'Automatic' : 'Manual'}`,
						type: 'success',
					})
				},
				error: (http) => {
					this._errorHandlerService.handleError(http)
				},
			})
	}

	openBillingPortal() {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))
			.subscribe((resolvedPath) => {
				this.billingPortalAPI
					.post({
						return_url:
							window.location.origin +
							resolvedPath +
							'subscription/current',
					})
					.subscribe({
						next: (data) => {
							let a = document.createElement('a')

							a.target = '_blank'

							a.href = data.url

							a.click()
						},
						error: (http) => {
							this._errorHandlerService.handleError(http)
						},
					})
			})
	}
}
