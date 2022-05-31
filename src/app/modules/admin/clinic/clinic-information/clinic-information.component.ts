import { HttpErrorResponse } from '@angular/common/http'
import { AccountTypeEnum } from './../../../../mawedy-core/enums/account.type.enum'
import { isPlatformBrowser } from '@angular/common'
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, NgForm } from '@angular/forms'
import { createMask } from '@ngneat/input-mask'
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs'
import { BranchApi, ClinicApi } from '../clinic.api.service'
import { Clinic } from '../clinic.model'
import { ClinicUserService } from '../clinic.service'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { AlertState } from 'app/components/alert/alert.service'
import { IndexedDbController } from 'app/mawedy-core/indexed-db/indexed-db.controller'
import { DB } from 'app/mawedy-core/enums/index.db.enum'

@Component({
	selector: 'clinic-information',
	templateUrl: './clinic-information.component.html',
	styleUrls: ['./clinic-information.component.scss'],
})
export class ClinicInformationComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _branchApi: BranchApi,
		private _clinicApi: ClinicApi,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _indexDbController: IndexedDbController,
		private _clinicUserService: ClinicUserService,
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _errorHandlerService: ErrorHandlerService,
	) {}

	@ViewChild('ngForm') ngForm: NgForm

	@ViewChild('clinicDescription', { read: ElementRef }) clinicDescription!: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	emailInputMask = !isPlatformBrowser(this._platformID) ? null : createMask({ alias: 'email' })

	isProcessing: boolean = false

	errors = {
		name: false,
		description: false,
		email: false,
		phone_number_one: false,
		phone_number_one_country_code: false,
		phone_number_two: false,
		phone_number_two_country_code: false,
		address: false,
	}

	form: FormGroup = this._formBuilder.group({
		name: [''],
		email: [''],
		address: [''],
		latitude: [''],
		longitude: [''],
		description: [''],
		phone_number_one: [''],
		phone_number_two: [''],
		phone_number_one_country_code: ['AE'],
		phone_number_two_country_code: ['AE'],
	})

	banner_picture: File | undefined = undefined

	bannerPreview: string | ArrayBuffer = '/assets/app/logo.svg'

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.initializeForm()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	initializeForm(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			if (clinic.banner.picture !== null) {
				this.bannerPreview = clinic.banner.picture.url
			}

			this.bannerPreview

			this.form.setValue({
				name: clinic.name || '',
				email: clinic.email || '',
				address: clinic.address || '',
				latitude: clinic.latitude || '',
				longitude: clinic.longitude || '',
				description: clinic.description || '',
				phone_number_one: clinic.phone_number_one || '',
				phone_number_two: clinic.phone_number_two || '',
				phone_number_one_country_code: clinic.phone_number_one_country_code || '',
				phone_number_two_country_code: clinic.phone_number_two_country_code || '',
			})
		})
	}

	readFile(event: any): void {
		this.banner_picture = event.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(event.target.files[0])

		reader.onload = (_event) => {
			this.bannerPreview = reader.result
		}
	}

	handleMobileNumberChange(
		event: {
			countryCode: string
			phoneNumber: string
		},
		form: 'phone_number_one' | 'phone_number_two',
	) {
		this.form.value[form] = event.phoneNumber

		this.form.value[`${form}_country_code`] = event.countryCode
	}

	save(): void {
		this.clinic$.pipe(take(1)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			this.isProcessing = true

			for (let errorKey in this.errors) {
				this.errors[errorKey] = false
			}

			if (clinic.account_type === AccountTypeEnum.BRANCH) {
				return this.saveAsBranch()
			}

			this.saveAsMain()
		})
	}

	saveAsMain(): void {
		let form = new FormData()

		if (this.banner_picture) {
			form.append('banner_picture', this.banner_picture)
		}

		for (let key in this.form.value) {
			if (this.form.value[key] !== '') {
				form.append(key, this.form.value[key])
			}
		}

		this._clinicApi
			.post(form)
			.subscribe({
				next: (clinic) => {
					this.clinic$.next(clinic.data)

					this._indexDbController.upsert(DB.CLINIC, { id: 1, data: clinic.data })

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Success`,
						message: `You have updated the clinic profile of ${clinic.data.name} ${
							clinic.data.line_one
						} ${clinic.data.account_type.toLowerCase()}.`,
						type: 'success',
					})
				},
				error: (http: HttpErrorResponse) => {
					for (let key in http.error.errors) {
						for (let errorKey in this.errors) {
							if (key.includes(errorKey)) {
								this.errors[errorKey] = true
							}
						}
					}

					this._errorHandlerService.handleError(http)
				},
			})
			.add(() => (this.isProcessing = false))
	}

	saveAsBranch(): void {}

	autoGrow(): void {
		const textArea = this.clinicDescription.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}
}
