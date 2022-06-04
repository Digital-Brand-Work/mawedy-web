import { Router } from '@angular/router'
import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import {
	HomeNav,
	homeNavigation,
} from '../../../../mawedy-core/navigation/landing.navigation'
import { BehaviorSubject, forkJoin, Subject, take, takeUntil } from 'rxjs'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicSubscriptionTypeEnum } from 'app/mawedy-core/enums/clinic-subscription-type.enum'
import { ClinicRegistrationStatusEnum } from 'app/mawedy-core/enums/clinic-registration.enum'

@Component({
	selector: 'home-navbar',
	templateUrl: './home-navbar.component.html',
	styleUrls: ['./home-navbar.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeNavbarComponent implements OnInit {
	constructor(
		private _clinicUserService: ClinicUserService,
		private _router: Router,
	) {
		this._router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.isInPartnerWithUs = this._router.url.includes('partner')

			this.isInSubscriptionSuccess = this._router.url.includes('success')
		})
	}

	isInPartnerWithUs: boolean = false

	isInSubscriptionSuccess: boolean = false

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	hasLoggedIn$: BehaviorSubject<boolean> =
		this._clinicUserService.hasLoggedIn$

	showSignInPanel: boolean = true

	navigation: HomeNav[] = homeNavigation

	ngOnInit(): void {
		this.isInPartnerWithUs = this._router.url.includes('partner')

		this.isInSubscriptionSuccess = this._router.url.includes('success')

		this.getClinicData()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	getClinicData() {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			const isConfirmedOrDone =
				clinic.account_status ===
					ClinicRegistrationStatusEnum.CONFIRMED ||
				clinic.account_status === ClinicRegistrationStatusEnum.DONE

			if (
				(clinic.subscription_type === ClinicSubscriptionTypeEnum.FREE &&
					isConfirmedOrDone) ||
				clinic.subscription_type !== ClinicSubscriptionTypeEnum.FREE
			) {
				this.showSignInPanel = false
			}
		})
	}

	toDashboard() {
		this.clinic$.pipe(take(1)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			const isConfirmedOrDone =
				clinic.account_status ===
					ClinicRegistrationStatusEnum.CONFIRMED ||
				clinic.account_status === ClinicRegistrationStatusEnum.DONE

			if (
				(clinic.subscription_type === ClinicSubscriptionTypeEnum.FREE &&
					isConfirmedOrDone) ||
				clinic.subscription_type !== ClinicSubscriptionTypeEnum.FREE
			) {
				this._clinicUserService.toDashboard()
			}
		})
	}
}
