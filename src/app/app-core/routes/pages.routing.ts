import { TermsAndConditionsComponent } from './../../modules/pages/terms-and-conditions/terms-and-conditions.component'
import { UnderConstructionComponent } from './../../modules/pages/under-construction/under-construction.component'
import { Route } from '@angular/router'
import { PageNotFoundComponent } from 'app/modules/pages/page-not-found/page-not-found.component'
import { UnderMaintenanceComponent } from 'app/modules/pages/under-maintenance/under-maintenance.component'
import { PrivacyPolicyComponent } from 'app/modules/pages/privacy-policy/privacy-policy.component'

export const PAGES_ROUTES: Route[] = [
	{
		path: 'privacy-policy',
		component: PrivacyPolicyComponent,
	},

	{
		path: 'terms-and-conditions',
		component: TermsAndConditionsComponent,
	},

	{
		path: 'not-found',
		component: PageNotFoundComponent,
	},

	{
		path: 'no-internet',
		component: PageNotFoundComponent,
	},

	{
		path: 'under-maintenance',
		component: UnderMaintenanceComponent,
	},

	{
		path: 'under-construction',
		component: UnderConstructionComponent,
	},
]
