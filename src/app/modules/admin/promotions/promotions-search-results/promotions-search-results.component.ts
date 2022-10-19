import { Component, HostListener, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { PaginationData } from 'app/app.resolvers'
import { PaginationService } from 'app/app-core/misc/pagination.service'
import { PatientService } from '../../patients/patient.service'
import { Promotion } from '../promotion.model'
import * as PromotionActions from '../promotion.actions'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { PromotionServiceService } from '../promotion.service'

@Component({
	selector: 'promotions-search-results',
	templateUrl: './promotions-search-results.component.html',
	styleUrls: ['./promotions-search-results.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsSearchResultsComponent implements OnInit {
	constructor(
		private _store: Store<{ patients: Promotion[] }>,
		private _paginationService: PaginationService,
		private _promotionAPI: PromotionServiceService,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.onReset()
	}

	isSearching: boolean = false

	isReady: boolean = true

	keyword: string = ''

	promotions: Promotion[] = []

	temporaryPaginatedData?: PaginationData

	ngOnInit(): void {}

	identity = (item: any) => item

	onReset() {
		this.keyword = ''

		this._promotionAPI.get().subscribe((promotions: any) => {
			this.promotions = []

			this._paginationService.doctors$.next({
				links: promotions.links,
				meta: promotions.meta,
			})

			this._store.dispatch(
				PromotionActions.loadPromotions({
					promotions: promotions.data,
				}),
			)
		})
	}

	onEnter() {
		this._store.dispatch(
			PromotionActions.loadPromotions({ promotions: this.promotions }),
		)

		this._paginationService.doctors$.next(this.temporaryPaginatedData)

		this.isSearching = false
	}

	search() {
		if (this.isReady) {
			this.isReady = false

			this._promotionAPI
				.query(`?keyword=${this.keyword}`)
				.subscribe((promotions: any) => {
					this.promotions = promotions.data

					this.temporaryPaginatedData = {
						links: promotions.links,
						meta: promotions.meta,
					}

					setTimeout(() => {
						this.isReady = true
					}, 250)
				})
		}
	}
}
