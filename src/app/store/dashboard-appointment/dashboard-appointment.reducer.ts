import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DashboardAppointment } from './dashboard-appointment.model';
import * as DashboardAppointmentActions from './dashboard-appointment.actions';

export const dashboardAppointmentsFeatureKey = 'dashboardAppointments';

export interface State extends EntityState<DashboardAppointment> {
  // additional entities state properties
}

export const adapter: EntityAdapter<DashboardAppointment> = createEntityAdapter<DashboardAppointment>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(DashboardAppointmentActions.addDashboardAppointment,
    (state, action) => adapter.addOne(action.dashboardAppointment, state)
  ),
  on(DashboardAppointmentActions.upsertDashboardAppointment,
    (state, action) => adapter.upsertOne(action.dashboardAppointment, state)
  ),
  on(DashboardAppointmentActions.addDashboardAppointments,
    (state, action) => adapter.addMany(action.dashboardAppointments, state)
  ),
  on(DashboardAppointmentActions.upsertDashboardAppointments,
    (state, action) => adapter.upsertMany(action.dashboardAppointments, state)
  ),
  on(DashboardAppointmentActions.updateDashboardAppointment,
    (state, action) => adapter.updateOne(action.dashboardAppointment, state)
  ),
  on(DashboardAppointmentActions.updateDashboardAppointments,
    (state, action) => adapter.updateMany(action.dashboardAppointments, state)
  ),
  on(DashboardAppointmentActions.deleteDashboardAppointment,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(DashboardAppointmentActions.deleteDashboardAppointments,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(DashboardAppointmentActions.loadDashboardAppointments,
    (state, action) => adapter.setAll(action.dashboardAppointments, state)
  ),
  on(DashboardAppointmentActions.clearDashboardAppointments,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
