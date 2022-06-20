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
import { AgmCoreModule } from '@agm/core'
import { EntitiesPipe } from '@digital_brand_work/pipes/entity.pipe'
import { AgePipe } from '@digital_brand_work/pipes/age.pipe'
import { TimePipe } from '@digital_brand_work/pipes/time.pipe'
import { AppendCountryCodePipe } from '@digital_brand_work/pipes/append-country-code.pipe'
import { InitialsPipe } from '@digital_brand_work/pipes/initials.pipe'
import { ToTimeSlotPipe } from '@digital_brand_work/pipes/time-slot.pipe'
import { ShortenDayPipe } from '@digital_brand_work/pipes/shorten.day.pipe'
import { TwentyFourToTwelveHoursPipe } from '@digital_brand_work/pipes/twenty-four-to-twelve.hours.pipe'
import { TableFilterPipe } from '@digital_brand_work/pipes/table.filter.pipe'
import { add30MinutesPipe } from '@digital_brand_work/pipes/add-thirty-minutes.pipe'
import { SyncWithClinicDirective } from 'app/mawedy-core/directives/doctor.time-slot.disabler.directive'
import { CheckForAppointmentsDirective } from 'app/mawedy-core/directives/doctor.time-slot.blocked.directive'
import { DayIntervalPipe } from '@digital_brand_work/pipes/day-interval.count.pipe'
import { FuseConfirmationModule } from '@fuse/services/confirmation'
import { DashboardCountPipe } from 'app/mawedy-core/pipes/dashboard-count.pipe'
import { RouterModule } from '@angular/router'
import { mobileComponents } from './landing.mobile.component'
import { IsNotThisMonthDirective } from 'app/mawedy-core/directives/is-not-this-month.directive'
import { SortByPipe } from '@digital_brand_work/pipes/sort-by.pipe'
import { LimitByPipe } from '@digital_brand_work/pipes/limit-by.pipe'
import { FilterByCurrentDateDirective } from 'app/mawedy-core/directives/filter-by-current-date.directive'
import { AppointmentCountsPipe } from 'app/mawedy-core/pipes/appointment-day-count.pipe'

const components: any[] = [
	...(appComponents as any[]),
	...(modalComponents as any[]),
	...mobileComponents,
	UnderMaintenanceComponent,
	UnderConstructionComponent,
]

const modules: any[] = [
	NgxIndexedDBModule.forRoot(indexedDbConfig),
	AgmCoreModule.forRoot({
		apiKey: 'AIzaSyAVSgFcc_sKMdkAgXTc3vJQWUUy2XJK6ck',
	}),
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	InputMaskModule,
	NgxMaskModule.forRoot(),
	FuseCardModule,
	SSRExcludeModule,
	FuseConfirmationModule,
	RouterModule,
	...matModules,
]

const pipes: any[] = [
	StopPropagation,
	EntitiesPipe,
	AgePipe,
	TimePipe,
	AppendCountryCodePipe,
	InitialsPipe,
	DayIntervalPipe,
	ToTimeSlotPipe,
	ShortenDayPipe,
	TwentyFourToTwelveHoursPipe,
	TableFilterPipe,
	add30MinutesPipe,
	DashboardCountPipe,
	SortByPipe,
	LimitByPipe,
	AppointmentCountsPipe,
]

const directives: any[] = [
	AnimateJsDirective,
	ParallaxDirective,
	AutoSizeDirective,
	SyncWithClinicDirective,
	CheckForAppointmentsDirective,
	IsNotThisMonthDirective,
	FilterByCurrentDateDirective,
]

@NgModule({
	declarations: [...components, ...directives, ...pipes],
	imports: [...modules],
	exports: [
		...pipes,
		...(components as any[]),
		...(directives as any[]),
		...(modules as any[]),
	],
	providers: [],
})
export class SharedModule {}
