import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export interface LoginRule {
	username: (string | ((control: AbstractControl) => ValidationErrors))[]
	password: (string | ((control: AbstractControl) => ValidationErrors))[]
}

export class StoreLoginRule {
	form: LoginRule = {
		username: ['', Validators.required, Validators.maxLength(255)],
		password: ['', Validators.required, Validators.maxLength(255)],
	}
}
