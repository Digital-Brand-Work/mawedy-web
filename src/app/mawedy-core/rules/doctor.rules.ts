import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import { Department } from 'app/modules/admin/clinic/department/department.model'
import { TimeSlot } from 'app/modules/admin/doctors/doctor.model'

export interface DoctorRule {
	name: (string | ((control: AbstractControl) => ValidationErrors))[]
	profession: (string | ((control: AbstractControl) => ValidationErrors))[]
	experience: (string | ((control: AbstractControl) => ValidationErrors))[]
	about: (string | ((control: AbstractControl) => ValidationErrors))[]
	phone_number: (string | ((control: AbstractControl) => ValidationErrors))[]
	phone_country_code: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	email: (string | ((control: AbstractControl) => ValidationErrors))[]
	timeslots?: TimeSlot[]
	departments?: Department[]
	picture?: File
}

export class StoreDoctorRule {
	form: DoctorRule = {
		name: ['', Validators.required, Validators.maxLength(20)],
		profession: ['', Validators.required, Validators.maxLength(20)],
		experience: ['', Validators.required, Validators.maxLength(3)],
		about: ['', Validators.required, Validators.maxLength(255)],
		phone_country_code: ['AE'],
		phone_number: ['', Validators.required, Validators.maxLength(15)],
		email: ['', Validators.required, Validators.email],
	}

	addTimeSlot({ ...timeSlot }: TimeSlot): void {
		this.form.timeslots.push(timeSlot)
	}

	updateTimeSlot({ ...timeSlot }: TimeSlot): void {
		this.form.timeslots[
			this.form.timeslots.findIndex((slot) => slot.day === timeSlot.day)
		] = timeSlot
	}

	setDepartment(department: Department): void {
		this.form.departments = []

		this.form.departments[0] = department
	}

	setPicture(picture: File): void {
		this.form.picture = picture
	}

	toFromData(): FormData {
		let form = new FormData()

		const exclude = ['timeslots', 'departments']

		for (let key in this.form) {
			if (!exclude.includes(key)) {
				form.append(key, this.form[key])
			}
		}

		form.append(`departments[0]`, this.form.departments[0].id)

		return form
	}
}
