import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../environments/environment'
import * as fromDoctor from './store/doctor/doctor.reducer'
import * as fromPatient from './store/patient/patient.reducer'
import * as fromPromotion from './store/promotion/promotion.reducer'
import * as fromAppointment from './store/appointment/appointment.reducer'
import * as fromDashboardWaitingPatient from './store/dashboard-waiting-patient/dashboard-waiting-patient.reducer'
import * as fromDashboardAppointment from './store/dashboard-appointment/dashboard-appointment.reducer'

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
