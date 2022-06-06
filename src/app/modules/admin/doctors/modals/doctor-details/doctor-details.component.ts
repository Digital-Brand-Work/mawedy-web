import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import {
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { DoctorDetailsModal } from './doctor-details.service'
import { ConfirmDeleteDoctorModal } from '../doctor-confirm-delete/doctor-confirm-delete.service'
import { EditDoctorModal } from '../doctor-edit/doctor-edit.service'
import { DoctorService } from '../../doctor.service'
import { Doctor } from '../../doctor.model'

@Component({
	selector: 'doctor-details',
	templateUrl: './doctor-details.component.html',
	styleUrls: ['./doctor-details.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorDetailsComponent implements OnInit {
	constructor(
		private _doctorService: DoctorService,
		private _editDoctorModal: EditDoctorModal,
		private _confirmDeleteDoctorModal: ConfirmDeleteDoctorModal,
		private _doctorDetailsModal: DoctorDetailsModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('scroll') scroll: ElementRef

	unsubscribe$: Subject<any> = new Subject()

	opened$: BehaviorSubject<boolean> = this._doctorDetailsModal.opened$

	confirmDeleteDoctorModalOpened$: BehaviorSubject<boolean> =
		this._confirmDeleteDoctorModal.opened$

	editDoctorModalOpened$: BehaviorSubject<boolean> =
		this._editDoctorModal.opened$

	doctor$?: BehaviorSubject<Doctor | null> = this._doctorService.current$

	ngOnInit(): void {
		this.confirmDeleteDoctorModalOpened$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((opened: boolean) => {
				if (this.scroll) {
					if (opened) {
						return (this.scroll.nativeElement.scrollTop = 0)
					}

					this.scroll.nativeElement.scrollTop =
						this.scroll.nativeElement.scrollHeight
				}
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
