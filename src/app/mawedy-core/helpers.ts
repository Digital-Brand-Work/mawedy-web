import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { countries } from './constants/country-codes.list'

export const setPrefix = (country_code: string): string => {
	return countries.find((country) => country.code === country_code).dial_code
}

export function slugToSentence(slug: string): string {
	return slug.split('_').join(' ')
}

export function toCardExpiry(digits: string) {
	const expiry = digits.split('/')

	return { month: expiry[0], year: '20' + expiry[1] }
}

export function toAddress(clinic: Clinic) {
	return
}
