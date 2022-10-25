import { ClinicEffects } from './../../app-core/store/clinic/clinic.effects'
import { EffectsModule } from '@ngrx/effects'

export const appEffects = [EffectsModule.forFeature([ClinicEffects])]
