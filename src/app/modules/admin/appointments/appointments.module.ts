import { RouterModule } from '@angular/router'
import { SharedModule } from 'app/shared/shared.module'
import { NgModule } from '@angular/core'
import { AppointmentsComponent } from './appointments/appointments.component'
import { AppointmentsToolbarComponent } from './appointments/appointments-toolbar/appointments-toolbar.component'
import { AppointmentsSelectDoctorComponent } from './appointments/appointments-select-doctor/appointments-select-doctor.component'
import { AppointmentsMonthCalendarComponent } from './appointments/appointments-month-calendar/appointments-month-calendar.component'
import { AppointmentsWeekCalendarComponent } from './appointments/appointments-week-calendar/appointments-week-calendar.component'
import { AppointmentsDayCalendarComponent } from './appointments/appointments-day-calendar/appointments-day-calendar.component'
import { AppointmentRegularBadgeComponent } from './appointments/appointments/badges/appointment-regular-badge/appointment-regular-badge.component'
import { AppointmentDayBadgeComponent } from './appointments/appointments/badges/appointment-day-badge/appointment-day-badge.component'
import { appointmentRoutes } from 'app/mawedy-core/routes/admin/appointment.routing'
import { StoreModule } from '@ngrx/store'
import * as fromAppointment from './appointment.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AppointmentEffects } from 'app/modules/admin/appointments/appointment.effects'

const components = [
	AppointmentsComponent,
	AppointmentsToolbarComponent,
	AppointmentsSelectDoctorComponent,
	AppointmentsMonthCalendarComponent,
	AppointmentsWeekCalendarComponent,
	AppointmentsDayCalendarComponent,
	AppointmentRegularBadgeComponent,
	AppointmentDayBadgeComponent,
]

@NgModule({
	declarations: [
		...components,
		// AppointmentsMonthCalendarAppointmentItemComponent,
		// AppointmentsDayCalendarAppointmentItemComponent,
	],
	imports: [
		SharedModule,
		RouterModule.forChild(appointmentRoutes),
		StoreModule.forFeature(
			fromAppointment.appointmentsFeatureKey,
			fromAppointment.reducer,
		),
		EffectsModule.forFeature([AppointmentEffects]),
	],
	exports: [...components],
})
export class AppointmentsModule {}
