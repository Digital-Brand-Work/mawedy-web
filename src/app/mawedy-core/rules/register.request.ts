import { ClinicSubscriptionTypeEnum } from './../enums/clinic-subscription-type.enum'
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import { Injectable } from '@angular/core'

export interface RegisterRule {
	name: (string | ((control: AbstractControl) => ValidationErrors))[]
	address: (string | ((control: AbstractControl) => ValidationErrors))[]
	email: (string | ((control: AbstractControl) => ValidationErrors))[]
	phone_number_one_country_code: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	phone_number_one: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	subscription_type: (
		| string
		| ((control: AbstractControl) => ValidationErrors)
	)[]
	accounts?: (string | ((control: AbstractControl) => ValidationErrors))[][]
	urls?: {
		success: string
		cancel: string
	}
	trade_license_photo?: File
}

@Injectable({ providedIn: 'root' })
export class StoreRegisterRule {
	firstForm = {
		name: ['', Validators.required],
		address: ['', Validators.required],
		email: ['', Validators.required],
		phone_number_one_country_code: ['AE'],
		phone_number_one: [''],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
	}

	secondForm = {
		subscription_interval: [ClinicSubscriptionTypeEnum.FREE],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
	}

	form: RegisterRule = {
		name: ['', Validators.required],
		address: ['', Validators.required],
		email: ['', Validators.required],
		phone_number_one_country_code: ['AE'],
		phone_number_one: [''],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
	}

	setAccounts(number: number): void {
		let accounts = []

		for (let i = 0; i <= number; i++) {
			accounts.push({
				username: ['', Validators.required],
			})
		}

		this.form.accounts = accounts
	}

	setUrl(success: string, cancel: string): void {
		this.form.urls = {
			success: success,
			cancel: cancel,
		}
	}

	setTradeLicense(photo: File): void {
		this.form.trade_license_photo = photo
	}

	toFromData(): FormData {
		let form = new FormData()

		const exclude = ['urls', 'accounts']

		for (let key in this.form) {
			if (!exclude.includes(key)) {
				form.append(key, this.form[key])
			}
		}

		for (let key in this.form.urls) {
			form.append(`urls[${key}]`, this.form[key])
		}

		this.form.accounts.forEach((account: any, index: number) => {
			for (let key in account) {
				form.append(
					`accounts[${index}][${key}]`,
					this.form.accounts[index][key],
				)
			}
		})

		return form
	}
}
