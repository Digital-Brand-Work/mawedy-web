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
import { AppRoutingModule } from './app.routing.module'
import { InputMaskModule } from '@ngneat/input-mask'
import { StoreModule } from '@ngrx/store'
import { reducers, metaReducers } from './app.state'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { EffectsModule } from '@ngrx/effects'
import { effects } from './app-effect.effects'
import { ModalModule } from './modules/modals/modal.module'
import { PagesModule } from './modules/pages/pages.module'

@NgModule({
	declarations: [AppComponent],

	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		MarkdownModule.forRoot({}),
		FuseMockApiModule.forRoot(mockApiServices),
		FuseConfigModule.forRoot(appConfig),
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		EffectsModule.forRoot(effects),

		BrowserAnimationsModule,
		AppRoutingModule,
		FuseModule,
		CoreModule,
		LayoutModule,
		InputMaskModule,
		BrowserModule,

		/*
		    Mawedy Modules
		*/
		SharedModule,
		ModalModule,
		PagesModule,
	],

	bootstrap: [AppComponent],
})
export class AppModule {}
