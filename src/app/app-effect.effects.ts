import { Injectable } from '@angular/core'
import { Actions, createEffect } from '@ngrx/effects'
import { AppointmentEffects } from './modules/admin/appointments/appointment.effects'
import { DashboardAppointmentEffects } from './modules/admin/dashboard/appointments/dashboard-appointment.effects'
import { DashboardWaitingPatientEffects } from './modules/admin/dashboard/waiting-patients/dashboard-waiting-patient.effects'
import { DoctorEffects } from './modules/admin/doctors/doctor.effects'
import { PatientEffects } from './app-core/store/ngrx/patients/patient.effects'
import { PromotionEffects } from './modules/admin/promotions/promotion.effects'

@Injectable()
export class AppEffect {
	constructor(private actions$: Actions) {}
}

export const effects = [
	AppointmentEffects,
	DashboardAppointmentEffects,
	DashboardWaitingPatientEffects,
	DoctorEffects,
	PatientEffects,
	PromotionEffects,
]
