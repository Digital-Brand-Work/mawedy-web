import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { EMAIL, PHONE } from 'app/mawedy-core/constants/app.constant'

@Component({
	selector: 'mobile-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	animations: [...dbwAnimations],
})
export class MobileFooterComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	phone: string = PHONE

	email: string = EMAIL
}
