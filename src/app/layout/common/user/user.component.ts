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
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { User } from 'app/core/user/user.types'
import { UserService } from 'app/core/user/user.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'

@Component({
	selector: 'user',
	templateUrl: './user.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
		private _router: Router,
		private _userService: UserService,

		private _clinicUserService: ClinicUserService,
	) {}

	ngAcceptInputType_showAvatar: BooleanInput

	_unsubscribeAll: Subject<any> = new Subject<any>()

	@Input() showAvatar: boolean = true

	user: User

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	ngOnInit(): void {
		this._userService.user$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((user: User) => {
				this.user = user

				this._changeDetectorRef.markForCheck()
			})
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)
		this._unsubscribeAll.complete()
	}

	identity = (item: any) => item

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

	toSettings() {
		this._clinicUserService.resolveClinicPath().subscribe((path) => {
			this._router.navigate([path + 'account-setting'])
		})
	}

	toUserAccounts() {
		this._clinicUserService.resolveClinicPath().subscribe((path) => {
			this._router.navigate([path + 'account-setting/user-account'])
		})
	}
}
