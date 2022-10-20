import { slugify } from './../../../../../@digital_brand_work/helpers/helpers'
import { Promotion } from './../promotion.model'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	take,
	takeUntil,
} from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
import { select, Store } from '@ngrx/store'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/app-core/enums/index.db.enum'
import * as PromotionActions from '../promotion.actions'
import { PromotionServiceService } from '../promotion.service'
import { AlertState } from 'app/components/alert/alert.service'
import { Router } from '@angular/router'
import { IndexedDbController } from 'app/app-core/indexed-db/indexed-db.controller'
import { InitialDataResolver, PaginationData } from 'app/app.resolvers'
import { PaginationService } from 'app/app-core/misc/pagination.service'

@Component({
	selector: 'promotions-table',
	templateUrl: './promotions-table.component.html',
	styleUrls: ['./promotions-table.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsTableComponent implements OnInit {
	constructor(
		private _router: Router,
		private _alert: AlertState,
		private seoService: SeoService,
		private _indexDbService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private _promotionAPI: PromotionServiceService,
		private _indexDBController: IndexedDbController,
		private _paginationService: PaginationService,
		private _store: Store<{ promotions: Promotion[] }>,
		private InitialDataResolver: InitialDataResolver,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	paginatedData$: BehaviorSubject<PaginationData | null> =
		this._paginationService.promotions$

	unsubscribe$: Subject<any> = new Subject<any>()

	promotions$: Observable<Promotion[]> = this._store.pipe(
		select('promotions'),
	)

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (clinic) {
				this.seoService.generateTags({
					title: `${clinic.name} | ${clinic?.address} | Promotions`,
				})
			}
		})
	}

	paginate(url: string) {
		this._promotionAPI.paginate(url).subscribe((patients: any) => {
			this.InitialDataResolver.loadPromotions(patients.data)

			this.paginatedData$.next({
				links: patients.links,
				meta: patients.meta,
			})
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	viewPromotion(promotion: Promotion) {
		combineLatest([
			this._clinicUserService.resolveClinicPath(),
			this.clinic$,
		])
			.pipe(take(1))
			.subscribe((results) => {
				const [resolvedPath, clinic] = results

				this._indexDBController.upsert(DB.PROMOTION, {
					data: promotion,
					id: 1,
				})

				if (resolvedPath && clinic) {
					this._router.navigate([
						`${resolvedPath}/promotions/edit/${slugify(
							promotion.id,
						)}`,
					])
				}
			})
	}

	deletePromotion(promotion: Promotion) {
		this._promotionAPI.remove(promotion.id).subscribe(() => {
			this._indexDbService
				.deleteByKey(DB.PROMOTIONS, promotion.id)
				.subscribe(() => {
					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Promotion removed successfully`,
						message: `You have removed ${promotion.promotion_name} .`,
						type: 'info',
					})

					this._store.dispatch(
						PromotionActions.deletePromotion({ id: promotion.id }),
					)
				})
		})
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
