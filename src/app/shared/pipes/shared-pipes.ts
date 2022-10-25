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
import { DayIntervalPipe } from '@digital_brand_work/pipes/day-interval.count.pipe'
import { DashboardCountPipe } from 'app/app-core/pipes/dashboard-count.pipe'
import { SortByPipe } from '@digital_brand_work/pipes/sort-by.pipe'
import { LimitByPipe } from '@digital_brand_work/pipes/limit-by.pipe'
import { AppointmentCountsPipe } from 'app/app-core/pipes/appointment-day-count.pipe'
import { FilterByDatePipe } from '@digital_brand_work/pipes/filterBy.pipe'
import { FilterByDoctorPipe } from 'app/app-core/pipes/filter-by-doctor.pipe'
import { RemoveWhiteSpaceAndDashPipe } from '@digital_brand_work/pipes/remove-white-space-and-dash.pipe'
import { ToPatientFullName } from 'app/app-core/pipes/patient.fullname.pipe'
import { DashboardStatusPipe } from 'app/app-core/pipes/resolve-status.color.pipe'
import { IsInViewPipe } from '@digital_brand_work/pipes/element-is-in-view.pipe'
import { ResolveSubscriptionPipe } from 'app/app-core/pipes/resolve-subscription.pipe'

export const SHARED_PIPES = [
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
