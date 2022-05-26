import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { PRICE_PER_USER } from 'app/mawedy-core/constants/app.constant'
import { BehaviorSubject, Subscription } from 'rxjs'

@Component({
	selector: 'checkout-section1',
	templateUrl: './checkout-section1.component.html',
	styleUrls: ['./checkout-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class CheckoutSection1Component implements OnInit {
	constructor() {}

	@Input() subscription$?: BehaviorSubject<Subscription | null>

	@Input() interval$?: BehaviorSubject<string | null>

	@Input() billMultiplier: number = 1

	@Input() additionalUsers: number = 5

	PRICE_PER_USER = PRICE_PER_USER

	ngOnInit(): void {}
}
