import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { SubscriptionInvoicesModal } from './subscription-invoices.service'

@Component({
	selector: 'subscription-invoices',
	templateUrl: './subscription-invoices.component.html',
	styleUrls: ['./subscription-invoices.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionInvoicesComponent implements OnInit {
	constructor(private subscriptionInvoicesModal: SubscriptionInvoicesModal) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> = this.subscriptionInvoicesModal.opened$

	ngOnInit(): void {}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
