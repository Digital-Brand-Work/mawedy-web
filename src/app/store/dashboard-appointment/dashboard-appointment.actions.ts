import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { DashboardAppointment } from './dashboard-appointment.model';

export const loadDashboardAppointments = createAction(
  '[DashboardAppointment/API] Load DashboardAppointments', 
  props<{ dashboardAppointments: DashboardAppointment[] }>()
);

export const addDashboardAppointment = createAction(
  '[DashboardAppointment/API] Add DashboardAppointment',
  props<{ dashboardAppointment: DashboardAppointment }>()
);

export const upsertDashboardAppointment = createAction(
  '[DashboardAppointment/API] Upsert DashboardAppointment',
  props<{ dashboardAppointment: DashboardAppointment }>()
);

export const addDashboardAppointments = createAction(
  '[DashboardAppointment/API] Add DashboardAppointments',
  props<{ dashboardAppointments: DashboardAppointment[] }>()
);

export const upsertDashboardAppointments = createAction(
  '[DashboardAppointment/API] Upsert DashboardAppointments',
  props<{ dashboardAppointments: DashboardAppointment[] }>()
);

export const updateDashboardAppointment = createAction(
  '[DashboardAppointment/API] Update DashboardAppointment',
  props<{ dashboardAppointment: Update<DashboardAppointment> }>()
);

export const updateDashboardAppointments = createAction(
  '[DashboardAppointment/API] Update DashboardAppointments',
  props<{ dashboardAppointments: Update<DashboardAppointment>[] }>()
);

export const deleteDashboardAppointment = createAction(
  '[DashboardAppointment/API] Delete DashboardAppointment',
  props<{ id: string }>()
);

export const deleteDashboardAppointments = createAction(
  '[DashboardAppointment/API] Delete DashboardAppointments',
  props<{ ids: string[] }>()
);

export const clearDashboardAppointments = createAction(
  '[DashboardAppointment/API] Clear DashboardAppointments'
);
