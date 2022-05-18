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

export const updateDoctor = createAction(
	'[Doctor/API] Update Doctor',
	props<{ doctor: Update<Doctor> }>(),
)

export const deleteDoctor = createAction(
	'[Doctor/API] Delete Doctor',
	props<{ id: string }>(),
)
