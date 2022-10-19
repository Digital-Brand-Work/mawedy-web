import { Navigation } from '../../core/navigation/navigation.types'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { FuseNavigationItem } from '@fuse/components/navigation'
import { BehaviorSubject, of, zip } from 'rxjs'

let clinic: string = ''

let branch: string = ''

export const clinic$: BehaviorSubject<string> = new BehaviorSubject(
	'Aster Clinic',
)

export const branch$: BehaviorSubject<string> = new BehaviorSubject('Jumeirah')

zip(clinic$, branch$).subscribe((observable: string[]) => {
	clinic = slugify(observable[0])
	branch = slugify(observable[1])
})

const navigation: FuseNavigationItem[] = [
	{
		id: '1',
		title: 'Dashboard',
		type: 'basic',
		icon: 'dashboard',
		link: `/${clinic}/${branch}/dashboard`,
	},
	{
		id: '2',
		title: 'Appointments',
		type: 'basic',
		icon: 'alarm',
		link: `/${clinic}/${branch}/appointments`,
	},
	{
		id: '3',
		title: 'Doctor Profile',
		type: 'basic',
		icon: 'earbuds',
		link: `/${clinic}/${branch}/doctors`,
	},
	{
		id: '4',
		title: 'Patients',
		type: 'basic',
		icon: 'group',
		link: `/${clinic}/${branch}/patients`,
	},
	{
		id: '5',
		title: 'Clinic Profile',
		type: 'basic',
		icon: 'room_preferences',
		link: `/${clinic}/${branch}/clinic`,
	},
	{
		id: '6',
		title: 'Promotions',
		type: 'basic',
		icon: 'label',
		link: `/${clinic}/${branch}/promotions`,
	},
	{
		id: '7',
		title: 'Subscription',
		type: 'basic',
		icon: 'notifications_active',
		link: `/${clinic}/${branch}/subscription`,
	},
]

export const standardUser: FuseNavigationItem[] = []

export const goldenUser: FuseNavigationItem[] = []

export const platinumUser: FuseNavigationItem[] = [...navigation]

export const onTrialUser: FuseNavigationItem[] = [...platinumUser]
