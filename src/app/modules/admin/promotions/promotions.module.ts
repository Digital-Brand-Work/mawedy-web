import { RouterModule } from '@angular/router'
import { ComponentsModule } from 'app/components/components.module'
import { NgModule } from '@angular/core'
import { PromotionsComponent } from './promotions.component'
import { PromotionsTableComponent } from './promotions-table/promotions-table.component'
import { PromotionsToolbarComponent } from './promotions-toolbar/promotions-toolbar.component'
import { PromotionsFilterComponent } from './promotions-filter/promotions-filter.component'
import { PromotionsAddComponent } from './promotions-add/promotions-add.component'
import { PromotionsEditComponent } from './promotions-edit/promotions-edit.component'
import { SharedModule } from 'app/shared/shared.module'
import { promotionsRoutes } from 'app/routes/admin/promotions.routing'

const components = [
	PromotionsComponent,
	PromotionsTableComponent,
	PromotionsToolbarComponent,
	PromotionsFilterComponent,
	PromotionsAddComponent,
	PromotionsEditComponent,
]
@NgModule({
	declarations: [...components],
	imports: [
		SharedModule,
		ComponentsModule,
		RouterModule.forChild(promotionsRoutes),
	],
	exports: [...components],
})
export class PromotionsModule {}
