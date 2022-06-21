import { weekDays } from './../../../../mawedy-core/constants/app.constant'
import { Injectable } from '@angular/core'
import * as dayjs from 'dayjs'
import { BehaviorSubject } from 'rxjs'
import { Doctor } from '../../doctors/doctor.model'

@Injectable({ providedIn: 'root' })
export class AppointmentToolbarService {
	constructor() {
		this.date$.subscribe((date) => {
			this.weekDays$.next([])

			let weekDays: Date[] = []

			for (let i = 1; i <= 3; i++) {
				weekDays.unshift(dayjs(date).subtract(i, 'day').toDate())
			}

			weekDays.push(dayjs(date).toDate())

			for (let i = 1; i <= 3; i++) {
				weekDays.push(dayjs(date).add(i, 'day').toDate())
			}

			this.weekDays$.next(weekDays)
		})
	}

	currentMonth$: BehaviorSubject<number> = new BehaviorSubject<number>(
		dayjs().month(),
	)

	weekDays$: BehaviorSubject<Date[]> = new BehaviorSubject([])

	date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(dayjs().toDate())

	doctorFilter$: BehaviorSubject<string | null> = new BehaviorSubject<
		string | null
	>(null)
}

export const toolbars: AppointmentCalendarToolBar[] = [
	{ name: 'Month', link: 'month' },
	{ name: 'Week', link: 'week' },
	{ name: 'Day', link: 'day' },
]
export interface AppointmentCalendarToolBar {
	name: string
	link: string
}
