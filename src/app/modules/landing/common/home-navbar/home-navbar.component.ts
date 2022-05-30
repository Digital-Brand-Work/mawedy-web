import { Component, OnInit } from '@angular/core'
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

	navigation: HomeNav[] = homeNavigation

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	hasLoggedIn$: BehaviorSubject<boolean> =
		this._clinicUserService.hasLoggedIn$

	ngOnInit(): void {}

	toDashboard() {
		forkJoin([this._clinicUserService.hasLoggedIn$, this.clinic$])
			.pipe(take(1))
			.subscribe((results: any) => {
				const [hasLoggedIn, clinic] = results

				const isConfirmedOrDone =
					clinic.data.account_status ===
						ClinicRegistrationStatusEnum.CONFIRMED ||
					clinic.data.account_status ===
						ClinicRegistrationStatusEnum.DONE

				if (
					(hasLoggedIn &&
						clinic.data.subscription_type ===
							ClinicSubscriptionTypeEnum.FREE &&
						isConfirmedOrDone) ||
					(hasLoggedIn &&
						clinic.data.subscription_type !==
							ClinicSubscriptionTypeEnum.FREE)
				) {
					this._clinicUserService.toDashboard()
				}
			})
	}
}
