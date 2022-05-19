import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'app/shared/shared.module'
import { LandingHomeComponent } from 'app/modules/landing/home/home.component'
import { landingHomeRoutes } from 'app/modules/landing/landing.routing'
import { HomeSection1Component } from './home/home-section1/home-section1.component'
import { HomeSection2Component } from './home/home-section2/home-section2.component'
import { HomeSection3Component } from './home/home-section3/home-section3.component'
import { HomeSection4Component } from './home/home-section4/home-section4.component'
import { HomeSection5Component } from './home/home-section5/home-section5.component'
import { HomeSection1LoginPanelComponent } from './home/home-section1/home-section1-login-panel/home-section1-login-panel.component'
import { HomeSection2FirstStepComponent } from './home/home-section2/home-section2-first-step/home-section2-first-step.component'
import { HomeSection2SecondStepComponent } from './home/home-section2/home-section2-second-step/home-section2-second-step.component'
import { HomeNavbarComponent } from './home/home-navbar/home-navbar.component'
import { HomeNavbarResponsiveComponent } from './home/home-navbar-responsive/home-navbar-responsive.component'
import { PartnerWithUsComponent } from './partner-with-us/partner-with-us.component'
import { PartnerWithUsSection1Component } from './partner-with-us/partner-with-us-section1/partner-with-us-section1.component'
import { PartnerWithUsSection2Component } from './partner-with-us/partner-with-us-section2/partner-with-us-section2.component'
import { PartnerWithUsSection3Component } from './partner-with-us/partner-with-us-section3/partner-with-us-section3.component'
import { AboutUsComponent } from './about-us/about-us.component'
import { JoinUsComponent } from './join-us/join-us.component'
import { TalkToUsComponent } from './talk-to-us/talk-to-us.component'

const components = [
	HomeNavbarResponsiveComponent,
	HomeNavbarComponent,

	LandingHomeComponent,

	HomeSection1Component,
	HomeSection2Component,
	HomeSection3Component,
	HomeSection4Component,
	HomeSection5Component,
	HomeSection1LoginPanelComponent,
	HomeSection2FirstStepComponent,
	HomeSection2SecondStepComponent,

	PartnerWithUsComponent,
	PartnerWithUsSection1Component,
	PartnerWithUsSection2Component,
	PartnerWithUsSection3Component,

	AboutUsComponent,
	JoinUsComponent,
	TalkToUsComponent,
]
@NgModule({
	declarations: [...components],
	imports: [RouterModule.forChild(landingHomeRoutes), SharedModule],
	exports: [...components],
})
export class LandingHomeModule {}
