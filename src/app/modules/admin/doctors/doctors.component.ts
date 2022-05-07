import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'doctors',
	templateUrl: './doctors.component.html',
	styleUrls: ['./doctors.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Doctors`,
		})
		;(document.querySelector('html') as HTMLElement).style.position =
			'fixed'
	}

	ngOnDestroy(): void {
		;(document.querySelector('html') as HTMLElement).style.position =
			'relative'
	}
	filter() {}
}
