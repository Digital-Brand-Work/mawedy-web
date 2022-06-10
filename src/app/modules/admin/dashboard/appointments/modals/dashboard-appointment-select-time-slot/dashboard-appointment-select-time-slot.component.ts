import { add30Mins, empty, tOTime } from 'app/mawedy-core/helpers'
import { TimeSlot } from './../../../../doctors/doctor.model'
import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddAppointmentModal } from 'app/modules/admin/appointments/appointment-add/appointment-add.service'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs'
import { DashboardAppointmentSelectTimeSlotModal } from './dashboard-appointment-select-time-slot.service'
import { DayTypes } from 'app/mawedy-core/enums/day.enum'
import * as dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as utc from 'dayjs/plugin/utc'
import * as timezone from 'dayjs/plugin/timezone'
import {
	APPOINTMENT_INTERVAL,
	END_OF_HOURS,
	END_OF_MINUTES,
	PM,
} from 'app/mawedy-core/constants/app.constant'
import { parseInt } from 'lodash'
import { parse } from 'crypto-js/enc-base64'

@Component({
	selector: 'dashboard-appointment-select-time-slot',
	templateUrl: './dashboard-appointment-select-time-slot.component.html',
	styleUrls: ['./dashboard-appointment-select-time-slot.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentSelectTimeSlotComponent implements OnInit {
	constructor(
		private _addAppointmentModal: AddAppointmentModal,
		private dashboardAppointmentSelectTimeSlotModal: DashboardAppointmentSelectTimeSlotModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentSelectTimeSlotModal.opened$

	doctor$: BehaviorSubject<Doctor | null> = this._addAppointmentModal.doctor$

	date$: BehaviorSubject<string | null> = this._addAppointmentModal.date$

	appointmentSlot$: BehaviorSubject<{
		start_time: string
		end_time: string
	} | null> = this._addAppointmentModal.appointmentSlot$

	isActive: boolean = false

	times: { start_time: string }[] = []

	ngOnInit(): void {
		combineLatest([this.date$, this.doctor$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [date, doctor] = results

				if (empty(date) || empty(doctor)) {
					return
				}

				const timeSlot = doctor.timeslots.find(
					(slot) => slot.day === dayjs(date).format('dddd'),
				)

				this.isActive = timeSlot.active

				if (empty(timeSlot.end) || empty(timeSlot.start)) {
					return (this.isActive = false)
				}

				let timings = []

				const [startHour, startMinutes] = timeSlot.start.split(':')

				const [endHour, endMinutes] = timeSlot.end.split(':')

				const isGraveYard: boolean = parseInt(endHour) < PM

				for (
					let time = parseInt(startHour);
					!isGraveYard
						? time <= END_OF_HOURS && time <= parseInt(endHour)
						: time <= END_OF_HOURS || time <= parseInt(endHour);
					time++
				) {
					timings.push(`${this.toFixedTwo(time)}:00`)

					timings.push(
						`${this.toFixedTwo(time)}:${APPOINTMENT_INTERVAL} `,
					)
				}

				if (isGraveYard) {
					for (let time = 2; time < parseInt(endHour) + 1; time++) {
						timings.push(`${this.toFixedTwo(time)}:00`)

						timings.push(
							`${this.toFixedTwo(time)}:${APPOINTMENT_INTERVAL} `,
						)
					}
				}

				timings = [...new Set(timings)]

				for (let time of timings) {
					const [hour, minutes] = time.split(':')

					if (
						parseInt(hour) === parseInt(endHour) ||
						(parseInt(hour) + 1 === parseInt(endHour) + 1 &&
							parseInt(minutes) + APPOINTMENT_INTERVAL >
								END_OF_MINUTES)
					) {
						break
					}

					this.times.push({
						start_time: time,
					})
				}
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item

	toFixedTwo(value: number): string {
		return (value < 10 ? '0' : '') + value
	}

	tOTime(value: string) {
		return tOTime(value)
	}
}
