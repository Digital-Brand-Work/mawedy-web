import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { APPOINTMENT_INTERVAL, END_OF_MINUTES } from './constants/app.constant'
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

export function tOTime(value: number | string): string {
	if (value.toString().charAt(0) === '0' && value.toString().length === 2) {
		return value.toString()
	}

	if (
		value.toString().split(':')[1] &&
		value.toString().split(':')[1].length === 3
	) {
		return (value < 10 ? '0' : '') + value.toString().slice(0, -1)
	}

	return ((value < 10 ? '0' : '') + value).toString()
}

export function add30Mins(value: string): string {
	if (value.split(':').length === 0) return value

	const [hour, minutes] = value.split(':')

	if (parseInt(minutes) + APPOINTMENT_INTERVAL < END_OF_MINUTES) {
		return `${hour}:${parseInt(minutes) + APPOINTMENT_INTERVAL}`
	}

	return `${parseInt(hour) + 1}:${parseInt(minutes) - APPOINTMENT_INTERVAL}`
}

export function toTwelve(time: any): any {
	if (empty(time)) {
		return ''
	}

	let hour = time.split(':')[0]

	let min = time.split(':')[1]

	if (empty(min) || empty(hour)) {
		return ''
	}

	let part = hour > 12 ? 'pm' : 'am'

	if (parseInt(hour) === 0) hour = 12

	min = (min + '').length === 1 ? `0${min}` : min

	hour = hour > 12 ? hour - 12 : hour

	hour = (hour + '').length === 1 ? `0${hour}` : hour

	return `${hour}:${min} ${part}`
}
