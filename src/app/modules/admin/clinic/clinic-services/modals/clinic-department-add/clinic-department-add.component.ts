import { HttpErrorResponse } from '@angular/common/http'
import { Department } from './../../../department/department.model'
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { AddDepartmentModal } from './clinic-department-add.service'
import * as DepartmentActions from '../../../department/department.actions'
import { DepartmentService } from '../../../department/department.service'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
@Component({
	selector: 'clinic-department-add',
	templateUrl: './clinic-department-add.component.html',
	styleUrls: ['./clinic-department-add.component.scss'],
})
export class ClinicDepartmentAddComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _addDepartment: AddDepartmentModal,
		private store: Store<{ department: Department[] }>,
		private departmentService: DepartmentService,
		private _errorHandlerService: ErrorHandlerService,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('NgForm') NgForm!: NgForm

	@ViewChild('input') input!: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addDepartment.opened$

	form: FormGroup = this._formBuilder.group({ name: ['', Validators.required] })

	ngOnInit(): void {}

	ngAfterViewInit(): void {
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
		this.departmentService.post(this.form.value).subscribe({
			next: (department: any) => {
				this.store.dispatch(DepartmentActions.addDepartment({ department: department.data }))
			},
			error: (http: HttpErrorResponse) => {
				this._errorHandlerService.handleError(http)
			},
		})
	}
}
