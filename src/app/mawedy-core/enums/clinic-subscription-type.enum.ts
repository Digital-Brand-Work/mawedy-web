export type ClinicSubscriptionType = 'Free' | 'Standard' | 'Golden' | 'Platinum'

export enum ClinicSubscriptionTypeEnum {
	FREE = 'Free',
	STANDARD = 'Standard',
	GOLDEN = 'Golden',
	PLATINUM = 'Platinum',
}

export const clinicSubscriptionTypes = Object.keys(ClinicSubscriptionTypeEnum)
