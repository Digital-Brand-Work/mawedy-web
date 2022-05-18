import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import dayjs from 'dayjs'

export interface PromotionRule {
	picture?: File
	clinic_name: (string | ((control: AbstractControl) => ValidationErrors))[]
	promotion_name: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	highlights: (string | ((control: AbstractControl) => ValidationErrors))[]
	validity_start_date: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	validity_end_date: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	terms_and_conditions: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
}

export class StorePromotionRule {
	today = dayjs()

	form: PromotionRule = {
		clinic_name: ['', Validators.required, Validators.max(30)],
		promotion_name: ['', Validators.required, Validators.max(35)],
		highlights: ['', Validators.required, Validators.max(255)],
		terms_and_conditions: ['', Validators.required, Validators.max(255)],
		validity_start_date: [
			this.today.format('YYYY-MM-DD'),
			Validators.max(255),
		],
		validity_end_date: [
			this.today.add(1, 'day').format('YYYY-MM-DD'),
			Validators.max(255),
		],
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
