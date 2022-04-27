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
		icon: 'mat_outline:dashboard',
		link: `/${clinic}/dashboard`,
	},
	{
		id: '2',
		title: 'Appointments',
		type: 'basic',
		icon: 'heroicons_outline:calendar',
		link: `/${clinic}/appointments`,
	},
	{
		id: '3',
		title: 'Doctor Profile',
		type: 'basic',
		icon: 'iconsmind:stethoscope',
		link: `/${clinic}/doctors`,
	},
	{
		id: '4',
		title: 'Patients',
		type: 'basic',
		icon: 'feather:users',
		link: `/${clinic}/patients`,
	},
	{
		id: '5',
		title: 'Clinic Profile',
		type: 'basic',
		icon: 'heroicons_outline:office-building',
		link: `/${clinic}/clinic`,
	},
	{
		id: '6',
		title: 'Promotions',
		type: 'basic',
		icon: 'feather:tag',
		link: `/${clinic}/promotions`,
	},
	{
		id: '7',
		title: 'Subscription',
		type: 'basic',
		icon: 'heroicons_outline:refresh',
		link: `/${clinic}/subscription`,
	},
]
