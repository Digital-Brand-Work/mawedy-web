import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../environments/environment'
import * as fromDoctor from './store/entities/doctor/doctor.reducer'
import * as fromPatient from './store/entities/patient/patient.reducer'
import * as fromPromotion from './store/entities/promotion/promotion.reducer'
import * as fromAppointment from './store/entities/appointment/appointment.reducer'
import * as fromDashboardWaitingPatient from './store/entities/dashboard-waiting-patient/dashboard-waiting-patient.reducer'
import * as fromDashboardAppointment from './store/entities/dashboard-appointment/dashboard-appointment.reducer'

export interface State {
	[fromDoctor.doctorsFeatureKey]: fromDoctor.State

	[fromPatient.patientsFeatureKey]: fromPatient.State

	[fromPromotion.promotionsFeatureKey]: fromPromotion.State

	[fromAppointment.appointmentsFeatureKey]: fromAppointment.State

	[fromDashboardWaitingPatient.dashboardWaitingPatientsFeatureKey]: fromDashboardWaitingPatient.State

	[fromDashboardAppointment.dashboardAppointmentsFeatureKey]: fromDashboardAppointment.State
}

export const reducers: ActionReducerMap<State> = {
	[fromDoctor.doctorsFeatureKey]: fromDoctor.reducer,

	[fromPatient.patientsFeatureKey]: fromPatient.reducer,

	[fromPromotion.promotionsFeatureKey]: fromPromotion.reducer,

	[fromAppointment.appointmentsFeatureKey]: fromAppointment.reducer,

	[fromDashboardWaitingPatient.dashboardWaitingPatientsFeatureKey]:
		fromDashboardWaitingPatient.reducer,

	[fromDashboardAppointment.dashboardAppointmentsFeatureKey]:
		fromDashboardAppointment.reducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production
	? []
	: []
