import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'

@Component({
	selector: 'page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss'],
	animations: [...dbwAnimations],
})
export class PageNotFoundComponent implements OnInit {
	constructor(private seoService: SeoService, private media: MediaService) {
		this.seoService.generateTags({ title: 'Mawedy | Page Not Found' })
	}

	breakpoint$ = this.media.breakpoints$
	ngOnInit(): void {}
}
