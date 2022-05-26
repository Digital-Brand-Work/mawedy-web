import { AboutUsComponent } from '../../../modules/landing/about-us/about-us.component'
import { TalkToUsComponent } from '../../../modules/landing/talk-to-us/talk-to-us.component'
import { PartnerWithUsComponent } from '../../../modules/landing/partner-with-us/partner-with-us.component'
import { Route } from '@angular/router'
import { HomeMainComponent } from 'app/modules/landing/home/home.component'
import { LandingComponent } from 'app/modules/landing/landing.component'
import { JoinUsComponent } from 'app/modules/landing/join-us/join-us.component'
import { LandingSubscriptionComponent } from 'app/modules/landing/landing-subscription/landing-subscription.component'
import { SuccessComponent } from 'app/modules/landing/success/success.component'

export const landingHomeRoutes: Route[] = [
	{
		path: '',
		component: LandingComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'home',
			},
			{
				path: 'home',
				component: HomeMainComponent,
			},
			{
				path: 'about-us',
				component: AboutUsComponent,
			},
			{
				path: 'partner-with-us',
				component: PartnerWithUsComponent,
			},
			{
				path: 'join-us',
				component: JoinUsComponent,
			},
			{
				path: 'talk-to-us',
				component: TalkToUsComponent,
			},
			{
				path: 'subscription',
				component: LandingSubscriptionComponent,
			},
			{
				path: 'success',
				component: SuccessComponent,
			},
		],
	},
]
