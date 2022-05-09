import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'appointments-day-calendar',
	templateUrl: './appointments-day-calendar.component.html',
	styleUrls: ['./appointments-day-calendar.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentsDayCalendarComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	timings: number[] = []

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Daily Appointments`,
		})

		for (let i = 1; i <= 12; i++) {
			this.timings.push(i)
		}
	}

	identity = (item: any) => item
}
