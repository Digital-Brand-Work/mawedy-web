import { Component } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { forkJoin } from 'rxjs'

@Component({
	selector: 'landing-home',
	templateUrl: './home.component.html',
})
export class HomeMainComponent {
	constructor(private seoService: SeoService, private media: MediaService) {
		this.seoService.generateTags(this.seoService.default())
	}

	breakpoint$ = this.media.breakpoints$
}
