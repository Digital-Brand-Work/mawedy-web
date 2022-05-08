import { Injectable } from '@angular/core'
import { Actions, createEffect } from '@ngrx/effects'
import { DoctorEffectEffects } from './store/effects/doctor-effect/doctor-effect.effects'

@Injectable()
export class AppEffectEffects {
	constructor(private actions$: Actions) {}
}

export const effects = [DoctorEffectEffects]
