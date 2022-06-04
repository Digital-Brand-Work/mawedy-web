import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'appointments-day-calendar',
	templateUrl: './appointments-day-calendar.component.html',
	styleUrls: ['./appointments-day-calendar.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsDayCalendarComponent implements OnInit {
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
				title: `${clinic.name} | ${clinic?.address}  | Daily Appointments`,
			})
		})

		for (let i = 1; i <= 12; i++) {
			this.timings.push(i)
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	timings: number[] = []

	identity = (item: any) => item
}
