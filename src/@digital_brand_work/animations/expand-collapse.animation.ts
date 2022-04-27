import { animate, state, style, transition, trigger } from '@angular/animations'
import { DBWAnimationCurves, DBWAnimationDurations } from './default.animation.model'

const expandCollapse = trigger('expandCollapse', [
	state(
		'void, collapsed',
		style({
			height: '0',
		}),
	),

	state('*, expanded', style('*')),

	transition('void <=> false, collapsed <=> false, expanded <=> false', []),

	transition('void <=> *, collapsed <=> expanded', animate('{{timings}}'), {
		params: {
			timings: `${DBWAnimationDurations.entering} ${DBWAnimationCurves.deceleration}`,
		},
	}),
])

export { expandCollapse }
