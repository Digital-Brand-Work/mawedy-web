import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AlertState } from 'app/components/alert/alert.service'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { Department } from '../../../department/department.model'
import { DepartmentService } from '../../../department/department.service'
import { EditClinicDepartmentModal } from './clinic-department-edit.service'
import * as DepartmentActions from '../../../department/department.actions'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { HttpErrorResponse } from '@angular/common/http'
import { empty } from 'app/mawedy-core/helpers'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'clinic-department-edit',
	templateUrl: './clinic-department-edit.component.html',
	styleUrls: ['./clinic-department-edit.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicDepartmentEditComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _departmentService: DepartmentService,
		private _indexDBService: NgxIndexedDBService,
		private _store: Store<{ department: Department }>,
		private _errorHandlerService: ErrorHandlerService,
		private _editDepartmentModal: EditClinicDepartmentModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('NgForm') NgForm!: NgForm

	@ViewChild('input') input!: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._editDepartmentModal.opened$

	form: FormGroup = this._formBuilder.group({
		id: [''],
		name: ['', Validators.required],
	})

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this._departmentService.current$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((department) => {
				if (empty(department)) {
					return
				}

				this.form.setValue({ name: department.name, id: department.id })
			})

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

	save() {
		this.form.disable()

		this._departmentService
			.update(this.form.value.id, this.form.value)
			.subscribe({
				next: (department: any) => {
					this._indexDBService
						.update(DB.DEPARTMENTS, department.data)
						.subscribe(() => {
							this._store.dispatch(
								DepartmentActions.updateDepartment({
									department: department.data,
								}),
							)

							this._alert.add({
								id: Math.floor(
									Math.random() * 100000000000,
								).toString(),
								title: `Changed to ${department.data.name}.`,
								message: `This department has been successfully changed to  ${department.data.name}.`,
								type: 'success',
							})

							this.input.nativeElement.focus()

							this._departmentService.current$.next(
								department.data,
							)
						})
				},
				error: (http: HttpErrorResponse) => {
					this._errorHandlerService.handleError(http)
				},
			})
			.add(this.form.enable())
	}
}
