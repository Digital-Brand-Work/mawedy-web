import { AppointmentStatusEnum } from 'app/mawedy-core/enums/appointment-status.enum'
import { AppointmentTypeEnum } from 'app/mawedy-core/enums/appointment-type.enum'
import { PHPBaseModel } from '../../../@digital_brand_work/models/core.model'

export interface Appointment extends PHPBaseModel {
	clinic_id: string
	patient_id: string
	department_id: string
	service_id: string
	doctor_id: string
	date: Date
	start_time: Date
	end_time: Date
	type: AppointmentTypeEnum
	status: AppointmentStatusEnum
	comments: string | null
	waiting: boolean
	price: number
}
