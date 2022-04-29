import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'promotions',
	templateUrl: './promotions.component.html',
	styleUrls: ['./promotions.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Promotions`,
		})
	}
}
