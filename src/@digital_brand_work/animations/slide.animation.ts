import { animate, state, style, transition, trigger } from '@angular/animations'
import { DBWAnimationCurves, DBWAnimationDurations } from './default.animation.model'

const slideInTop = trigger('slideInTop', [
	state(
		'void',
		style({
			transform: 'translate3d(0, -100%, 0)',
		}),
	),

	state(
		'*',
		style({
			transform: 'translate3d(0, 0, 0)',
		}),
	),

	transition('void => false', []),

	transition('void => *', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.entering} ${DBWAnimationCurves.deceleration}`,
		},
	}),
])

const slideInBottom = trigger('slideInBottom', [
	state(
		'void',
		style({
			transform: 'translate3d(0, 100%, 0)',
		}),
	),

	state(
		'*',
		style({
			transform: 'translate3d(0, 0, 0)',
		}),
	),

	transition('void => false', []),

	transition('void => *', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.entering} ${DBWAnimationCurves.deceleration}`,
		},
	}),
])

const slideInLeft = trigger('slideInLeft', [
	state(
		'void',
		style({
			transform: 'translate3d(-100%, 0, 0)',
		}),
	),

	state(
		'*',
		style({
			transform: 'translate3d(0, 0, 0)',
		}),
	),

	transition('void => false', []),

	transition('void => *', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.entering} ${DBWAnimationCurves.deceleration}`,
		},
	}),
])

const slideInRight = trigger('slideInRight', [
	state(
		'void',
		style({
			transform: 'translate3d(100%, 0, 0)',
		}),
	),

	state(
		'*',
		style({
			transform: 'translate3d(0, 0, 0)',
		}),
	),

	transition('void => false', []),

	transition('void => *', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.entering} ${DBWAnimationCurves.deceleration}`,
		},
	}),
])

const slideOutTop = trigger('slideOutTop', [
	state(
		'*',
		style({
			transform: 'translate3d(0, 0, 0)',
		}),
	),

	state(
		'void',
		style({
			transform: 'translate3d(0, -100%, 0)',
		}),
	),

	transition('false => void', []),

	transition('* => void', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.exiting} ${DBWAnimationCurves.acceleration}`,
		},
	}),
])

const slideOutBottom = trigger('slideOutBottom', [
	state(
		'*',
		style({
			transform: 'translate3d(0, 0, 0)',
		}),
	),

	state(
		'void',
		style({
			transform: 'translate3d(0, 100%, 0)',
		}),
	),

	transition('false => void', []),

	transition('* => void', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.exiting} ${DBWAnimationCurves.acceleration}`,
		},
	}),
])

const slideOutLeft = trigger('slideOutLeft', [
	state(
		'*',
		style({
			transform: 'translate3d(0, 0, 0)',
		}),
	),

	state(
		'void',
		style({
			transform: 'translate3d(-100%, 0, 0)',
		}),
	),

	transition('false => void', []),

	transition('* => void', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.exiting} ${DBWAnimationCurves.acceleration}`,
		},
	}),
])

const slideOutRight = trigger('slideOutRight', [
	state(
		'*',
		style({
			transform: 'translate3d(0, 0, 0)',
		}),
	),

	state(
		'void',
		style({
			transform: 'translate3d(100%, 0, 0)',
		}),
	),

	transition('false => void', []),

	transition('* => void', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.exiting} ${DBWAnimationCurves.acceleration}`,
		},
	}),
])

export {
	slideInTop,
	slideInBottom,
	slideInLeft,
	slideInRight,
	slideOutTop,
	slideOutBottom,
	slideOutLeft,
	slideOutRight,
}
