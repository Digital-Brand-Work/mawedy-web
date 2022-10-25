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
import { indexedDbConfig } from 'app/app-core/indexed-db/indexed-db.config'
import { angularMaterialModules } from './angular-material/mat.modules'
import { appComponents } from './components/app.components'
import { modalComponents } from './components/modal.components'
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
import { SyncWithClinicDirective } from 'app/app-core/directives/doctor.time-slot.disabler.directive'
import { CheckForAppointmentsDirective } from 'app/app-core/directives/doctor.time-slot.blocked.directive'
import { DayIntervalPipe } from '@digital_brand_work/pipes/day-interval.count.pipe'
import { FuseConfirmationModule } from '@fuse/services/confirmation'
import { DashboardCountPipe } from 'app/app-core/pipes/dashboard-count.pipe'
import { RouterModule } from '@angular/router'
import { mobileComponents } from './components/landing.mobile.component'
import { IsNotThisMonthDirective } from 'app/app-core/directives/is-not-this-month.directive'
import { SortByPipe } from '@digital_brand_work/pipes/sort-by.pipe'
import { LimitByPipe } from '@digital_brand_work/pipes/limit-by.pipe'
import { FilterByCurrentDateDirective } from 'app/app-core/directives/filter-by-current-date.directive'
import { AppointmentCountsPipe } from 'app/app-core/pipes/appointment-day-count.pipe'
import { FilterByDatePipe } from '@digital_brand_work/pipes/filterBy.pipe'
import { FilterByDoctorPipe } from 'app/app-core/pipes/filter-by-doctor.pipe'
import { HideIfDoesNotMatchTimeDirective } from 'app/app-core/directives/hide-appointment-if-time-does-not-match.directive'
import { WeekCalendarCursorDirective } from 'app/app-core/directives/week-calendar-cursor.directive'
import { NgxFullpageModule } from 'ngx-free-fullpage'
import { RemoveWhiteSpaceAndDashPipe } from '@digital_brand_work/pipes/remove-white-space-and-dash.pipe'
import { ToPatientFullName } from 'app/app-core/pipes/patient.fullname.pipe'
import { DashboardStatusPipe } from 'app/app-core/pipes/resolve-status.color.pipe'
import { AddAnimationDirective } from '@digital_brand_work/directives/animate-on-scroll.directive'
import { IsInViewPipe } from '@digital_brand_work/pipes/element-is-in-view.pipe'
import { ResolveSubscriptionPipe } from 'app/app-core/pipes/resolve-subscription.pipe'
import { ElementIsInScreenDirective } from '@digital_brand_work/directives/element-is-in-screen.directive'
import { InViewportModule } from 'ng-in-viewport'
import 'intersection-observer'
import {
	DefaultMatCalendarRangeStrategy,
	MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker'

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
	InViewportModule,
	RouterModule,
	NgxFullpageModule,
	...angularMaterialModules,
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
	FilterByDatePipe,
	FilterByDoctorPipe,
	RemoveWhiteSpaceAndDashPipe,
	DashboardStatusPipe,
	ToPatientFullName,
	IsInViewPipe,
	ResolveSubscriptionPipe,
]

const directives: any[] = [
	AnimateJsDirective,
	ParallaxDirective,
	AutoSizeDirective,
	SyncWithClinicDirective,
	CheckForAppointmentsDirective,
	IsNotThisMonthDirective,
	FilterByCurrentDateDirective,
	HideIfDoesNotMatchTimeDirective,
	WeekCalendarCursorDirective,
	AddAnimationDirective,
	ElementIsInScreenDirective,
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
	providers: [
		{
			provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
			useClass: DefaultMatCalendarRangeStrategy,
		},
	],
})
export class SharedModule {}
