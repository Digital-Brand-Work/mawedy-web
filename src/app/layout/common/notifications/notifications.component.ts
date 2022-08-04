import { AppointmentNotificationService } from './../../../modules/admin/dashboard/appointments/modals/dashboard-appointment-details/dashboard-appointment-details.service'
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation,
} from '@angular/core'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { MatButton } from '@angular/material/button'
import { shareReplay, Subject, takeUntil } from 'rxjs'
import { Notification } from 'app/layout/common/notifications/notifications.types'
import { NotificationsService } from 'app/layout/common/notifications/notifications.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'

@Component({
	selector: 'notifications',
	templateUrl: './notifications.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'notifications',
	animations: [...dbwAnimations],
	styleUrls: ['./notification.style.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
	private _overlayRef: OverlayRef

	private unsubscribe$: Subject<any> = new Subject<any>()

	@ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton

	@ViewChild('notificationsPanel')
	private _notificationsPanel: TemplateRef<any>

	@Input() animated: boolean = false

	notifications: Appointment[] = []

	unreadCount: number = 0

	constructor(
		private _overlay: Overlay,
		private _viewContainerRef: ViewContainerRef,
		private _notificationsService: NotificationsService,
	) {
		this._notificationsService.notifications$
			.pipe(shareReplay(1), takeUntil(this.unsubscribe$))
			.subscribe((notifications) => {
				this.notifications = [...new Set(notifications)]
			})
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		if (this._overlayRef) {
			this._overlayRef.dispose()
		}
	}

	openPanel(): void {
		if (!this._notificationsPanel || !this._notificationsOrigin) {
			return
		}

		if (!this._overlayRef) {
			this._createOverlay()
		}

		this._overlayRef.attach(
			new TemplatePortal(
				this._notificationsPanel,
				this._viewContainerRef,
			),
		)
	}

	closePanel(): void {
		this._overlayRef.detach()
	}

	markAllAsRead(): void {
		this._notificationsService.markAllAsRead().subscribe()
	}

	toggleRead(notification: Notification): void {
		this._notificationsService
			.update(notification.id, notification)
			.subscribe()
	}

	delete(notification: Notification): void {
		this._notificationsService.delete(notification.id).subscribe()
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}

	private _createOverlay(): void {
		this._overlayRef = this._overlay.create({
			hasBackdrop: true,
			backdropClass: 'fuse-backdrop-on-mobile',
			scrollStrategy: this._overlay.scrollStrategies.block(),
			positionStrategy: this._overlay
				.position()
				.flexibleConnectedTo(
					this._notificationsOrigin._elementRef.nativeElement,
				)
				.withLockedPosition(true)
				.withPush(true)
				.withPositions([
					{
						originX: 'start',
						originY: 'bottom',
						overlayX: 'start',
						overlayY: 'top',
					},
					{
						originX: 'start',
						originY: 'top',
						overlayX: 'start',
						overlayY: 'bottom',
					},
					{
						originX: 'end',
						originY: 'bottom',
						overlayX: 'end',
						overlayY: 'top',
					},
					{
						originX: 'end',
						originY: 'top',
						overlayX: 'end',
						overlayY: 'bottom',
					},
				]),
		})

		this._overlayRef.backdropClick().subscribe(() => {
			this._overlayRef.detach()
		})
	}
}
