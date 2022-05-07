import { createAction, props } from '@ngrx/store'

export const doctorDoctors = createAction('[Doctor] Doctor Doctors')

export const doctorDoctorsSuccess = createAction(
	'[Doctor] Doctor Doctors Success',
	props<{ data: any }>(),
)

export const doctorDoctorsFailure = createAction(
	'[Doctor] Doctor Doctors Failure',
	props<{ error: any }>(),
)
