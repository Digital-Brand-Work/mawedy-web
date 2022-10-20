import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { WeekDay, weekDays2 } from 'app/app-core/constants/app.constant'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, combineLatest, Subject, take, takeUntil } from 'rxjs'
import { JsonCalendar } from 'json-calendar'
import * as dayjs from 'dayjs'
import { AppointmentToolbarService } from '../appointment-toolbar.service'
import { Router } from '@angular/router'
import { AppointmentService } from '../../appointment.service'
import { InitialDataResolver } from 'app/app.resolvers'

@Component({
	selector: 'appointments-month-calendar',
	templateUrl: './appointments-month-calendar.component.html',
	styleUrls: ['./appointments-month-calendar.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsMonthCalendarComponent implements OnInit {
	constructor(
		private _router: Router,
		private seoService: SeoService,
		private _appointmentAPI: AppointmentService,
		private _clinicUserService: ClinicUserService,
		private _initialDataResolver: InitialDataResolver,
		private _appointmentToolbarService: AppointmentToolbarService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	date$: BehaviorSubject<Date> = this._appointmentToolbarService.date$

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

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
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

		const param = {
			from: this.days[0].date.toJSON(),
			to: this.days[this.days.length - 1].date.toJSON(),
		}

		this._appointmentAPI
			.query(`?` + new URLSearchParams(param).toString())
			.subscribe((data: any) =>
				this._initialDataResolver.loadAppointments(data.data),
			)
	}

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

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}

export interface CalendarDay {
	date: Date
	day: number
	id: string
	monthIndex: number
	year: string
}
