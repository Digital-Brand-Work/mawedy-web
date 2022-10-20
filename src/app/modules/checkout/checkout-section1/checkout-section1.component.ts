import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { PRICE_PER_USER } from 'app/app-core/constants/app.constant'
import { BehaviorSubject, Subscription } from 'rxjs'

@Component({
	selector: 'checkout-section1',
	templateUrl: './checkout-section1.component.html',
	styleUrls: ['./checkout-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class CheckoutSection1Component implements OnInit {
	constructor(
		private _seoService: SeoService,
		private _mediaService: MediaService,
	) {
		this._seoService.generateTags({ title: 'Mawedy | Checkout' })
	}

	breakpoint$ = this._mediaService.breakpoints$

	@Input()
	billMultiplier: number = 1

	@Input()
	additionalUsers: number = 5

	@Input()
	interval$?: BehaviorSubject<string | null>

	@Input()
	subscription$?: BehaviorSubject<Subscription | null>

	PRICE_PER_USER = PRICE_PER_USER

	ngOnInit(): void {}
}
