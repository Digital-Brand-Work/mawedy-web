import { ParallaxDirective } from './../../@digital_brand_work/directives/parralax.directive'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AnimateJsDirective } from '@digital_brand_work/directives/animate.js.directive'
import { AutoSizeDirective } from '@digital_brand_work/directives/textarea-autosize.directive'
import { InputMaskModule } from '@ngneat/input-mask'
import { NgxMaskModule } from 'ngx-mask'
import { StopPropagation } from '@digital_brand_work/directives/stop.propagation.directive'
import { UnderMaintenanceComponent } from 'app/modules/pages/under-maintenance/under-maintenance.component'
import { FuseCardModule } from '@fuse/components/card'
import { UnderConstructionComponent } from 'app/modules/pages/under-construction/under-construction.component'
import { SSRExcludeModule } from 'ngx-ssr-exclude'
import { NgxIndexedDBModule } from 'ngx-indexed-db'
import { indexedDbConfig } from 'app/mawedy-core/indexed-db/indexed-db.config'
import { matModules } from './mat.modules'
import { appComponents } from './app.components'
import { modalComponents } from './modal.components'
// import { GoogleMapsModule } from '@angular/google-maps'

const components = [...appComponents, ...modalComponents, UnderMaintenanceComponent, UnderConstructionComponent]

const modules = [
	NgxIndexedDBModule.forRoot(indexedDbConfig),
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	InputMaskModule,
	NgxMaskModule.forRoot(),
	FuseCardModule,
	SSRExcludeModule,
	// GoogleMapsModule,

	...matModules,
]

const directives = [AnimateJsDirective, ParallaxDirective, AutoSizeDirective, StopPropagation]

const pipes = []

@NgModule({
	declarations: [...components, ...directives, ...pipes],
	imports: [...modules],
	exports: [...components, ...directives, ...pipes, ...modules],
	providers: [{ provide: 'isBrowser', useValue: true }],
})
export class SharedModule {}
