import { Component, Input, OnInit } from '@angular/core'
import { Subscription } from 'app/mawedy-core/models/utility.models'

@Component({
	selector: 'home-section3-pricing',
	templateUrl: './home-section3-pricing.component.html',
	styleUrls: ['./home-section3-pricing.component.scss'],
})
export class HomeSection3PricingComponent implements OnInit {
	constructor() {}

	@Input() isGradient: boolean = false

	@Input() subscription?: Subscription

	@Input() interval?: string

	ngOnInit(): void {}

	identity = (item: any) => item
}
