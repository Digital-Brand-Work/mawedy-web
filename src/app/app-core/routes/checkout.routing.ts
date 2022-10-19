import { CheckoutComponent } from '../../modules/checkout/checkout.component'
import { Route } from '@angular/router'
import { PageNotFoundComponent } from 'app/modules/pages/page-not-found/page-not-found.component'

export const checkOutRoutes: Route[] = [
	{ path: '', redirectTo: 'subscribe', pathMatch: 'full' },
	{ path: 'subscribe', component: CheckoutComponent },
]
