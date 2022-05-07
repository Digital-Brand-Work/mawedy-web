import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { SubscriptionsComponent } from './subscriptions.component'
import { SubscriptionSummaryComponent } from './subscription-summary/subscription-summary.component'
import { SubscriptionPackagesComponent } from './subscription-packages/subscription-packages.component'
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component'
import { SubscriptionInvoicesComponent } from './modals/subscription-invoices/subscription-invoices.component'
import { SharedModule } from 'app/shared/shared.module'
import { subscriptionRoutes } from 'app/routes/admin/subscription.routing';
import { SubscriptionPackageItemComponent } from './subscription-packages/subscription-package-item/subscription-package-item.component'

const components = [
	SubscriptionsComponent,
	SubscriptionSummaryComponent,
	SubscriptionPackagesComponent,
	SubscriptionSuccessComponent,
	SubscriptionInvoicesComponent,
]
@NgModule({
	declarations: [...components, SubscriptionPackageItemComponent],
	imports: [SharedModule, RouterModule.forChild(subscriptionRoutes)],
	exports: [...components],
})
export class SubscriptionsModule {}
