import { MedicalService } from './../clinic/clinic-services/medical-service.model'
import { Department } from 'app/modules/admin/clinic/department/department.model'
import { AppointmentStatusEnum } from 'app/app-core/enums/appointment-status.enum'
import { AppointmentTypeEnum } from 'app/app-core/enums/appointment-type.enum'
import {
	PHPBaseModel,
	PHPFile,
} from '../../../../@digital_brand_work/models/core.model'
import { Doctor } from '../doctors/doctor.model'
import { Patient } from '../patients/patient.model'

export interface Appointment extends PHPBaseModel {
	clinic_id: string
	patient_id: string
	department_id: string
	service_id: string
	doctor_id: string
	date: Date
	start_time: string
	end_time: string
	type: AppointmentTypeEnum
	status: AppointmentStatusEnum
	comments: string | null
	waiting: boolean
	price: number
	department: Department
	doctor: Doctor
	patient: Patient
	service: MedicalService
	result: null | PHPFile
	follow_up: boolean
}
