import { ComponentsModule } from 'app/components/components.module'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'app/shared/shared.module'
import { LandingHomeComponent } from 'app/modules/landing/home/home.component'
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing'
import { HomeSection1Component } from './home-section1/home-section1.component'
import { HomeSection2Component } from './home-section2/home-section2.component'
import { HomeSection3Component } from './home-section3/home-section3.component'
import { HomeSection4Component } from './home-section4/home-section4.component'
import { HomeSection5Component } from './home-section5/home-section5.component'
import { HomeSection1LoginPanelComponent } from './home-section1/home-section1-login-panel/home-section1-login-panel.component'
import { HomeSection2FirstStepComponent } from './home-section2/home-section2-first-step/home-section2-first-step.component'
import { HomeSection2SecondStepComponent } from './home-section2/home-section2-second-step/home-section2-second-step.component'
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomeNavbarResponsiveComponent } from './home-navbar-responsive/home-navbar-responsive.component'

const components = [
	LandingHomeComponent,
	HomeSection1Component,
	HomeSection2Component,
	HomeSection3Component,
	HomeSection4Component,
	HomeSection5Component,
	HomeSection1LoginPanelComponent,
	HomeSection2FirstStepComponent,
	HomeSection2SecondStepComponent,
	HomeNavbarComponent,
]
@NgModule({
	declarations: [...components, HomeNavbarResponsiveComponent],
	imports: [
		RouterModule.forChild(landingHomeRoutes),
		SharedModule,
		ComponentsModule,
	],
	exports: [...components],
})
export class LandingHomeModule {}
