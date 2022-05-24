import { ClinicSubscriptionType } from './../../../mawedy-core/enums/clinic-subscription-type.enum'
import { PHPBaseModel } from '@digital_brand_work/models/core.model'
import { ClinicRegistrationStatusEnum } from '../../../mawedy-core/enums/clinic-registration.enum'
import { StripeStatusEnum } from '../../../mawedy-core/enums/strape-status.enum'

export interface Clinic extends PHPBaseModel {
	name: string
	address: string
	email: string
	password: string
	phone_number_one: string
	phone_number_one_country_code: string
	phone_number_two: string | null
	phone_number_two_country_code: string | null
	status: ClinicRegistrationStatusEnum
	subscription_type: ClinicSubscriptionType
	subscription_date: Date
	payment_received: 0
	stripe_session_id: string | null
	stripe_status: StripeStatusEnum
	latitude: string | null
	longitude: string | null
	description: string | null
	is_twenty_four_hours: boolean
}

export interface Branch extends PHPBaseModel {
	clinic_id: string
	username: string
	password: string
	first_name: string | null
	last_name: string | null
	branch_name: string | null
	branch_address: string | null
}
