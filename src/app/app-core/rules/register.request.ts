import { ClinicSubscriptionTypeEnum } from '../enums/clinic-subscription-type.enum'
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
	interval: (string | ((control: AbstractControl) => ValidationErrors))[]
}

@Injectable({ providedIn: 'root' })
export class StoreRegisterRule {
	firstForm = {
		name: ['', Validators.required],
		address: ['', Validators.required],
		email: ['', [Validators.email, Validators.required]],
		phone_number_one_country_code: ['AE'],
		phone_number_one: [''],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
		interval: [''],
	}

	secondForm = {
		subscription_interval: [ClinicSubscriptionTypeEnum.FREE],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
	}

	form: RegisterRule = {
		name: ['', Validators.required],
		address: ['', Validators.required],
		email: ['', Validators.email],
		phone_number_one_country_code: ['AE'],
		phone_number_one: [''],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
		interval: [''],
	}
}
