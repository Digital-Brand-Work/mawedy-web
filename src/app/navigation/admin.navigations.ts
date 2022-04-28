import { FuseNavigationItem } from '@fuse/components/navigation'

const clinic = 'aster_clinic'

export const onTrialUser: FuseNavigationItem[] = []

export const standardUser: FuseNavigationItem[] = []

export const goldenUser: FuseNavigationItem[] = []

export const platinumUser: FuseNavigationItem[] = [
	{
		id: '1',
		title: 'Dashboard',
		type: 'basic',
		icon: 'dashboard',
		link: `/${clinic}/dashboard`,
	},
	{
		id: '2',
		title: 'Appointments',
		type: 'basic',
		icon: 'alarm',
		link: `/${clinic}/appointments`,
	},
	{
		id: '3',
		title: 'Doctor Profile',
		type: 'basic',
		icon: 'earbuds',
		link: `/${clinic}/doctors`,
	},
	{
		id: '4',
		title: 'Patients',
		type: 'basic',
		icon: 'group',
		link: `/${clinic}/patients`,
	},
	{
		id: '5',
		title: 'Clinic Profile',
		type: 'basic',
		icon: 'room_preferences',
		link: `/${clinic}/clinic`,
	},
	{
		id: '6',
		title: 'Promotions',
		type: 'basic',
		icon: 'label',
		link: `/${clinic}/promotions`,
	},
	{
		id: '7',
		title: 'Subscription',
		type: 'basic',
		icon: 'notifications_active',
		link: `/${clinic}/subscription`,
	},
]
