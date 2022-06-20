import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { select, Store } from '@ngrx/store'
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
import { AppointmentToolbarService } from '../appointment-toolbar.service'

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
		private _appointmentToolbarService: AppointmentToolbarService,
	) {
		this._router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.setRoute()
		})
	}

	currentMonth$: BehaviorSubject<number> =
		this._appointmentToolbarService.currentMonth$

	date$: BehaviorSubject<Date> = this._appointmentToolbarService.date$

	doctors$?: Observable<Doctor[]> = this._store.pipe(select('doctors'))

	unsubscribe$: Subject<any> = new Subject<any>()

	mode: 'month' | 'week' | 'day' = 'month'

	today = new Date(Date.now())

	timer: any

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

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		clearInterval(this.timer)
	}

	identity = (item: any) => item

	moveCalendarMonth(mode: 'add' | 'subtract') {
		combineLatest([this.date$, this.currentMonth$])
			.pipe(take(1))
			.subscribe((results) => {
				const [date, currentMonth] = results

				if (mode === 'add' && currentMonth <= 12) {
					this.date$.next(dayjs(date).add(1, 'month').toDate())

					return this.currentMonth$.next(
						dayjs(date).add(1, 'month').month(),
					)
				}

				this.date$.next(dayjs(date).subtract(1, 'month').toDate())

				return this.currentMonth$.next(
					dayjs(date).subtract(1, 'month').month(),
				)
			})
	}
}
