import { animate } from '@angular/animations'
import { isPlatformBrowser } from '@angular/common'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core'
import { createMask } from '@ngneat/input-mask'
import { Store } from '@ngrx/store'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { Department } from 'app/modules/admin/clinic/department/department.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { AddDoctorModal } from './doctor-add.service'
import * as DepartmentActions from '../../../clinic/department//department.actions'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { Doctor } from '../../doctor.model'
import { ErrorHandlerService } from 'app/misc/error-handler.service'

@Component({
	selector: 'doctor-add',
	templateUrl: './doctor-add.component.html',
	styleUrls: ['./doctor-add.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorAddComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _addDoctorModal: AddDoctorModal,
		private _cdr: ChangeDetectorRef,
		private store: Store<{ department: Department[]; doctors: Doctor }>,
		private _indexDBService: NgxIndexedDBService,
		private _errorHandlerService: ErrorHandlerService,
		private _formBuilder: FormBuilder,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('ngForm') ngForm!: NgForm

	@ViewChild('input') input!: ElementRef

	departments$?: Observable<Department[]>

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addDoctorModal.opened$

	form: FormGroup = this._formBuilder.group({
		name: ['', [Validators.required]],
		profession: ['', [Validators.required]],
		experience: ['', [Validators.required]],
		about: ['', [Validators.required]],
		phone_number: ['', [Validators.required]],
		phone_country_code: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		departments: ['', [Validators.required]],
	})

	ngOnInit(): void {
		this.departments$ = this.store.select('department')

		this._indexDBService
			.getAll(DB.DEPARTMENTS)
			.subscribe((departments: Department[]) => {
				this.store.dispatch(
					DepartmentActions.loadDepartments({
						departments: departments,
					}),
				)
			})
	}

	ngOnDestroy(): void {
		this.opened$.subscribe()

		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	ngAfterViewInit(): void {
		this.opened$.pipe(takeUntil(this.unsubscribe$)).subscribe((focused) => {
			if (focused) {
				this.input.nativeElement.focus()
			}
		})

		this._cdr.detectChanges()
	}

	save() {}
}
