import { ClinicSubscriptionTypeEnum } from '../enums/clinic-subscription-type.enum'
import { Validators } from '@angular/forms'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class StoreRegisterRule {
	firstForm: any = {
		city: [''],
		name: ['', Validators.required],
		line1: ['', Validators.required],
		postal_code: ['', Validators.required],
		phone_number_one: ['', Validators.required],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
		email: ['', [Validators.email, Validators.required]],
		country: ['United Arab Emirates', Validators.required],
		phone_number_one_country_code: ['AE', Validators.required],
	}

	secondForm = {
		subscription_interval: [ClinicSubscriptionTypeEnum.FREE],
		subscription_type: [ClinicSubscriptionTypeEnum.FREE],
	}
}
