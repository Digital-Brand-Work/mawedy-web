export enum AppointmentStatusEnum {
	PENDING = 'Pending',
	CONFIRMED = 'Confirmed',
	CANCELLED = 'Cancelled',
	DONE = 'Done',
}

export const appointmentStatuses = Object.keys(AppointmentStatusEnum)
