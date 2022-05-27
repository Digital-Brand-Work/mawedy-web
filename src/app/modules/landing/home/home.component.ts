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
	constructor(
		private seoService: SeoService,
		private media: MediaService,
		private _indexedDbService: NgxIndexedDBService,
	) {
		this.seoService.generateTags(this.seoService.default())

		forkJoin([
			this._indexedDbService.deleteByKey('account_users_request', 1),
			this._indexedDbService.deleteByKey('subscription_request', 1),
		]).subscribe()
	}

	breakpoint$ = this.media.breakpoints$
}
