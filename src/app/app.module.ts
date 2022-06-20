import { SharedModule } from 'app/shared/shared.module'
import { NgModule } from '@angular/core'
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
import { PlaceholderModule } from './modules/placeholder/placeholder.module'
import { AgmCoreModule } from '@agm/core'

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
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production, // Restrict extension to log-only mode
		}),

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
		PlaceholderModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],

	bootstrap: [AppComponent],
})
export class AppModule {}
