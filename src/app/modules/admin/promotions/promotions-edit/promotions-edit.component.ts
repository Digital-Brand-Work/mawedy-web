import { empty, hasData } from 'app/app-core/helpers'
import { ErrorHandlerService } from '../../../../app-core/misc/error-handler.service'
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
import { NgxIndexedDBService } from 'ngx-indexed-db'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	takeUntil,
} from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
import { PromotionServiceService } from '../promotion.service'
import { select, Store } from '@ngrx/store'
import { Doctor } from '../../doctors/doctor.model'
import { Promotion } from '../promotion.model'
import { DB } from 'app/app-core/enums/index.db.enum'
import * as dayjs from 'dayjs'
import * as DoctorActions from '../../doctors/doctor.actions'
import * as PromotionActions from '../promotion.actions'
import { HttpErrorResponse } from '@angular/common/http'
import { Department } from '../../clinic/department/department.model'
import { MedicalService } from '../../clinic/clinic-services/medical-service.model'

@Component({
	selector: 'promotion-edit',
	templateUrl: './promotions-edit.component.html',
	styleUrls: ['./promotions-edit.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsEditComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private seoService: SeoService,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _indexDbService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private _promotionAPI: PromotionServiceService,
		private _errorHandlerService: ErrorHandlerService,
		private _store: Store<{ doctors: Doctor[]; promotions: Promotion[] }>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		history.back()
	}

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	doctors$?: Observable<Doctor[]> = this._store.pipe(select('doctors'))

	form: FormGroup = this._formBuilder.group({
		id: [''],
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
		this.fetchFromIndexDB()
	}

	ngAfterContentInit(): void {
		this._indexDbService
			.getAll(DB.DEPARTMENTS)
			.subscribe((departments: Department[]) => {
				this.departments = departments

				if (hasData(departments)) {
					this.setMedicalServices(departments[0].id)
				}
			})

		this._cdr.detectChanges()
	}

	fetchFromIndexDB() {
		combineLatest([
			this.clinic$,
			this._indexDbService.getByKey(DB.PROMOTION, 1),
			this._indexDbService.getAll(DB.DOCTORS),
		])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				(
					results: [
						clinic: Clinic,
						promotion: any,
						doctors: Doctor[],
					],
				) => {
					const [clinic, promotion, doctors] = results

					if (clinic && promotion && doctors) {
						this.seoService.generateTags({
							title: `${clinic.name} | ${clinic?.address}  | Promotion ID : ${promotion.data.id}`,
						})

						this._store.dispatch(
							DoctorActions.loadDoctors({
								doctors: doctors as Doctor[],
							}),
						)

						this.setForm(promotion.data as Promotion)
					}
				},
			)
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

	setForm(promotion: Promotion) {
		this.form.setValue({
			id: promotion.id,
			promotion_name: promotion.promotion_name,
			highlights: promotion.highlights,
			validity_start_date: dayjs(promotion.validity_start_date).format(
				'YYYY-MM-DD',
			),
			validity_end_date: dayjs(promotion.validity_end_date).format(
				'YYYY-MM-DD',
			),
			terms_and_conditions: promotion.terms_and_conditions,
			doctors: promotion.doctors.map((doctor) => doctor.id),
			department_id: empty(promotion.department_id)
				? ''
				: promotion.department_id,
			service_id: empty(promotion.service_id) ? '' : promotion.service_id,
		})

		if (promotion.picture) {
			this.bannerPreview = promotion.banner.picture.url
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

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
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
			.updateWithFile(this.form.value.id, form)
			.subscribe({
				next: (promotion: any) => {
					this._indexDbService
						.update(DB.PROMOTIONS, promotion.data)
						.subscribe(() =>
							this._store.dispatch(
								PromotionActions.updatePromotion({
									promotion: promotion.data,
								}),
							),
						)

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Promotion updated successfully`,
						message: `You have updated ${promotion.data.promotion_name} .`,
						type: 'success',
					})

					this.setForm(promotion.data)
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

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
