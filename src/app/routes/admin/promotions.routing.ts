import { PromotionsComponent } from './../../modules/admin/promotions/promotions.component'
import { Routes } from '@angular/router'
import { PromotionsAddComponent } from 'app/modules/admin/promotions/promotions-add/promotions-add.component'

export const promotionsRoutes: Routes = [
	{
		path: '',
		component: PromotionsComponent,
	},
	{
		path: 'add',
		component: PromotionsAddComponent,
	},
	{
		path: 'edit/:promotion_name',
		component: PromotionsAddComponent,
	},
]
