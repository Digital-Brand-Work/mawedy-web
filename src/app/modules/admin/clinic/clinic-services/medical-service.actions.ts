import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { MedicalService } from './medical-service.model'

export const loadMedicalServices = createAction(
	'[MedicalService/API] Load MedicalServices',
	props<{ medicalServices: MedicalService[] }>(),
)

export const addMedicalService = createAction(
	'[MedicalService/API] Add MedicalService',
	props<{ medicalService: MedicalService }>(),
)

export const updateMedicalService = createAction(
	'[MedicalService/API] Update MedicalService',
	props<{ medicalService: MedicalService }>(),
)

export const deleteMedicalService = createAction(
	'[MedicalService/API] Delete MedicalService',
	props<{ id: string }>(),
)
