import { expandCollapse } from './expand-collapse.animation'
import {
	fadeIn,
	fadeInBottom,
	fadeInLeft,
	fadeInRight,
	fadeInTop,
	fadeOut,
	fadeOutBottom,
	fadeOutLeft,
	fadeOutRight,
	fadeOutTop,
} from './fade.animation'
import { listAnimation } from './list.animation'
import { shake } from './shake..animation'
import {
	slideInTop,
	slideInBottom,
	slideInLeft,
	slideInRight,
	slideOutTop,
	slideOutBottom,
	slideOutLeft,
	slideOutRight,
} from './slide.animation'
import { zoomIn, zoomOut } from './zoom.animation'

export const dbwAnimations = [
	expandCollapse,
	fadeIn,
	fadeInTop,
	fadeInBottom,
	fadeInLeft,
	fadeInRight,
	fadeOut,
	fadeOutTop,
	fadeOutBottom,
	fadeOutLeft,
	fadeOutRight,
	shake,
	slideInTop,
	slideInBottom,
	slideInLeft,
	slideInRight,
	slideOutTop,
	slideOutBottom,
	slideOutLeft,
	slideOutRight,
	zoomIn,
	zoomOut,
	listAnimation,
]
