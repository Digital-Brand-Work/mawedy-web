import { Coordinates } from './../clinic-information-map/clinic-information-map.component'
import { HttpErrorResponse } from '@angular/common/http'
import { AccountTypeEnum } from './../../../../mawedy-core/enums/account.type.enum'
import { isPlatformBrowser } from '@angular/common'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, NgForm } from '@angular/forms'
import { createMask } from '@ngneat/input-mask'
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs'
import { BranchApi, ClinicApi } from '../clinic.api.service'
import { Clinic, ClinicTimeSlot } from '../clinic.model'
import { ClinicUserService } from '../clinic.service'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { AlertState } from 'app/components/alert/alert.service'
import { IndexedDbController } from 'app/mawedy-core/indexed-db/indexed-db.controller'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { days } from 'app/mawedy-core/enums/day.enum'
import { ClinicTimingSelectModal } from '../clinic-timings/modals/clinic-timings-select-modal/clinic-timings.select-moda.service'
import { times } from 'lodash'

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
		private _clinicTimingSelectModal: ClinicTimingSelectModal,
	) {}

	@ViewChild('ngForm') ngForm: NgForm

	@ViewChild('clinicDescription', { read: ElementRef })
	clinicDescription!: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	timing$: BehaviorSubject<ClinicTimeSlot> =
		this._clinicTimingSelectModal.timing$

	emailInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({ alias: 'email' })

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
		latitude: [0],
		longitude: [0],
		description: [''],
		phone_number_one: [''],
		phone_number_two: [''],
		phone_number_one_country_code: ['AE'],
		phone_number_two_country_code: ['AE'],
	})

	timeslots: ClinicTimeSlot[] = []

	banner_picture: File | undefined | true = undefined

	bannerPreview: string | ArrayBuffer = '/assets/app/logo.svg'

	ngOnInit(): void {
		this.listenToTimeSlotChanges()
	}

	ngAfterViewInit(): void {
		this.initializeForm()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	listenToTimeSlotChanges(): void {
		this.timing$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((timeslot) => {
				const index = this.timeslots.findIndex(
					(slot) => slot.day === timeslot.day,
				)

				if (index >= 0) {
					this.timeslots[index] = timeslot
				}
			})
	}

	initializeForm(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			if (clinic.banner && clinic.banner.picture !== null) {
				this.bannerPreview = clinic.banner.picture.url
			}

			this.bannerPreview

			this.banner_picture = true

			this.form.setValue({
				name: clinic.name || '',
				email: clinic.email || '',
				address: clinic.address || '',
				latitude: parseFloat(clinic.latitude) || 0,
				longitude: parseFloat(clinic.longitude) || 0,
				description: clinic.description || '',
				phone_number_one: clinic.phone_number_one || '',
				phone_number_two: clinic.phone_number_two || '',
				phone_number_one_country_code:
					clinic.phone_number_one_country_code || '',
				phone_number_two_country_code:
					clinic.phone_number_two_country_code || '',
			})

			this.timeslots = clinic.timeslots

			this.handLeEmptyTimeSlots()
		})
	}

	handLeEmptyTimeSlots(): void {
		for (let day of days) {
			if (
				this.timeslots.findIndex(
					(_timeSlot) =>
						_timeSlot.day.toLocaleLowerCase() ===
						day.toLocaleLowerCase(),
				) < 0
			) {
				this.timeslots.push({
					start: null,
					end: null,
					day: day,
					active: false,
				})
			}
		}
	}

	readFile(event: any): void {
		this.banner_picture = event.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(event.target.files[0])

		reader.onload = (_event) => {
			this.bannerPreview = reader.result
		}
	}

	handleMarkerDrag(event: Coordinates): void {
		this.form.value.latitude = event.latitude

		this.form.value.longitude = event.longitude
	}

	handleMobileNumberChange(
		event: {
			countryCode: string
			phoneNumber: string
		},
		form: 'phone_number_one' | 'phone_number_two',
	): void {
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

		if (this.banner_picture !== undefined && this.banner_picture !== true) {
			form.append('banner_picture', this.banner_picture as any)
		}

		for (let key in this.form.value) {
			if (this.form.value[key] !== '') {
				form.append(key, this.form.value[key])
			}
		}

		this.timeslots.forEach((slot) => {
			form.append(
				`timeslots[${slot.day.toLowerCase()}][active]`,
				slot.active + '',
			)

			if (slot.start && slot.start !== null) {
				form.append(
					`timeslots[${slot.day.toLowerCase()}][start]`,
					slot.start + '',
				)
			}

			if (slot.end && slot.end !== null) {
				form.append(
					`timeslots[${slot.day.toLowerCase()}][end]`,
					slot.end + '',
				)
			}
		})

		this._clinicApi
			.post(form)
			.subscribe({
				next: (clinic) => {
					this.clinic$.next(clinic.data)

					this._indexDbController.upsert(DB.CLINIC, {
						id: 1,
						data: clinic.data,
					})

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Success`,
						message: `You have updated the clinic profile of ${
							clinic.data.name
						} ${
							clinic.data.address
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
