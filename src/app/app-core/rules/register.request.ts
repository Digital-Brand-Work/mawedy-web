import { ClinicSubscriptionTypeEnum } from '../enums/clinic-subscription-type.enum'
import { Validators } from '@angular/forms'
import { Injectable } from '@angular/core'

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
	}

	secondForm = {
		subscription_interval: [ClinicSubscriptionTypeEnum.FREE],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
	}
}
