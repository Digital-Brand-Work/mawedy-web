import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
	selector: 'subscription-package-item',
	templateUrl: './subscription-package-item.component.html',
	styleUrls: ['./subscription-package-item.component.scss'],
})
export class SubscriptionPackageItemComponent implements OnInit {
	constructor() {}

	@Output() onSubscribe = new EventEmitter()

	@Input() itemTitle?: string

	@Input() price?: number

	@Input() features?: string

	ngOnInit(): void {}

	identity = (item: any) => item
}
