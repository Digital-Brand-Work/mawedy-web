import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { ClinicRegistrationStatusEnum } from 'app/mawedy-core/enums/clinic-registration.enum'
import { ClinicSubscriptionTypeEnum } from 'app/mawedy-core/enums/clinic-subscription-type.enum'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import {
	BehaviorSubject,
	forkJoin,
	Observable,
	Subject,
	take,
	takeUntil,
} from 'rxjs'

@Component({
	selector: 'home-section1',
	templateUrl: './home-section1.component.html',
	styleUrls: ['./home-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection1Component implements OnInit {
	constructor(
		private _mediaService: MediaService,
		private _clinicUserService: ClinicUserService,
	) {}

	isLoading: boolean = true

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	$clinic: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	showSignInPanel: boolean = true

	hasLoggedIn$: BehaviorSubject<boolean> =
		this._clinicUserService.hasLoggedIn$

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

			this.isLoading = false
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
