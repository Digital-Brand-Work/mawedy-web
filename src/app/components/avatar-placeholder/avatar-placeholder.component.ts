import { takeUntil } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, Subject } from 'rxjs'

@Component({
	selector: 'avatar-placeholder',
	templateUrl: './avatar-placeholder.component.html',
	styleUrls: ['./avatar-placeholder.component.scss'],
})
export class AvatarPlaceholderComponent implements OnInit {
	constructor(private _clinicUserService: ClinicUserService) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	initial: string = ''

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			if (clinic.name.split('').length === 1) {
				return (this.initial = clinic.name)
			}

			const initials = clinic.name.split(' ')

			if (initials.length === 1) {
				const newInitial = initials[0].split('')

				return (this.initial = newInitial[0] + newInitial[1])
			}

			this.initial = initials[0].charAt(0) + initials[1].charAt(0)
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
