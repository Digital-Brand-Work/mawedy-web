import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { Patient } from '../../../../modules/admin/patients/patient.model'

enum PatientActionEnum {
	LOAD = '[Patient/System] Load Patients',
	PAGINATE = '[Patient/API] Paginate Patients',
	LOAD_SUCCESS = '[Patient/API] Load Patients Success',

	ADD = '[Patient/System] Add Patient',
	ADD_SUCCESS = '[Patient/API] Add Patient Success',

	UPSERT = '[Patient/System] Upsert Patient',
	UPSERT_SUCCESS = '[Patient/API] Upsert Patient Success',

	REMOVE = '[Patient/System] Upsert Patient',
	REMOVE_SUCCESS = '[Patient/API] Upsert Patient Success',
}

export const LOAD = createAction(PatientActionEnum.LOAD)

export const PAGINATE = createAction(
	PatientActionEnum.PAGINATE,
	props<{ url: string }>(),
)

export const LOAD_SUCCESS = createAction(
	PatientActionEnum.LOAD_SUCCESS,
	props<{ patients: Patient[] }>(),
)

export const ADD = createAction(
	PatientActionEnum.ADD,
	props<{ patient: Patient }>(),
)

export const ADD_SUCCESS = createAction(
	PatientActionEnum.ADD_SUCCESS,
	props<{ patient: Patient }>(),
)

export const UPSERT_SUCCESS = createAction(
	PatientActionEnum.UPSERT,
	props<{ patient: Patient }>(),
)

export const UPSERT = createAction(
	PatientActionEnum.UPSERT_SUCCESS,
	props<{ patient: Patient }>(),
)

export const REMOVE = createAction(
	PatientActionEnum.REMOVE,
	props<{ id: string }>(),
)
export const REMOVE_SUCCESS = createAction(
	PatientActionEnum.REMOVE_SUCCESS,
	props<{ id: string }>(),
)

// ----------

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
