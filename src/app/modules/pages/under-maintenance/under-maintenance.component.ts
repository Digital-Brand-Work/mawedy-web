import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'

@Component({
	selector: 'under-maintenance',
	templateUrl: './under-maintenance.component.html',
	styleUrls: ['./under-maintenance.component.scss'],
})
export class UnderMaintenanceComponent implements OnInit {
	constructor(private seoService: SeoService, private media: MediaService) {
		this.seoService.generateTags({ title: 'Mawedy | Under Maintenance' })
	}

	breakpoint$ = this.media.breakpoints$

	ngOnInit(): void {}
}
