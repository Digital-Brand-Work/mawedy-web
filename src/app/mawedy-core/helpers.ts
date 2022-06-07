import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { countries, DialCode } from './constants/country-codes.list'

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

export function empty(value: any): boolean {
	if (!value || value === '' || value === null || value === undefined) {
		return true
	}

	return false
}

export function removeDialCode(number: string, code: string): string {
	if (empty(number) || empty(code)) {
		return ''
	}

	return number.slice(
		countries.find((country) => country.code === code).dial_code.length,
	)
}

export function hasData(value: any[]): boolean {
	if (value.length !== 0) {
		return true
	}

	return false
}
