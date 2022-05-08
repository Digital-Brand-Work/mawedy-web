import { Injectable } from '@angular/core'
import { Actions, createEffect } from '@ngrx/effects'
import { AppointmentEffects } from './store/appointment/appointment.effects'
import { DashboardAppointmentEffects } from './store/dashboard-appointment/dashboard-appointment.effects'
import { DashboardWaitingPatientEffects } from './store/dashboard-waiting-patient/dashboard-waiting-patient.effects'
import { DoctorEffects } from './store/doctor/doctor.effects'
import { PatientEffects } from './store/patient/patient.effects'
import { PromotionEffects } from './store/promotion/promotion.effects'

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
