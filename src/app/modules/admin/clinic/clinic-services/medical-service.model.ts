import { PHPBaseModel } from '@digital_brand_work/models/core.model'

export interface MedicalService extends PHPBaseModel {
	department_id: string
	name: string
	description: string
}
