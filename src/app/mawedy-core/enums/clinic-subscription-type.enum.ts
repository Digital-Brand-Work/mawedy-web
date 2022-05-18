export enum ClinicSubscriptionTypeEnum {
	PENDING = 'Pending',
	CONFIRMED = 'Confirmed',
	CANCELLED = 'Cancelled',
	DONE = 'Done',
}

export const clinicSubscriptionTypes = Object.keys(ClinicSubscriptionTypeEnum)
