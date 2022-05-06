import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'waiting-patients',
	templateUrl: './waiting-patients.component.html',
	styleUrls: ['./waiting-patients.component.scss'],
})
export class WaitingPatientsComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Waiting Patients`,
		})
	}
}
