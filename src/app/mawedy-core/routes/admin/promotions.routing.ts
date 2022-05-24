import { PromotionsComponent } from '../../../modules/admin/promotions/promotions.component'
import { Routes } from '@angular/router'
import { PromotionsAddComponent } from 'app/modules/admin/promotions/promotions-add/promotions-add.component'

export const promotionsRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'view',
	},
	{
		path: 'view',
		component: PromotionsComponent,
	},
	{
		path: 'add',
		component: PromotionsComponent,
	},
	{
		path: 'edit/:promotion_name',
		component: PromotionsComponent,
	},
]
