import { dbwAnimations } from './../../../../../@digital_brand_work/animations/animation.api'
import { Coordinates } from './../clinic-information-map/clinic-information-map.component'
import { HttpErrorResponse } from '@angular/common/http'
import { AccountTypeEnum } from '../../../../app-core/enums/account.type.enum'
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
import { FormBuilder, FormGroup } from '@angular/forms'
import { createMask } from '@ngneat/input-mask'
import { BehaviorSubject, combineLatest, Subject, take, takeUntil } from 'rxjs'
import { BranchApi, ClinicApi } from '../clinic.api.service'
import { Clinic, ClinicTimeSlot } from '../clinic.model'
import { ClinicUserService } from '../clinic.service'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'
import { AlertState } from 'app/components/alert/alert.service'
import { IndexedDbController } from 'app/app-core/indexed-db/indexed-db.controller'
import { DB } from 'app/app-core/enums/index.db.enum'
import { days } from 'app/app-core/enums/day.enum'
import { ClinicTimingSelectModal } from '../clinic-timings/modals/clinic-timings-select-modal/clinic-timings.select-moda.service'
import { empty, removeDialCode, setPrefix } from 'app/app-core/helpers'

@Component({
	selector: 'clinic-information',
	templateUrl: './clinic-information.component.html',
	styleUrls: ['./clinic-information.component.scss'],
	animations: [...dbwAnimations],
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

			if (!empty(clinic.banner) && !empty(clinic.banner.picture)) {
				this.bannerPreview = clinic.banner.picture.url
			}

			this.banner_picture = true

			this.form.setValue({
				name: clinic.name || '',
				email: clinic.email || '',
				address: clinic.address || '',
				latitude: parseFloat(clinic.latitude) || 0,
				longitude: parseFloat(clinic.longitude) || 0,
				description: clinic.description || '',
				phone_number_one: removeDialCode(
					clinic.phone_number_one,
					clinic.phone_number_one_country_code,
				),
				phone_number_two: removeDialCode(
					clinic.phone_number_two,
					clinic.phone_number_two_country_code,
				),
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
			if (!empty(this.form.value[key]) || key !== 'phone_number_two') {
				if (key !== 'phone_number_two_country_code') {
					form.append(key, this.form.value[key])
				}
			}
		}

		if (!empty(this.form.value.phone_number_two)) {
			form.append(
				'phone_number_two',
				setPrefix(this.form.value.phone_number_two_country_code) +
					this.form.value.phone_number_two,
			)
		}

		form.append(
			'phone_number_one',
			setPrefix(this.form.value.phone_number_one_country_code) +
				this.form.value.phone_number_one,
		)

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

	saveAsBranch(): void {
		let form = new FormData()

		if (this.banner_picture !== undefined && this.banner_picture !== true) {
			form.append('banner_picture', this.banner_picture as any)
		}

		const excludes = [
			'phone_number_two',
			'phone_number_two_country_code',
			'phone_number_one',
			'phone_number_one_country_code',
		]

		for (let key in this.form.value) {
			if (!empty(this.form.value[key]) || !excludes.includes(key)) {
				form.append(key, this.form.value[key])
			}
		}

		if (!empty(this.form.value.phone_number_two)) {
			form.append(
				'phone_number_two',
				setPrefix(this.form.value.phone_number_two_country_code) +
					this.form.value.phone_number_two,
			)
		}

		if (!empty(this.form.value.phone_number_one)) {
			form.append(
				'phone_number_one',
				setPrefix(this.form.value.phone_number_one_country_code) +
					this.form.value.phone_number_one,
			)
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

		combineLatest([this.clinic$, this._branchApi.post(form)])
			.pipe(take(1))
			.subscribe((results) => {
				const [oldClinic, clinic] = results

				this.clinic$.next({
					...clinic.data,
					accounts: oldClinic.accounts,
				})

				this._indexDbController.upsert(DB.CLINIC, {
					id: 1,
					data: { ...clinic.data, accounts: oldClinic.accounts },
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
			})
			.add(() => (this.isProcessing = false))

		// this._branchApi
		// 	.post(form)
		// 	.subscribe({
		// 		next: (clinic) => {

		// 		},
		// 		error: (http: HttpErrorResponse) => {
		// 			for (let key in http.error.errors) {
		// 				for (let errorKey in this.errors) {
		// 					if (key.includes(errorKey)) {
		// 						this.errors[errorKey] = true
		// 					}
		// 				}
		// 			}

		// 			this._errorHandlerService.handleError(http)
		// 		},
		// 	})
		// 	.add(() => (this.isProcessing = false))
	}

	autoGrow(): void {
		const textArea = this.clinicDescription.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}
}
