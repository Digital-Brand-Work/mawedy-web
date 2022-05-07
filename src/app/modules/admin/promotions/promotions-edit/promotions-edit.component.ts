import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'promotion-edit',
	templateUrl: './promotions-edit.component.html',
	styleUrls: ['./promotions-edit.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsEditComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		history.back()
	}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Promotion ID : ASTER-FDGF-DGGFD-GDFSD`,
		})
	}
}
