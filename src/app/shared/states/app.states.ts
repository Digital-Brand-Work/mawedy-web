import { StoreModule } from '@ngrx/store'
import { StateEnum } from 'app/app-core/store/core/state.enum'
import { clinicReducer } from 'app/app-core/store/clinic/clinic.reducer'

export const APP_STATES = [
	StoreModule.forFeature(StateEnum.CLINIC, clinicReducer),
]
