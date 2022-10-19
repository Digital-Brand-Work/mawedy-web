import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { WeekDay, weekDays } from 'app/app-core/constants/app.constant'
import { BehaviorSubject } from 'rxjs'
import { Doctor } from '../../doctor.model'
import { DoctorService } from '../../doctor.service'
import { DoctorAvailabilityModal } from './doctor-availability.service'

@Component({
	selector: 'doctor-availability',
	templateUrl: './doctor-availability.component.html',
	styleUrls: ['./doctor-availability.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorAvailabilityComponent implements OnInit {
	constructor(
		private _doctorService: DoctorService,
		private _doctorAvailabilityModal: DoctorAvailabilityModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> = this._doctorAvailabilityModal.opened$

	doctor$?: BehaviorSubject<Doctor | null> = this._doctorService.current$

	weekdays: WeekDay[] = weekDays

	ngOnInit(): void {}

	identity = (item: any): any => item
}
