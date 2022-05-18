import { PHPBaseModel } from '@digital_brand_work/models/core.model'
import { DayEnum } from 'app/mawedy-core/enums/day.enum'

export interface Doctor extends PHPBaseModel {
	clinic_id: string
	name: string
	profession: string
	experience: string
	about: string
	phone_number: string | null
	phone_country_code: string | null
	email: string
}

export interface Timeslot extends PHPBaseModel {
	day: DayEnum
	start: Date
	end: Date
	active: boolean
}
