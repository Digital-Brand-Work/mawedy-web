import { MedicalService } from './../clinic-services/medical-service.model'
import { PHPBaseModel } from '@digital_brand_work/models/core.model'
import { Doctor } from '../../doctors/doctor.model'

export interface Department extends PHPBaseModel {
	clinic_id?: string
	name: string
	services: MedicalService[]
	doctors: Doctor[]
}
