import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'appointments-month-calendar',
	templateUrl: './appointments-month-calendar.component.html',
	styleUrls: ['./appointments-month-calendar.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsMonthCalendarComponent implements OnInit {
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
				title: `${clinic.name} | ${clinic?.address} | Monthly Appointments`,
			})
		})

		for (let i = 1; i <= 31; i++) {
			this.days.push(i)
		}

		this.days.push(1)

		this.days.push(2)

		this.days.push(3)
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	weekDays: WeekDay[] = weekDays

	days: number[] = [31]

	identity = (item: any) => item
}
