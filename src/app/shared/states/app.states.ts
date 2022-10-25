import { StoreModule } from '@ngrx/store'
import { StateEnum } from 'app/app-core/store/core/state.enum'
import { clinicReducer } from 'app/app-core/store/ngrx/clinic/clinic.reducer'
import { patientReducer } from 'app/app-core/store/ngrx/patients/patient.reducer'

export const APP_STATES = [
	StoreModule.forFeature(StateEnum.CLINIC, clinicReducer),
	StoreModule.forFeature(StateEnum.PATIENT, patientReducer),
]
