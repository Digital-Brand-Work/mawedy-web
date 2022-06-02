import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, NgForm } from '@angular/forms'
import { countries } from 'app/mawedy-core/constants/countries.constant'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs'
import { Patient } from '../../patient.model'
import { PatientService } from '../../patient.service'

@Component({
	selector: 'patient-details-information',
	templateUrl: './patient-details-information.component.html',
	styleUrls: ['./patient-details-information.component.scss'],
})
export class PatientDetailsInformationComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _clinicUserService: ClinicUserService,
		private _patientService: PatientService,
	) {}

	@ViewChild('ngForm') ngForm?: NgForm

	@ViewChild('input') input?: ElementRef

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	patient$: BehaviorSubject<Patient | null> = this._patientService.current$

	unsubscribe$: Subject<any> = new Subject<any>()

	cities: string[] = []

	countryJson = countries

	form: FormGroup = this._formBuilder.group({
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

	ngOnInit(): void {
		combineLatest([this.patient$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [patient] = results

				if (!patient) {
					return
				}

				this.form.setValue({
					first_name: patient.first_name,
					middle_name: patient.middle_name,
					last_name: patient.last_name,
					birthday: patient.birthday,
					gender: patient.gender,
					religion: patient.religion,
					phone_number: patient.phone_number,
					email: patient.email,
					city: patient.city,
					address: patient.address,
					country: patient.country,
				})
			})
	}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	identity = (item: any) => item

	onChangeCountry(country: string) {
		this.cities = this.countryJson[country]
	}
}
