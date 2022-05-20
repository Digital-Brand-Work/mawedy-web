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
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { DoctorDetailsModal } from '../doctor-details/doctor-details.service'
import { EditDoctorModal } from './doctor-edit.service'

@Component({
	selector: 'doctor-edit',
	templateUrl: './doctor-edit.component.html',
	styleUrls: ['./doctor-edit.component.scss'],
})
export class DoctorEditComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _editDoctorModal: EditDoctorModal,
		private _doctorDetailsModal: DoctorDetailsModal,
		private _cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)

		this.doctorDetailsModalOpened$.next(true)
	}

	@ViewChild('input') input!: ElementRef

	opened$: BehaviorSubject<boolean> = this._editDoctorModal.opened$

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this._doctorDetailsModal.opened$

	unsubscribeAll: Subject<any> = new Subject<any>()

	emailInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.unsubscribeAll.next(null)

		this.unsubscribeAll.complete()

		this._cdr.detach()
	}

	ngAfterViewInit(): void {
		this.opened$
			.pipe(takeUntil(this.unsubscribeAll))
			.subscribe((focused) => {
				if (focused) {
					this.input.nativeElement.focus()
				}
			})

		this._cdr.detectChanges()
	}
}
