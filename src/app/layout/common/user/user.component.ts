import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core'
import { Router } from '@angular/router'
import { BooleanInput } from '@angular/cdk/coercion'
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs'
import { User } from 'app/core/user/user.types'
import { UserService } from 'app/core/user/user.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { AddAppointmentModal } from 'app/modules/admin/appointments/appointment-add/appointment-add.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'user',
	templateUrl: './user.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'user',
	animations: [...dbwAnimations],
})
export class UserComponent implements OnInit, OnDestroy {
	constructor(
		private _router: Router,
		private _userService: UserService,
		private _mediaService: MediaService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _clinicUserService: ClinicUserService,
		private _addAppointmentModal: AddAppointmentModal,
	) {}

	@Input() showAvatar: boolean = true

	ngAcceptInputType_showAvatar: BooleanInput

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addAppointmentModal.opened$

	user: User

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	ngOnInit(): void {
		this._userService.user$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((user: User) => {
				this.user = user

				this._changeDetectorRef.markForCheck()
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item

	resolvePath(path: string) {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))
			.subscribe((resolvedPath) => {
				this._router.navigate([resolvedPath + path])
			})
	}

	updateUserStatus(status: string): void {
		if (!this.user) {
			return
		}

		this._userService
			.update({
				...this.user,
				status,
			})
			.subscribe()
	}

	signOut(): void {
		this._clinicUserService.logout()
	}
}
