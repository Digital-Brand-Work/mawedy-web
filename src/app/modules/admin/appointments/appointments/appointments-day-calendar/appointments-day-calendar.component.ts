import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'appointments-day-calendar',
	templateUrl: './appointments-day-calendar.component.html',
	styleUrls: ['./appointments-day-calendar.component.scss'],
})
export class AppointmentsDayCalendarComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Daily Appointments`,
		})
	}
}
