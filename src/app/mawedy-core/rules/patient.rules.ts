import { genders } from './../enums/strape-status.enum'
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import { GenderEnum } from '../enums/gender.enum'

export interface PatientRule {
	picture?: File
	first_name: (string | ((control: AbstractControl) => ValidationErrors))[]
	middle_name: (string | ((control: AbstractControl) => ValidationErrors))[]
	last_name: (string | ((control: AbstractControl) => ValidationErrors))[]
	birthday: (string | ((control: AbstractControl) => ValidationErrors))[]
	gender: (string | ((control: AbstractControl) => ValidationErrors))[]
	religion: (string | ((control: AbstractControl) => ValidationErrors))[]
	email: (string | ((control: AbstractControl) => ValidationErrors))[]
	country: (string | ((control: AbstractControl) => ValidationErrors))[]
	city: (string | ((control: AbstractControl) => ValidationErrors))[]
	address: (string | ((control: AbstractControl) => ValidationErrors))[]
}

export class StorePatientRule {
	form: PatientRule = {
		first_name: ['', Validators.required, Validators.maxLength(50)],
		middle_name: ['', Validators.required, Validators.maxLength(50)],
		last_name: ['', Validators.required, Validators.maxLength(50)],
		birthday: ['', Validators.required, Validators.maxLength(10)],
		gender: [
			GenderEnum.MALE,
			Validators.required,
			Validators.maxLength(50),
		],
		religion: ['', Validators.required, Validators.maxLength(50)],
		email: ['', Validators.required, Validators.maxLength(50)],
		country: [
			'United Arab Emirates',
			Validators.required,
			Validators.maxLength(50),
		],
		city: ['Dubai', Validators.required, Validators.maxLength(50)],
		address: ['', Validators.required, Validators.maxLength(255)],
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
