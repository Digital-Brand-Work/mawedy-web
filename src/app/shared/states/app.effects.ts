import { ClinicEffects } from '../../app-core/store/ngrx/clinic/clinic.effects'
import { EffectsModule } from '@ngrx/effects'
import { PatientEffects } from 'app/app-core/store/ngrx/patients/patient.effects'

export const APP_EFFECTS = [
	EffectsModule.forFeature([ClinicEffects, PatientEffects]),
]
