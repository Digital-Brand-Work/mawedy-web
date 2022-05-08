import { Injectable } from '@angular/core'
import { Actions, createEffect } from '@ngrx/effects'

@Injectable()
export class DoctorEffects {
	constructor(private actions$: Actions) {}
}
