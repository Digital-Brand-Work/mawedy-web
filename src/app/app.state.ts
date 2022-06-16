import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../environments/environment'
import * as fromDoctor from './modules/admin/doctors/doctor.reducer'
import * as fromPatient from './modules/admin/patients/patient.reducer'
import * as fromPromotion from './modules/admin/promotions/promotion.reducer'
import * as fromAppointment from './modules/admin/appointments/appointment.reducer'
import * as fromDashboardWaitingPatient from './modules/admin/dashboard/waiting-patients/dashboard-waiting-patient.reducer'
import * as fromDashboardAppointment from './modules/admin/dashboard/appointments/dashboard-appointment.reducer'
import * as fromDepartment from './modules/admin/clinic/department/department.reducer'
import * as fromMedicalService from './modules/admin/clinic/clinic-services/medical-service.reducer'
import * as fromDashboardForApprovalPatient from './modules/admin/dashboard/for-approvals/dashboard-for-approval-patient.reducer'

export interface State {
	[fromDoctor.doctorsFeatureKey]: fromDoctor.State

	[fromPatient.patientsFeatureKey]: fromPatient.State

	[fromPromotion.promotionsFeatureKey]: fromPromotion.State

	[fromAppointment.appointmentsFeatureKey]: fromAppointment.State

	[fromDashboardWaitingPatient.dashboardWaitingPatientsFeatureKey]: fromDashboardWaitingPatient.State

	[fromDashboardAppointment.dashboardAppointmentsFeatureKey]: fromDashboardAppointment.State

	[fromDepartment.departmentsFeatureKey]: fromDepartment.State

	[fromMedicalService.medicalServicesFeatureKey]: fromMedicalService.State

	[fromDashboardForApprovalPatient.dashboardForApprovalPatientsFeatureKey]: fromDashboardForApprovalPatient.State
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

	[fromDepartment.departmentsFeatureKey]: fromDepartment.reducer,

	[fromMedicalService.medicalServicesFeatureKey]: fromMedicalService.reducer,

	[fromDashboardForApprovalPatient.dashboardForApprovalPatientsFeatureKey]:
		fromDashboardForApprovalPatient.reducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production
	? []
	: []
