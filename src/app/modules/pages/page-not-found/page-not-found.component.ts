import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss'],
	animations: [...dbwAnimations],
})
export class PageNotFoundComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
