import { PHPBaseModel, PHPFile } from '@digital_brand_work/models/core.model'
import { Doctor } from '../doctors/doctor.model'

export interface Promotion extends PHPBaseModel {
	clinic_id: string
	clinic_name: string
	promotion_name: string
	highlights: string
	validity_start_date: Date
	validity_end_date: Date
	terms_and_conditions: string
	doctors: Doctor[]
	picture: PHPFile
	department_id: string
	service_id: string
	banner: {
		picture: PHPFile
	}
}
