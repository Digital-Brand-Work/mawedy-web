import { Department } from 'app/modules/admin/clinic/department/department.model'
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export interface MedicalServiceRule {
	department_id?: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	name: (string | ((control: AbstractControl) => ValidationErrors))[]
	description: (string | ((control: AbstractControl) => ValidationErrors))[]
	picture?: File
}

export class StoreMedicalServiceRule {
	form: MedicalServiceRule = {
		name: ['', Validators.required, Validators.maxLength(255)],
		description: ['', Validators.required, Validators.maxLength(255)],
	}

	setDepartment(department: Department) {
		this.form.department_id = [
			department.id,
			Validators.required,
			Validators.maxLength(255),
		]
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
