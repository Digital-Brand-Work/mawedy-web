import { PHPBaseModel, PHPFile } from '@digital_brand_work/models/core.model'
import { Doctor } from '../../doctors/doctor.model'

export interface MedicalService extends PHPBaseModel {
	department_id: string
	name: string
	description: string
	picture: PHPFile
	doctors: Doctor[]
}
