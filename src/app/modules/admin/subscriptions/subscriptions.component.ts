import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs'
import { Clinic } from '../clinic/clinic.model'
import { ClinicUserService } from '../clinic/clinic.service'

@Component({
	selector: 'subscriptions',
	templateUrl: './subscriptions.component.html',
	styleUrls: ['./subscriptions.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionsComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private router: Router,
		private _clinicUserService: ClinicUserService,
	) {
		this.isInCurrent$ = of(this.router.url.includes('current'))

		this.isInPackages$ = of(this.router.url.includes('packages'))

		this.isInSuccess$ = of(this.router.url.includes('success'))
	}

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	isInCurrent$: Observable<boolean> = of(false)

	isInPackages$: Observable<boolean> = of(false)

	isInSuccess$: Observable<boolean> = of(false)

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			this.seoService.generateTags({
				title: `${clinic.name} | ${clinic?.address} | Subscriptions`,
			})
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
