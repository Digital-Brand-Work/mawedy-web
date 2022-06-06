import {
	BillInterval,
	MawedySubscription,
	SubscriptionFeatures,
} from '../models/utility.models'

export const PHONE = '+971501112222'

export const EMAIL = 'info@mawedy.ae'

export const weekDays: WeekDay[] = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
]

export type WeekDay =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'

export const BENEFITS: HomeSection2Feature[] = [
	{ img: 1, feature: 'Advertise your clinic' },
	{ img: 2, feature: 'Additional revenue stream' },
	{ img: 3, feature: 'New customers' },
	{ img: 4, feature: 'Time efficientc' },
	{ img: 5, feature: '24/7 booking service' },
	{ img: 6, feature: 'Free trial' },
]

export const FEATURES: HomeSection2Feature[] = [
	{ img: 1, feature: 'Reliable, detailed booking solution' },
	{ img: 2, feature: 'Professional way to connect clinics and patients' },
	{ img: 3, feature: 'Saves Time and Effort' },
	{ img: 4, feature: 'Never miss out on offers' },
	{ img: 5, feature: 'Patient onboarding a lot easier' },
	{ img: 6, feature: 'Membership plan with lots of benefits' },
]

export type HomeSection2Feature = { feature: string; img: number }

export const PRICE_PER_USER: number = 60

export const BILL_INTERVALS: BillInterval[] = ['monthly', 'yearly']

export const mawedySubscriptions: MawedySubscription[] = [
	{
		yearly: {
			type: 'Standard',
			name: 'Standard',
			users: 1,
			price: 1500,
			features: [
				'Subscription includes 1 user',
				'View solution dashboard',
				'Listed in Mawedy Application',
				'Receive patient ‘appointments, outreach patients',
				'Confirm or cancel patient appointments',
				'Appointment confirmation through App and SMS',
				`Manage doctor's profile, availability, schedule, and pertinent information`,
				'1 to 1 technical support, phone, and email support',
			],
		},
	},
	{
		yearly: {
			type: 'Golden',
			name: 'Golden (Web Solution)',
			price: 2300,
			users: 3,
			features: [
				'Subscription includes 3 users',
				'1 Master Admin Panel. ',
				'Advanced booking solution',
				`Manage doctor's profile, availability, schedule, and pertinent information.`,
				'Book, view, reschedule, re-assign, cancel or confirm appointments.',
				'Custom Fieldes and filter',
				'Flexible Scheduling',
				'Powerful Report for management users',
				'Data Import',
				'Data export',
				'Manage patient profile.',
				'Manage clinic profile.',
				'Manage promotions.',
				'Receive emails',
				' 1 to 1 technical support and email support.',
				'Flexible Scheduling',
				'Powerful Report for management users',
				'Automatic Updates',
				'Patient SMS Notification',
			],
		},
		monthly: {
			type: 'Golden',
			name: 'Golden (Web Solution)',
			price: 220,
			users: 3,
			features: [
				'Subscription includes 3 users',
				'1 Master Admin Panel. ',
				'Advanced booking solution',
				`Manage doctor's profile, availability, schedule, and pertinent information.`,
				'Book, view, reschedule, re-assign, cancel or confirm appointments.',
				'Custom Fieldes and filter',
				'Flexible Scheduling',
				'Powerful Report for management users',
				'Data Import',
				'Data export',
				'Manage patient profile.',
				'Manage clinic profile.',
				'Receive emails',
				'1 to 1 technical support and email support.',
				'Flexible Scheduling',
				'Powerful Report for management users',
				'Automatic Updates',
				'Patient SMS Notification',
			],
		},
	},
	{
		yearly: {
			type: 'Platinum',
			name: 'Platinum ( Application & Web Solution)',
			price: 3000,
			users: 6,
			features: [
				'Subscription includes 6 users',
				'1 Master Admin Panel. ',
				'Listed in Mawedy Application',
				'View solution dashboard',
				'Book, view, reschedule, re-assign, cancel or confirm appointments.',
				'Receive patients appointments, outreach patients',
				`Manage doctor's profile, availability, schedule, and pertinent information.`,
				'Manage patient profile.',
				'Manage clinic profile.',
				'Manage promotions.',
				'Listed in Mawedy booking application.',
				'Powerful Report for management users',
				'Subscription includes 6 Users',
				'1 to 1 technical support , phone and email support',
				'Flexible Scheduling',
				'Data Import',
				'Data Export',
				'Automatic Updates',
				'Patient SMS Notifications',
			],
		},
		monthly: {
			type: 'Platinum',
			name: 'Platinum ( Application & Web Solution)',
			price: 300,
			users: 6,
			features: [
				'Subscription includes 6 users',
				'1 Master Admin Panel. ',
				'Listed in Mawedy Application',
				'View solution dashboard',
				'Book, view, reschedule, re-assign, cancel or confirm appointments.',
				'Receive patients appointments, outreach patients',
				`Manage doctor's profile, availability, schedule, and pertinent information.`,
				'Manage patient profile.',
				'Manage clinic profile.',
				'Manage promotions.',
				'Listed in Mawedy booking application.',
				'Powerful Report for management users',
				'Subscription includes 6 Users',
				'1 to 1 technical support , phone and email support',
				'Flexible Scheduling',
				'Data Import',
				'Data Export',
				'Automatic Updates',
				'Patient SMS Notifications',
			],
		},
	},
]

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
