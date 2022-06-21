import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { select, Store } from '@ngrx/store'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import * as dayjs from 'dayjs'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	take,
	takeUntil,
} from 'rxjs'
import {
	AppointmentCalendarToolBar,
	AppointmentToolbarService,
	toolbars,
} from '../appointment-toolbar.service'

@Component({
	selector: 'appointments-toolbar',
	templateUrl: './appointments-toolbar.component.html',
	styleUrls: ['./appointments-toolbar.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsToolbarComponent implements OnInit {
	constructor(
		private _router: Router,
		private _store: Store<{ doctors: Doctor[] }>,
		private _clinicUserService: ClinicUserService,
		private _appointmentToolbarService: AppointmentToolbarService,
	) {
		this._router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.setRoute()
		})
	}

	currentMonth$: BehaviorSubject<number> =
		this._appointmentToolbarService.currentMonth$

	date$: BehaviorSubject<Date> = this._appointmentToolbarService.date$

	weekDays$: BehaviorSubject<Date[]> =
		this._appointmentToolbarService.weekDays$

	doctors$?: Observable<Doctor[]> = this._store.pipe(select('doctors'))

	unsubscribe$: Subject<any> = new Subject<any>()

	mode: 'month' | 'week' | 'day' = 'month'

	today = new Date(Date.now())

	timer: any

	toolbars: AppointmentCalendarToolBar[] = toolbars

	ngOnInit(): void {
		this.timer = setInterval(() => {
			this.today = new Date(Date.now())
		}, 1000)

		this.setRoute()
	}

	setRoute() {
		if (this._router.url.includes('month')) {
			this.mode = 'month'
		}

		if (this._router.url.includes('week')) {
			this.mode = 'week'
		}

		if (this._router.url.includes('day')) {
			this.mode = 'day'
		}
	}

	resolveRoute(path: string) {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))

			.subscribe((clinicPath) => {
				this._router.navigate([`${clinicPath}appointments/${path}`])
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		clearInterval(this.timer)
	}

	identity = (item: any) => item

	moveCalendarMonth(mode: 'add' | 'subtract'): void {
		combineLatest([this.date$])
			.pipe(take(1))
			.subscribe((results) => {
				const [date] = results

				if (this.mode === 'month') {
					return this.setMonthlyMode(mode, date)
				}

				if (this.mode === 'week' || this.mode === 'day') {
					return this.setWeeklyMode(mode, date)
				}
			})
	}

	setWeeklyMode(mode: 'add' | 'subtract', date: Date): void {
		if (mode === 'add') {
			return this.date$.next(dayjs(date).add(1, 'day').toDate())
		}

		return this.date$.next(dayjs(date).subtract(1, 'day').toDate())
	}

	setMonthlyMode(mode: 'add' | 'subtract', date: Date): void {
		if (mode === 'add') {
			this.date$.next(dayjs(date).add(1, 'month').toDate())

			return this.currentMonth$.next(dayjs(date).add(1, 'month').month())
		}

		if (mode === 'subtract') {
			this.date$.next(dayjs(date).subtract(1, 'month').toDate())

			return this.currentMonth$.next(
				dayjs(date).subtract(1, 'month').month(),
			)
		}
	}

	filter(doctor: string | null) {
		this._appointmentToolbarService.doctorFilter$.next(doctor)
	}
}
