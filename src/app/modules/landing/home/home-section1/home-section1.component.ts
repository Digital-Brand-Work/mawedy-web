import { takeUntil } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { ClinicRegistrationStatusEnum } from 'app/mawedy-core/enums/clinic-registration.enum'
import { ClinicSubscriptionTypeEnum } from 'app/mawedy-core/enums/clinic-subscription-type.enum'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'

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
		private _indexedDBService: NgxIndexedDBService,
	) {}

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
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return this.fetchToIndexDB()
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

	fetchToIndexDB() {
		this._indexedDBService
			.getByKey(DB.CLINIC, 1)
			.subscribe((clinic: any) => {
				this.clinic$.next(clinic.data)
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
