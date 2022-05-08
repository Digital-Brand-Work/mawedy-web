import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DashboardWaitingPatient } from './dashboard-waiting-patient.model';
import * as DashboardWaitingPatientActions from './dashboard-waiting-patient.actions';

export const dashboardWaitingPatientsFeatureKey = 'dashboardWaitingPatients';

export interface State extends EntityState<DashboardWaitingPatient> {
  // additional entities state properties
}

export const adapter: EntityAdapter<DashboardWaitingPatient> = createEntityAdapter<DashboardWaitingPatient>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(DashboardWaitingPatientActions.addDashboardWaitingPatient,
    (state, action) => adapter.addOne(action.dashboardWaitingPatient, state)
  ),
  on(DashboardWaitingPatientActions.upsertDashboardWaitingPatient,
    (state, action) => adapter.upsertOne(action.dashboardWaitingPatient, state)
  ),
  on(DashboardWaitingPatientActions.addDashboardWaitingPatients,
    (state, action) => adapter.addMany(action.dashboardWaitingPatients, state)
  ),
  on(DashboardWaitingPatientActions.upsertDashboardWaitingPatients,
    (state, action) => adapter.upsertMany(action.dashboardWaitingPatients, state)
  ),
  on(DashboardWaitingPatientActions.updateDashboardWaitingPatient,
    (state, action) => adapter.updateOne(action.dashboardWaitingPatient, state)
  ),
  on(DashboardWaitingPatientActions.updateDashboardWaitingPatients,
    (state, action) => adapter.updateMany(action.dashboardWaitingPatients, state)
  ),
  on(DashboardWaitingPatientActions.deleteDashboardWaitingPatient,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(DashboardWaitingPatientActions.deleteDashboardWaitingPatients,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(DashboardWaitingPatientActions.loadDashboardWaitingPatients,
    (state, action) => adapter.setAll(action.dashboardWaitingPatients, state)
  ),
  on(DashboardWaitingPatientActions.clearDashboardWaitingPatients,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
