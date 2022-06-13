import { Promotion } from './../promotion.model'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
import { select, Store } from '@ngrx/store'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import * as PromotionActions from '../promotion.actions'

@Component({
	selector: 'promotions-table',
	templateUrl: './promotions-table.component.html',
	styleUrls: ['./promotions-table.component.scss'],
	animations: [...dbwAnimations],
})
export class PromotionsTableComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
		private _store: Store<{ promotions: Promotion[] }>,
		private _indexDbService: NgxIndexedDBService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	promotions$: Observable<Promotion[]> = this._store.pipe(
		select('promotions'),
	)

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			this.seoService.generateTags({
				title: `${clinic.name} | ${clinic?.address} | Promotions`,
			})
		})

		this.fetchFromIndexDb()
	}

	fetchFromIndexDb() {
		this._indexDbService
			.getAll(DB.PROMOTIONS)
			.subscribe((promotions: Promotion[]) =>
				this._store.dispatch(
					PromotionActions.loadPromotions({ promotions: promotions }),
				),
			)
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item
}
