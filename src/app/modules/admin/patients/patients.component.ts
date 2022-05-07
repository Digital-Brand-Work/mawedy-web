import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientsComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Patients`,
		})
		;(document.querySelector('html') as HTMLElement).style.position =
			'fixed'
	}

	ngOnDestroy(): void {
		;(document.querySelector('html') as HTMLElement).style.position =
			'relative'
	}
}
