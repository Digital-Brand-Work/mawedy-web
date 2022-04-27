import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsToolbarComponent } from './appointments/appointments-toolbar/appointments-toolbar.component';
import { AppointmentsSelectDoctorComponent } from './appointments/appointments-select-doctor/appointments-select-doctor.component';
import { AppointmentsMonthCalendarComponent } from './appointments/appointments-month-calendar/appointments-month-calendar.component';
import { AppointmentsWeekCalendarComponent } from './appointments/appointments-week-calendar/appointments-week-calendar.component';
import { AppointmentsDayCalendarComponent } from './appointments/appointments-day-calendar/appointments-day-calendar.component';
import { AppointmentRegularBadgeComponent } from './appointments/appointments/badges/appointment-regular-badge/appointment-regular-badge.component';
import { AppointmentDayBadgeComponent } from './appointments/appointments/badges/appointment-day-badge/appointment-day-badge.component';



@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentsToolbarComponent,
    AppointmentsSelectDoctorComponent,
    AppointmentsMonthCalendarComponent,
    AppointmentsWeekCalendarComponent,
    AppointmentsDayCalendarComponent,
    AppointmentRegularBadgeComponent,
    AppointmentDayBadgeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppointmentsModule { }
