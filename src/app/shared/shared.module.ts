import { APP_EFFECTS } from './states/app.effects'
import { GLOBAL_PIPES } from './pipes/global-pipes'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputMaskModule } from '@ngneat/input-mask'
import { NgxMaskModule } from 'ngx-mask'
import { SSRExcludeModule } from 'ngx-ssr-exclude'
import { NgxIndexedDBModule } from 'ngx-indexed-db'
import { indexedDbConfig } from 'app/app-core/indexed-db/indexed-db.config'
import { MATERIAL_MODULES } from './angular-material/mat.modules'
import { appComponents } from './components/app.components'
import { modalComponents } from './components/modal.components'
import { AgmCoreModule } from '@agm/core'
import { RouterModule } from '@angular/router'
import { mobileComponents } from './components/landing.mobile.component'
import { NgxFullpageModule } from 'ngx-free-fullpage'
import { InViewportModule } from 'ng-in-viewport'
import 'intersection-observer'
import {
	DefaultMatCalendarRangeStrategy,
	MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker'
import { PAGES_COMPONENTS } from './components/pages.components'
import { FUSE_MODULES } from './fuse-modules/fuse-modules'
import { SHARED_PIPES } from './pipes/shared-pipes'
import { SHARED_DIRECTIVES } from './directives/shared-directives'
import { GLOBAL_DIRECTIVES } from './directives/global-directives'
import { APP_STATES } from './states/app.states'

const components: any[] = [
	...(appComponents as any[]),
	...(modalComponents as any[]),
	...mobileComponents,

	...PAGES_COMPONENTS,
]

const modules: any[] = [
	RouterModule,
	FormsModule,
	CommonModule,
	InputMaskModule,
	InViewportModule,
	SSRExcludeModule,
	NgxFullpageModule,
	ReactiveFormsModule,
	NgxMaskModule.forRoot(),
	NgxIndexedDBModule.forRoot(indexedDbConfig),
	AgmCoreModule.forRoot({
		apiKey: 'AIzaSyAVSgFcc_sKMdkAgXTc3vJQWUUy2XJK6ck',
	}),

	...APP_STATES,
	...APP_EFFECTS,

	...FUSE_MODULES,
	...MATERIAL_MODULES,
]

const pipes = [...SHARED_PIPES, ...GLOBAL_PIPES]

const directives = [...SHARED_DIRECTIVES, ...GLOBAL_DIRECTIVES]

@NgModule({
	imports: [...modules],
	declarations: [...components, ...directives, ...pipes],
	exports: [...pipes, ...components, ...directives, ...modules],
	providers: [
		{
			provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
			useClass: DefaultMatCalendarRangeStrategy,
		},
	],
})
export class SharedModule {}
