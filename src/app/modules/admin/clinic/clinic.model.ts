import { ClinicSubscriptionType } from './../../../mawedy-core/enums/clinic-subscription-type.enum'
import { PHPBaseModel } from '@digital_brand_work/models/core.model'
import {
	ClinicRegistrationStatus,
	ClinicRegistrationStatusEnum,
} from '../../../mawedy-core/enums/clinic-registration.enum'
import { StripeStatusEnum } from '../../../mawedy-core/enums/strape-status.enum'
import { AccountType } from 'app/mawedy-core/enums/account.type.enum'

export interface Clinic extends PHPBaseModel {
	account_status: ClinicRegistrationStatus
	account_type: AccountType
	status: ClinicRegistrationStatusEnum
	subscription_type: ClinicSubscriptionType
	stripe_status: StripeStatusEnum
	subscription_date: Date
	accounts: Branch[]
	email: string
	password: string
	phone_number_one: string
	phone_number_one_country_code: string
	phone_number_two: string | null
	phone_number_two_country_code: string | null
	payment_received: 0
	stripe_session_id: string | null
	latitude: string | null
	longitude: string | null
	description: string | null
	is_twenty_four_hours: boolean
	name: string
	country: string
	city: string
	line_one: string
	postal_code: string
}

export interface Branch extends PHPBaseModel {
	clinic_id: string
	username: string
	password: string
	first_name: string
	last_name: string
	branch_name: string
	branch_address: string
	email: string
	phone_number_one: string
	phone_number_one_country_code: string
	phone_number_two: string
	phone_number_two_country_code: string
	latitude: string
	longitude: string
	description: string
	is_twenty_four_hours: string
	active: string
	country: string
	city: string
	postal_code: string
}
