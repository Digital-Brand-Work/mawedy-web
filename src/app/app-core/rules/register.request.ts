import { ClinicSubscriptionTypeEnum } from '../enums/clinic-subscription-type.enum'
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms'
import { Injectable } from '@angular/core'

export interface RegisterRule {
	name: FormControl<string>
	address: FormControl<string>
	email: FormControl<string>
	phone_number_one_country_code: FormControl<string>
	phone_number_one: FormControl<string>
	subscription_type: FormControl<string>
	accounts?: any
	urls?: {
		success: string
		cancel: FormControl<string>
	}
	trade_license_photo?: any
	interval: FormControl<string>
	city: FormControl<string>
	country: FormControl<string>
	line1: FormControl<string>
	postal_code: FormControl<string>
}

@Injectable({ providedIn: 'root' })
export class StoreRegisterRule {
	firstForm: any = {
		name: ['', Validators.required],
		address: ['', Validators.required],
		email: ['', [Validators.email, Validators.required]],
		phone_number_one_country_code: ['AE'],
		phone_number_one: [''],
		city: [''],
		line1: ['', Validators.required],
		country: ['United Arab Emirates'],
		postal_code: ['', Validators.required],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
		interval: [''],
	}

	secondForm = {
		subscription_interval: [ClinicSubscriptionTypeEnum.FREE],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
	}
}
