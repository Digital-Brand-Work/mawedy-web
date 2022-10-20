import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { countries } from 'app/app-core/constants/countries.constant'
import { DB } from 'app/app-core/enums/index.db.enum'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, forkJoin, Subject, takeUntil } from 'rxjs'
import { Patient } from '../../patient.model'
import { PatientService } from '../../patient.service'
import * as dayjs from 'dayjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AlertState } from 'app/components/alert/alert.service'
import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'

@Component({
	selector: 'patient-details-information',
	templateUrl: './patient-details-information.component.html',
	styleUrls: ['./patient-details-information.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientDetailsInformationComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _clinicUserService: ClinicUserService,
		private _patientService: PatientService,
		private _indexDBService: NgxIndexedDBService,
		private _errorHandlerService: ErrorHandlerService,
	) {}

	@ViewChild('input')
	input?: ElementRef

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	patient$: BehaviorSubject<Patient | null> = this._patientService.current$

	unsubscribe$: Subject<any> = new Subject<any>()

	cities: string[] = []

	countryJson = countries

	form: FormGroup = this._formBuilder.group({
		id: [''],
		first_name: [''],
		middle_name: [''],
		last_name: [''],
		birthday: [''],
		gender: ['Male'],
		religion: [''],
		phone_number: [''],
		email: [''],
		city: ['Dubai'],
		address: [''],
		country: ['United Arab Emirates'],
	})

	picture: File | undefined | true = undefined

	picturePreview: string | ArrayBuffer | undefined = undefined

	ready: boolean = false

	ngOnInit(): void {
		setTimeout(() => {
			forkJoin([this._indexDBService.getByKey(DB.PATIENT, 1)])
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe((results: [patient: { data: Patient }]) => {
					const [patient] = results

					if (!patient) {
						return
					}

					this.setForm(patient)

					if (patient.data.picture && patient.data.picture !== null) {
						this.picturePreview = patient.data.picture.url
					}

					this.ready = true

					if (this.input) {
						this.input.nativeElement.focus()

						this._cdr.detectChanges()
					}
				})
		}, 300)
	}

	setForm(patient: { data: Patient }) {
		this.form.setValue({
			id: patient.data.id,
			first_name: patient.data.first_name,
			middle_name: patient.data.middle_name,
			last_name: patient.data.last_name,
			birthday: dayjs(patient.data.birthday).format('YYYY-MM-DD'),
			gender: patient.data.gender,
			religion: patient.data.religion,
			phone_number: patient.data.phone_number,
			email: patient.data.email,
			city: patient.data.city,
			address: patient.data.address,
			country: patient.data.country,
		})
	}

	ngAfterViewInit(): void {
		if (this.input) {
			this.input.nativeElement.focus()
		}

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	onChangeCountry(country: string) {
		this.cities = this.countryJson[country]
	}

	readFile(event: any): void {
		this.picture = event.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(event.target.files[0])

		reader.onload = (_event) => {
			this.picturePreview = reader.result
		}
	}

	update() {
		this.form.disable()

		const form = new FormData()

		if (this.picture !== undefined && this.picture !== true) {
			form.append('picture', this.picture)
		}

		for (let key in this.form.value) {
			form.append(key, this.form.value[key])
		}

		form.delete('id')

		this._patientService
			.updateWithFile(this.form.value.id, form)
			.subscribe({
				next: (data: any) => {
					this._indexDBService
						.update(DB.PATIENTS, data.data)
						.subscribe(() => {
							this.patient$.next(data.data)

							this.setForm(data)

							this._alert.add({
								id: Math.floor(
									Math.random() * 100000000000,
								).toString(),
								title: `Profile Successfully Updated`,
								message: `You have update the profile of ${data.data.first_name}`,
								type: 'success',
							})
						})
				},
				error: (http: HttpErrorResponse) => {
					this._errorHandlerService.handleError(http)
				},
			})
			.add(this.form.enable())
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
