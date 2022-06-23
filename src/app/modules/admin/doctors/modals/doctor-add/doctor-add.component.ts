import { AddAppointmentModal } from './../../../appointments/appointment-add/appointment-add.service'
import { empty, setPrefix } from 'app/mawedy-core/helpers'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { Department } from 'app/modules/admin/clinic/department/department.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { AddDoctorModal } from './doctor-add.service'
import * as DepartmentActions from '../../../clinic/department//department.actions'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Doctor, TimeSlot } from '../../doctor.model'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { DoctorService } from '../../doctor.service'
import * as DoctorActions from '../../doctor.actions'
import { AlertState } from 'app/components/alert/alert.service'
import { HttpErrorResponse } from '@angular/common/http'
import { take } from 'lodash'

@Component({
	selector: 'doctor-add',
	templateUrl: './doctor-add.component.html',
	styleUrls: ['./doctor-add.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorAddComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _doctorService: DoctorService,
		private _addDoctorModal: AddDoctorModal,
		private _store: Store<{ doctor: Doctor }>,
		private _indexDBService: NgxIndexedDBService,
		private _addAppointmentModal: AddAppointmentModal,
		private _errorHandlerService: ErrorHandlerService,
		private store: Store<{ department: Department[]; doctors: Doctor }>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	doctors$: BehaviorSubject<Doctor[]> = this._addAppointmentModal.doctors$

	departments$?: Observable<Department[]>

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addDoctorModal.opened$

	form: FormGroup = this._formBuilder.group({
		name: ['', [Validators.required]],
		profession: ['', [Validators.required]],
		experience: ['', [Validators.required]],
		about: ['', [Validators.required]],
		phone_number: ['', [Validators.required]],
		phone_country_code: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		departments: ['', [Validators.required]],
	})

	errors = {
		name: false,
		profession: false,
		experience: false,
		about: false,
		phone_number: false,
		phone_country_code: false,
		email: false,
		departments: false,
	}

	timeslots: TimeSlot[] = []

	currentTimeSlots: {
		[key: string]: {
			active: boolean
			start: string
			end: string
		}
	} = {}

	picture: File | undefined | true = undefined

	picturePreview: string | ArrayBuffer | undefined = undefined

	isProcessing: boolean = false

	ngOnInit(): void {
		this.departments$ = this.store.select('department')

		this._indexDBService
			.getAll(DB.DEPARTMENTS)
			.subscribe((departments: Department[]) => {
				this.store.dispatch(
					DepartmentActions.loadDepartments({
						departments: departments,
					}),
				)

				if (departments.length !== 0) {
					this.form.get('departments')?.setValue(departments[0].id)
				}
			})
	}

	ngOnDestroy(): void {
		this.opened$.subscribe()

		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	ngAfterContentInit(): void {
		this._cdr.detectChanges()
	}

	ngAfterViewInit(): void {
		this.opened$.pipe(takeUntil(this.unsubscribe$)).subscribe((focused) => {
			if (focused) {
				this.input.nativeElement.focus()
			}
		})

		this._cdr.detectChanges()
	}

	readFile(event: any): void {
		this.picture = event.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(event.target.files[0])

		reader.onload = (_event) => {
			this.picturePreview = reader.result
		}
	}

	handleMobileNumberChange(event: {
		countryCode: string
		phoneNumber: string
	}): void {
		this.form.get('phone_number')?.setValue(event.phoneNumber)

		this.form.get('phone_country_code')?.setValue(event.countryCode)
	}

	changeSchedule(event: {
		[key: string]: {
			active: boolean
			start: string
			end: string
		}
	}): void {
		this.currentTimeSlots = event
	}

	save(): void {
		this.isProcessing = true

		const form = new FormData()

		if (this.picture !== undefined && this.picture !== true) {
			form.append('picture', this.picture)
		}

		const excludes = ['phone_number', 'departments']

		for (let key in this.form.value) {
			if (!excludes.includes(key)) {
				form.append(key, this.form.value[key])
			}
		}

		form.append('departments[0]', this.form.value.departments)

		form.append(
			'phone_number',
			setPrefix(this.form.value.phone_country_code) +
				this.form.value.phone_number,
		)

		for (let day in this.currentTimeSlots) {
			for (let key in this.currentTimeSlots[day]) {
				form.append(
					`timeslots[${day}][${key}]`,
					this.currentTimeSlots[day][key],
				)
			}
		}

		this._doctorService
			.post(form)
			.subscribe({
				next: (doctor: any) => {
					this._indexDBService
						.add(DB.DOCTORS, doctor.data)
						.subscribe(() => {
							this._store.dispatch(
								DoctorActions.addDoctor({
									doctor: doctor.data,
								}),
							)

							this.form.reset()

							this.picture = undefined

							this.picturePreview = undefined

							this.input.nativeElement.focus()

							this._alert.add({
								id: Math.floor(
									Math.random() * 100000000000,
								).toString(),
								title: `Dr. ${doctor.data.name} Successfully Added`,
								message: `A new doctor has been successfully added to this branch`,
								type: 'success',
							})
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
			.add(() => (this.isProcessing = false))
	}
}
