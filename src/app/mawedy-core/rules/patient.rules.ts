import { genders } from './../enums/strape-status.enum'
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export class StorePatientRule {
	form: PatientRule = {
		first_name: ['', Validators.required, Validators.maxLength(255)],
		middle_name: ['', Validators.required, Validators.maxLength(255)],
		last_name: ['', Validators.required, Validators.maxLength(255)],
		birthday: ['', Validators.required, Validators.maxLength(255)],
		gender: [genders[0], Validators.required, Validators.maxLength(255)],
		religion: ['', Validators.required, Validators.maxLength(255)],
		email: ['', Validators.required, Validators.maxLength(255)],
		address: ['', Validators.required, Validators.maxLength(255)],
		city: [
			'United Arab Emirates',
			Validators.required,
			Validators.maxLength(255),
		],
		country: ['Dubai', Validators.required, Validators.maxLength(255)],
	}

	setPicture(picture: File): void {
		this.form.picture = picture
	}
}

export interface PatientRule {
	picture?: File
	first_name: (string | ((control: AbstractControl) => ValidationErrors))[]
	middle_name: (string | ((control: AbstractControl) => ValidationErrors))[]
	last_name: (string | ((control: AbstractControl) => ValidationErrors))[]
	birthday: (string | ((control: AbstractControl) => ValidationErrors))[]
	gender: (string | ((control: AbstractControl) => ValidationErrors))[]
	religion: (string | ((control: AbstractControl) => ValidationErrors))[]
	email: (string | ((control: AbstractControl) => ValidationErrors))[]
	address: (string | ((control: AbstractControl) => ValidationErrors))[]
	city: (string | ((control: AbstractControl) => ValidationErrors))[]
	country: (string | ((control: AbstractControl) => ValidationErrors))[]
}
