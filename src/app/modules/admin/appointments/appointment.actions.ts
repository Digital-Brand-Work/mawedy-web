import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'

import { Appointment } from './appointment.model'

export const loadAppointments = createAction(
	'[Appointment/API] Load Appointments',
	props<{ appointments: Appointment[] }>(),
)

export const addAppointment = createAction(
	'[Appointment/API] Add Appointment',
	props<{ appointment: Appointment }>(),
)

export const updateAppointment = createAction(
	'[Appointment/API] Update Appointment',
	props<{ appointment: Appointment }>(),
)

export const deleteAppointment = createAction(
	'[Appointment/API] Delete Appointment',
	props<{ id: string }>(),
)
