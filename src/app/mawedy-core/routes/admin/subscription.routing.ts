import { Routes } from '@angular/router'
import { SubscriptionsComponent } from 'app/modules/admin/subscriptions/subscriptions.component'

export const subscriptionRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'current',
	},
	{
		path: 'current',
		component: SubscriptionsComponent,
	},
	{
		path: 'packages',
		component: SubscriptionsComponent,
	},
	{
		path: 'success/:type',
		component: SubscriptionsComponent,
	},
]
