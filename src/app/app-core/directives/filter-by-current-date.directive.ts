import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import * as dayjs from 'dayjs'

@Directive({
	selector: '[filterByCurrentDate]',
})
export class FilterByCurrentDateDirective {
	constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

	@Input() date: Date

	@Input() appointment?: Appointment

	ngAfterContentInit(): void {
		if (this.appointment && this.date) {
			const currentDateMatched =
				dayjs(this.appointment.date).format('MM-DD') ===
				dayjs(this.date).format('MM-DD')

			if (!currentDateMatched) {
				this.renderer.addClass(this.hostElement.nativeElement, 'hidden')
			}
		}
	}
}
