import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'

import { Doctor } from './doctor.model'

export const loadDoctors = createAction(
	'[Doctor/API] Load Doctors',
	props<{ doctors: Doctor[] }>(),
)

export const addDoctor = createAction(
	'[Doctor/API] Add Doctor',
	props<{ doctor: Doctor }>(),
)

export const upsertDoctor = createAction(
	'[Doctor/API] Upsert Doctor',
	props<{ doctor: Doctor }>(),
)

export const addDoctors = createAction(
	'[Doctor/API] Add Doctors',
	props<{ doctors: Doctor[] }>(),
)

export const upsertDoctors = createAction(
	'[Doctor/API] Upsert Doctors',
	props<{ doctors: Doctor[] }>(),
)

export const updateDoctor = createAction(
	'[Doctor/API] Update Doctor',
	props<{ doctor: Update<Doctor> }>(),
)

export const updateDoctors = createAction(
	'[Doctor/API] Update Doctors',
	props<{ doctors: Update<Doctor>[] }>(),
)

export const deleteDoctor = createAction(
	'[Doctor/API] Delete Doctor',
	props<{ id: string }>(),
)

export const deleteDoctors = createAction(
	'[Doctor/API] Delete Doctors',
	props<{ ids: string[] }>(),
)

export const clearDoctors = createAction('[Doctor/API] Clear Doctors')
