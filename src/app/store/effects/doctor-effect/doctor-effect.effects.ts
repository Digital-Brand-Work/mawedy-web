import { Injectable } from '@angular/core'
import { Actions, createEffect } from '@ngrx/effects'

@Injectable()
export class DoctorEffectEffects {
	constructor(private actions$: Actions) {}
}
