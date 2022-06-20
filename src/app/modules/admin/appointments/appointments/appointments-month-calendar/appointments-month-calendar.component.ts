import { result } from 'lodash'
import { Appointment } from './../../appointment.model'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import {
	WeekDay,
	weekDays,
	weekDays2,
} from 'app/mawedy-core/constants/app.constant'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	takeUntil,
} from 'rxjs'
import { JsonCalendar } from 'json-calendar'
import * as dayjs from 'dayjs'
import { select, Store } from '@ngrx/store'
import { AppointmentToolbarService } from '../appointment-toolbar.service'

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
		private _appointmentToolbarService: AppointmentToolbarService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	weekDays: WeekDay[] = weekDays2

	days: CalendarDay[] = []

	ngOnInit(): void {
		combineLatest([this.clinic$, this._appointmentToolbarService.date$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [clinic, date] = results
				if (clinic) {
					this.seoService.generateTags({
						title: `${clinic.name} | ${clinic?.address} | Monthly Appointments`,
					})
				}

				this.setCalendar(date)
			})
	}

	setCalendar(date: Date) {
		const calendar = new JsonCalendar({ today: date })

		this.days = []

		calendar.weeks.map((w) =>
			w.map((day: any) => {
				this.days.push(day)
			}),
		)

		for (let i = 0; i <= 6; i++) {
			this.days.pop()
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item
}

export interface CalendarDay {
	date: Date
	day: number
	id: string
	monthIndex: number
	year: string
}
