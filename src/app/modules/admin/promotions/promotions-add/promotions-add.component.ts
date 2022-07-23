import { NgxIndexedDBService } from 'ngx-indexed-db'
import {
	ChangeDetectorRef,
	Component,
	HostListener,
	OnInit,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { AlertState } from 'app/components/alert/alert.service'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
import { PromotionServiceService } from '../promotion.service'
import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { select, Store } from '@ngrx/store'
import { Doctor } from '../../doctors/doctor.model'
import { Promotion } from '../promotion.model'
import * as DoctorActions from '../../doctors/doctor.actions'
import * as PromotionActions from '../promotion.actions'
import * as dayjs from 'dayjs'
import { Department } from '../../clinic/department/department.model'
import { MedicalService } from '../../clinic/clinic-services/medical-service.model'
import { hasData } from 'app/mawedy-core/helpers'

@Component({
	selector: 'promotion-add',
	templateUrl: './promotions-add.component.html',
	styleUrls: ['./promotions-add.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsAddComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _seoService: SeoService,
		private _formBuilder: FormBuilder,
		private _indexDbService: NgxIndexedDBService,
		private _indexDBService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private _promotionAPI: PromotionServiceService,
		private _errorHandlerService: ErrorHandlerService,
		private _store: Store<{ doctors: Doctor[]; promotions: Promotion[] }>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		history.back()
	}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	doctors$?: Observable<Doctor[]> = this._store.pipe(select('doctors'))

	unsubscribe$: Subject<any> = new Subject<any>()

	form: FormGroup = this._formBuilder.group({
		promotion_name: ['', Validators.required],
		highlights: ['', Validators.required],
		validity_start_date: ['', Validators.required],
		validity_end_date: ['', Validators.required],
		terms_and_conditions: ['', Validators.required],
		doctors: ['', Validators.required],
		department_id: ['', Validators.required],
		service_id: ['', Validators.required],
	})

	departments: Department[] = []

	medicalServices: MedicalService[] = []

	doctors: Doctor[] = []

	errors: any = {}

	isProcessing: boolean = false

	banner_picture: File | undefined | true = undefined

	bannerPreview: string | ArrayBuffer = '/assets/app/logo.svg'

	dateMinimum = dayjs().format('YYYY-MM-DD')

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			this._seoService.generateTags({
				title: `${clinic.name} | ${clinic?.address} | Add Promotion`,
			})
		})

		this.fetchAndLoadDoctors()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
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

		this.doctors = department.doctors
	}

	setFormValue(form: string, value: any) {
		this.form.get(form)?.setValue(value)
	}

	fetchAndLoadDoctors() {
		this._indexDbService
			.getAll(DB.DOCTORS)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((doctors) => {
				if (doctors) {
					this._store.dispatch(
						DoctorActions.loadDoctors({
							doctors: doctors as Doctor[],
						}),
					)
				}
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

	save() {
		this.isProcessing = true

		let form = new FormData()

		if (this.banner_picture !== undefined && this.banner_picture !== true) {
			form.append('banner_picture', this.banner_picture as any)
		}

		for (let key in this.form.value) {
			if (key !== 'doctors') {
				form.append(key, this.form.value[key])
			}
		}

		this.form.value.doctors.forEach((id: string, index: number) => {
			form.append(`doctors[${index}]`, id)
		})

		this._promotionAPI
			.post(form)
			.subscribe({
				next: (promotion: any) => {
					this._indexDbService
						.add(DB.PROMOTIONS, promotion.data)
						.subscribe(() =>
							this._store.dispatch(
								PromotionActions.addPromotion({
									promotion: promotion.data,
								}),
							),
						)

					this.form.reset()

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Promotion added successfully`,
						message: `You have added ${promotion.data.promotion_name} .`,
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
}
