import { PHPBaseModel, PHPFile } from '@digital_brand_work/models/core.model'

export interface Patient extends PHPBaseModel {
	clinic_id: string
	first_name: string
	middle_name: string | null
	last_name: string
	birthday: string
	gender: string
	religion: string
	phone_number: string
	email: string
	address: string
	city: string
	country: string
	picture: PHPFile
}
