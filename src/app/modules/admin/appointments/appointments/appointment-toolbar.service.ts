import { Injectable } from '@angular/core'
import * as dayjs from 'dayjs'
import { BehaviorSubject } from 'rxjs'
import { Doctor } from '../../doctors/doctor.model'

@Injectable({ providedIn: 'root' })
export class AppointmentToolbarService {
	currentMonth$: BehaviorSubject<number> = new BehaviorSubject<number>(
		dayjs().month(),
	)

	date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(dayjs().toDate())

	doctorFilter$: BehaviorSubject<string | null> = new BehaviorSubject<
		string | null
	>(null)
}
