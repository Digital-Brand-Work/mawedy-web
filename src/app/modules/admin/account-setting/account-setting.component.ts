import { IndexedDbController } from 'app/mawedy-core/indexed-db/indexed-db.controller'
import { HttpErrorResponse } from '@angular/common/http'
import { take, takeUntil } from 'rxjs/operators'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { BehaviorSubject, Subject } from 'rxjs'
import { Clinic } from '../clinic/clinic.model'
import { ClinicUserService } from '../clinic/clinic.service'
import { AlertState } from 'app/components/alert/alert.service'
import { BranchApi, ClinicApi } from '../clinic/clinic.api.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { empty } from 'app/mawedy-core/helpers'

@Component({
	selector: 'account-setting',
	templateUrl: './account-setting.component.html',
	styleUrls: ['./account-setting.component.scss'],
	animations: [...dbwAnimations],
})
export class AccountSettingComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _branchApi: BranchApi,
		private _clinicApi: ClinicApi,
		private _cdr: ChangeDetectorRef,
		private _seoService: SeoService,
		private _formBuilder: FormBuilder,
		private _clinicUserService: ClinicUserService,
		private _errorHandlerService: ErrorHandlerService,
		private _indexDbController: IndexedDbController,
	) {}

	@ViewChild('input') input?: ElementRef

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	form: FormGroup = this._formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
		new_password: ['', Validators.required],
		new_password_confirmation: ['', Validators.required],
	})

	errors = {}

	isProcessing: boolean = false

	picture: File | undefined | true = undefined

	preview: string | ArrayBuffer | undefined = undefined

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (clinic) {
				this._seoService.generateTags({
					title: `${clinic.name} | ${clinic?.address}`,
				})

				this.form.get('email')?.setValue(clinic.email)

				if (!empty(clinic.logo) && !empty(clinic.logo.picture)) {
					this.preview = clinic.logo.picture.url
				}
			}
		})
	}

	ngAfterViewInit(): void {
		this.input?.nativeElement.focus()

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
			this.preview = reader.result
		}
	}

	save() {
		this.isProcessing = false

		let form = new FormData()

		if (this.picture !== undefined) {
			form.append('logo_picture', this.picture as any)
		}

		for (let key in this.form.value) {
			form.append(key, this.form.value[key])
		}

		this.clinic$.pipe(take(1)).subscribe((clinic) => {
			if (clinic.account_type === 'Main') {
				this._clinicApi.post(form).subscribe({
					next: (clinic: any) => {
						this.saveClinicLocally(clinic.data)
					},
					error: (http: HttpErrorResponse) => {
						this.handleError(http)
					},
				})
			} else {
				this._branchApi.post(form).subscribe({
					next: (clinic: any) => {
						this.saveClinicLocally(clinic.data)
					},
					error: (http: HttpErrorResponse) => {
						this.handleError(http)
					},
				})
			}
		})
	}

	saveClinicLocally(clinic: Clinic) {
		this.clinic$.next(clinic)

		this._indexDbController.upsert(DB.CLINIC, {
			id: 1,
			data: clinic,
		})

		this._alert.add({
			id: Math.floor(Math.random() * 100000000000).toString(),
			title: `Success`,
			message: `You have updated the account of of ${clinic.name} ${
				clinic.address
			} ${clinic.account_type.toLowerCase()}.`,
			type: 'success',
		})
	}

	handleError(http: HttpErrorResponse) {
		for (let key in http.error.errors) {
			for (let errorKey in this.errors) {
				if (key.includes(errorKey)) {
					this.errors[errorKey] = true
				}
			}
		}

		this._errorHandlerService.handleError(http)
	}
}
