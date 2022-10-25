import { AnimateJsDirective } from '@digital_brand_work/directives/animate.js.directive'
import { AutoSizeDirective } from '@digital_brand_work/directives/textarea-autosize.directive'
import { SyncWithClinicDirective } from 'app/app-core/directives/doctor.time-slot.disabler.directive'
import { CheckForAppointmentsDirective } from 'app/app-core/directives/doctor.time-slot.blocked.directive'
import { IsNotThisMonthDirective } from 'app/app-core/directives/is-not-this-month.directive'
import { FilterByCurrentDateDirective } from 'app/app-core/directives/filter-by-current-date.directive'
import { HideIfDoesNotMatchTimeDirective } from 'app/app-core/directives/hide-appointment-if-time-does-not-match.directive'
import { WeekCalendarCursorDirective } from 'app/app-core/directives/week-calendar-cursor.directive'
import { AddAnimationDirective } from '@digital_brand_work/directives/animate-on-scroll.directive'
import { ElementIsInScreenDirective } from '@digital_brand_work/directives/element-is-in-screen.directive'
import { ParallaxDirective } from '@digital_brand_work/directives/parralax.directive'

export const SHARED_DIRECTIVES = [
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
