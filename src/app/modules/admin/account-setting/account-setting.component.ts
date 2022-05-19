import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'account-setting',
	templateUrl: './account-setting.component.html',
	styleUrls: ['./account-setting.component.scss'],
	animations: [...dbwAnimations],
})
export class AccountSettingComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic `,
		})
	}

	ngOnDestroy(): void {}
}
