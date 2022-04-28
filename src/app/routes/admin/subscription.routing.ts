import { Routes } from '@angular/router'
import { SubscriptionPackagesComponent } from 'app/modules/admin/subscriptions/subscription-packages/subscription-packages.component'
import { SubscriptionsComponent } from 'app/modules/admin/subscriptions/subscriptions.component'

export const subscriptionRoutes: Routes = [
	{
		path: '',
		component: SubscriptionsComponent,
	},
	{
		path: 'packages',
		component: SubscriptionPackagesComponent,
	},
]
