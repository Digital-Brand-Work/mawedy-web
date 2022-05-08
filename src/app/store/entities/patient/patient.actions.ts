import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'

import { Patient } from './patient.model'

export const loadPatients = createAction(
	'[Patient/API] Load Patients',
	props<{ patients: Patient[] }>(),
)

export const addPatient = createAction(
	'[Patient/API] Add Patient',
	props<{ patient: Patient }>(),
)

export const updatePatient = createAction(
	'[Patient/API] Update Patient',
	props<{ patient: Update<Patient> }>(),
)

export const deletePatient = createAction(
	'[Patient/API] Delete Patient',
	props<{ id: string }>(),
)
