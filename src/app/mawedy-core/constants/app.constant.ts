import { SubscriptionFeatures } from '../models/utility.models'

export const weekDays: WeekDay[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

export type WeekDay =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday'

export const subscription: SubscriptionFeatures = {
	standard: [
		`Access to Mawedy App`,
		`Access to Solution Dashboard by receiving patient's Appointments & Out Reach Patients`,
		`Limited options to only confirm or cancel patient's appointments`,
		'Send booking confirmation notification to patients through App or SMS',
		`Full access to doctor's profile by adding their availability schedule and Doctor's Information`,
		'Listed in Mawedy Application. Patients will be able to easily book appointments through the Application',
		'Subscription Includes 3 Users',
	],
	golden: [
		'View the dashboard',
		'Full ability to book, view, re-schedule, re-assign and cancel or confirm appointments.',
		`Full access to doctor's profile by adding their availability schedule and Doctor's Information.`,
		'Access to view, edit and export patient profile.',
		'Access to clinic profile to add clinic information, medical services, and departments',
		'Access to promotion tab to add clinic offers "Limited".',
		'Subscription Includes 6 Users.',
	],
	platinum: [
		'Access to Mawedy App',
		'Access to Solution Dashboard by receiving patients Appointments, outreach patients.',
		'Full ability to book, view, reschedule, re-assign and cancel or confirm appointments.',
		'Send booking confirmation notification to patients through App and Message.',
		`Full access to doctors' profile by adding their availability schedule.`,
		'Doctors information. Access to view, edit and export patient profile.',
		'Access to clinic profile to add clinic information, medical services, and departments.',
		'Access to promotion tab to add clinic offers “Limited”.',
		'Promotions are listed in Mawedy Application.',
		'Patients will be able to easily book appointments through the Application',
		'Subscription includes 9 Users',
	],
}
