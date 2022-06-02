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
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { createMask } from '@ngneat/input-mask'
import { Store } from '@ngrx/store'
import { countries } from 'app/mawedy-core/constants/countries.constant'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { Patient } from '../../patient.model'
import { PatientService } from '../../patient.service'
import { AddPatientModal } from './patient-add.service'
import * as PatientActions from '../../patient.actions'
import { HttpErrorResponse } from '@angular/common/http'
import { AlertState } from 'app/components/alert/alert.service'

@Component({
	selector: 'patient-add',
	templateUrl: './patient-add.component.html',
	styleUrls: ['./patient-add.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientAddComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _addPatientModal: AddPatientModal,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _errorHandlerService: ErrorHandlerService,
		private _patientService: PatientService,
		private _store: Store<{ department: Patient[] }>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('ngForm') ngForm!: NgForm

	@ViewChild('comments', { read: ElementRef }) textArea: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addPatientModal.opened$

	countryJson = countries

	cities: string[] = []

	form: FormGroup = this._formBuilder.group({
		first_name: ['', [Validators.required]],
		middle_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		birthday: ['', [Validators.required]],
		gender: ['Male', [Validators.required]],
		religion: ['', [Validators.required]],
		phone_number: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		city: ['Dubai', [Validators.required]],
		address: ['', [Validators.required]],
		country: ['United Arab Emirates', [Validators.required]],
	})

	picture: File | undefined | true = undefined

	picturePreview: string | ArrayBuffer | undefined = undefined

	ngOnInit(): void {}

	identity = (item: any) => item

	onChangeCountry(country: string) {
		this.cities = this.countryJson[country]

		this.form.value.country = country

		this.form.value.city = this.cities[0]
	}

	ngAfterViewInit(): void {
		this.opened$.pipe(takeUntil(this.unsubscribe$)).subscribe((focused) => {
			if (focused) {
				this.input.nativeElement.focus()
			}
		})

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	readFile(event: any): void {
		this.picture = event.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(event.target.files[0])

		reader.onload = (_event) => {
			this.picturePreview = reader.result
		}
	}

	save() {
		this.form.disable()

		this._patientService
			.post(this.form.value)
			.subscribe({
				next: (patient: any) => {
					this._store.dispatch(
						PatientActions.addPatient({
							patient: patient.data,
						}),
					)

					this.form.reset()

					this.picture = undefined

					this.picturePreview = undefined

					this.input.nativeElement.focus()

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `${patient.data.first_name} Successfully Added`,
						message: `A new patient has been successfully added to this branch`,
						type: 'info',
					})
				},
				error: (http: HttpErrorResponse) => {
					this._errorHandlerService.handleError(http)
				},
			})
			.add(this.form.enable())
	}
}
