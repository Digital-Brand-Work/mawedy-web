import { PartnerWithUsComponent } from './partner-with-us/partner-with-us.component'
import { Route } from '@angular/router'
import { LandingHomeComponent } from 'app/modules/landing/home/home.component'

export const landingHomeRoutes: Route[] = [
	{
		path: '',
		component: LandingHomeComponent,
	},
	{
		path: 'partner-with-us',
		component: PartnerWithUsComponent,
	},
]
