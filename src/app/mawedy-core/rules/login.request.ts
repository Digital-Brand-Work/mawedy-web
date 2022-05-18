import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export interface LoginRequest {
	username: (string | ((control: AbstractControl) => ValidationErrors))[]
	password: (string | ((control: AbstractControl) => ValidationErrors))[]
}

export class Register {
	form: LoginRequest = {
		username: ['', Validators.required, Validators.maxLength(255)],
		password: ['', Validators.required, Validators.maxLength(255)],
	}
}
