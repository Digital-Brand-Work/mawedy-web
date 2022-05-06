import { SharedModule } from 'app/shared/shared.module'
import { NgModule } from '@angular/core'
import { SubscriptionsModule } from './modules/admin/subscriptions/subscriptions.module'
import { PromotionsModule } from './modules/admin/promotions/promotions.module'
import { ClinicModule } from './modules/admin/clinic/clinic.module'
import { PatientsModule } from './modules/admin/patients/patients.module'
import { DoctorsModule } from './modules/admin/doctors/doctors.module'
import { AppointmentsModule } from './modules/admin/appointments/appointments.module'
import { DashboardModule } from './modules/admin/dashboard/dashboard.module'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MarkdownModule } from 'ngx-markdown'
import { FuseModule } from '@fuse'
import { FuseConfigModule } from '@fuse/services/config'
import { FuseMockApiModule } from '@fuse/lib/mock-api'
import { CoreModule } from 'app/core/core.module'
import { appConfig } from 'app/core/config/app.config'
import { mockApiServices } from 'app/mock-api'
import { LayoutModule } from 'app/layout/layout.module'
import { AppComponent } from 'app/app.component'
import { AppRoutingModule } from './app.routing.module';
import { InputMaskModule } from '@ngneat/input-mask'

@NgModule({
	declarations: [AppComponent],

	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserAnimationsModule,
		AppRoutingModule,
		FuseModule,
		FuseConfigModule.forRoot(appConfig),
		FuseMockApiModule.forRoot(mockApiServices),
		CoreModule,
		LayoutModule,
		MarkdownModule.forRoot({}),

		/*
		    Mawedy Modules
		*/
		DashboardModule,
		AppointmentsModule,
		DoctorsModule,
		PatientsModule,
		ClinicModule,
		PromotionsModule,
		SubscriptionsModule,
		SharedModule,
  InputMaskModule,
	],

	bootstrap: [AppComponent],
})
export class AppModule {}
