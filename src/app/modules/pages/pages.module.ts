import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { Error500PageComponent } from './error500-page/error500-page.component'
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component'
import { HomeCheckoutSuccessPageComponent } from './home-checkout-success-page/home-checkout-success-page.component'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component'
import { NoInternetComponent } from './no-internet/no-internet.component'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { PAGES_ROUTES } from 'app/app-core/routes/pages.routing'

const components = [
	NoInternetComponent,
	PageNotFoundComponent,
	Error500PageComponent,
	UnauthorizedPageComponent,
	HomeCheckoutSuccessPageComponent,
	PrivacyPolicyComponent,
	TermsAndConditionsComponent,
]

const modules = [SharedModule, RouterModule.forChild(PAGES_ROUTES)]

@NgModule({
	imports: [...modules],
	declarations: [...components],
})
export class PagesModule {}
