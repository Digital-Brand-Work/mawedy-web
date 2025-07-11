import {
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Inject,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	PLATFORM_ID,
	Renderer2,
	SimpleChanges,
	ViewEncapsulation,
} from '@angular/core'
import {
	animate,
	AnimationBuilder,
	AnimationPlayer,
	style,
} from '@angular/animations'
import {
	FuseDrawerMode,
	FuseDrawerPosition,
} from '@fuse/components/drawer/drawer.types'
import { FuseDrawerService } from '@fuse/components/drawer/drawer.service'
import { FuseUtilsService } from '@fuse/services/utils/utils.service'
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion'
import { isPlatformBrowser } from '@angular/common'

@Component({
	selector: 'fuse-drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss'],
	encapsulation: ViewEncapsulation.None,
	exportAs: 'fuseDrawer',
})
export class FuseDrawerComponent implements OnChanges, OnInit, OnDestroy {
	/* eslint-disable @typescript-eslint/naming-convention */
	static ngAcceptInputType_fixed: BooleanInput
	static ngAcceptInputType_opened: BooleanInput
	static ngAcceptInputType_transparentOverlay: BooleanInput
	/* eslint-enable @typescript-eslint/naming-convention */

	@Input() fixed: boolean = false
	@Input() mode: FuseDrawerMode = 'side'
	@Input() name: string = this._fuseUtilsService.randomId()
	@Input() opened: boolean = false
	@Input() position: FuseDrawerPosition = 'left'
	@Input() transparentOverlay: boolean = false
	@Output() readonly fixedChanged: EventEmitter<boolean> =
		new EventEmitter<boolean>()
	@Output() readonly modeChanged: EventEmitter<FuseDrawerMode> =
		new EventEmitter<FuseDrawerMode>()
	@Output() readonly openedChanged: EventEmitter<boolean> =
		new EventEmitter<boolean>()
	@Output() readonly positionChanged: EventEmitter<FuseDrawerPosition> =
		new EventEmitter<FuseDrawerPosition>()

	private _animationsEnabled: boolean = false
	private _hovered: boolean = false
	private _overlay: HTMLElement
	private _player: AnimationPlayer

	constructor(
		private _animationBuilder: AnimationBuilder,
		private _elementRef: ElementRef,
		private _renderer2: Renderer2,
		private _fuseDrawerService: FuseDrawerService,
		private _fuseUtilsService: FuseUtilsService,
		@Inject(PLATFORM_ID) private _platformID: Object,
	) {}

	@HostBinding('class') get classList(): any {
		return {
			'fuse-drawer-animations-enabled': this._animationsEnabled,
			'fuse-drawer-fixed': this.fixed,
			'fuse-drawer-hover': this._hovered,
			[`fuse-drawer-mode-${this.mode}`]: true,
			'fuse-drawer-opened': this.opened,
			[`fuse-drawer-position-${this.position}`]: true,
		}
	}

	/**
	 * Host binding for component inline styles
	 */
	@HostBinding('style') get styleList(): any {
		return {
			visibility: this.opened ? 'visible' : 'hidden',
		}
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Decorated methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On mouseenter
	 *
	 * @private
	 */
	@HostListener('mouseenter')
	private _onMouseenter(): void {
		// Enable the animations
		this._enableAnimations()

		// Set the hovered
		this._hovered = true
	}

	/**
	 * On mouseleave
	 *
	 * @private
	 */
	@HostListener('mouseleave')
	private _onMouseleave(): void {
		// Enable the animations
		this._enableAnimations()

		// Set the hovered
		this._hovered = false
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On changes
	 *
	 * @param changes
	 */
	ngOnChanges(changes: SimpleChanges): void {
		// Fixed
		if ('fixed' in changes) {
			// Coerce the value to a boolean
			this.fixed = coerceBooleanProperty(changes.fixed.currentValue)

			// Execute the observable
			this.fixedChanged.next(this.fixed)
		}

		// Mode
		if ('mode' in changes) {
			// Get the previous and current values
			const previousMode = changes.mode.previousValue
			const currentMode = changes.mode.currentValue

			// Disable the animations
			this._disableAnimations()

			// If the mode changes: 'over -> side'
			if (previousMode === 'over' && currentMode === 'side') {
				// Hide the overlay
				this._hideOverlay()
			}

			// If the mode changes: 'side -> over'
			if (previousMode === 'side' && currentMode === 'over') {
				// If the drawer is opened
				if (this.opened) {
					// Show the overlay
					this._showOverlay()
				}
			}

			this.modeChanged.next(currentMode)

			if (isPlatformBrowser(this._platformID)) {
				setTimeout(() => {
					this._enableAnimations()
				}, 500)
			}
		}

		if ('opened' in changes) {
			const open = coerceBooleanProperty(changes.opened.currentValue)

			this._toggleOpened(open)
		}

		if ('position' in changes) {
			this.positionChanged.next(this.position)
		}

		if ('transparentOverlay' in changes) {
			this.transparentOverlay = coerceBooleanProperty(
				changes.transparentOverlay.currentValue,
			)
		}
	}

	ngOnInit(): void {
		this._fuseDrawerService.registerComponent(this.name, this)
	}

	ngOnDestroy(): void {
		if (this._player) {
			this._player.finish()
		}

		this._fuseDrawerService.deregisterComponent(this.name)
	}

	open(): void {
		if (this.opened) {
			return
		}

		this._toggleOpened(true)
	}

	close(): void {
		if (!this.opened) {
			return
		}

		this._toggleOpened(false)
	}

	toggle(): void {
		if (this.opened) {
			this.close()
		} else {
			this.open()
		}
	}

	private _enableAnimations(): void {
		if (this._animationsEnabled) {
			return
		}

		this._animationsEnabled = true
	}

	private _disableAnimations(): void {
		if (!this._animationsEnabled) {
			return
		}

		this._animationsEnabled = false
	}

	private _showOverlay(): void {
		// Create the backdrop element
		this._overlay = this._renderer2.createElement('div')

		// Return if overlay couldn't be create for some reason
		if (!this._overlay) {
			return
		}

		// Add a class to the backdrop element
		this._overlay.classList.add('fuse-drawer-overlay')

		// Add a class depending on the fixed option
		if (this.fixed) {
			this._overlay.classList.add('fuse-drawer-overlay-fixed')
		}

		// Add a class depending on the transparentOverlay option
		if (this.transparentOverlay) {
			this._overlay.classList.add('fuse-drawer-overlay-transparent')
		}

		// Append the backdrop to the parent of the drawer
		this._renderer2.appendChild(
			this._elementRef.nativeElement.parentElement,
			this._overlay,
		)

		// Create the enter animation and attach it to the player
		this._player = this._animationBuilder
			.build([
				style({ opacity: 0 }),
				animate(
					'300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
					style({ opacity: 1 }),
				),
			])
			.create(this._overlay)

		// Once the animation is done...
		this._player.onDone(() => {
			// Destroy the player
			this._player.destroy()
			this._player = null
		})

		// Play the animation
		this._player.play()

		// Add an event listener to the overlay
		this._overlay.addEventListener('click', () => {
			this.close()
		})
	}

	/**
	 * Hide the backdrop
	 *
	 * @private
	 */
	private _hideOverlay(): void {
		if (!this._overlay) {
			return
		}

		// Create the leave animation and attach it to the player
		this._player = this._animationBuilder
			.build([
				animate(
					'300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
					style({ opacity: 0 }),
				),
			])
			.create(this._overlay)

		// Play the animation
		this._player.play()

		// Once the animation is done...
		this._player.onDone(() => {
			// Destroy the player
			this._player.destroy()
			this._player = null

			// If the backdrop still exists...
			if (this._overlay) {
				// Remove the backdrop
				this._overlay.parentNode.removeChild(this._overlay)
				this._overlay = null
			}
		})
	}

	/**
	 * Open/close the drawer
	 *
	 * @param open
	 * @private
	 */
	private _toggleOpened(open: boolean): void {
		// Set the opened
		this.opened = open

		// Enable the animations
		this._enableAnimations()

		// If the mode is 'over'
		if (this.mode === 'over') {
			// If the drawer opens, show the overlay
			if (open) {
				this._showOverlay()
			}
			// Otherwise, close the overlay
			else {
				this._hideOverlay()
			}
		}

		// Execute the observable
		this.openedChanged.next(open)
	}
}
