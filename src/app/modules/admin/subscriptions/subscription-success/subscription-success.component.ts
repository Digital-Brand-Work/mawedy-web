import { Component, OnInit } from '@angular/core'
import { subscription } from 'app/app-core/constants/app.constant'
import { SubscriptionFeatures } from 'app/app-core/models/utility.models'

@Component({
	selector: 'subscription-success',
	templateUrl: './subscription-success.component.html',
	styleUrls: ['./subscription-success.component.scss'],
})
export class SubscriptionSuccessComponent implements OnInit {
	constructor() {}

	subscription: SubscriptionFeatures = subscription

	ngOnInit(): void {}

	identity = (item: any) => item
}
