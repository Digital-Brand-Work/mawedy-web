import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from '../enums/index.db.enum'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, takeUntil } from 'rxjs'
import { empty } from '../helpers'
import { DayTypes } from '../enums/day.enum'

@Directive({
	selector: '[syncWithClinic]',
})
export class SyncWithClinicDirective {
	constructor(
		private _indexedDBService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private renderer: Renderer2,
		private hostElement: ElementRef,
	) {}

	unsubscribe$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	@Input() day?: DayTypes

	@Input() slot?: string

	ngAfterViewInit() {
		this._indexedDBService
			.getByKey(DB.CLINIC, 1)
			.subscribe((results: any) => {
				if (!empty(results)) {
					const clinic: Clinic = results.data

					this.clinic$.next(clinic)

					if (this.day) {
						const timeSlot = clinic.timeslots.find(
							(slot) => slot.day === this.day,
						)

						if (
							timeSlot.start > this.slot ||
							timeSlot.end < this.slot
						) {
							const disabled =
								'bg-gray-300 pointer-events-none text-white'

							disabled.split(' ').forEach((className: string) => {
								this.renderer.addClass(
									this.hostElement.nativeElement,
									className,
								)
							})
						}
					}
				}
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
