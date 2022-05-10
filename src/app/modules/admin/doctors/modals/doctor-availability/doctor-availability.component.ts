import { Component, HostListener, OnInit } from '@angular/core'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'
import { BehaviorSubject, Subject } from 'rxjs'
import { DoctorAvailabilityModal } from './doctor-availability.service'

@Component({
	selector: 'doctor-availability',
	templateUrl: './doctor-availability.component.html',
	styleUrls: ['./doctor-availability.component.scss'],
})
export class DoctorAvailabilityComponent implements OnInit {
	constructor(private doctorAvailabilityModal: DoctorAvailabilityModal) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	unsubscribeAll: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this.doctorAvailabilityModal.opened$

	weekdays: string[] = weekDays

	ngOnInit(): void {}

	identity = (item: any): any => item

	shorten(day: WeekDay): string {
		const char = day.split('')

		return `${char[0]}${char[1]}${char[2]}`
	}
}
