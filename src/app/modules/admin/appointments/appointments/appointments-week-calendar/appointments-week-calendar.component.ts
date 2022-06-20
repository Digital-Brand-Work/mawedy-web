import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { TimeSlot } from 'app/modules/admin/doctors/doctor.model'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'appointments-week-calendar',
	templateUrl: './appointments-week-calendar.component.html',
	styleUrls: ['./appointments-week-calendar.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsWeekCalendarComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	weekDays: WeekDay[] = weekDays

	timings: number[] = []

	ngOnInit(): void {
		// TODO: get date from toolbar
		// TODO: set range starting monday current date should be thursday
		// TODO: set day + 1 and minus 1
		// TODO: pop and push array

		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (clinic) {
				this.seoService.generateTags({
					title: `${clinic.name} | ${clinic?.address}  | Weekly Appointments`,
				})

				// const timeSlot: TimeSlot = clinic.timeslots.find()
			}
		})

		for (let i = 1; i <= 12; i++) {
			this.timings.push(i)
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item
}
