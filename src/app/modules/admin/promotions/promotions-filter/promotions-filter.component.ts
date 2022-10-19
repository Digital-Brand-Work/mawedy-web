import { empty } from 'app/app-core/helpers'
import { Promotion } from 'app/modules/admin/promotions/promotion.model'
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { PaginationService } from 'app/app-core/misc/pagination.service'
import { PromotionServiceService } from '../promotion.service'
import * as PromotionActions from '../promotion.actions'
import * as dayjs from 'dayjs'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'

@Component({
	selector: 'promotions-filter',
	templateUrl: './promotions-filter.component.html',
	styleUrls: ['./promotions-filter.component.scss'],
})
export class PromotionsFilterComponent implements OnInit {
	constructor(
		private _errorHandlerService: ErrorHandlerService,
		private _promotionAPI: PromotionServiceService,
		private _paginationService: PaginationService,
		private _store: Store<{
			promotions: Promotion[]
		}>,
	) {}

	validity_start_date: string = ''

	validity_end_date: string = ''

	ngOnInit(): void {}

	onReset() {
		this._promotionAPI.get().subscribe((promotions: any) => {
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

	onFilter() {
		const filter = {
			validity_start_date: dayjs(this.validity_start_date).toJSON(),
			validity_end_date: dayjs(this.validity_end_date).toJSON(),
		}

		for (let key in filter) {
			if (empty(filter[key])) {
				delete filter[key]
			}
		}

		this._promotionAPI
			.query(`?` + new URLSearchParams(filter).toString())
			.subscribe({
				next: (promotions: any) => {
					this._paginationService.doctors$.next({
						links: promotions.links,
						meta: promotions.meta,
					})

					this._store.dispatch(
						PromotionActions.loadPromotions({
							promotions: promotions.data,
						}),
					)
				},
				error: (http) => {
					this._errorHandlerService.handleError(http)
				},
			})
	}
}
