import { Component, OnInit } from '@angular/core';
import { SeoService } from '@digital_brand_work/services/seo.service';
import { MediaService } from '@digital_brand_work/utilities/media.service';

@Component({
	selector: 'terms-and-conditions',
	templateUrl: './terms-and-conditions.component.html',
	styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
	constructor(private seoService: SeoService, private media: MediaService) {
		this.seoService.generateTags({ title: 'Mawedy | Terms and Conditions' })
	}

	breakpoint$ = this.media.breakpoints$

	ngOnInit(): void {}
}
