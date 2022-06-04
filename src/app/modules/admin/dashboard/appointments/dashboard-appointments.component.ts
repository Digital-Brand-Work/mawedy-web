import { SeoService } from '@digital_brand_work/services/seo.service'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from '../../clinic/clinic.service'
import { Clinic } from '../../clinic/clinic.model'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'dashboard-appointments',
	templateUrl: './dashboard-appointments.component.html',
	styleUrls: ['./dashboard-appointments.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentsComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			this.seoService.generateTags({
				title: `${clinic.name} | ${clinic?.address} | Profile`,
			})
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item
}
