import { SeoService } from '@digital_brand_work/services/seo.service'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'dashboard-appointments',
	templateUrl: './dashboard-appointments.component.html',
	styleUrls: ['./dashboard-appointments.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentsComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Profile`,
		})
		;(document.querySelector('html') as HTMLElement).style.position =
			'fixed'
	}

	ngOnDestroy(): void {
		;(document.querySelector('html') as HTMLElement).style.position =
			'relative'
	}

	identity = (item: any) => item
}
