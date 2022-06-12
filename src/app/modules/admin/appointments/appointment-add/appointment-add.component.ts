import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { AppointmentService } from './../appointment.service'
import { empty, hasData, tOTime, toTwelve } from 'app/mawedy-core/helpers'
import { Doctor, TimeSlot } from 'app/modules/admin/doctors/doctor.model'
import { MedicalService } from './../../clinic/clinic-services/medical-service.model'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject, combineLatest, skip, Subject, takeUntil } from 'rxjs'
import { AddAppointmentModal } from './appointment-add.service'
import { createMask } from '@ngneat/input-mask'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DashboardAppointmentSelectDoctorModal } from '../../dashboard/appointments/modals/dashboard-appointment-select-doctor/dashboard-appointment-select-doctor.service'
import { DashboardAppointmentSelectTimeSlotModal } from '../../dashboard/appointments/modals/dashboard-appointment-select-time-slot/dashboard-appointment-select-time-slot.service'
import { isPlatformBrowser } from '@angular/common'
import { AlertState } from 'app/components/alert/alert.service'
import { Store } from '@ngrx/store'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { Department } from '../../clinic/department/department.model'
import { Patient } from '../../patients/patient.model'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import * as dayjs from 'dayjs'
import { throws } from 'assert'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
	selector: 'appointment-add',
	templateUrl: './appointment-add.component.html',
	styleUrls: ['./appointment-add.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentAddComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _indexDBService: NgxIndexedDBService,
		private _errorHandlerService: ErrorHandlerService,
		private _addAppointmentModal: AddAppointmentModal,
		private store: Store<{ department: Department; patient: Patient }>,
		private _appointmentAPI: AppointmentService,
		private _dashboardAppointmentSelectDoctorModal: DashboardAppointmentSelectDoctorModal,
		private _dashboardAppointmentSelectTimeSlotModal: DashboardAppointmentSelectTimeSlotModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input?: ElementRef

	@ViewChild('comments', { read: ElementRef }) textArea: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addAppointmentModal.opened$

	dashboardAppointmentSelectDoctorModalOpened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentSelectDoctorModal.opened$

	dashboardAppointmentSelectTimeSlotModalOpened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentSelectTimeSlotModal.opened$

	currencyInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({
				alias: 'numeric',
				groupSeparator: ',',
				digits: 2,

				digitsOptional: false,
				prefix: 'AED ',
				placeholder: '0',
		  })

	currencyFC = new FormControl('')

	patients$: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([])

	departments: Department[] = []

	medicalServices: MedicalService[] = []

	doctors$: BehaviorSubject<Doctor[]> = this._addAppointmentModal.doctors$

	doctor$: BehaviorSubject<Doctor | null> = this._addAppointmentModal.doctor$

	appointmentTypes: string[] = ['Returning', 'New Appointment', 'Walk In']

	timeSlots$: BehaviorSubject<TimeSlot[]> = new BehaviorSubject([])

	date$: BehaviorSubject<string | null> = this._addAppointmentModal.date$

	appointmentSlot$: BehaviorSubject<{
		start_time: string
		end_time: string
	} | null> = this._addAppointmentModal.appointmentSlot$

	keyword: string = ''

	form: FormGroup = this._formBuilder.group({
		patient_id: ['', Validators.required],
		department_id: ['', Validators.required],
		service_id: ['', Validators.required],
		doctor_id: ['', Validators.required],
		date: ['', Validators.required],
		start_time: ['', Validators.required],
		end_time: ['', Validators.required],
		type: ['Returning', Validators.required],
		price: ['', Validators.required],
		waiting: [false, Validators.required],
		comments: [''],
	})

	errors: any = {}

	patientListIsFocused: boolean = false

	date = {
		min: dayjs().format('YYYY-MM-DD'),
	}

	ngOnInit(): void {
		this.setPatients()

		combineLatest([this.doctor$, this.appointmentSlot$])
			.pipe(takeUntil(this.unsubscribe$), skip(1))
			.subscribe((results) => {
				const [doctor, appointment_slot] = results

				if (!empty(doctor)) {
					this.form.value.doctor_id = doctor.id
				}

				if (!empty(appointment_slot)) {
					this.setFormValue('start_time', appointment_slot.start_time)

					this.setFormValue('end_time', appointment_slot.end_time)
				}
			})
	}

	ngAfterContentInit(): void {
		this._indexDBService
			.getAll(DB.DEPARTMENTS)
			.subscribe((departments: Department[]) => {
				this.departments = departments

				if (hasData(departments)) {
					this.setMedicalServices(departments[0].id)
				}
			})

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	tOTime(value: string) {
		return tOTime(value)
	}

	toTwelve(value: string) {
		toTwelve(value)
	}

	setPatients() {
		this._indexDBService
			.getAll(DB.PATIENTS)
			.subscribe((patients: Patient[]) => this.patients$.next(patients))
	}

	/**
     * 
     * @param id 
        from department  id
     */
	setMedicalServices(id: string) {
		this.setFormValue('department_id', id)

		const department = this.departments.find(
			(department) => department.id === id,
		)

		this.medicalServices = department.services

		this.setFormValue(
			'service_id',
			hasData(department.services) ? department.services[0].id : '',
		)

		this.doctors$.next(department.doctors)

		this.doctor$.next(
			hasData(department.doctors) ? department.doctors[0] : null,
		)

		this.setFormValue(
			'doctor_id',
			hasData(department.doctors) ? department.doctors[0]?.id : '',
		)
	}

	setFormValue(form: string, value: any) {
		this.form.get(form)?.setValue(value)
	}

	setDoctors(doctors: Doctor[]) {
		this.doctors$.next(doctors)
	}

	setTimeSlots(timeSlots: TimeSlot[]) {
		this.timeSlots$.next(timeSlots)
	}

	autoGrow() {
		const textArea = this.textArea.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}

	save() {
		this.form.disable()

		if (this.form.get('type')?.value === 'Walk In') {
			this.setFormValue('waiting', true)
		}

		this._appointmentAPI
			.post(this.form.value)
			.subscribe({
				next: (appointment: any) => {
					this.opened$.next(false)

					this.doctor$.next(null)

					this.date$.next(null)

					this.appointmentSlot$.next(null)

					this.form.reset()

					this.saveLocally(appointment.data)

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Appointment booked successfully`,
						message: `Appointment for ${appointment.data.service.name} by ${appointment.data.patient.first_name} to ${appointment.data.doctor.name} has been scheduled.`,
						type: 'success',
					})
				},
				error: (http: HttpErrorResponse) => {
					this._errorHandlerService.handleError(http)

					for (let key in http.error.errors) {
						for (let errorKey in this.errors) {
							if (key.includes(errorKey)) {
								this.errors[errorKey] = true
							}
						}
					}
				},
			})
			.add(() => this.form.enable())
	}

	saveLocally(appointment: Appointment) {
		const databases = [DB.APPOINTMENTS]

		if (
			dayjs().format('MMMM-DD-YYY') ===
			dayjs(appointment.date).format('MMMM-DD-YYY')
		) {
			if (appointment.waiting) {
				databases.push(DB.DASHBOARD_WAITING_PATIENTS)
			} else {
				databases.push(DB.DASHBOARD_APPOINTMENTS)
			}
		}

		databases.forEach((db: string) =>
			this._indexDBService.add(db, appointment),
		)
	}
}
