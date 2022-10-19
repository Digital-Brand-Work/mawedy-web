import { dbwAnimations } from './../../../../../../../@digital_brand_work/animations/animation.api'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { BehaviorSubject, combineLatest, Subject, take, takeUntil } from 'rxjs'
import { EditClinicServiceModal } from './clinic-services-edit.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DepartmentService } from '../../../department/department.service'
import { AlertState } from 'app/components/alert/alert.service'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'
import { MedicalService_Service } from '../../medical-service.service'
import { Store } from '@ngrx/store'
import { Department } from '../../../department/department.model'
import { DB } from 'app/app-core/enums/index.db.enum'
import * as DepartmentActions from '../../../department/department.actions'
import { HttpErrorResponse } from '@angular/common/http'
import * as MedicalServiceActions from '../../medical-service.actions'
import { MedicalService } from '../../medical-service.model'
import { FuseConfirmationService } from '@fuse/services/confirmation'

@Component({
	selector: 'clinic-services-edit',
	templateUrl: './clinic-services-edit.component.html',
	styleUrls: ['./clinic-services-edit.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicServicesEditComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _confirm: FuseConfirmationService,
		private _indexDBService: NgxIndexedDBService,
		private _departmentService: DepartmentService,
		private _errorHandlerService: ErrorHandlerService,
		private _medicalServiceAPI: MedicalService_Service,
		private _store: Store<{ department: Department[] }>,
		private _editClinicServiceModal: EditClinicServiceModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('description', { read: ElementRef }) textArea: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._editClinicServiceModal.opened$

	department$: BehaviorSubject<Department | null> =
		this._departmentService.current$

	form: FormGroup = this._formBuilder.group({
		id: '',
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
		combineLatest([
			this._medicalServiceAPI.current$,
			this._departmentService.current$,
		])
			.pipe(take(1))
			.subscribe((results) => {
				const [medical_service, department] = results

				if (medical_service && department) {
					const doctors = []

					department.doctors.forEach((doctor) =>
						doctors.push(doctor.id),
					)

					this.form.setValue({
						id: medical_service.id,
						name: medical_service.name,
						description: medical_service.description,
						department_id: department.id,
						doctors: medical_service.doctors.map(
							(doctor) => doctor.id,
						),
					})

					this.picturePreview = medical_service.picture.url
				}
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

	ngAfterViewInit(): void {
		combineLatest([this.opened$, this._departmentService.current$])
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
			.updateWithFile(this.form.value.id, form)
			.subscribe({
				next: (medical_service: any) => {
					this.picture = undefined

					this.picturePreview = undefined

					this.input.nativeElement.focus()

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `${medical_service.data.name} Successfully Updated`,
						message: `${medical_service.data.name} has been updated on this department.`,
						type: 'success',
					})

					this.updateMedicalService(medical_service.data)

					this.updateDepartment(medical_service.data)

					this.opened$.next(false)
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

	updateMedicalService(medical_service: MedicalService): void {
		this._indexDBService
			.update(DB.MEDICAL_SERVICES, medical_service)
			.subscribe((newMedicalService) => {
				this._store.dispatch(
					MedicalServiceActions.updateMedicalService({
						medicalService: newMedicalService,
					}),
				)
			})
	}

	updateDepartment(medical_service: MedicalService): void {
		this._departmentService.current$
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

						this._departmentService.current$.next(newDepartment)
					})
			})
	}

	remove() {
		this._medicalServiceAPI.current$
			.pipe(take(1))
			.subscribe((medical_service) => {
				this._confirm
					.open({
						title: `Are you sure you want to remove ${medical_service.name}?`,
						message: `Appointments bound to this medical service will be removed. Continue?`,
						dismissible: true,
						icon: {
							name: 'delete',
							color: 'accent',
						},
						actions: {
							confirm: {
								color: 'accent',
								label: 'Remove',
							},
						},
					})
					.afterClosed()
					.subscribe((result) => {
						if (result && result !== 'cancelled') {
							this._medicalServiceAPI
								.remove(medical_service.id)
								.subscribe(() => {
									this.opened$.next(false)

									this._indexDBService
										.delete(
											DB.MEDICAL_SERVICES,
											medical_service.id,
										)
										.subscribe(() => {
											this._store.dispatch(
												MedicalServiceActions.deleteMedicalService(
													{
														id: medical_service.id,
													},
												),
											)
										})

									this._alert.add({
										id: Math.floor(
											Math.random() * 100000000000,
										).toString(),
										title: `A service has been deleted.`,
										message: `${medical_service.name} has been deleted.Appointments bound to ${medical_service.name} has been removed.`,
										type: 'info',
									})
								})
						}
					})
			})
	}
}
