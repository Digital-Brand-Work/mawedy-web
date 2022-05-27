import {
	MawedySubscription,
	Subscription,
} from 'app/mawedy-core/models/utility.models'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { mawedySubscriptions } from 'app/mawedy-core/constants/app.constant'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { Observable, take } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { slugify } from '@digital_brand_work/helpers/helpers'

@Component({
	selector: 'success',
	templateUrl: './success.component.html',
	styleUrls: ['./success.component.scss'],
	animations: [...dbwAnimations],
})
export class SuccessComponent implements OnInit {
	constructor(
		private _route: ActivatedRoute,
		private _mediaService: MediaService,
		private _router: Router,
		private _clinicUserService: ClinicUserService,
	) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	subscription?: Subscription

	ngOnInit(): void {
		this._route.queryParams.subscribe((params) => {
			if (Object.keys(params).length === 0) {
				return this._router.navigate(['/'])
			}

			const index = mawedySubscriptions.findIndex(
				(subscription) =>
					subscription[params.interval]?.type === params.subscription,
			)

			if (index >= 0) {
				this.subscription = mawedySubscriptions[index][params.interval]
			} else {
				this._router.navigate(['/'])
			}
		})
	}

	identity = (item: any) => item

	explore() {
		this._clinicUserService.hasLoggedIn$
			.pipe(take(1))
			.subscribe((hasLoggedIn) => {
				if (hasLoggedIn) {
					this._clinicUserService.toDashboard()
				} else {
					return this._router.navigate(['/'])
				}
			})
	}
}
