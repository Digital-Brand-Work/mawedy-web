import { NgModule } from '@angular/core'
import { SubscriptionsComponent } from './subscriptions.component'
import { SubscriptionSummaryComponent } from './subscription-summary/subscription-summary.component'
import { SubscriptionPackagesComponent } from './subscription-packages/subscription-packages.component'
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component'
import { SubscriptionInvoicesComponent } from './modals/subscription-invoices/subscription-invoices.component'
import { SharedModule } from 'app/shared/shared.module'
import { ComponentsModule } from 'app/components/components.module'

const components = [
	SubscriptionsComponent,
	SubscriptionSummaryComponent,
	SubscriptionPackagesComponent,
	SubscriptionSuccessComponent,
	SubscriptionInvoicesComponent,
]
@NgModule({
	declarations: [...components],
	imports: [SharedModule, ComponentsModule],
	exports: [...components],
})
export class SubscriptionsModule {}
