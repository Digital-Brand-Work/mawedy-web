import { Appointment } from './../../modules/admin/appointments/appointment.model'
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { Time } from '@digital_brand_work/models/core.model'
import * as dayjs from 'dayjs'

@Directive({
	selector: '[hideIfDoesNotMatchTime]',
})
export class HideIfDoesNotMatchTimeDirective {
	constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

	@Input() date: Date

	@Input() time: Time

	@Input() appointment: Appointment

	@Input() matchTime: boolean

	ngAfterContentInit(): void {
		if (this.matchTime && this.date && this.time && this.appointment) {
			const [hours] = this.time.split(':')

			const [startHours] = this.appointment.start_time.split(':')

			if (hours !== startHours) {
				this.renderer.addClass(this.hostElement.nativeElement, 'hidden')
			}
		}
	}
}
