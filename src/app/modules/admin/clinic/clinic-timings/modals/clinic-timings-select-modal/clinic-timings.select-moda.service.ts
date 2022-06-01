import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { ClinicTimeSlot } from '../../../clinic.model'

@Injectable({
	providedIn: 'root',
})
export class ClinicTimingSelectModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	timing$: BehaviorSubject<ClinicTimeSlot> = new BehaviorSubject<ClinicTimeSlot>({
		start: null,
		end: null,
		active: false,
		day: null,
	})
}
