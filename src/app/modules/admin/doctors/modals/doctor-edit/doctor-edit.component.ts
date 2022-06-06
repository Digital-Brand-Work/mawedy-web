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
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { Department } from 'app/modules/admin/clinic/department/department.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	takeUntil,
} from 'rxjs'
import { Doctor, TimeSlot } from '../../doctor.model'
import { DoctorService } from '../../doctor.service'
import { DoctorDetailsModal } from '../doctor-details/doctor-details.service'
import { EditDoctorModal } from './doctor-edit.service'
import * as DepartmentActions from '../../../clinic/department/department.actions'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { result } from 'lodash'
@Component({
	selector: 'doctor-edit',
	templateUrl: './doctor-edit.component.html',
	styleUrls: ['./doctor-edit.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorEditComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _doctorService: DoctorService,
		private _editDoctorModal: EditDoctorModal,
		private _doctorDetailsModal: DoctorDetailsModal,
		private _formBuilder: FormBuilder,
		private _indexDBService: NgxIndexedDBService,
		private _store: Store<{ department: Department[]; doctors: Doctor }>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)

		this.doctorDetailsModalOpened$.next(true)
	}

	@ViewChild('ngForm') ngForm!: NgForm
	@ViewChild('input') input!: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._editDoctorModal.opened$

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this._doctorDetailsModal.opened$

	doctor$?: BehaviorSubject<Doctor | null> = this._doctorService.current$

	departments$?: Observable<Department[]>

	form: FormGroup = this._formBuilder.group({
		name: ['', [Validators.required]],
		title: ['', [Validators.required]],
		profession: ['', [Validators.required]],
		experience: ['', [Validators.required]],
		about: ['', [Validators.required]],
		phone_number: ['', [Validators.required]],
		phone_country_code: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		departments: ['', [Validators.required]],
	})

	timeslots: TimeSlot[] = []

	currentTimeSlots: {
		[key: string]: {
			active: boolean
			start: string
			end: string
		}
	} = {}

	picture: File | undefined | true = undefined

	picturePreview: string | ArrayBuffer | undefined = undefined

	isProcessing: boolean = false

	ngOnInit(): void {
		this.departments$ = this._store.select('department')

		combineLatest([
			this._indexDBService.getAll(DB.DEPARTMENTS),
			this.doctor$,
		]).subscribe((results) => {
			const [departments, doctor] = results

			if (!doctor || !departments) {
				return
			}

			this._store.dispatch(
				DepartmentActions.loadDepartments({
					departments: departments as Department[],
				}),
			)

			this.form.setValue({
				name: doctor.name,
				title: doctor.title,
				profession: doctor.profession,
				experience: doctor.experience,
				about: doctor.about,
				phone_number: doctor.phone_number,
				phone_country_code: doctor.phone_country_code,
				email: doctor.email,
				departments: doctor.departments[0].id,
			})

			this.timeslots = doctor.timeslots

			if (doctor.picture !== null) {
				this.picturePreview = doctor.picture.url
			}
		})
	}

	ngOnDestroy(): void {
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

	readFile(event: any): void {
		this.picture = event.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(event.target.files[0])

		reader.onload = (_event) => {
			this.picturePreview = reader.result
		}
	}

	changeSchedule(event: {
		[key: string]: {
			active: boolean
			start: string
			end: string
		}
	}): void {
		this.currentTimeSlots = event
	}

	save() {}
}
