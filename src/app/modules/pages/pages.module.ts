import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { Error500PageComponent } from './error500-page/error500-page.component'
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component'
import { HomeCheckoutSuccessPageComponent } from './home-checkout-success-page/home-checkout-success-page.component'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component'
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component'
import { UnderConstructionComponent } from './under-construction/under-construction.component'
import { NoInternetComponent } from './no-internet/no-internet.component'

const components = [
	NoInternetComponent,
	PageNotFoundComponent,
	Error500PageComponent,
	UnauthorizedPageComponent,
	HomeCheckoutSuccessPageComponent,
	PrivacyPolicyComponent,
	TermsAndConditionsComponent,
]

@NgModule({
	declarations: [...components],
	imports: [CommonModule],
	exports: [...components],
})
export class PagesModule {}
