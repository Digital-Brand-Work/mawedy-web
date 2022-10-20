import { ClinicTimeSlot } from './../../../clinic/clinic.model'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs'
import { AppointmentToolbarService } from '../appointment-toolbar.service'
import * as dayjs from 'dayjs'
import { empty, toFixedTwo } from 'app/app-core/helpers'
import { END_OF_HOURS, PM } from 'app/app-core/constants/app.constant'
import { Time } from '@digital_brand_work/models/core.model'
import { InitialDataResolver } from 'app/app.resolvers'
import { AppointmentService } from '../../appointment.service'

@Component({
	selector: 'appointments-day-calendar',
	templateUrl: './appointments-day-calendar.component.html',
	styleUrls: ['./appointments-day-calendar.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsDayCalendarComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _appointmentAPI: AppointmentService,
		private _clinicUserService: ClinicUserService,
		private _initialDataResolver: InitialDataResolver,
		private _appointmentToolbarService: AppointmentToolbarService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	date$: BehaviorSubject<Date> = this._appointmentToolbarService.date$

	unsubscribe$: Subject<any> = new Subject<any>()

	closed: boolean = true

	timings: Time[] = []

	ngOnInit(): void {
		combineLatest([this._appointmentToolbarService.date$, this.clinic$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [date, clinic] = results

				const param = {
					date: date.toJSON(),
				}

				this._appointmentAPI
					.query(`?` + new URLSearchParams(param).toString())
					.subscribe((data: any) =>
						this._initialDataResolver.loadAppointments(data.data),
					)

				if (clinic && date) {
					this.seoService.generateTags({
						title: `${clinic.name} | ${clinic?.address}  | Daily Appointments`,
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
						this.resolveTimeSlots(timeSlot)
					}
				}
			})
	}

	resolveTimeSlots(timeSlot: ClinicTimeSlot): void {
		const [startHour] = timeSlot.start.split(':')

		const [endHour] = timeSlot.end.split(':')

		const isGraveYard: boolean = parseInt(endHour) < PM

		let timings = []

		for (
			let time = parseInt(startHour);
			!isGraveYard
				? time <= END_OF_HOURS && time <= parseInt(endHour)
				: time <= END_OF_HOURS || time <= parseInt(endHour);
			time++
		) {
			timings.push(`${toFixedTwo(time)}:00`)
		}

		if (isGraveYard) {
			for (let time = 2; time < parseInt(endHour) + 1; time++) {
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

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
