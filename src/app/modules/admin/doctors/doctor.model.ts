import { Department } from 'app/modules/admin/clinic/department/department.model'
import { PHPBaseModel, PHPFile } from '@digital_brand_work/models/core.model'
import { DayEnum, DayTypes } from 'app/app-core/enums/day.enum'

export interface Doctor extends PHPBaseModel {
	title: string
	name: string
	profession: string
	experience: string
	about: string
	phone_number: string | null
	phone_country_code: string | null
	email: string
	timeslots: TimeSlot[]
	picture: null | PHPFile
	departments: Department[]
}

export interface TimeSlot extends PHPBaseModel {
	day: DayTypes
	start: string
	end: string
	active: boolean
}
