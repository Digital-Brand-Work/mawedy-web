import { SeoService } from '@digital_brand_work/services/seo.service'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'dashboard-appointments',
	templateUrl: './dashboard-appointments.component.html',
	styleUrls: ['./dashboard-appointments.component.scss'],
})
export class DashboardAppointmentsComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({ title: `Aster Clinic | Dashboard` })
	}
}
