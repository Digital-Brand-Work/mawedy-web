import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { Doctor } from '../../doctors/doctor.model'

@Injectable({
	providedIn: 'root',
})
export class AddAppointmentModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	doctors$: BehaviorSubject<Doctor[]> = new BehaviorSubject<Doctor[]>([])

	doctor$: BehaviorSubject<Doctor | null> =
		new BehaviorSubject<Doctor | null>(null)

	date$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
		null,
	)
}
