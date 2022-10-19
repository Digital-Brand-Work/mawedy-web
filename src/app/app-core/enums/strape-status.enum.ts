export enum StripeStatusEnum {
	PENDING = 'Pending',
	PAID = 'Paid',
	CANCELLED = 'Cancelled',
}

export const genders = Object.keys(StripeStatusEnum)
