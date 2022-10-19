import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export interface AccountSettingRule {
	username?: (string | ((control: AbstractControl) => ValidationErrors))[]
	first_name?: (string | ((control: AbstractControl) => ValidationErrors))[]
	last_name?: (string | ((control: AbstractControl) => ValidationErrors))[]
	password?: (string | ((control: AbstractControl) => ValidationErrors))[]
	new_password?: (string | ((control: AbstractControl) => ValidationErrors))[]
	confirm_password?: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	branch_name?: (string | ((control: AbstractControl) => ValidationErrors))[]
	branch_address?: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	picture?: File
}

export class StoreAccountSettingRule {
	form: AccountSettingRule = {
		username: ['', Validators.required, Validators.max(30)],
		first_name: ['', Validators.required, Validators.max(30)],
		last_name: ['', Validators.required, Validators.max(30)],
		password: ['', Validators.required, Validators.max(30)],
		new_password: ['', Validators.required, Validators.max(30)],
		confirm_password: ['', Validators.required, Validators.max(30)],
		branch_name: ['', Validators.required, Validators.max(30)],
		branch_address: ['', Validators.required, Validators.max(100)],
	}

	setPicture(picture: File): void {
		this.form.picture = picture
	}

	toFromData(): FormData {
		let form = new FormData()

		for (let key in this.form) {
			form.append(key, this.form[key])
		}

		return form
	}
}
