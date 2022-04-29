import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'appointments-month-calendar',
	templateUrl: './appointments-month-calendar.component.html',
	styleUrls: ['./appointments-month-calendar.component.scss'],
})
export class AppointmentsMonthCalendarComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Monthly Appointments`,
		})
	}
}
