import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export interface ClinicRule {
	name?: (string | ((control: AbstractControl) => ValidationErrors))[]
	address?: (string | ((control: AbstractControl) => ValidationErrors))[]
	email?: (string | ((control: AbstractControl) => ValidationErrors))[]
	phone_number_one?: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	phone_number_one_country_code: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	phone_number_two?: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	phone_number_two_country_code?: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	latitude?: (number | ((control: AbstractControl) => ValidationErrors))[]
	longitude?: (number | ((control: AbstractControl) => ValidationErrors))[]
	description?: (string | ((control: AbstractControl) => ValidationErrors))[]
	banner_picture?: File
}

export class StoreClinicRule {
	form: ClinicRule = {
		name: ['', Validators.required, Validators.max(30)],
		address: ['', Validators.required, Validators.max(50)],
		email: ['', Validators.required, Validators.max(30), Validators.email],
		phone_number_one: ['', Validators.required, Validators.max(15)],
		phone_number_one_country_code: [
			'AE',
			Validators.required,
			Validators.max(2),
		],
		phone_number_two: ['', Validators.required, Validators.max(15)],
		phone_number_two_country_code: [
			'AE',
			Validators.required,
			Validators.max(2),
		],
		latitude: [0, Validators.required, Validators.max(255)],
		longitude: [0, Validators.required, Validators.max(255)],
		description: ['', Validators.required, Validators.max(255)],
	}

	setPicture(picture: File): void {
		this.form.banner_picture = picture
	}

	toFromData(): FormData {
		let form = new FormData()

		for (let key in this.form) {
			form.append(key, this.form[key])
		}

		return form
	}
}
