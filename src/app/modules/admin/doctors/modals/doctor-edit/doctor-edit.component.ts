import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
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
		private editDoctorModal: EditDoctorModal,
		private doctorDetailsModal: DoctorDetailsModal,
		private cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)

		this.doctorDetailsModalOpened$.next(true)
	}

	@ViewChild('input') input!: ElementRef

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this.doctorDetailsModal.opened$

	unsubscribeAll: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this.editDoctorModal.opened$

	emailInputMask = createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.unsubscribeAll.next(null)

		this.unsubscribeAll.complete()

		this.cdr.detach()
	}

	ngAfterViewInit(): void {
		this.opened$
			.pipe(takeUntil(this.unsubscribeAll))
			.subscribe((focused) => {
				if (focused) {
					this.input.nativeElement.focus()
				}
			})

		this.cdr.detectChanges()
	}
}
