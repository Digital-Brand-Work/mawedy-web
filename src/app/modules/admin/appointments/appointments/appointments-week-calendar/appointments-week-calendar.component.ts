import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import {
	END_OF_HOURS,
	PM,
	WeekDay,
	weekDays,
} from 'app/mawedy-core/constants/app.constant'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, combineLatest, Subject, take, takeUntil } from 'rxjs'
import { AppointmentToolbarService } from '../appointment-toolbar.service'
import * as dayjs from 'dayjs'
import { empty, toFixedTwo } from 'app/mawedy-core/helpers'
import { Time } from '@digital_brand_work/models/core.model'
import { Router } from '@angular/router'

@Component({
	selector: 'appointments-week-calendar',
	templateUrl: './appointments-week-calendar.component.html',
	styleUrls: ['./appointments-week-calendar.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsWeekCalendarComponent implements OnInit {
	constructor(
		private _router: Router,
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
		private _appointmentToolbarService: AppointmentToolbarService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	date$: BehaviorSubject<Date> = this._appointmentToolbarService.date$

	unsubscribe$: Subject<any> = new Subject<any>()

	weekDays: WeekDay[] = weekDays

	weekDays$: BehaviorSubject<Date[]> =
		this._appointmentToolbarService.weekDays$

	timings: Time[] = []

	closed: boolean = true

	ngOnInit(): void {
		combineLatest([this._appointmentToolbarService.date$, this.clinic$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [date, clinic] = results

				if (clinic && date) {
					this.seoService.generateTags({
						title: `${clinic.name} | ${clinic?.address}  | Weekly Appointments`,
					})

					const timeSlot = clinic.timeslots.find((slot) => {
						return slot.day === dayjs(date).format('dddd')
					})

					if (!timeSlot.active) {
						return (this.closed = true)
					} else {
						this.closed = false
					}

					if (!empty(timeSlot) || timeSlot.active) {
						const [startHour, startMinutes] =
							timeSlot.start.split(':')

						const [endHour, endMinutes] = timeSlot.end.split(':')

						const isGraveYard: boolean = parseInt(endHour) < PM

						let timings = []

						for (
							let time = parseInt(startHour);
							!isGraveYard
								? time <= END_OF_HOURS &&
								  time <= parseInt(endHour)
								: time <= END_OF_HOURS ||
								  time <= parseInt(endHour);
							time++
						) {
							timings.push(`${toFixedTwo(time)}:00`)
						}

						if (isGraveYard) {
							for (
								let time = 2;
								time < parseInt(endHour) + 1;
								time++
							) {
								timings.push(`${toFixedTwo(time)}:00`)
							}
						}

						if (timeSlot.end === '23:59') {
							timings.push('24:00')
						} else {
							timings.push(timeSlot.end as Time)
						}

						timings = [...new Set(timings)]

						this.timings = timings
					}
				}
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item

	resolveRoute(path: string) {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))

			.subscribe((clinicPath) => {
				this._router.navigate([`${clinicPath}appointments/${path}`])
			})
	}

	setDate(date: Date): void {
		this.date$.next(dayjs(date).toDate())
	}
}
