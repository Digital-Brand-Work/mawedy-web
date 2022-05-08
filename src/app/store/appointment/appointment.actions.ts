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

export const upsertAppointment = createAction(
	'[Appointment/API] Upsert Appointment',
	props<{ appointment: Appointment }>(),
)

export const addAppointments = createAction(
	'[Appointment/API] Add Appointments',
	props<{ appointments: Appointment[] }>(),
)

export const upsertAppointments = createAction(
	'[Appointment/API] Upsert Appointments',
	props<{ appointments: Appointment[] }>(),
)

export const updateAppointment = createAction(
	'[Appointment/API] Update Appointment',
	props<{ appointment: Update<Appointment> }>(),
)

export const updateAppointments = createAction(
	'[Appointment/API] Update Appointments',
	props<{ appointments: Update<Appointment>[] }>(),
)

export const deleteAppointment = createAction(
	'[Appointment/API] Delete Appointment',
	props<{ id: string }>(),
)

export const deleteAppointments = createAction(
	'[Appointment/API] Delete Appointments',
	props<{ ids: string[] }>(),
)

export const clearAppointments = createAction(
	'[Appointment/API] Clear Appointments',
)
