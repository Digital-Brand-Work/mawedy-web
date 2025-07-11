import { AboutUsComponent } from '../../modules/landing/about-us/about-us.component'
import { TalkToUsComponent } from '../../modules/landing/talk-to-us/talk-to-us.component'
import { PartnerWithUsComponent } from '../../modules/landing/partner-with-us/partner-with-us.component'
import { Route } from '@angular/router'
import { HomeMainComponent } from 'app/modules/landing/home/home.component'
import { LandingComponent } from 'app/modules/landing/landing.component'
import { JoinUsComponent } from 'app/modules/landing/join-us/join-us.component'
import { LandingSubscriptionComponent } from 'app/modules/landing/landing-subscription/landing-subscription.component'
import { SuccessComponent } from 'app/modules/landing/success/success.component'
import { PageNotFoundComponent } from 'app/modules/pages/page-not-found/page-not-found.component'
import { SitBackRelexSection1Component } from 'app/modules/landing/sit-back-relex/sit-back-relex-section1/sit-back-relex-section1.component'

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

			{
				path: 'sit-back-relax',
				component: SitBackRelexSection1Component,
			},

			{
				path: 'privacy-policy',
				pathMatch: 'full',
				redirectTo: 'pages/privacy-policy',
			},

			{
				path: 'terms-and-conditions',
				pathMatch: 'full',
				redirectTo: 'pages/terms-and-conditions',
			},
		],
	},
]
