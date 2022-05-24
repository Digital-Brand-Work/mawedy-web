import { Routes } from '@angular/router'
import { AppointmentsDayCalendarComponent } from 'app/modules/admin/appointments/appointments/appointments-day-calendar/appointments-day-calendar.component'
import { AppointmentsMonthCalendarComponent } from 'app/modules/admin/appointments/appointments/appointments-month-calendar/appointments-month-calendar.component'
import { AppointmentsWeekCalendarComponent } from 'app/modules/admin/appointments/appointments/appointments-week-calendar/appointments-week-calendar.component'
import { AppointmentsComponent } from 'app/modules/admin/appointments/appointments/appointments.component'

export const appointmentRoutes: Routes = [
	{
		path: '',
		component: AppointmentsComponent,
		children: [
			{
				path: '',
				redirectTo: 'month',
				pathMatch: 'full',
			},
			{
				path: 'month',
				component: AppointmentsMonthCalendarComponent,
			},
			{
				path: 'week',
				component: AppointmentsWeekCalendarComponent,
			},
			{
				path: 'day',
				component: AppointmentsDayCalendarComponent,
			},
		],
	},
]
