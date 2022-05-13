import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SubscriptionInvoicesModal } from 'app/modules/admin/subscriptions/modals/subscription-invoices/subscription-invoices.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'modal-subscription',
	templateUrl: './modal-subscription.component.html',
	styleUrls: ['./modal-subscription.component.scss'],
	animations: [...dbwAnimations],
})
export class ModalSubscriptionComponent implements OnInit {
	constructor(private subscriptionInvoicesModal: SubscriptionInvoicesModal) {}

	subscriptionInvoicesModalOpened$: BehaviorSubject<boolean> =
		this.subscriptionInvoicesModal.opened$

	ngOnInit(): void {}
}
