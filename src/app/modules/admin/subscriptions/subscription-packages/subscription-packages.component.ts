import { subscription } from 'app/mawedy-core/constants/app.constant'
import { SubscriptionFeatures } from 'app/mawedy-core/models/utility.models'
import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'subscription-packages',
	templateUrl: './subscription-packages.component.html',
	styleUrls: ['./subscription-packages.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionPackagesComponent implements OnInit {
	constructor() {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		history.back()
	}

	subscription: SubscriptionFeatures = subscription

	ngOnInit(): void {}

	identity = (item: any) => item
}
