import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Patient } from './patient.model';

export const loadPatients = createAction(
  '[Patient/API] Load Patients', 
  props<{ patients: Patient[] }>()
);

export const addPatient = createAction(
  '[Patient/API] Add Patient',
  props<{ patient: Patient }>()
);

export const upsertPatient = createAction(
  '[Patient/API] Upsert Patient',
  props<{ patient: Patient }>()
);

export const addPatients = createAction(
  '[Patient/API] Add Patients',
  props<{ patients: Patient[] }>()
);

export const upsertPatients = createAction(
  '[Patient/API] Upsert Patients',
  props<{ patients: Patient[] }>()
);

export const updatePatient = createAction(
  '[Patient/API] Update Patient',
  props<{ patient: Update<Patient> }>()
);

export const updatePatients = createAction(
  '[Patient/API] Update Patients',
  props<{ patients: Update<Patient>[] }>()
);

export const deletePatient = createAction(
  '[Patient/API] Delete Patient',
  props<{ id: string }>()
);

export const deletePatients = createAction(
  '[Patient/API] Delete Patients',
  props<{ ids: string[] }>()
);

export const clearPatients = createAction(
  '[Patient/API] Clear Patients'
);
