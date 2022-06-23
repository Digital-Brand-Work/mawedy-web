import {
	trigger,
	transition,
	style,
	animate,
	query,
	stagger,
} from '@angular/animations'

export const listAnimation = trigger('listAnimation', [
	transition('* <=> *', [
		query(
			':enter',
			[
				style({
					opacity: 0,
					transform: 'translate(0,5rem)',
				}),
				stagger(
					'40ms',
					animate(
						'300ms cubic-bezier(.28,-0.86,0,1.11)',
						style({
							opacity: 1,
							transform: 'translate(0px,0) ',
						}),
					),
				),
			],
			{ optional: true },
		),
		query(
			':leave',
			animate(
				'100ms',
				style({ opacity: 0, transform: 'translate(-15rem,0) ' }),
			),
			{ optional: true },
		),
	]),
])
