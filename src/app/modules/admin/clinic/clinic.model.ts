import { ClinicSubscriptionType } from './../../../mawedy-core/enums/clinic-subscription-type.enum'
import { PHPBaseModel, PHPFile } from '@digital_brand_work/models/core.model'
import {
	ClinicRegistrationStatus,
	ClinicRegistrationStatusEnum,
} from '../../../mawedy-core/enums/clinic-registration.enum'
import { StripeStatusEnum } from '../../../mawedy-core/enums/strape-status.enum'
import { AccountType } from 'app/mawedy-core/enums/account.type.enum'

export interface Clinic extends PHPBaseModel {
	accounts: Branch[]
	account_status: ClinicRegistrationStatus
	account_type: AccountType
	email: string
	password: string
	name: string
	description: string
	country: string
	city: string
	line_one: string
	postal_code: string
	address: string
	latitude: string
	longitude: string
	banner: { picture: PHPFile }
	logo: { picture: PHPFile }
	phone_number_one: string
	phone_number_two: string
	phone_number_one_country_code: string
	phone_number_two_country_code: string
	payment_received: 0
	payment_mode: 'Manual' | 'Automatic'
	is_twenty_four_hours: boolean
	stripe_session_id: string
	subscription_date: Date
	stripe_status: StripeStatusEnum
	status: ClinicRegistrationStatusEnum
	subscription_type: ClinicSubscriptionType
	timeslots: ClinicTimeSlot[]
	subscription_interval: 'year' | 'month'
}

export interface ClinicTimeSlot extends PHPBaseModel {
	start?: string | null
	end?: string | null
	active: boolean
	day: string | null
}

export interface Branch extends PHPBaseModel {
	logo: { picture: PHPFile }
	banner: { picture: PHPFile }
	clinic: Clinic
	clinic_id: string
	username: string
	password: string
	first_name: string
	last_name: string
	name: string
	address: string
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
