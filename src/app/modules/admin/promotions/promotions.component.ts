import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { Observable, of, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'promotions',
	templateUrl: './promotions.component.html',
	styleUrls: ['./promotions.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsComponent implements OnInit {
	constructor(private router: Router) {
		this.isInAdd$ = of(this.router.url.includes('add'))

		this.isInEdit$ = of(this.router.url.includes('edit'))

		this.isInViewing$ = of(this.router.url.includes('view'))
	}

	unsubscribeAll: Subject<any> = new Subject<any>()

	isInAdd$: Observable<boolean> = of(false)

	isInEdit$: Observable<boolean> = of(false)

	isInViewing$: Observable<boolean> = of(false)

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.unsubscribeAll.next(null)

		this.unsubscribeAll.complete()
	}

	filter() {}
}
