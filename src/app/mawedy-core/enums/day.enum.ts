export enum DayEnum {
	PENDING = 'Pending',
	CONFIRMED = 'Confirmed',
	CANCELLED = 'Cancelled',
	DONE = 'Done',
}

export const days = Object.keys(DayEnum)
