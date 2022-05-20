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
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { AddAppointmentModal } from './appointment-add.service'
import { createMask } from '@ngneat/input-mask'
import { FormControl } from '@angular/forms'
import { DashboardAppointmentSelectDoctorModal } from '../../dashboard/appointments/modals/dashboard-appointment-select-doctor/dashboard-appointment-select-doctor.service'
import { DashboardAppointmentSelectTimeSlotModal } from '../../dashboard/appointments/modals/dashboard-appointment-select-time-slot/dashboard-appointment-select-time-slot.service'
import { isPlatformBrowser } from '@angular/common'

@Component({
	selector: 'appointment-add',
	templateUrl: './appointment-add.component.html',
	styleUrls: ['./appointment-add.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentAddComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _cdr: ChangeDetectorRef,
		private _addAppointmentModal: AddAppointmentModal,
		private _dashboardAppointmentSelectDoctorModal: DashboardAppointmentSelectDoctorModal,
		private _dashboardAppointmentSelectTimeSlotModal: DashboardAppointmentSelectTimeSlotModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('comments', { read: ElementRef }) textArea: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addAppointmentModal.opened$

	dashboardAppointmentSelectDoctorModalOpened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentSelectDoctorModal.opened$

	dashboardAppointmentSelectTimeSlotModalOpened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentSelectTimeSlotModal.opened$

	currencyInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({
				alias: 'numeric',
				groupSeparator: ',',
				digits: 2,

				digitsOptional: false,
				prefix: 'AED ',
				placeholder: '0',
		  })

	currencyFC = new FormControl('')

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

	autoGrow() {
		const textArea = this.textArea.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}
}
