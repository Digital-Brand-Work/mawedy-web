import { createAction, props } from '@ngrx/store'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'

enum ClinicActionEnum {
	LOAD = '[AuthCheck/System] Load Clinic',
	LOAD_SUCCESS = '[AuthCheck/API] Load Clinic Success',
}

export const LOAD = createAction(ClinicActionEnum.LOAD)

export const LOAD_SUCCESS = createAction(
	ClinicActionEnum.LOAD_SUCCESS,
	props<{ clinic: Clinic }>(),
)
