import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'app/shared/shared.module'
import { HomeMainComponent } from 'app/modules/landing/home/home.component'
import { landingHomeRoutes } from 'app/mawedy-core/routes/landing/landing.routing'
import { HomeSection1Component } from './home/home-section1/home-section1.component'
import { HomeSection2Component } from './home/home-section2/home-section2.component'
import { HomeSection3Component } from './home/home-section3/home-section3.component'
import { HomeSection4Component } from './home/home-section4/home-section4.component'
import { HomeSection5Component } from './home/home-section5/home-section5.component'
import { HomeSection1LoginPanelComponent } from './home/home-section1/home-section1-login-panel/home-section1-login-panel.component'
import { HomeNavbarComponent } from './common/home-navbar/home-navbar.component'
import { HomeNavbarResponsiveComponent } from './common/home-navbar-responsive/home-navbar-responsive.component'
import { PartnerWithUsComponent } from './partner-with-us/partner-with-us.component'
import { PartnerWithUsSection1Component } from './partner-with-us/partner-with-us-section1/partner-with-us-section1.component'
import { PartnerWithUsSection2Component } from './partner-with-us/partner-with-us-section2/partner-with-us-section2.component'
import { PartnerWithUsSection3Component } from './partner-with-us/partner-with-us-section3/partner-with-us-section3.component'
import { AboutUsComponent } from './about-us/about-us.component'
import { JoinUsComponent } from './join-us/join-us.component'
import { TalkToUsComponent } from './talk-to-us/talk-to-us.component'
import { LandingComponent } from './landing.component'
import { PartnerWithUsSection1FirstStepComponent } from './partner-with-us/partner-with-us-section1/partner-with-us-section1-first-step/partner-with-us-section1-first-step.component'
import { PartnerWithUsSection1SecondStepComponent } from './partner-with-us/partner-with-us-section1/partner-with-us-section1-second-step/partner-with-us-section1-second-step.component';
import { AboutUsSection1Component } from './about-us/about-us-section1/about-us-section1.component';
import { AboutUsSection2Component } from './about-us/about-us-section2/about-us-section2.component';
import { AboutUsSection3Component } from './about-us/about-us-section3/about-us-section3.component';
import { FooterComponent } from './common/footer/footer.component';
import { LandingSubscriptionComponent } from './landing-subscription/landing-subscription.component';
import { LandingSubscriptionSection1Component } from './landing-subscription/landing-subscription-section1/landing-subscription-section1.component';
import { LandingSubscriptionSection2Component } from './landing-subscription/landing-subscription-section2/landing-subscription-section2.component'

const components = [
	HomeNavbarResponsiveComponent,
	HomeNavbarComponent,

	LandingComponent,
	HomeMainComponent,

	HomeSection1Component,
	HomeSection2Component,
	HomeSection3Component,
	HomeSection4Component,
	HomeSection5Component,
	HomeSection1LoginPanelComponent,

	PartnerWithUsComponent,
	PartnerWithUsSection1Component,
	PartnerWithUsSection2Component,
	PartnerWithUsSection3Component,

	AboutUsComponent,
	JoinUsComponent,
	TalkToUsComponent,
]
@NgModule({
	declarations: [
		...components,
		PartnerWithUsSection1FirstStepComponent,
		PartnerWithUsSection1SecondStepComponent,
  AboutUsSection1Component,
  AboutUsSection2Component,
  AboutUsSection3Component,
  FooterComponent,
  LandingSubscriptionComponent,
  LandingSubscriptionSection1Component,
  LandingSubscriptionSection2Component,
	],
	imports: [RouterModule.forChild(landingHomeRoutes), SharedModule],
	exports: [...components],
})
export class LandingHomeModule {}
