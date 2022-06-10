import { empty } from 'app/mawedy-core/helpers'
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
					this.isActive = false
				}

				let timings = []

				const [startHour, startMinutes] = timeSlot.start.split(':')

				const [endHour, endMinutes] = timeSlot.end.split(':')

				const PM = 12

				const END_OF_HOURS = 23

				const END_OF_MINUTES = 59

				const APPOINTMENT_INTERVAL = 30

				for (
					let time = parseInt(startHour);
					time <= END_OF_HOURS || time <= parseInt(endHour);
					time++
				) {
					timings.push(`${time}:${startMinutes}`)

					if (
						parseInt(startMinutes) + APPOINTMENT_INTERVAL <
						END_OF_MINUTES
					) {
						timings.push(
							`${time}:${
								parseInt(startMinutes) + APPOINTMENT_INTERVAL
							}`,
						)
					} else {
						timings.push(`${time}:${startMinutes}`)
					}
				}

				if (parseInt(startHour) > PM) {
					const [lastHour, lastMinutes] =
						timings[timings.length - 1].split(':')

					if (
						parseInt(lastMinutes) + APPOINTMENT_INTERVAL >
						END_OF_MINUTES
					) {
						timings.push(
							'00:' +
								(parseInt(lastMinutes) - APPOINTMENT_INTERVAL),
						)
					}

					for (let time = 0; time < parseInt(endHour); time++) {
						timings.push(`${time}:${endMinutes}`)

						if (
							parseInt(endMinutes) + APPOINTMENT_INTERVAL <
							END_OF_MINUTES
						) {
							timings.push(
								`${time}:${
									parseInt(endMinutes) + APPOINTMENT_INTERVAL
								}`,
							)
						} else {
							timings.push(`${time}:${endMinutes}`)
						}
					}
				}

				timings = [...new Set(timings)]

				timings.forEach((time) => {
					this.times.push({
						start_time: time,
					})
				})
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item
}
