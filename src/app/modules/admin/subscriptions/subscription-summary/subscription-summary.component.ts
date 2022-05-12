import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { SubscriptionInvoicesModal } from '../modals/subscription-invoices/subscription-invoices.service'

@Component({
	selector: 'subscription-summary',
	templateUrl: './subscription-summary.component.html',
	styleUrls: ['./subscription-summary.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionSummaryComponent implements OnInit {
	constructor(private subscriptionInvoicesModal: SubscriptionInvoicesModal) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> = this.subscriptionInvoicesModal.opened$

	ngOnInit(): void {}
}
