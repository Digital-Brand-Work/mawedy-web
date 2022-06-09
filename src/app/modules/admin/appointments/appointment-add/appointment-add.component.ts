import { hasData } from 'app/mawedy-core/helpers'
import { Doctor, TimeSlot } from 'app/modules/admin/doctors/doctor.model'
import { MedicalService } from './../../clinic/clinic-services/medical-service.model'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs'
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
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
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

	doctors$: BehaviorSubject<Doctor[]> = new BehaviorSubject([])

	timeSlots$: BehaviorSubject<TimeSlot[]> = new BehaviorSubject([])

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
		comments: [false, Validators.required],
	})

	patientListIsFocused: boolean = false

	ngOnInit(): void {
		this.setPatients()

		this._indexDBService
			.getAll(DB.DEPARTMENTS)
			.subscribe((departments: Department[]) => {
				this.departments = departments

				if (
					departments.length !== 0 &&
					departments[0]?.services.length !== 0
				) {
					this.medicalServices = departments[0].services
				}
			})
	}

	setPatients() {
		this._indexDBService
			.getAll(DB.PATIENTS)
			.subscribe((patients: Patient[]) => this.patients$.next(patients))
	}

	setMedicalServices(id: string) {
		const services = this.departments.find(
			(department) => department.id === id,
		).services

		this.medicalServices = services
	}

	setDoctors(doctors: Doctor[]) {
		this.doctors$.next(doctors)
	}

	setTimeSlots(timeSlots: TimeSlot[]) {
		this.timeSlots$.next(timeSlots)
	}

	ngAfterViewInit(): void {
		this.opened$.pipe(takeUntil(this.unsubscribe$)).subscribe((focused) => {
			if (focused) {
				this.input?.nativeElement.focus()
			}
		})

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	autoGrow() {
		const textArea = this.textArea.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}
}
