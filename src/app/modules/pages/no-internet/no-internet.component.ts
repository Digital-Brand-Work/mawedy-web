import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'

@Component({
	selector: 'no-internet',
	templateUrl: './no-internet.component.html',
	styleUrls: ['./no-internet.component.scss'],
	animations: [...dbwAnimations],
})
export class NoInternetComponent implements OnInit {
	constructor(private seoService: SeoService, private media: MediaService) {
		this.seoService.generateTags({ title: 'Mawedy | No Internet' })
	}

	breakpoint$ = this.media.breakpoints$
	ngOnInit(): void {}
}
