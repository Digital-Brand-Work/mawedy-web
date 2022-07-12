import { MedicalService } from './../../medical-service.model'
import { HttpErrorResponse } from '@angular/common/http'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Store } from '@ngrx/store'
import { AlertState } from 'app/components/alert/alert.service'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, combineLatest, Subject, take, takeUntil } from 'rxjs'
import { Department } from '../../../department/department.model'
import { DepartmentService } from '../../../department/department.service'
import { MedicalService_Service } from '../../medical-service.service'
import { AddClinicServiceModal } from './clinic-services-add.service'
import * as DepartmentActions from '../../../department/department.actions'
import * as MedicalServiceActions from '../../medical-service.actions'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
@Component({
	selector: 'clinic-services-add',
	templateUrl: './clinic-services-add.component.html',
	styleUrls: ['./clinic-services-add.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicServicesAddComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private departmentService: DepartmentService,
		private _indexDBService: NgxIndexedDBService,
		private _addMedicalService: AddClinicServiceModal,
		private _errorHandlerService: ErrorHandlerService,
		private _medicalServiceAPI: MedicalService_Service,
		private _store: Store<{
			department: Department
			medicalService: MedicalService
		}>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('description', { read: ElementRef }) textArea: ElementRef

	department$: BehaviorSubject<Department | null> =
		this.departmentService.current$

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addMedicalService.opened$

	form: FormGroup = this._formBuilder.group({
		department_id: '',
		name: ['', Validators.required],
		description: ['', Validators.required],
		doctors: [''],
	})

	errors = {
		name: false,
		description: false,
	}

	picture: File | undefined | true = undefined

	picturePreview: string | ArrayBuffer | undefined = undefined

	isProcessing: boolean = false

	ngOnInit(): void {
		this.reloadFormValues()
	}

	identity = (item: any) => item

	ngAfterViewInit(): void {
		combineLatest([this.opened$, this.departmentService.current$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [focused, department] = results

				if (focused) {
					this.input.nativeElement.focus()
				}

				if (department) {
					this.form.value.department_id = department.id
				}
			})

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	reloadFormValues() {
		this.departmentService.current$
			.pipe(take(1))
			.subscribe((department) => {
				this.form.setValue({
					name: '',
					description: '',
					department_id: department.id,
					doctors: [''],
				})
			})
	}

	readFile(event: any): void {
		this.picture = event.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(event.target.files[0])

		reader.onload = (_event) => {
			this.picturePreview = reader.result
		}
	}

	autoGrow() {
		const textArea = this.textArea.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}

	save() {
		this.isProcessing = true

		const form = new FormData()

		if (this.picture !== undefined && this.picture !== true) {
			form.append('picture', this.picture)
		}

		for (let key in this.form.value) {
			if (key !== 'doctors') {
				form.append(key, this.form.value[key])
			}
		}

		this.form.value.doctors.forEach((id: string, index: number) => {
			if (id && id.length > 0) form.append(`doctors[${index}]`, id)
		})

		this._medicalServiceAPI
			.post(form)
			.subscribe({
				next: (medical_service: any) => {
					this.form.reset()

					this.reloadFormValues()

					this.picture = undefined

					this.picturePreview = undefined

					this.input.nativeElement.focus()

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `${medical_service.data.name} Successfully Added`,
						message: `A new medical service has been added on this department`,
						type: 'success',
					})

					this.updateDepartment(medical_service.data)

					this.addToMedicalServices(medical_service.data)
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

	addToMedicalServices(medical_service: MedicalService): void {
		this._indexDBService
			.add(DB.MEDICAL_SERVICES, medical_service)
			.subscribe(() => {
				this._store.dispatch(
					MedicalServiceActions.addMedicalService({
						medicalService: medical_service,
					}),
				)
			})
	}

	updateDepartment(medical_service: MedicalService): void {
		this.departmentService.current$
			.pipe(take(1))
			.subscribe((department) => {
				const newDepartment: any = {
					...department,
					services: [...department.services, medical_service],
				}

				this._indexDBService
					.update(DB.DEPARTMENTS, newDepartment)
					.subscribe(() => {
						this._store.dispatch(
							DepartmentActions.updateDepartment({
								department: newDepartment,
							}),
						)

						this.departmentService.current$.next(newDepartment)
					})
			})
	}
}
