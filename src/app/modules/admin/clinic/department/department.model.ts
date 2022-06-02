import { PHPBaseModel } from '@digital_brand_work/models/core.model'

export interface Department extends PHPBaseModel {
	clinic_id?: string
	name: string
}
