export type AppointmentType_Types =
	| AppointmentTypeEnum.RETURNING
	| AppointmentTypeEnum.NEW_APPOINTMENT
	| AppointmentTypeEnum.WALK_IN

export enum AppointmentTypeEnum {
	RETURNING = 'Returning',
	NEW_APPOINTMENT = 'New Appointment',
	WALK_IN = 'Walk-in',
}

export const appointmentTypes = Object.keys(AppointmentTypeEnum)
