import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { DashboardWaitingPatient } from './dashboard-waiting-patient.model';

export const loadDashboardWaitingPatients = createAction(
  '[DashboardWaitingPatient/API] Load DashboardWaitingPatients', 
  props<{ dashboardWaitingPatients: DashboardWaitingPatient[] }>()
);

export const addDashboardWaitingPatient = createAction(
  '[DashboardWaitingPatient/API] Add DashboardWaitingPatient',
  props<{ dashboardWaitingPatient: DashboardWaitingPatient }>()
);

export const upsertDashboardWaitingPatient = createAction(
  '[DashboardWaitingPatient/API] Upsert DashboardWaitingPatient',
  props<{ dashboardWaitingPatient: DashboardWaitingPatient }>()
);

export const addDashboardWaitingPatients = createAction(
  '[DashboardWaitingPatient/API] Add DashboardWaitingPatients',
  props<{ dashboardWaitingPatients: DashboardWaitingPatient[] }>()
);

export const upsertDashboardWaitingPatients = createAction(
  '[DashboardWaitingPatient/API] Upsert DashboardWaitingPatients',
  props<{ dashboardWaitingPatients: DashboardWaitingPatient[] }>()
);

export const updateDashboardWaitingPatient = createAction(
  '[DashboardWaitingPatient/API] Update DashboardWaitingPatient',
  props<{ dashboardWaitingPatient: Update<DashboardWaitingPatient> }>()
);

export const updateDashboardWaitingPatients = createAction(
  '[DashboardWaitingPatient/API] Update DashboardWaitingPatients',
  props<{ dashboardWaitingPatients: Update<DashboardWaitingPatient>[] }>()
);

export const deleteDashboardWaitingPatient = createAction(
  '[DashboardWaitingPatient/API] Delete DashboardWaitingPatient',
  props<{ id: string }>()
);

export const deleteDashboardWaitingPatients = createAction(
  '[DashboardWaitingPatient/API] Delete DashboardWaitingPatients',
  props<{ ids: string[] }>()
);

export const clearDashboardWaitingPatients = createAction(
  '[DashboardWaitingPatient/API] Clear DashboardWaitingPatients'
);
