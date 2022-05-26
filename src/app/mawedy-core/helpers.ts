import { countries } from './constants/country-codes.list'

export const setPrefix = (country_code: string): string => {
	return countries.find((country) => country.code === country_code).dial_code
}

export function slugToSentence(slug: string): string {
	return slug.split('_').join(' ')
}
