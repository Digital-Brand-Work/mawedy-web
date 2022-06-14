import { BillingPortalAPi } from './../subscription.service'
import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject, take } from 'rxjs'
import { SubscriptionInvoicesModal } from '../modals/subscription-invoices/subscription-invoices.service'
import { AlertState } from 'app/components/alert/alert.service'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { ClinicUserService } from '../../clinic/clinic.service'
import { Clinic } from '../../clinic/clinic.model'

@Component({
	selector: 'subscription-summary',
	templateUrl: './subscription-summary.component.html',
	styleUrls: ['./subscription-summary.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionSummaryComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private billingPortalAPI: BillingPortalAPi,
		private _clinicUserService: ClinicUserService,
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
							window.location.href = data.url
						},
						error: (http) => {
							this._errorHandlerService.handleError(http)
						},
					})
			})
	}
}
