import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'

@Component({
	selector: 'appointments-week-calendar',
	templateUrl: './appointments-week-calendar.component.html',
	styleUrls: ['./appointments-week-calendar.component.scss'],
})
export class AppointmentsWeekCalendarComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	weekDays: WeekDay[] = weekDays

	timings: number[] = []

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Weekly Appointments`,
		})

		for (let i = 1; i <= 12; i++) {
			this.timings.push(i)
		}
	}

	identity = (item: any) => item

	shorten(day: WeekDay) {
		const char = day.split('')
		return `${char[0]}${char[1]}${char[2]}`
	}
}
