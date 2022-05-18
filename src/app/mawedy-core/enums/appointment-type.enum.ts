export enum AppointmentTypeEnum {
	RETURNING = 'Returning',
	THROUGH_CLINIC = 'Through Clinic',
	PHONE_APPOINTMENT = 'Phone Appointment',
	ONLINE = 'Online',
}

export const appointmentTypes = Object.keys(AppointmentTypeEnum)
