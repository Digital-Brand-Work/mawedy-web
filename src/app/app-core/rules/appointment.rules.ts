import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import dayjs from 'dayjs'
import {
	AppointmentTypeEnum,
	appointmentTypes,
} from '../enums/appointment-type.enum'

export interface AppointmentRule {
	patient_id: (string | ((control: AbstractControl) => ValidationErrors))[]
	department_id: (string | ((control: AbstractControl) => ValidationErrors))[]
	service_id: (string | ((control: AbstractControl) => ValidationErrors))[]
	doctor_id: (string | ((control: AbstractControl) => ValidationErrors))[]
	date: (string | ((control: AbstractControl) => ValidationErrors))[]
	start_time: (string | ((control: AbstractControl) => ValidationErrors))[]
	end_time: (string | ((control: AbstractControl) => ValidationErrors))[]
	type: (
		| AppointmentTypeEnum
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	price: (string | ((control: AbstractControl) => ValidationErrors))[]
	waiting: (boolean | ((control: AbstractControl) => ValidationErrors))[]
	comments: (string | ((control: AbstractControl) => ValidationErrors))[]
}

export class StoreAppointmentRule {
	today = dayjs()

	form: AppointmentRule = {
		patient_id: ['', Validators.required, Validators.maxLength(50)],
		department_id: ['', Validators.required, Validators.maxLength(50)],
		service_id: ['', Validators.required, Validators.maxLength(50)],
		doctor_id: ['', Validators.required, Validators.maxLength(50)],
		date: [this.today.format('YYYY-MM-DD')],
		start_time: ['', Validators.required],
		end_time: ['', Validators.required],
		type: [AppointmentTypeEnum.THROUGH_CLINIC, Validators.required],
		price: ['', Validators.required],
		waiting: [false, Validators.required],
		comments: [''],
	}
}
