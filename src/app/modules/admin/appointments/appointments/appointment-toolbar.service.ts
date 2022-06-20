import { Injectable } from '@angular/core'
import * as dayjs from 'dayjs'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AppointmentToolbarService {
	currentMonth$: BehaviorSubject<number> = new BehaviorSubject<number>(
		dayjs().month(),
	)

	date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(dayjs().toDate())
}
