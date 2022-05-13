import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import {
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { DoctorDetailsModal } from './doctor-details.service'
import { ConfirmDeleteDoctorModal } from '../doctor-confirm-delete/doctor-confirm-delete.service'

@Component({
	selector: 'doctor-details',
	templateUrl: './doctor-details.component.html',
	styleUrls: ['./doctor-details.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorDetailsComponent implements OnInit {
	constructor(
		private doctorDetailsModal: DoctorDetailsModal,
		private confirmDeleteDoctorModal: ConfirmDeleteDoctorModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('scroll') scroll: ElementRef

	opened$: BehaviorSubject<boolean> = this.doctorDetailsModal.opened$

	confirmDeleteDoctorModalOpened$: BehaviorSubject<boolean> =
		this.confirmDeleteDoctorModal.opened$

	unsubscribe: Subject<any> = new Subject()

	ngOnInit(): void {
		this.confirmDeleteDoctorModalOpened$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((opened: boolean) => {
				if (opened) {
					return (this.scroll.nativeElement.scrollTop = 0)
				}

				this.scroll.nativeElement.scrollTop =
					this.scroll.nativeElement.scrollHeight
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe.next(null)

		this.unsubscribe.complete()
	}
}
