import { AppointmentTypeEnum } from 'app/mawedy-core/enums/appointment-type.enum'
import { AppointmentStatusEnum } from './../../../../../../mawedy-core/enums/appointment-status.enum'
import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Store } from '@ngrx/store'
import {
	APPOINTMENT_INTERVAL,
	END_OF_HOURS,
	END_OF_MINUTES,
	PM,
} from 'app/mawedy-core/constants/app.constant'
import { DayTypes } from 'app/mawedy-core/enums/day.enum'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { empty, tOTime } from 'app/mawedy-core/helpers'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { DoctorService } from 'app/modules/admin/doctors/doctor.service'
import * as dayjs from 'dayjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	take,
	takeUntil,
} from 'rxjs'
import { DashboardForApprovalPatient } from '../../../for-approvals/dashboard-for-approval-patient.model'
import { DashboardWaitingPatient } from '../../../waiting-patients/dashboard-waiting-patient.model'
import { DashboardAppointment } from '../../dashboard-appointment.model'
import { DashboardAppointmentService } from '../../dashboard-appointment.service'
import { DashboardAppointmentConfirmReassignSlotModal } from './dashboard-appointment-confirm-reassign-slot.service'
import * as AppointmentActions from '../../../../appointments/appointment.actions'
import * as DashboardWaitingPatientsActions from '../../../waiting-patients/dashboard-waiting-patient.actions'
import * as DashboardAppointmentActions from '../../dashboard-appointment.actions'

@Component({
	selector: 'dashboard-appointment-confirm-reassign-slot',
	templateUrl: './dashboard-appointment-confirm-reassign-slot.component.html',
	styleUrls: ['./dashboard-appointment-confirm-reassign-slot.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentConfirmReassignSlotComponent
	implements OnInit
{
	constructor(
		private _doctorAPI: DoctorService,
		private _appointmentAPI: AppointmentService,
		private _indexDBService: NgxIndexedDBService,
		private _dashboardAppointmentService: DashboardAppointmentService,
		private _errorHandlerService: ErrorHandlerService,
		private _dashboardAppointmentConfirmReassignSlotModal: DashboardAppointmentConfirmReassignSlotModal,
		private _store: Store<{
			dashboardForApprovalPatients: DashboardForApprovalPatient[]
			dashboardAppointments: DashboardAppointment[]
			dashboardWaitingPatients: DashboardWaitingPatient[]
		}>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentConfirmReassignSlotModal.opened$

	doctor$: BehaviorSubject<Doctor | null> =
		this._dashboardAppointmentConfirmReassignSlotModal.doctor$

	doctorSchedules$: BehaviorSubject<Appointment[]> = new BehaviorSubject([])

	appointment$: BehaviorSubject<Appointment | null> =
		this._dashboardAppointmentService.current$

	appointmentSlot$: BehaviorSubject<{
		start_time: string
		end_time: string
	} | null> =
		this._dashboardAppointmentConfirmReassignSlotModal.appointmentSlot$

	day?: DayTypes

	date$: BehaviorSubject<string | null> =
		this._dashboardAppointmentConfirmReassignSlotModal.date$

	isActive: boolean = false

	times: { start_time: string }[] = []

	ngOnInit(): void {
		this._dashboardAppointmentConfirmReassignSlotModal.doctor$
			.pipe(take(1))
			.subscribe((doctor) => {
				if (doctor) {
					this._indexDBService
						.getByKey(DB.DOCTORS, doctor.id)
						.subscribe((newDoctor: Doctor) => {
							this._dashboardAppointmentConfirmReassignSlotModal.doctor$.next(
								newDoctor,
							)
						})

					this._doctorAPI
						.getSchedule(doctor)
						.pipe(take(1))
						.subscribe((appointments) => {
							this.doctorSchedules$.next(appointments.data)

							this.renderTimeSlots()
						})
				}
			})
	}

	renderTimeSlots() {
		combineLatest([
			this._dashboardAppointmentConfirmReassignSlotModal.doctor$,
			this.appointment$,
		])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [doctor, appointment] = results

				this.date$.next(
					dayjs(appointment.date as any).format('YYYY-MM-DD'),
				)

				if (empty(appointment.date) || empty(doctor)) {
					return
				}

				this.day = dayjs(appointment.date).format('dddd') as DayTypes

				if (empty(doctor.timeslots)) {
					return
				}

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

	identity = (item: any) => item

	toFixedTwo(value: number): string {
		return (value < 10 ? '0' : '') + value
	}

	tOTime(value: string) {
		return tOTime(value)
	}

	reSchedule() {
		combineLatest([this.appointmentSlot$, this.appointment$])
			.pipe(take(1))
			.subscribe((results) => {
				const [appointmentSlot, appointment] = results

				this._indexDBService
					.getAll(DB.APPOINTMENTS)
					.subscribe((appointments: Appointment[]) => {
						const markedAppointment = appointments.find(
							(schedule) =>
								schedule.start_time ===
								appointmentSlot.start_time,
						)

						if (empty(markedAppointment)) {
							return this.updateAppointment(
								appointmentSlot,
								appointment,
							)
						}

						this.swapSchedule(
							markedAppointment,
							appointmentSlot,
							appointment,
						)
					})
			})

		this.opened$.next(false)
	}

	swapSchedule(
		markedAppointment: Appointment,
		appointmentSlot: any,
		appointment: Appointment,
	): void {
		this._appointmentAPI
			.update(markedAppointment.id, {
				type: AppointmentTypeEnum.RETURNING,
				waiting: false,
				status: AppointmentStatusEnum.CONFIRMED,
				start_time: appointmentSlot.start_time,
				end_time: appointmentSlot.end_time,
				patient_id: appointment.patient.id,
			})
			.subscribe({
				next: (data: any) => {
					this.resolveTransfer(data.data)

					this.appointment$.next(data.data)

					this._indexDBService
						.update(DB.APPOINTMENTS, data.data)
						.subscribe(() => {
							this._store.dispatch(
								AppointmentActions.updateAppointment({
									appointment: data.data,
								}),
							)
						})
				},
				error: (http) => {
					this._errorHandlerService.handleError(http)
				},
			})
	}

	updateAppointment(
		appointmentSlot: {
			start_time: string
			end_time: string
		},
		appointment: Appointment,
	): void {
		this._appointmentAPI
			.update(appointment.id, {
				status: AppointmentStatusEnum.CONFIRMED,
				start_time: appointmentSlot.start_time,
				end_time: appointmentSlot.end_time,
			})
			.subscribe({
				next: (data: any) => {
					this._indexDBService
						.update(DB.APPOINTMENTS, data.data)
						.subscribe(() => {
							this._store.dispatch(
								AppointmentActions.updateAppointment({
									appointment: data.data,
								}),
							)

							this.appointment$.next(data.data)

							this.resolveTransfer(data.data)
						})
				},
				error: (http) => {
					this._errorHandlerService.handleError(http)
				},
			})
	}

	resolveTransfer(appointment: Appointment): void {
		this._indexDBService
			.update(DB.DASHBOARD_APPOINTMENTS, appointment)
			.subscribe(() => {
				this._store.dispatch(
					DashboardAppointmentActions.upsertDashboardAppointment({
						dashboardAppointment: appointment,
					}),
				)
			})

		this._indexDBService
			.deleteByKey(DB.DASHBOARD_WAITING_PATIENTS, appointment.id)
			.subscribe(() => {
				this._store.dispatch(
					DashboardWaitingPatientsActions.deleteDashboardWaitingPatient(
						{
							id: appointment.id,
						},
					),
				)
			})
	}
}
