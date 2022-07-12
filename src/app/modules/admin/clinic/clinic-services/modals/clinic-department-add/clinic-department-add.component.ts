import { HttpErrorResponse } from '@angular/common/http'
import { Department } from './../../../department/department.model'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { AddDepartmentModal } from './clinic-department-add.service'
import * as DepartmentActions from '../../../department/department.actions'
import { DepartmentService } from '../../../department/department.service'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { AlertState } from 'app/components/alert/alert.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
@Component({
	selector: 'clinic-department-add',
	templateUrl: './clinic-department-add.component.html',
	styleUrls: ['./clinic-department-add.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicDepartmentAddComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _addDepartment: AddDepartmentModal,
		private store: Store<{ department: Department[] }>,
		private _departmentService: DepartmentService,
		private _errorHandlerService: ErrorHandlerService,
		private _indexDBService: NgxIndexedDBService,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addDepartment.opened$

	form: FormGroup = this._formBuilder.group({
		name: ['', Validators.required],
	})

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
		this.form.disable()

		this._departmentService
			.post(this.form.value)
			.subscribe({
				next: (department: any) => {
					this._indexDBService
						.add(DB.DEPARTMENTS, department.data)
						.subscribe(() => {
							this.store.dispatch(
								DepartmentActions.addDepartment({
									department: department.data,
								}),
							)

							this._alert.add({
								id: Math.floor(
									Math.random() * 100000000000,
								).toString(),
								title: `${department.data.name} Successfully Added`,
								message: `A new department has been successfully added to this branch`,
								type: 'success',
							})

							this.form.reset()

							this.input.nativeElement.focus()

							this.opened$.next(false)
						})
				},
				error: (http: HttpErrorResponse) => {
					this._errorHandlerService.handleError(http)
				},
			})
			.add(this.form.enable())
	}
}
