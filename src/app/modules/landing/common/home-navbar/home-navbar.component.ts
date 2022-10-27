import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import {
	HomeNav,
	homeNavigation,
} from '../../../../app-core/navigation/landing.navigation'
import { Subject, take, takeUntil } from 'rxjs'
import { ClinicSubscriptionTypeEnum } from 'app/app-core/enums/clinic-subscription-type.enum'
import { ClinicRegistrationStatusEnum } from 'app/app-core/enums/clinic-registration.enum'

@Component({
	selector: 'home-navbar',
	templateUrl: './home-navbar.component.html',
	styleUrls: ['./home-navbar.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeNavbarComponent implements OnInit {
	constructor(
		private _router: Router,
		private _clinicUserService: ClinicUserService,
	) {
		this.url = this._router.url
		this._router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.isInSubscriptionSuccess = this._router.url.includes('success')
			this.isInPartnerWithUs = this._router.url.includes('partner')
			this.url = this._router.url
		})

		if (!this.isInSubscriptionSuccess) {
			this._clinicUserService.logout()
		}
	}

	url: string = ''
	showSignInPanel: boolean = true
	isInPartnerWithUs: boolean = false
	isInSubscriptionSuccess: boolean = false

	clinic$ = this._clinicUserService.clinic$
	unsubscribe$: Subject<any> = new Subject<any>()
	hasLoggedIn$ = this._clinicUserService.hasLoggedIn$

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

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
