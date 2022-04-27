import { animate, state, style, transition, trigger } from '@angular/animations'
import { DBWAnimationCurves, DBWAnimationDurations } from './default.animation.model'

const zoomIn = trigger('zoomIn', [
	state(
		'void',
		style({
			opacity: 0,
			transform: 'scale(0.5)',
		}),
	),

	state(
		'*',
		style({
			opacity: 1,
			transform: 'scale(1)',
		}),
	),

	transition('void => false', []),

	transition('void => *', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.entering} ${DBWAnimationCurves.deceleration}`,
		},
	}),
])

const zoomOut = trigger('zoomOut', [
	state(
		'*',
		style({
			opacity: 1,
			transform: 'scale(1)',
		}),
	),

	state(
		'void',
		style({
			opacity: 0,
			transform: 'scale(0.5)',
		}),
	),

	transition('false => void', []),

	transition('* => void', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.exiting} ${DBWAnimationCurves.acceleration}`,
		},
	}),
])

export { zoomIn, zoomOut }
