export enum ClinicRegistrationStatusEnum {
	PENDING = 'Pending',
	CONFIRMED = 'Confirmed',
	CANCELLED = 'Cancelled',
	DONE = 'Done',
}

export const clinicRegistrationStatuses = Object.keys(
	ClinicRegistrationStatusEnum,
)
