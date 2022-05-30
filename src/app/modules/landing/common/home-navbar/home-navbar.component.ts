import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import {
	HomeNav,
	homeNavigation,
} from '../../../../mawedy-core/navigation/landing.navigation'
import { BehaviorSubject, forkJoin, take } from 'rxjs'
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
	constructor(private _clinicUserService: ClinicUserService) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	hasLoggedIn$: BehaviorSubject<boolean> =
		this._clinicUserService.hasLoggedIn$

	showSignInPanel: boolean = true

	navigation: HomeNav[] = homeNavigation

	ngOnInit(): void {
		this.getClinicData()
	}

	getClinicData() {
		this.clinic$.subscribe((clinic) => {
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
		this.clinic$.subscribe((clinic) => {
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
