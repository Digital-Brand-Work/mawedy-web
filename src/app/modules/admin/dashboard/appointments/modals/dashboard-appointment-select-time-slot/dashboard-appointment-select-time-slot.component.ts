import { Appointment } from './../../../../appointments/appointment.model'
import { DoctorService } from './../../../../doctors/doctor.service'
import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddAppointmentModal } from 'app/modules/admin/appointments/appointment-add/appointment-add.service'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { BehaviorSubject, combineLatest, Subject, take, takeUntil } from 'rxjs'
import { DashboardAppointmentSelectTimeSlotModal } from './dashboard-appointment-select-time-slot.service'
import { DayTypes } from 'app/app-core/enums/day.enum'
import {
	APPOINTMENT_INTERVAL,
	END_OF_HOURS,
	END_OF_MINUTES,
	PM,
} from 'app/app-core/constants/app.constant'
import { empty, tOTime } from 'app/app-core/helpers'
import * as dayjs from 'dayjs'

@Component({
	selector: 'dashboard-appointment-select-time-slot',
	templateUrl: './dashboard-appointment-select-time-slot.component.html',
	styleUrls: ['./dashboard-appointment-select-time-slot.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentSelectTimeSlotComponent implements OnInit {
	constructor(
		private _doctorAPI: DoctorService,
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

	doctorSchedules$: BehaviorSubject<Appointment[]> = new BehaviorSubject([])

	appointmentSlot$: BehaviorSubject<{
		start_time: string
		end_time: string
	} | null> = this._addAppointmentModal.appointmentSlot$

	isActive: boolean = false

	times: { start_time: string }[] = []

	day?: DayTypes

	ngOnInit(): void {
		this.doctor$.pipe(take(1)).subscribe((doctor) => {
			this._doctorAPI
				.getSchedule(doctor)
				.pipe(take(1))
				.subscribe((appointments) => {
					this.doctorSchedules$.next(appointments.data)

					this.renderTimeSlots()
				})
		})
	}

	renderTimeSlots() {
		combineLatest([this.date$, this.doctor$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [date, doctor] = results

				if (empty(date) || empty(doctor)) {
					return
				}

				this.day = dayjs(date).format('dddd') as DayTypes

				const timeSlot = doctor.timeslots.find(
					(slot) => slot.day === this.day,
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

	toFixedTwo(value: number): string {
		return (value < 10 ? '0' : '') + value
	}

	tOTime(value: string) {
		return tOTime(value)
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
