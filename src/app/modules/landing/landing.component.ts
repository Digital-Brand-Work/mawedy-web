import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'landing',
	templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
	constructor(private seoService: SeoService, private media: MediaService) {
		this.seoService.generateTags({ title: 'Mawedy | Home' })
	}

	breakpoint$ = this.media.breakpoints$

	ngOnInit(): void {}
}
