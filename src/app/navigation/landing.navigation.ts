export interface HomeNav {
	id: number
	name: string
	link: string
}

export const homeNavigation: HomeNav[] = [
	{
		id: 1,
		name: 'About us',
		link: 'about-us',
	},
	{
		id: 2,
		name: 'Partner with us',
		link: 'partner-with-us',
	},
	{
		id: 3,
		name: 'Join us',
		link: 'join-us',
	},
	{
		id: 4,
		name: 'Talk to us',
		link: 'talk-to-us',
	},
	{
		id: 5,
		name: 'AR',
		link: '',
	},
]
