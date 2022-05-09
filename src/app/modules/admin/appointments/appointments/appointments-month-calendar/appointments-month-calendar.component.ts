import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'

@Component({
	selector: 'appointments-month-calendar',
	templateUrl: './appointments-month-calendar.component.html',
	styleUrls: ['./appointments-month-calendar.component.scss'],
})
export class AppointmentsMonthCalendarComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	weekDays: WeekDay[] = weekDays

	days: number[] = [31]

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Monthly Appointments`,
		})

		for (let i = 1; i <= 31; i++) {
			this.days.push(i)
		}

		this.days.push(1)
		this.days.push(2)
		this.days.push(3)
	}

	identity = (item: any) => item

	shorten(day: WeekDay) {
		const char = day.split('')
		return `${char[0]}${char[1]}${char[2]}`
	}
}
