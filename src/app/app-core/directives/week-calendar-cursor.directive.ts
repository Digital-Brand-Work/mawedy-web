import { Subject, takeUntil } from 'rxjs'
import { Appointment } from './../../modules/admin/appointments/appointment.model'
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { Time } from '@digital_brand_work/models/core.model'
import * as dayjs from 'dayjs'
import { AppointmentToolbarService } from 'app/modules/admin/appointments/appointments/appointment-toolbar.service'

@Directive({
	selector: '[weekCalendarCursor]',
})
export class WeekCalendarCursorDirective {
	constructor(
		private renderer: Renderer2,
		private hostElement: ElementRef,
		private _appointmentToolbarService: AppointmentToolbarService,
	) {}

	unsubscribe$: Subject<any> = new Subject()

	@Input() date: Date

	@Input() time: Time

	ngAfterContentInit(): void {
		this._appointmentToolbarService.date$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((date: Date) => {
				if (this.date && this.time) {
					const [hours] = this.time.split(':')

					const [slotHours] = dayjs(this.date)
						.format('HH:mm')
						.split(':')

					if (
						hours !== slotHours ||
						dayjs().format('DD-MM-YY dddd') !==
							dayjs(this.date).format('DD-MM-YY dddd')
					) {
						this.renderer.addClass(
							this.hostElement.nativeElement,
							'hidden',
						)
					}
				}
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
