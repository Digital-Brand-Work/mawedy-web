import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddAppointmentModal } from 'app/modules/admin/appointments/appointment-add/appointment-add.service'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { BehaviorSubject } from 'rxjs'
import { DashboardAppointmentSelectDoctorModal } from './dashboard-appointment-select-doctor.service'

@Component({
	selector: 'dashboard-appointment-select-doctor',
	templateUrl: './dashboard-appointment-select-doctor.component.html',
	styleUrls: ['./dashboard-appointment-select-doctor.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentSelectDoctorComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _addAppointmentModal: AddAppointmentModal,
		private _dashboardAppointmentSelectDoctorModal: DashboardAppointmentSelectDoctorModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input')
	input?: ElementRef

	opened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentSelectDoctorModal.opened$

	doctors$: BehaviorSubject<Doctor[]> = this._addAppointmentModal.doctors$

	doctor$: BehaviorSubject<Doctor | null> = this._addAppointmentModal.doctor$

	keyword: string = ''

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input?.nativeElement.focus()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
