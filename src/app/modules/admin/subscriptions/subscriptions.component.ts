import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { Observable, of, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'subscriptions',
	templateUrl: './subscriptions.component.html',
	styleUrls: ['./subscriptions.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionsComponent implements OnInit {
	constructor(private seoService: SeoService, private router: Router) {
		this.router.events
			.pipe(takeUntil(this.unsubscribeAll))
			.subscribe(() => {
				this.isInCurrent$ = of(this.router.url.includes('current'))

				this.isInPackages$ = of(this.router.url.includes('packages'))

				this.isInSuccess$ = of(this.router.url.includes('success'))
			})
	}

	unsubscribeAll: Subject<any> = new Subject<any>()

	isInCurrent$: Observable<boolean> = of(false)

	isInPackages$: Observable<boolean> = of(false)

	isInSuccess$: Observable<boolean> = of(false)

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Subscriptions`,
		})
	}

	ngOnDestroy(): void {
		this.unsubscribeAll.next(null)

		this.unsubscribeAll.complete()
	}
}
