import { ClinicSubscriptionType } from '../enums/clinic-subscription-type.enum'
import { PHPBaseModel } from '../../../@digital_brand_work/models/core.model'
export interface Alert {
	id: string
	title: string
	message: string
	type: 'success' | 'info' | 'error'
}

export interface SubscriptionFeatures {
	standard: string[]
	golden: string[]
	platinum: string[]
}

export interface MawedySubscription {
	monthly?: Subscription
	yearly: Subscription
}

export interface Subscription {
	name: string
	features: string[]
	price: number
	type: ClinicSubscriptionType
	users: number
}

export type BillInterval = 'monthly' | 'yearly'

export interface File extends PHPBaseModel {
	type: string
	name: string
	url: string
	size: string
	path: string
	driver: string
}
