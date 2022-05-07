import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'

@Component({
	selector: 'account-setting',
	templateUrl: './account-setting.component.html',
	styleUrls: ['./account-setting.component.scss'],
})
export class AccountSettingComponent implements OnInit {
	constructor(private seoService: SeoService) {}

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic `,
		})
		;(document.querySelector('html') as HTMLElement).style.position =
			'fixed'
	}

	ngOnDestroy(): void {
		;(document.querySelector('html') as HTMLElement).style.position =
			'relative'
	}
}
