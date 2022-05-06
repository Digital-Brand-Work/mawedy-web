import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'appointments-week-calendar',
	templateUrl: './appointments-week-calendar.component.html',
	styleUrls: ['./appointments-week-calendar.component.scss'],
})
export class AppointmentsWeekCalendarComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Weekly Appointments`,
		})
	}
}
