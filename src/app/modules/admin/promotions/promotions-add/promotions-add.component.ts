import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'promotion-add',
	templateUrl: './promotions-add.component.html',
	styleUrls: ['./promotions-add.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsAddComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		history.back()
	}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Add Promotion`,
		})
	}
}
